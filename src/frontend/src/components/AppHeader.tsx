import { Bell, Menu, User } from "lucide-react";

export function AppHeader() {
  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: "linear-gradient(135deg, #1F2F45 0%, #0F1C2B 100%)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.4)",
      }}
      data-ocid="app.section"
    >
      <div className="flex items-center justify-between px-4 py-3">
        <button
          type="button"
          className="flex items-center justify-center w-9 h-9 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          data-ocid="nav.open_modal_button"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center select-none">
          <span className="text-xl font-bold text-white tracking-tight">
            Lingua
          </span>
          <span
            className="text-xl font-bold italic"
            style={{ color: "#3D6FE0" }}
          >
            Connect
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className="relative flex items-center justify-center w-9 h-9 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            data-ocid="nav.button"
          >
            <Bell size={18} />
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
              style={{ background: "#3D6FE0" }}
            />
          </button>
          <button
            type="button"
            className="flex items-center justify-center w-9 h-9 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            data-ocid="nav.button"
          >
            <User size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
