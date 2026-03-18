import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages, Menu } from "lucide-react";
import { toast } from "sonner";
import { LANGUAGES, useLanguage } from "../contexts/LanguageContext";

interface AppHeaderProps {
  onNavigate?: (page: string) => void;
}

export function AppHeader({ onNavigate }: AppHeaderProps) {
  const { currentLang, setCurrentLang } = useLanguage();

  const handleTranslate = () => {
    toast.success("Traduction en cours…", {
      description: "Audio et vidéo en cours de traduction",
    });
  };

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
        {/* LEFT — Settings (hamburger) */}
        <button
          type="button"
          onClick={() => onNavigate?.("settings")}
          className="flex items-center justify-center w-9 h-9 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Paramètres"
          data-ocid="nav.open_modal_button"
        >
          <Menu size={20} />
        </button>

        {/* CENTER — Logo */}
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

        {/* RIGHT — Translation button + Language selector */}
        <div className="flex items-center gap-1">
          {/* Round translate button */}
          <button
            type="button"
            onClick={handleTranslate}
            className="flex items-center justify-center w-9 h-9 rounded-full transition-colors"
            style={{
              background: "rgba(61,111,224,0.18)",
              border: "1.5px solid rgba(61,111,224,0.45)",
              color: "#3D6FE0",
            }}
            aria-label="Traduire audio et vidéo"
            data-ocid="nav.translate_button"
          >
            <Languages size={17} />
          </button>

          {/* Language selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="px-2.5 py-1 rounded-full text-[11px] font-bold transition-all hover:opacity-80"
                style={{
                  background: "rgba(61,111,224,0.2)",
                  color: "#3D6FE0",
                  border: "1px solid rgba(61,111,224,0.3)",
                }}
                aria-label="Choisir la langue"
                data-ocid="nav.language_selector"
              >
                {currentLang}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-36"
              style={{
                background: "#1F2F45",
                border: "1px solid rgba(61,111,224,0.25)",
              }}
            >
              {LANGUAGES.map((l) => (
                <DropdownMenuItem
                  key={l.code}
                  onClick={() => {
                    setCurrentLang(l.code);
                    toast.success(`Langue : ${l.name}`);
                  }}
                  className="flex justify-between cursor-pointer"
                  style={{
                    color:
                      currentLang === l.code
                        ? "#3D6FE0"
                        : "rgba(255,255,255,0.75)",
                    fontWeight: currentLang === l.code ? 700 : 400,
                  }}
                  data-ocid="nav.language_option"
                >
                  <span>{l.name}</span>
                  <span className="text-[10px] opacity-60">{l.code}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
