import type { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
}

export default function Modal({ children }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-[660px] mx-4 shadow-2xl">
        {children}
      </div>
    </div>
  );
}
