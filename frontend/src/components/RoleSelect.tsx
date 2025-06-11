import { Listbox } from '@headlessui/react';
import { FaCheck, FaChevronDown } from "react-icons/fa";

const roles = [
  { value: 'student', label: 'Студент' },
  { value: 'company', label: 'Компания' },
  { value: 'career_center', label: 'Центр карьеры' },
  { value: 'admin', label: 'Админ' },
];

export default function RoleSelect({ value, onChange }: {
  value: string,
  onChange: (val: string) => void
}) {
  const selectedRole = roles.find(r => r.value === value) || roles[0];

  return (
    <div className="w-full">
      <Listbox value={selectedRole} onChange={(role) => onChange(role.value)}>
        <div className="relative">
          <Listbox.Button
            className="w-full px-4 py-2 bg-white text-black text-left rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
          >
            {selectedRole.label}
            <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black" />
          </Listbox.Button>

          <Listbox.Options
            className="absolute z-10 mt-2 w-full rounded-xl bg-white text-black shadow-lg max-h-60 overflow-auto focus:outline-none border border-gray-300"
          >
            {roles.map((role, index) => (
              <Listbox.Option
                key={role.value}
                value={role}
                className={({ active }) =>
                  `cursor-pointer select-none px-4 py-2 
                  ${active ? 'bg-red-100' : ''}
                  ${index !== roles.length - 1 ? 'border-b border-gray-200' : ''}`
                }
              >
                {({ selected }) => (
                  <div className="flex items-center justify-between">
                    <span>{role.label}</span>
                    {selected && <FaCheck className="w-4 h-4 text-green-600" />}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
