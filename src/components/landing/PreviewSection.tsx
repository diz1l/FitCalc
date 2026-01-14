import { ArrowRight, Flame, Zap, Target, Calculator, Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export function PreviewSection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Calculator Preview */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium">
              <Calculator className="w-4 h-4" />
              {t("preview.calculator")}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-['Space_Grotesk']">
              {t("preview.calcTitle")}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t("preview.calcDesc")}
            </p>

            {/* Mock Calculator Card */}
            <div className="fitness-card space-y-4 border-glow">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t("preview.yourGoal")}</span>
                <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium">
                  {t("calc.lose")}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="stat-card text-center">
                  <Flame className="w-5 h-5 text-destructive mx-auto mb-2" />
                  <div className="text-2xl font-bold font-['Space_Grotesk']">1,850</div>
                  <div className="text-xs text-muted-foreground">{t("calc.kcalDay")}</div>
                </div>
                <div className="stat-card text-center">
                  <Zap className="w-5 h-5 text-warning mx-auto mb-2" />
                  <div className="text-2xl font-bold font-['Space_Grotesk']">140</div>
                  <div className="text-xs text-muted-foreground">{t("calc.protein")}, {t("calc.grams")}</div>
                </div>
                <div className="stat-card text-center">
                  <Target className="w-5 h-5 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold font-['Space_Grotesk']">185</div>
                  <div className="text-xs text-muted-foreground">{t("calc.carbs")}, {t("calc.grams")}</div>
                </div>
              </div>
            </div>

            <Button asChild variant="soft" className="group">
              <Link to="/calculator">
                {t("preview.calcNorm")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Workout Preview */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent border border-primary/30 text-accent-foreground text-sm font-medium">
              <Dumbbell className="w-4 h-4" />
              {t("preview.workoutPlan")}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-['Space_Grotesk']">
              {t("preview.workoutTitle")}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t("preview.workoutDesc")}
            </p>

            {/* Mock Workout Card */}
            <div className="fitness-card space-y-4 border-glow">
              <div className="flex items-center justify-between">
                <span className="font-semibold font-['Space_Grotesk']">{t("preview.day1")}</span>
                <span className="text-sm text-muted-foreground">45 {t("workout.min")}</span>
              </div>
              <div className="space-y-3">
                {[
                  { name: t("exercise.pushups"), sets: "4×12" },
                  { name: t("exercise.pullups"), sets: "4×8" },
                  { name: t("exercise.shoulderPress"), sets: "3×10" },
                ].map((exercise) => (
                  <div
                    key={exercise.name}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-border/30"
                  >
                    <span className="font-medium">{exercise.name}</span>
                    <span className="text-sm text-muted-foreground font-mono">{exercise.sets}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button asChild variant="soft" className="group">
              <Link to="/workouts">
                {t("preview.createPlan")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
