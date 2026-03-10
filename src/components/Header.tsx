import { LogoutIcon } from './icons';

interface HeaderProps {
  username: string;
  onLogout: () => void;
}

export default function Header({ username, onLogout }: HeaderProps) {
  return (
    <header className="bg-primary px-6 py-5 flex items-center justify-between sticky top-0 z-40">
      <h1 className="text-white font-bold text-xl">CodeLeap Network</h1>

      <div className="flex items-center gap-3">
        <span className="text-white/80 text-sm hidden sm:block">@{username}</span>
        <button
          onClick={onLogout}
          aria-label="Logout"
          title="Logout"
          className="text-white/80 hover:text-white transition-colors"
        >
          <LogoutIcon />
        </button>
      </div>
    </header>
  );
}
