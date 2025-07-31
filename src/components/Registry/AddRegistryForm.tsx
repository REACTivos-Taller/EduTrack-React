import React, { useState, useEffect } from 'react';
import { useAddRegistry } from '../../shared/hooks/useAddRegistry';
import type { RegistryType } from '../../services/api';
import toast from 'react-hot-toast';
import { Listbox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

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
      onClose();
    } else if (record && 'message' in record) {
      toast.error(String(record.message));
    } else {
      toast.error('Ocurrió un error inesperado');
    }
  };

  const handleCancel = () => {
    setStudentCardNumber('');
    setClassroom('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/50">
      <div
        className="w-full max-w-md rounded-2xl bg-white p-0 shadow-xl relative"
        style={{ minWidth: 400, minHeight: 340 }}
      >
        <button
          type="button"
          className="absolute top-5 right-6 text-[#9ca3af] hover:text-[#0067b8] text-2xl font-light focus:outline-none"
          tabIndex={-1}
          aria-label="Cerrar"
          style={{ lineHeight: 1 }}
          onClick={handleCancel}
        >
          ×
        </button>
        <div className="flex flex-col items-center pt-8">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#e0f2fe]">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#005a9e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-plus">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <line x1="19" x2="19" y1="8" y2="14"/>
              <line x1="16" x2="22" y1="11" y2="11"/>
            </svg>
          </div>
          <h2 className="mb-1 text-center text-2xl font-bold text-[#0067b8] tracking-tight">Nuevo Registro</h2>
          <p className="mb-6 text-center text-[#4b5563] text-base font-normal">
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
              className={`w-full rounded-lg border px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#0067b8] placeholder-[#9ca3af] ${
                errors.card ? 'border-red-400' : 'border-[#e5e7eb]'
              } bg-white`}
            />
            {errors.card && <p className="mt-1 text-xs text-red-500">{errors.card}</p>}
          </div>

          {/* Salón con Listbox */}
          <div className="relative">
            <Listbox value={classroom} onChange={setClassroom}>
              <div className="relative w-full">
                <Listbox.Button className={`w-full rounded-lg border px-4 py-2 text-left text-base bg-white focus:outline-none focus:ring-2 focus:ring-[#0067b8] ${
                  errors.room ? 'border-red-400' : 'border-[#e5e7eb]'
                }`}>
                  <span className="block truncate">{classroom || 'Selecciona salón'}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </Listbox.Button>
                <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {classroomOptions.map((option) => (
                    <Listbox.Option
                      key={option}
                      value={option}
                      className={({ active }) =>
                        `cursor-pointer select-none px-4 py-2 ${
                          active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                        }`
                      }
                    >
                      {({ selected }) => (
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {option}
                          {selected && <CheckIcon className="ml-2 inline h-4 w-4 text-blue-600" />}
                        </span>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
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
                      ? 'bg-[#0067b8] text-white'
                      : 'bg-[#f0f9ff] text-[#005a9e] border border-[#e5e7eb] hover:bg-[#e0f2fe]'
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
              className="flex-1 rounded-lg bg-[#0067b8] py-2 text-base font-bold text-white shadow-sm hover:bg-[#005a9e] transition disabled:opacity-60"
            >
              {isLoading ? 'Guardando...' : 'Registrar'}
            </button>
            <button
              type="button"
              className="flex-1 rounded-lg bg-[#f0f9ff] py-2 text-base font-bold text-[#0067b8] shadow-sm hover:bg-[#e0f2fe] transition"
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
