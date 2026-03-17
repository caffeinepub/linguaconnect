import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { LANGUAGES, useLanguage } from "../contexts/LanguageContext";

interface ToggleRowProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  ocid: string;
}

function ToggleRow({ id, label, checked, onChange, ocid }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <Label
        htmlFor={id}
        className="text-sm cursor-pointer"
        style={{ color: "rgba(255,255,255,0.8)" }}
      >
        {label}
      </Label>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        data-ocid={ocid}
      />
    </div>
  );
}

export function SettingsPage() {
  const { currentLang, setCurrentLang } = useLanguage();
  const [autoTranslate, setAutoTranslate] = useState(true);
  const [notifLikes, setNotifLikes] = useState(true);
  const [notifComments, setNotifComments] = useState(true);
  const [notifAudio, setNotifAudio] = useState(true);

  const sectionStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
  };

  return (
    <div
      className="flex flex-col flex-1 overflow-y-auto px-4 py-4 gap-4"
      style={{ background: "#0F1C2B" }}
      data-ocid="settings.section"
    >
      <h1 className="text-lg font-bold text-white">Paramètres</h1>

      {/* Language */}
      <section className="rounded-2xl p-4" style={sectionStyle}>
        <h2
          className="text-xs font-bold mb-3"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          LANGUE PRINCIPALE
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => setCurrentLang(l.code)}
              className="py-2 rounded-xl text-sm font-bold transition-all"
              style={{
                background:
                  currentLang === l.code ? "#3D6FE0" : "rgba(255,255,255,0.08)",
                color:
                  currentLang === l.code ? "white" : "rgba(255,255,255,0.6)",
              }}
              data-ocid="settings.toggle"
            >
              {l.code}
            </button>
          ))}
        </div>
      </section>

      {/* Translation */}
      <section className="rounded-2xl p-4" style={sectionStyle}>
        <h2
          className="text-xs font-bold mb-2"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          TRADUCTION
        </h2>
        <ToggleRow
          id="auto-translate"
          label="Traduction automatique"
          checked={autoTranslate}
          onChange={setAutoTranslate}
          ocid="settings.switch"
        />
      </section>

      {/* Notifications */}
      <section className="rounded-2xl p-4" style={sectionStyle}>
        <h2
          className="text-xs font-bold mb-2"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          NOTIFICATIONS
        </h2>
        <div
          className="divide-y"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          <ToggleRow
            id="notif-likes"
            label="Likes"
            checked={notifLikes}
            onChange={setNotifLikes}
            ocid="settings.switch"
          />
          <ToggleRow
            id="notif-comments"
            label="Commentaires"
            checked={notifComments}
            onChange={setNotifComments}
            ocid="settings.switch"
          />
          <ToggleRow
            id="notif-audio"
            label="Réponses audio"
            checked={notifAudio}
            onChange={setNotifAudio}
            ocid="settings.switch"
          />
        </div>
      </section>

      {/* Account */}
      <section className="rounded-2xl p-4" style={sectionStyle}>
        <h2
          className="text-xs font-bold mb-3"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          COMPTE
        </h2>
        <div className="mb-3">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            Nom d'utilisateur
          </p>
          <p className="text-sm font-semibold text-white">@marie_d</p>
        </div>
        <button
          type="button"
          onClick={() => toast.success("Déconnexion réussie")}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
          style={{
            background: "rgba(239,68,68,0.15)",
            color: "#ef4444",
            border: "1px solid rgba(239,68,68,0.25)",
          }}
          data-ocid="settings.delete_button"
        >
          <LogOut size={16} />
          Se déconnecter
        </button>
      </section>
    </div>
  );
}
