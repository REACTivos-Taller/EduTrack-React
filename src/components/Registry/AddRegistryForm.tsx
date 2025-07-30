import React, { useState, useEffect } from 'react'
import { useAddRegistry } from '../../shared/hooks/useAddRegistry'
import type { RegistryType } from '../../services/api'
import toast from 'react-hot-toast'

export const AddRegistryForm: React.FC = () => {
  const [studentCardNumber, setStudentCardNumber] = useState('')
  const [classroom, setClassroom] = useState('')
  const [type, setType] = useState<RegistryType>('entry')
  const [errors, setErrors] = useState<{ card?: string; room?: string }>({})
  const { addRegistry, isLoading } = useAddRegistry()

  // Opciones de salón sin guiones
  const classroomOptions = [
    ...Array.from({ length: 29 }, (_, i) => `C${11 + i}`), // C11..C39
    'G12',
    'B21',
    'I23',
    'I1',
    'I25',
    'B3',
    'B2',
    'B22',
  ]

  // Validación carné
  useEffect(() => {
    setErrors((e) => ({
      ...e,
      card:
        studentCardNumber && !/^\d{7}$/.test(studentCardNumber) ?
          'El carné debe tener 7 dígitos'
        : undefined,
    }))
  }, [studentCardNumber])

  // Validación salón
  useEffect(() => {
    setErrors((e) => ({
      ...e,
      room: !classroom ? 'Selecciona un salón' : undefined,
    }))
  }, [classroom])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (errors.card || errors.room) {
      toast.error('Corrige los errores antes de enviar')
      return
    }
    const record = await addRegistry(studentCardNumber, type, classroom)
    if (record && !('error' in record)) {
      setStudentCardNumber('')
      setClassroom('')
      toast.success('Movimiento registrado con éxito')
    } else if (record && 'message' in record) {
      toast.error(String(record.message))
    } else {
      toast.error('Ocurrió un error inesperado')
    }
  }

  return (
    <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800">
      <h2 className="mb-6 text-center text-4xl font-extrabold text-gray-900 dark:text-gray-100">
        Nuevo Registro
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Carné */}
        <div>
          <label
            htmlFor="studentCardNumber"
            className="mb-2 block text-2xl font-semibold text-gray-700 dark:text-gray-200"
          >
            Carné de Alumno
          </label>
          <input
            id="studentCardNumber"
            type="text"
            inputMode="numeric"
            maxLength={7}
            value={studentCardNumber}
            onChange={(e) => setStudentCardNumber(e.target.value.replace(/\D/g, ''))}
            placeholder="Ej. 2023179"
            className={`w-full rounded-lg border-2 p-4 text-2xl focus:outline-none ${
              errors.card ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
            }`}
          />
          {errors.card && <p className="mt-1 text-lg text-red-600">{errors.card}</p>}
        </div>

        {/* Salón */}
        <div>
          <label
            htmlFor="classroom"
            className="mb-2 block text-2xl font-semibold text-gray-700 dark:text-gray-200"
          >
            Salón
          </label>
          <select
            id="classroom"
            value={classroom}
            onChange={(e) => setClassroom(e.target.value)}
            className={`w-full rounded-lg border-2 p-4 text-2xl focus:outline-none ${
              errors.room ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
            }`}
          >
            <option value="">-- Selecciona Salón --</option>
            {classroomOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.room && <p className="mt-1 text-lg text-red-600">{errors.room}</p>}
        </div>

        {/* Tipo de Movimiento */}
        <div>
          <p className="mb-2 text-2xl font-semibold text-gray-700 dark:text-gray-200">
            Tipo de Movimiento
          </p>
          <div className="flex gap-4">
            {(['entry', 'exit'] as RegistryType[]).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setType(opt)}
                className={`flex-1 rounded-lg py-4 text-2xl font-medium transition ${
                  type === opt ?
                    'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {opt === 'entry' ? 'Entrada' : 'Salida'}
              </button>
            ))}
          </div>
        </div>

        {/* Botón de envío */}
        <div>
          <button
            type="submit"
            disabled={isLoading || !!errors.card || !!errors.room}
            className="w-full rounded-xl bg-blue-600 py-5 text-2xl font-bold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Guardando...' : 'Registrar Movimiento'}
          </button>
        </div>
      </form>
    </div>
  )
}
