import { Globe, Home, MessageCircle, Mic, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";

interface NavItem {
  icon: LucideIcon;
  label: string;
  center?: boolean;
}

const items: NavItem[] = [
  { icon: Home, label: "Accueil" },
  { icon: Globe, label: "Explorer" },
  { icon: Mic, label: "Enregistrer", center: true },
  { icon: MessageCircle, label: "Messages" },
  { icon: User, label: "Profil" },
];

export function BottomNav() {
  const [active, setActive] = useState(0);

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
      {items.map((item, idx) => {
        const Icon = item.icon;
        const isActive = active === idx;
        if (item.center) {
          return (
            <button
              type="button"
              key={item.label}
              onClick={() => setActive(idx)}
              className="flex items-center justify-center w-14 h-14 rounded-full transition-transform active:scale-95"
              style={{
                background: "#3D6FE0",
                boxShadow:
                  "0 0 0 4px rgba(61,111,224,0.25), 0 4px 16px rgba(61,111,224,0.4)",
              }}
              data-ocid="nav.button"
            >
              <Icon size={24} className="text-white" />
            </button>
          );
        }
        return (
          <button
            type="button"
            key={item.label}
            onClick={() => setActive(idx)}
            className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors"
            style={{ color: isActive ? "#3D6FE0" : "rgba(255,255,255,0.45)" }}
            data-ocid="nav.link"
          >
            <Icon size={20} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
