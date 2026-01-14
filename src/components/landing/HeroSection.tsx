import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] gradient-glow animate-pulse-soft" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,hsl(142_70%_45%/0.1)_0%,transparent_50%)]" />
        <div className="neon-line absolute top-1/2 left-0 w-full opacity-30" />
      </div>

      <div className="container relative py-24 md:py-36">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-slide-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium shadow-neon">
            <Sparkles className="w-4 h-4" />
            <span>{t("hero.badge")}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-balance leading-tight font-['Space_Grotesk']">
            {t("hero.title")}{" "}
            <span className="bg-clip-text text-transparent gradient-primary text-glow">
              {t("hero.titleHighlight")}
            </span>{" "}
            {t("hero.titleEnd")}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            {t("hero.subtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button asChild variant="hero" size="xl">
              <Link to="/calculator">
                {t("hero.cta")}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/workouts">
                {t("hero.secondary")}
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 md:gap-16 pt-12 text-sm text-muted-foreground">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground font-['Space_Grotesk']">50K+</div>
              <div className="text-muted-foreground">{t("hero.users")}</div>
            </div>
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground font-['Space_Grotesk']">200+</div>
              <div className="text-muted-foreground">{t("hero.exercises")}</div>
            </div>
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground font-['Space_Grotesk']">4.9★</div>
              <div className="text-muted-foreground">{t("hero.rating")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
