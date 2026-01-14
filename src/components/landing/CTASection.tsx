import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function CTASection() {
  const { t } = useLanguage();

  const benefits = [
    t("cta.benefit1"),
    t("cta.benefit2"),
    t("cta.benefit3"),
    t("cta.benefit4"),
  ];

  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl gradient-primary p-8 md:p-16 border-glow">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-background/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-background/5 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-2xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground tracking-tight font-['Space_Grotesk']">
              {t("cta.title")}
            </h2>
            <p className="text-lg text-primary-foreground/80">
              {t("cta.subtitle")}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/10 text-primary-foreground text-sm backdrop-blur-sm"
                >
                  <CheckCircle className="w-4 h-4" />
                  {benefit}
                </div>
              ))}
            </div>

            <Button
              asChild
              size="xl"
              className="bg-background text-foreground hover:bg-background/90 shadow-xl"
            >
              <Link to="/calculator">
                {t("cta.start")}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
