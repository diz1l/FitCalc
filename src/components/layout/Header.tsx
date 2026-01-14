import { Link, useLocation } from "react-router-dom";
import { Activity, Calculator, Dumbbell } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { to: "/", label: t("nav.home"), icon: Activity },
    { to: "/calculator", label: t("nav.calculator"), icon: Calculator },
    { to: "/workouts", label: t("nav.workouts"), icon: Dumbbell },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-card border-b border-border/30">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-neon group-hover:animate-glow transition-all duration-300">
            <Activity className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg tracking-tight font-['Space_Grotesk']">FitCalc</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <LanguageSwitcher />
      </div>
    </header>
  );
}
