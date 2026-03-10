import type { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  children: ReactNode;
}

export default function FormField({ label, children }: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      {children}
    </div>
  );
}
