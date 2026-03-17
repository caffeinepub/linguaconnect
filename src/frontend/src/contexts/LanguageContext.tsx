import { createContext, useContext, useState } from "react";

export const LANGUAGES = [
  { code: "FR", name: "Français" },
  { code: "EN", name: "English" },
  { code: "ES", name: "Español" },
  { code: "DE", name: "Deutsch" },
  { code: "JA", name: "日本語" },
  { code: "AR", name: "العربية" },
  { code: "ZH", name: "中文" },
  { code: "PT", name: "Português" },
];

interface LanguageContextValue {
  currentLang: string;
  setCurrentLang: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  currentLang: "FR",
  setCurrentLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLang, setCurrentLang] = useState("FR");
  return (
    <LanguageContext.Provider value={{ currentLang, setCurrentLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
