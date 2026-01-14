import { useLanguage } from "../../contexts/LanguageContext";
import type { Language } from "../../contexts/LanguageContext";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
const languages: { code: Language; label: string; flag: string }[] = [
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "cs", label: "Čeština", flag: "🇨🇿" },
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const currentLang = languages.find((l) => l.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/50 border border-border/50 hover:bg-muted hover:border-primary/30 transition-all duration-200">
        <Globe className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium">{currentLang?.flag}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card border-border/50">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`flex items-center gap-2 cursor-pointer ${
              language === lang.code ? "text-primary" : ""
            }`}
          >
            <span>{lang.flag}</span>
            <span>{lang.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
