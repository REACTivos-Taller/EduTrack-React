import React, { useState, useEffect, useMemo } from 'react'
import { useGetRegistries } from '../../shared/hooks/useGetRegistries'
import type { Registry } from '../../services/api'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import toast from 'react-hot-toast'

const imageModules = import.meta.glob('../../assets/imagenes/*.jpeg', {
  eager: true,
  import: 'default',
}) as Record<string, string>

type Session = 'all' | 'mat' | 'ves'

const RECORDS_PER_PAGE = 12
const CLASSROOMS_PER_PAGE = 12

export const DashboardPage: React.FC = () => {
  const { fetchRegistries, registries, isLoading } = useGetRegistries()
  const [selectedDayByClass, setSelectedDayByClass] = useState<
    Record<string, string | null>
  >({})
  const [sessionByClass, setSessionByClass] = useState<Record<string, Session>>(
    {},
  )
  const [pageByClass, setPageByClass] = useState<Record<string, number>>({})
  const [currentPage, setCurrentPage] = useState(1)

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

  const classroomNames = Object.keys(grouped)
  const totalClassroomPages = Math.ceil(
    classroomNames.length / CLASSROOMS_PER_PAGE,
  )
  const paginatedClassrooms = classroomNames.slice(
    (currentPage - 1) * CLASSROOMS_PER_PAGE,
    currentPage * CLASSROOMS_PER_PAGE,
  )

  const handleSelectDay = (cls: string, day: string | null) => {
    setSelectedDayByClass((p) => ({ ...p, [cls]: day }))
    setPageByClass((p) => ({ ...p, [cls]: 1 })) // Reset page on day change
  }

  const handleSelectSession = (cls: string, sess: Session) => {
    setSessionByClass((p) => ({ ...p, [cls]: sess }))
    setPageByClass((p) => ({ ...p, [cls]: 1 })) // Reset page on session change
  }

  const handleRecordsPageChange = (cls: string, newPage: number) => {
    setPageByClass((p) => ({ ...p, [cls]: newPage }))
  }

  const handleClassroomPageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const renderPageNumbers = () => {
    const pages = []
    const total = totalClassroomPages
    const current = currentPage
    const maxVisible = 5

    if (total <= maxVisible) {
      for (let i = 1; i <= total; i++) {
        pages.push(i)
      }
    } else {
      if (current <= 3) {
        pages.push(1, 2, 3, '...', total)
      } else if (current >= total - 2) {
        pages.push(1, '...', total - 2, total - 1, total)
      } else {
        pages.push(1, '...', current - 1, current, current + 1, '...', total)
      }
    }

    return pages.map((page, index) =>
      page === '...' ? (
        <span key={index} className="px-3 py-2 text-neutral-500">
          ...
        </span>
      ) : (
        <button
          key={index}
          onClick={() => handleClassroomPageChange(Number(page))}
          className={`h-9 w-9 rounded-md flex items-center justify-center font-medium transition ${
            current === page
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-neutral-700 hover:bg-neutral-200'
          }`}
        >
          {page}
        </button>
      ),
    )
  }

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
        firstEntry && lastExit
          ? Math.round((lastExit.getTime() - firstEntry.getTime()) / 60000)
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
    <div
      className="min-h-screen p-8 bg-neutral-50"
      style={{ fontFamily: "'Segoe UI', 'Segoe UI Web', sans-serif" }}
    >
      {/* Header */}
      <header className="mb-10 max-w-7xl mx-auto">
        <h1 className="text-4xl font-semibold text-neutral-900 tracking-tight">
          Panel de Registros
        </h1>
        <p className="text-neutral-500 text-lg mt-1">
          Visualiza y exporta los registros de asistencia por salón y jornada
        </p>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-96 bg-white rounded-lg shadow-sm border border-neutral-200">
            <div
              className="w-10 h-10 border-4 border-b-transparent border-blue-600 rounded-full animate-spin"
              role="status"
            />
            <p className="mt-4 text-lg text-neutral-500">Cargando registros...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedClassrooms.map((cls) => {
              const days = grouped[cls]
              const selDay = selectedDayByClass[cls] ?? null
              const sess = sessionByClass[cls] ?? 'all'
              const page = pageByClass[cls] ?? 1
              const baseRecs = selDay
                ? days[selDay] || []
                : Object.values(days).flat()
              const toShow = baseRecs.filter((r) => {
                if (sess === 'all') return true
                const hr = new Date(r.date).getHours()
                return sess === 'mat' ? hr < 12 : hr >= 12
              })
              const totalPages = Math.ceil(toShow.length / RECORDS_PER_PAGE)
              const paginated = toShow.slice(
                (page - 1) * RECORDS_PER_PAGE,
                page * RECORDS_PER_PAGE,
              )

              return (
                <div
                  key={cls}
                  className="bg-white rounded-lg shadow-sm border border-neutral-200 flex flex-col p-6 transition-all duration-200 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-neutral-800 flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full" />
                      Salón: {cls}
                    </h2>
                    <span className="text-sm font-medium text-neutral-500">
                      Movimientos: {toShow.length}
                    </span>
                  </div>

                  {/* Filtros */}
                  <div className="mb-4">
                    <div className="text-sm font-medium text-neutral-700 mb-2">
                      Filtrar por día:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleSelectDay(cls, null)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                          selDay === null
                            ? 'bg-blue-600 text-white shadow'
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        }`}
                      >
                        Todos
                      </button>
                      {Object.keys(days).map((d) => (
                        <button
                          key={d}
                          onClick={() => handleSelectDay(cls, d)}
                          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                            selDay === d
                              ? 'bg-blue-600 text-white shadow'
                              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm font-medium text-neutral-700 mb-2">
                      Filtrar por jornada:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(['all', 'mat', 'ves'] as Session[]).map((s) => (
                        <button
                          key={s}
                          onClick={() => handleSelectSession(cls, s)}
                          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                            sess === s
                              ? 'bg-green-500 text-white shadow'
                              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                          }`}
                        >
                          {s === 'all'
                            ? 'Ambos'
                            : s === 'mat'
                              ? 'Matutino'
                              : 'Vespertino'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tabla de registros */}
                  <div className="flex-1 overflow-x-auto mb-4">
                    <table className="w-full text-sm text-left border-collapse">
                      <thead className="sticky top-0 bg-neutral-50">
                        <tr className="border-b border-neutral-200">
                          <th className="py-2 pr-2 font-medium text-neutral-500">
                            Carné
                          </th>
                          <th className="py-2 px-2 font-medium text-neutral-500">
                            Tipo
                          </th>
                          <th className="py-2 px-2 font-medium text-neutral-500">
                            Hora
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginated.length === 0 ? (
                          <tr>
                            <td colSpan={3} className="text-center py-6 text-neutral-400">
                              No hay registros para mostrar.
                            </td>
                          </tr>
                        ) : (
                          paginated.map((r, i) => (
                            <tr
                              key={r._id || i}
                              className="border-b border-neutral-100 hover:bg-blue-50 transition-colors duration-150"
                            >
                              <td className="py-2 pr-2 text-neutral-800">{r.studentCardNumber}</td>
                              <td className="py-2 px-2">
                                <span
                                  className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                                    r.type === 'entry'
                                      ? 'bg-green-100 text-green-700'
                                      : 'bg-red-100 text-red-700'
                                  }`}
                                >
                                  {r.type === 'entry' ? 'Entrada' : 'Salida'}
                                </span>
                              </td>
                              <td className="py-2 pl-2 text-neutral-600">
                                {new Date(r.date).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Paginación de registros */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <button
                        onClick={() => handleRecordsPageChange(cls, page - 1)}
                        disabled={page === 1}
                        className={`p-1 rounded-full border transition-all duration-200 ${
                          page === 1
                            ? 'border-neutral-200 text-neutral-300'
                            : 'border-neutral-400 text-neutral-700 hover:bg-neutral-100 hover:border-neutral-600'
                        }`}
                        aria-label="Página anterior"
                      >
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path
                            d="M15 18l-6-6 6-6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <span className="text-sm font-medium text-neutral-600">
                        Página {page} de {totalPages}
                      </span>
                      <button
                        onClick={() => handleRecordsPageChange(cls, page + 1)}
                        disabled={page === totalPages}
                        className={`p-1 rounded-full border transition-all duration-200 ${
                          page === totalPages
                            ? 'border-neutral-200 text-neutral-300'
                            : 'border-neutral-400 text-neutral-700 hover:bg-neutral-100 hover:border-neutral-600'
                        }`}
                        aria-label="Página siguiente"
                      >
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path
                            d="M9 18l6-6-6-6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  )}

                  {/* Botón de reporte */}
                  <button
                    onClick={() => generateReport(cls, selDay)}
                    className="w-full mt-auto rounded-md bg-blue-600 py-2 text-base font-semibold text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                  >
                    Generar Reporte Excel
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* Paginación de salones */}
      {!isLoading && totalClassroomPages > 1 && (
        <div className="flex items-center justify-center mt-8 gap-2">
          <button
            onClick={() => handleClassroomPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg transition-colors ${
              currentPage === 1
                ? 'text-neutral-400'
                : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="flex items-center space-x-1">{renderPageNumbers()}</div>
          <button
            onClick={() => handleClassroomPageChange(currentPage + 1)}
            disabled={currentPage === totalClassroomPages}
            className={`p-2 rounded-lg transition-colors ${
              currentPage === totalClassroomPages
                ? 'text-neutral-400'
                : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
