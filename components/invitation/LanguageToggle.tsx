"use client";

import { Translate } from "@phosphor-icons/react";

interface LanguageToggleProps {
  languages: string[];
  activeLanguage: string;
  onChangeLanguage: (lang: string) => void;
}

export function LanguageToggle({ languages, activeLanguage, onChangeLanguage }: LanguageToggleProps) {
  if (!languages || languages.length <= 1) return null;

  const languageLabels: Record<string, string> = {
    en: "English",
    hi: "हिन्दी",
    te: "తెలుగు",
    ta: "தமிழ்",
    mr: "मराठी",
  };

  return (
    <div className="fixed top-6 right-6 z-40 flex items-center gap-1 bg-white/80 dark:bg-black/80 backdrop-blur-md p-1 rounded-full border border-black/5 dark:border-white/10 shadow-lg select-none">
      <div className="flex h-7 w-7 items-center justify-center rounded-full text-stone-500 dark:text-stone-400 pl-1">
        <Translate className="h-4 w-4" weight="light" />
      </div>
      <div className="flex gap-0.5">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => onChangeLanguage(lang)}
            className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all ${
              activeLanguage === lang
                ? "bg-[#082F27] text-white dark:bg-amber-500 dark:text-black shadow-sm"
                : "text-stone-600 dark:text-stone-400 hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            {languageLabels[lang] || lang}
          </button>
        ))}
      </div>
    </div>
  );
}
