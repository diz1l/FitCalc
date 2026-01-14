import { Link, useLocation } from "react-router-dom";
import { Activity, Calculator, Dumbbell } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

export function MobileNav() {
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { to: "/", label: t("nav.home"), icon: Activity },
    { to: "/calculator", label: t("nav.calculator"), icon: Calculator },
    { to: "/workouts", label: t("nav.workouts"), icon: Dumbbell },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass-card border-t border-border/30">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 min-w-[60px]",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive && "scale-110 drop-shadow-[0_0_8px_hsl(142,70%,45%)]")} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
