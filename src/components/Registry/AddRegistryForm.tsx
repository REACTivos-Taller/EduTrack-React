
import React, { useState, useEffect } from 'react';
import { useAddRegistry } from '../../shared/hooks/useAddRegistry';
import type { RegistryType } from '../../services/api';
import toast from 'react-hot-toast';

// 1. Define la interfaz de las props
interface AddRegistryFormProps {
  onClose: () => void;
}

// 2. Asigna la interfaz al componente
export const AddRegistryForm: React.FC<AddRegistryFormProps> = ({ onClose }) => {
  const [studentCardNumber, setStudentCardNumber] = useState('');
  const [classroom, setClassroom] = useState('');
  const [type, setType] = useState<RegistryType>('entry');
  const [errors, setErrors] = useState<{ card?: string; room?: string }>({});
  const { addRegistry, isLoading } = useAddRegistry();

  const classroomOptions = [
    ...Array.from({ length: 29 }, (_, i) => `C${11 + i}`),
    'G12', 'B21', 'I23', 'I1', 'I25', 'B3', 'B2', 'B22',
  ];

  useEffect(() => {
    setErrors((e) => ({
      ...e,
      card:
        studentCardNumber && !/^\d{7}$/.test(studentCardNumber)
          ? 'El carné debe tener 7 dígitos'
          : undefined,
    }));
  }, [studentCardNumber]);

  useEffect(() => {
    setErrors((e) => ({
      ...e,
      room: !classroom ? 'Selecciona un salón' : undefined,
    }));
  }, [classroom]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (errors.card || errors.room) {
      toast.error('Corrige los errores antes de enviar');
      return;
    }

    const record = await addRegistry(studentCardNumber, type, classroom);

    if (record && !('error' in record)) {
      setStudentCardNumber('');
      setClassroom('');
      toast.success('Movimiento registrado con éxito');
      onClose(); // Llama a onClose para cerrar el modal
    } else if (record && 'message' in record) {
      toast.error(String(record.message));
    } else {
      toast.error('Ocurrió un error inesperado');
    }
  };

  const handleCancel = () => {
    setStudentCardNumber('');
    setClassroom('');
    onClose(); // Llama a onClose para cerrar el modal
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#e9ecf7]/80">
      <div
        className="w-full max-w-md rounded-2xl bg-white p-0 shadow-xl relative"
        style={{
          minWidth: 400,
          minHeight: 340,
        }}
      >
        {/* Cerrar (X) */}
        <button
          type="button"
          className="absolute top-5 right-6 text-[#b3b8d0] hover:text-[#5a67d8] text-2xl font-light focus:outline-none"
          tabIndex={-1}
          aria-label="Cerrar"
          style={{ lineHeight: 1 }}
          onClick={handleCancel}
        >
          ×
        </button>
        <div className="flex flex-col items-center pt-8">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#e7eafc]">
            <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
              <path d="M12 17v-4" stroke="#7b8bd1" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="8" r="1" fill="#7b8bd1"/>
              <circle cx="12" cy="12" r="10" stroke="#7b8bd1" strokeWidth="2"/>
            </svg>
          </div>
          <h2 className="mb-1 text-center text-2xl font-bold text-[#6c7ae0] tracking-tight">Nuevo Registro</h2>
          <p className="mb-6 text-center text-[#7b8bd1] text-base font-normal">
            Ingresa los datos para registrar el movimiento.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-5">
          {/* Carné */}
          <div>
            <input
              id="studentCardNumber"
              type="text"
              inputMode="numeric"
              maxLength={7}
              value={studentCardNumber}
              onChange={(e) => setStudentCardNumber(e.target.value.replace(/\D/g, ''))}
              placeholder="Carné de alumno"
              className={`w-full rounded-lg border px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#6c7ae0] placeholder-[#b3b8d0] ${
                errors.card ? 'border-red-400' : 'border-[#e2e6f3]'
              } bg-[#f8f9fd]`}
            />
            {errors.card && <p className="mt-1 text-xs text-red-500">{errors.card}</p>}
          </div>
          {/* Salón */}
          <div>
            <select
              id="classroom"
              value={classroom}
              onChange={(e) => setClassroom(e.target.value)}
              className={`w-full rounded-lg border px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#6c7ae0] ${
                errors.room ? 'border-red-400' : 'border-[#e2e6f3]'
              } bg-[#f8f9fd] text-[#323130]`}
            >
              <option value="">Selecciona salón</option>
              {classroomOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.room && <p className="mt-1 text-xs text-red-500">{errors.room}</p>}
          </div>
          {/* Tipo de Movimiento */}
          <div>
            <div className="flex gap-2">
              {(['entry', 'exit'] as RegistryType[]).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setType(opt)}
                  className={`flex-1 rounded-lg py-2 text-base font-semibold transition shadow-sm ${
                    type === opt
                      ? 'bg-[#6c7ae0] text-white'
                      : 'bg-[#f1f3fa] text-[#323130] border border-[#e2e6f3] hover:bg-[#e7eafc]'
                  }`}
                >
                  {opt === 'entry' ? 'Entrada' : 'Salida'}
                </button>
              ))}
            </div>
          </div>
          {/* Botones */}
          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              disabled={isLoading || !!errors.card || !!errors.room}
              className="flex-1 rounded-lg bg-[#6c7ae0] py-2 text-base font-bold text-white shadow-sm hover:bg-[#4254b2] transition disabled:opacity-60"
            >
              {isLoading ? 'Guardando...' : 'Registrar'}
            </button>
            <button
              type="button"
              className="flex-1 rounded-lg bg-[#f1f3fa] py-2 text-base font-bold text-[#6c7ae0] shadow-sm hover:bg-[#e7eafc] transition"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};