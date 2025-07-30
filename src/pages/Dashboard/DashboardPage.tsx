import React, { useState, useEffect, useMemo } from 'react'
import { useGetRegistries } from '../../shared/hooks/useGetRegistries'
import type { Registry } from '../../services/api'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import toast from 'react-hot-toast'

// Trae todas las imágenes .jpeg de ese directorio
const imageModules = import.meta.glob('../../assets/imagenes/*.jpeg', {
  eager: true,
  import: 'default',
}) as Record<string, string>

type Session = 'all' | 'mat' | 'ves'

export const DashboardPage: React.FC = () => {
  const { fetchRegistries, registries, isLoading } = useGetRegistries()
  const [selectedDayByClass, setSelectedDayByClass] = useState<Record<string, string | null>>(
    {},
  )
  const [sessionByClass, setSessionByClass] = useState<Record<string, Session>>({})

  useEffect(() => {
    fetchRegistries()
  }, [fetchRegistries])

  const grouped = useMemo(() => {
    const map: Record<string, Record<string, Registry[]>> = {}
    registries.forEach((r) => {
      const cls = r.classroom || 'General'
      const day = new Date(r.date).toLocaleDateString()
      map[cls] = map[cls] || {}
      map[cls][day] = map[cls][day] || []
      map[cls][day].push(r)
    })
    return map
  }, [registries])

  const handleSelectDay = (cls: string, day: string | null) =>
    setSelectedDayByClass((p) => ({ ...p, [cls]: day }))
  const handleSelectSession = (cls: string, sess: Session) =>
    setSessionByClass((p) => ({ ...p, [cls]: sess }))

  const generateReport = async (cls: string, day: string | null) => {
    const days = grouped[cls] || {}
    const allRecs = day ? days[day] || [] : Object.values(days).flat()
    const sess = sessionByClass[cls] || 'all'

    const records = allRecs.filter((r) => {
      if (sess === 'all') return true
      const hr = new Date(r.date).getHours()
      return sess === 'mat' ? hr < 12 : hr >= 12
    })

    const byStudent: Record<string, Registry[]> = {}
    records.forEach((r) => {
      byStudent[r.studentCardNumber] = byStudent[r.studentCardNumber] || []
      byStudent[r.studentCardNumber].push(r)
    })

    const rows = Object.entries(byStudent).map(([student, recs]) => {
      const sorted = recs
        .map((r) => ({ ...r, d: new Date(r.date) }))
        .sort((a, b) => a.d.getTime() - b.d.getTime())
      const firstEntry = sorted.find((x) => x.type === 'entry')?.d
      const lastExit = [...sorted].reverse().find((x) => x.type === 'exit')?.d
      const duration =
        firstEntry && lastExit ?
          Math.round((lastExit.getTime() - firstEntry.getTime()) / 60000)
        : ''
      return {
        Carné: student,
        'Hora Entrada': firstEntry ? firstEntry.toLocaleTimeString() : '',
        'Hora Salida': lastExit ? lastExit.toLocaleTimeString() : '',
        'Duración (min)': duration,
      }
    })

    const wb = new ExcelJS.Workbook()
    const ws = wb.addWorksheet('Reporte')
    ws.columns = [
      { header: 'Carné', key: 'Carné', width: 18 },
      { header: 'Hora Entrada', key: 'Hora Entrada', width: 22 },
      { header: 'Hora Salida', key: 'Hora Salida', width: 22 },
      { header: 'Duración (min)', key: 'Duración (min)', width: 18 },
    ]
    rows.forEach((r) => ws.addRow(r))

    const imgRow = rows.length + 4
    const suffix = sess === 'mat' ? 'M' : 'V'
    const normalizedCls = cls.replace(/-/g, '').toLowerCase()
    const fileName = `${normalizedCls}${suffix}.jpeg`
    const importKey = `../../assets/imagenes/${fileName}`
    const imgUrl = imageModules[importKey]

    if (!imgUrl) {
      toast.error(`No se encontró la imagen "${fileName}"`)
    } else {
      try {
        const res = await fetch(imgUrl)
        if (!res.ok) throw new Error()
        const blob = await res.blob()
        const buffer = await blob.arrayBuffer()
        const imgId = wb.addImage({ buffer, extension: 'jpeg' })
        ws.addImage(imgId, {
          tl: { col: 1, row: imgRow },
          ext: { width: 350, height: 175 },
        })
      } catch {
        toast.error(`No se pudo cargar la imagen "${fileName}"`)
      }
    }

    const buf = await wb.xlsx.writeBuffer()
    saveAs(
      new Blob([buf], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }),
      `Reporte_${cls}_${day || 'Todos'}_${sess.toUpperCase()}_${Date.now()}.xlsx`,
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 transition-colors duration-300 sm:px-8 dark:bg-gray-900">
      <h1 className="animate-slide-in mb-12 text-center text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl dark:text-gray-100">
        Dashboard de Registros
      </h1>

      {isLoading ?
        <p className="text-center text-2xl text-gray-600 dark:text-gray-400">Cargando…</p>
      : <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(grouped).map(([cls, days]) => {
            const selDay = selectedDayByClass[cls] ?? null
            const sess = sessionByClass[cls] ?? 'all'
            const baseRecs = selDay ? days[selDay] || [] : Object.values(days).flat()
            const toShow = baseRecs.filter((r) => {
              if (sess === 'all') return true
              const hr = new Date(r.date).getHours()
              return sess === 'mat' ? hr < 12 : hr >= 12
            })

            return (
              <div
                key={cls}
                className="animate-slide-in transform rounded-2xl bg-white p-6 shadow-lg transition-transform duration-300 hover:scale-105 dark:bg-gray-800"
              >
                <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-gray-100">
                  Salón: {cls}
                </h2>

                {/* Día */}
                <div className="mb-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleSelectDay(cls, null)}
                    className={`rounded-full px-4 py-2 text-xl transition ${
                      selDay === null ?
                        'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    Todos
                  </button>
                  {Object.keys(days).map((d) => (
                    <button
                      key={d}
                      onClick={() => handleSelectDay(cls, d)}
                      className={`rounded-full px-4 py-2 text-xl transition ${
                        selDay === d ?
                          'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>

                {/* Jornada */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {(['all', 'mat', 'ves'] as Session[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSelectSession(cls, s)}
                      className={`rounded-full px-4 py-2 text-xl transition ${
                        sess === s ?
                          'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {s === 'all' ?
                        'Ambos'
                      : s === 'mat' ?
                        'Matutino'
                      : 'Vespertino'}
                    </button>
                  ))}
                </div>

                {/* Reporte */}
                <button
                  onClick={() => generateReport(cls, selDay)}
                  className="mb-4 w-full rounded-xl bg-blue-600 py-4 text-2xl font-semibold text-white transition-colors duration-300 hover:bg-blue-700"
                >
                  Generar Reporte
                </button>

                <p className="text-xl text-gray-700 dark:text-gray-300">
                  Movimientos mostrados: <span className="font-bold">{toShow.length}</span>
                </p>
              </div>
            )
          })}
        </div>
      }
    </div>
  )
}
