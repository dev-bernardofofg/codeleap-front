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
          className="text-white/80 hover:text-white transition"
          title="Logout"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </div>
    </header>
  );
}
