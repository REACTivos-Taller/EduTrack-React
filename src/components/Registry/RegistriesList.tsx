// src/components/Registry/RegistriesList.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { useGetRegistries } from '../../shared/hooks/useGetRegistries';
import type { Registry } from '../../services/api';

export const RegistriesList: React.FC = () => {
  const { fetchRegistries, registries, isLoading } = useGetRegistries();
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [selectedDayByClass, setSelectedDayByClass] = useState<Record<string, string | null>>({});

  // Carga inicial
  useEffect(() => {
    fetchRegistries();
  }, [fetchRegistries]);

  // Filtrado por rango de fechas (local)
  const filtered = useMemo(() => {
    return registries.filter((r) => {
      const dt = new Date(r.date);
      if (from && dt < new Date(from)) return false;
      if (to && dt > new Date(to)) return false;
      return true;
    });
  }, [registries, from, to]);

  // Agrupa por salón y día
  const grouped = useMemo(() => {
    const map: Record<string, Record<string, Registry[]>> = {};
    filtered.forEach((r) => {
      const cls = r.classroom || 'General';
      const day = new Date(r.date).toLocaleDateString();
      map[cls] = map[cls] || {};
      map[cls][day] = map[cls][day] || [];
      map[cls][day].push(r);
    });
    return map;
  }, [filtered]);

  const handleSelectDay = (cls: string, day: string | null) => {
    setSelectedDayByClass((prev) => ({ ...prev, [cls]: day }));
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-900 dark:text-gray-100">
        Historial de Registros
      </h2>

      {/* Filtros de fechas */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <div className="flex-1">
          <label className="block text-2xl font-semibold mb-2 text-gray-700 dark:text-gray-200">
            Desde
          </label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full p-4 text-2xl border-2 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:focus:border-blue-400"
          />
        </div>
        <div className="flex-1">
          <label className="block text-2xl font-semibold mb-2 text-gray-700 dark:text-gray-200">
            Hasta
          </label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full p-4 text-2xl border-2 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:focus:border-blue-400"
          />
        </div>
      </div>

      {isLoading ? (
        <p className="text-center text-2xl text-gray-600 dark:text-gray-400">Cargando registros…</p>
      ) : (
        <div className="space-y-12">
          {Object.entries(grouped).map(([cls, days]) => {
            const allRecords = Object.values(days).flat();
            const selected = selectedDayByClass[cls] ?? null;
            const toShow = selected ? days[selected] || [] : allRecords;

            return (
              <div key={cls} className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8">
                <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  Salón: {cls}
                </h3>

                {/* Botones de selección de día */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <button
                    onClick={() => handleSelectDay(cls, null)}
                    className={`px-6 py-3 rounded-full text-2xl font-medium transition ${
                      selected === null
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    Todos
                  </button>
                  {Object.keys(days).map((day) => (
                    <button
                      key={day}
                      onClick={() => handleSelectDay(cls, day)}
                      className={`px-6 py-3 rounded-full text-2xl font-medium transition ${
                        selected === day
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>

                {/* Lista de registros */}
                {toShow.length > 0 ? (
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {toShow.map((r) => (
                      <li
                        key={r._id}
                        className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
                      >
                        <span className="text-2xl font-medium text-gray-800 dark:text-gray-200">
                          {r.studentCardNumber}
                        </span>
                        <span
                          className={`text-2xl font-semibold ${
                            r.type === 'entry'
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {r.type === 'entry' ? 'Entrada' : 'Salida'}
                        </span>
                        <span className="text-xl text-gray-500 dark:text-gray-400">
                          {new Date(r.date).toLocaleTimeString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center text-2xl text-gray-600 dark:text-gray-400">
                    No hay registros para esta selección.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
