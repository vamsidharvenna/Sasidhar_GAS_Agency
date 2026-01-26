import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'tel' | 'textarea';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
}) => {
  const inputClasses =
    'w-full rounded-lg border border-[#d9d9d9] focus:border-[#004A99] focus:ring-2 focus:ring-[#004A99]/20 px-3 py-2 text-sm outline-none transition';

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-[#0f172a]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className={`${inputClasses} resize-none`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputClasses}
        />
      )}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
};
