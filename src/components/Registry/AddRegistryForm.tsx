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

  const classroomOptions = [
    ...Array.from({ length: 29 }, (_, i) => `C${11 + i}`),
    'G12', 'B21', 'I23', 'I1', 'I25', 'B3', 'B2', 'B22',
  ]

  useEffect(() => {
    setErrors((e) => ({
      ...e,
      card:
        studentCardNumber && !/^\d{7}$/.test(studentCardNumber)
          ? 'El carné debe tener 7 dígitos'
          : undefined,
    }))
  }, [studentCardNumber])

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
    <div className="mx-auto max-w-xl rounded-2xl border border-[#d2d0ce] bg-white/70 backdrop-blur-md p-8 shadow-2xl">
      <h2 className="mb-6 text-center text-4xl font-bold text-[#323130]">Nuevo Registro</h2>

      <form onSubmit={handleSubmit} className="space-y-6 text-[#323130]">
        {/* Carné */}
        <div>
          <label htmlFor="studentCardNumber" className="mb-2 block text-xl font-medium">
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
            className={`w-full rounded-lg border px-4 py-3 text-xl focus:outline-none focus:ring-2 focus:ring-[#106ebe] ${
              errors.card ? 'border-red-500' : 'border-gray-300'
            } bg-white/90 backdrop-blur-sm`}
          />
          {errors.card && <p className="mt-1 text-sm text-red-600">{errors.card}</p>}
        </div>

        {/* Salón */}
        <div>
          <label htmlFor="classroom" className="mb-2 block text-xl font-medium">
            Salón
          </label>
          <select
            id="classroom"
            value={classroom}
            onChange={(e) => setClassroom(e.target.value)}
            className={`w-full rounded-lg border px-4 py-3 text-xl focus:outline-none focus:ring-2 focus:ring-[#106ebe] ${
              errors.room ? 'border-red-500' : 'border-gray-300'
            } bg-white/90 backdrop-blur-sm`}
          >
            <option value="">-- Selecciona Salón --</option>
            {classroomOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.room && <p className="mt-1 text-sm text-red-600">{errors.room}</p>}
        </div>

        {/* Tipo de Movimiento */}
        <div>
          <p className="mb-2 text-xl font-medium">Tipo de Movimiento</p>
          <div className="flex gap-4">
            {(['entry', 'exit'] as RegistryType[]).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setType(opt)}
                className={`flex-1 rounded-lg py-3 text-lg font-semibold transition shadow-sm ${
                  type === opt
                    ? 'bg-[#106ebe] text-white'
                    : 'bg-white/80 text-[#323130] border border-[#c8c6c4] hover:bg-[#f3f2f1]'
                } backdrop-blur-sm`}
              >
                {opt === 'entry' ? 'Entrada' : 'Salida'}
              </button>
            ))}
          </div>
        </div>

        {/* Botón de Envío */}
        <div>
          <button
            type="submit"
            disabled={isLoading || !!errors.card || !!errors.room}
            className="w-full rounded-lg bg-[#106ebe] py-4 text-xl font-bold text-white hover:bg-[#005a9e] transition disabled:opacity-50 shadow-md"
          >
            {isLoading ? 'Guardando...' : 'Registrar Movimiento'}
          </button>
        </div>
      </form>
    </div>
  )
}
