import React, { useState, useEffect, useMemo } from 'react'
import { useGetRegistries } from '../../shared/hooks/useGetRegistries'
import type { Registry } from '../../services/api'

export const RegistriesList: React.FC = () => {
  const { fetchRegistries, registries, isLoading } = useGetRegistries()
  const [from, setFrom] = useState<string>('')
  const [to, setTo] = useState<string>('')
  const [selectedDayByClass, setSelectedDayByClass] = useState<Record<string, string | null>>({})

  useEffect(() => {
    fetchRegistries()
  }, [fetchRegistries])

  const filtered = useMemo(() => {
    return registries.filter((r) => {
      const dt = new Date(r.date)
      if (from && dt < new Date(from)) return false
      if (to && dt > new Date(to)) return false
      return true
    })
  }, [registries, from, to])

  const grouped = useMemo(() => {
    const map: Record<string, Record<string, Registry[]>> = {}
    filtered.forEach((r) => {
      const cls = r.classroom || 'General'
      const day = new Date(r.date).toLocaleDateString()
      map[cls] = map[cls] || {}
      map[cls][day] = map[cls][day] || []
      map[cls][day].push(r)
    })
    return map
  }, [filtered])

  const handleSelectDay = (cls: string, day: string | null) => {
    setSelectedDayByClass((prev) => ({ ...prev, [cls]: day }))
  }

  return (
    <div
      className="min-h-screen p-8 bg-neutral-50"
      style={{ fontFamily: "'Segoe UI', 'Segoe UI Web', sans-serif" }}
    >
      {/* Header */}
      <header className="mb-10 max-w-7xl mx-auto">
        <h1 className="text-4xl font-semibold text-neutral-900 tracking-tight">
          Historial de Registros
        </h1>
        <p className="text-neutral-500 text-lg mt-1">
          Consulta los movimientos de entrada y salida por salón
        </p>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto">
        {/* Filtros de fecha */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-neutral-200">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Desde
              </label>
              <input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full rounded-md border px-4 py-2 text-base border-neutral-300 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-[#0067b8]"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Hasta
              </label>
              <input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full rounded-md border px-4 py-2 text-base border-neutral-300 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-[#0067b8]"
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-96 bg-white rounded-lg shadow-sm border border-neutral-200">
            <div
              className="w-10 h-10 border-4 border-b-transparent border-[#0067b8] rounded-full animate-spin"
              role="status"
            />
            <p className="mt-4 text-lg text-neutral-500">Cargando registros...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(grouped).map(([cls, days]) => {
              const allRecords = Object.values(days).flat()
              const selected = selectedDayByClass[cls] ?? null
              const toShow = selected ? days[selected] || [] : allRecords

              return (
                <div
                  key={cls}
                  className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-neutral-800 flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#0067b8] rounded-full" />
                      Salón: {cls}
                    </h3>
                    <span className="text-sm font-medium text-neutral-500">
                      Total de movimientos: {toShow.length}
                    </span>
                  </div>

                  {/* Botones de día */}
                  <div className="mb-6">
                    <div className="text-sm font-medium text-neutral-700 mb-2">
                      Filtrar por día:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleSelectDay(cls, null)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                          selected === null
                            ? 'bg-[#0067b8] hover:bg-[#005a9e] text-white shadow'
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        }`}
                      >
                        Todos
                      </button>
                      {Object.keys(days).map((day) => (
                        <button
                          key={day}
                          onClick={() => handleSelectDay(cls, day)}
                          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                            selected === day
                              ? 'bg-[#0067b8] hover:bg-[#005a9e] text-white shadow'
                              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tabla de registros */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                      <thead className="sticky top-0 bg-white">
                        <tr className="border-b border-neutral-200">
                          <th className="py-2 pr-2 font-medium text-neutral-500">
                            Carné
                          </th>
                          <th className="py-2 px-2 font-medium text-neutral-500">
                            Tipo
                          </th>
                          <th className="py-2 pl-2 font-medium text-neutral-500">
                            Hora
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {toShow.length === 0 ? (
                          <tr>
                            <td colSpan={3} className="text-center py-6 text-neutral-400">
                              No hay registros para mostrar.
                            </td>
                          </tr>
                        ) : (
                          toShow.map((r, i) => (
                            <tr
                              key={r._id || i}
                              className="border-b border-neutral-100 hover:bg-[#e6f2fa] transition-colors duration-150"
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
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
