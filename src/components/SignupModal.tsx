import { useState, type FormEvent } from 'react';
import Modal from './Modal';

interface SignupModalProps {
  onLogin: (username: string) => void;
}

export default function SignupModal({ onLogin }: SignupModalProps) {
  const [username, setUsername] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (username.trim()) onLogin(username.trim());
  }

  return (
    <div className="min-h-screen bg-app-bg flex items-center justify-center">
      <Modal>
        <h2 className="text-xl font-bold mb-6">Welcome to CodeLeap network!</h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm mb-1">Please enter your username</label>
          <input
            type="text"
            placeholder="John doe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition mb-6"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!username.trim()}
              className="px-6 py-2 rounded-lg text-white text-sm font-semibold transition
                bg-primary hover:bg-blue-500
                disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              ENTER
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
