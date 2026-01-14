import { Calculator, Dumbbell, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function FeaturesSection() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Calculator,
      titleKey: "features.formula.title",
      descKey: "features.formula.desc",
    },
    {
      icon: Dumbbell,
      titleKey: "features.workouts.title",
      descKey: "features.workouts.desc",
    },
    {
      icon: TrendingUp,
      titleKey: "features.tracking.title",
      descKey: "features.tracking.desc",
    },
  ];

  return (
    <section className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent pointer-events-none" />
      
      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-['Space_Grotesk']">
            {t("features.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("features.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.titleKey}
              className="fitness-card group relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-6 group-hover:shadow-neon transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 font-['Space_Grotesk']">{t(feature.titleKey)}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t(feature.descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
