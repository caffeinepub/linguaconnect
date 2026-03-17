import { Globe, Home, Mic, Plus, User, Users } from "lucide-react";

interface BottomNavProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export function BottomNav({ activePage, onNavigate }: BottomNavProps) {
  const isActive = (p: string) => activePage === p;

  const NavBtn = ({
    page,
    icon: Icon,
    label,
  }: { page: string; icon: React.ElementType; label: string }) => (
    <button
      type="button"
      onClick={() => onNavigate(page)}
      className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors"
      style={{ color: isActive(page) ? "#3D6FE0" : "rgba(255,255,255,0.45)" }}
      data-ocid="nav.link"
    >
      <Icon size={20} />
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );

  return (
    <nav
      className="sticky bottom-0 z-50 w-full flex items-center justify-around py-2 px-2"
      style={{
        background: "linear-gradient(180deg, #0F1C2B 0%, #1F2F45 100%)",
        borderTop: "1px solid rgba(61,111,224,0.2)",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.4)",
      }}
      data-ocid="nav.section"
    >
      <NavBtn page="feed" icon={Home} label="Accueil" />
      <NavBtn page="explorer" icon={Globe} label="Explorer" />

      {/* Center dual buttons */}
      <div className="flex items-center gap-2">
        {/* + Video button */}
        <button
          type="button"
          onClick={() => onNavigate("video")}
          className="flex items-center justify-center w-11 h-11 rounded-xl transition-transform active:scale-95"
          style={{
            background: "#1F2F45",
            border: "2px solid #3D6FE0",
            boxShadow: "0 4px 12px rgba(61,111,224,0.3)",
          }}
          data-ocid="nav.button"
        >
          <Plus size={20} className="text-white" />
        </button>

        {/* Mic Audio button */}
        <button
          type="button"
          onClick={() => onNavigate("create")}
          className="flex items-center justify-center w-13 h-13 rounded-full transition-transform active:scale-95"
          style={{
            background: "#3D6FE0",
            width: 52,
            height: 52,
            boxShadow:
              "0 0 0 4px rgba(61,111,224,0.25), 0 4px 16px rgba(61,111,224,0.4)",
          }}
          data-ocid="nav.button"
        >
          <Mic size={22} className="text-white" />
        </button>
      </div>

      <NavBtn page="amis" icon={Users} label="Amis" />
      <NavBtn page="profile" icon={User} label="Profil" />
    </nav>
  );
}
