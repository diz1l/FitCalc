import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calculator, Flame, Zap, Target, AlertCircle, Scale, Ruler } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CalculationResult {
  bmr: number;
  tdee: number;
  targetCalories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export function CalorieCalculator() {
  const { t } = useLanguage();
  
  const activityLevels = [
    { value: "1.2", labelKey: "calc.activity.sedentary", descKey: "calc.activity.sedentary.desc" },
    { value: "1.375", labelKey: "calc.activity.light", descKey: "calc.activity.light.desc" },
    { value: "1.55", labelKey: "calc.activity.moderate", descKey: "calc.activity.moderate.desc" },
    { value: "1.725", labelKey: "calc.activity.high", descKey: "calc.activity.high.desc" },
    { value: "1.9", labelKey: "calc.activity.extreme", descKey: "calc.activity.extreme.desc" },
  ];

  const goals = [
    { value: "lose", labelKey: "calc.lose", modifier: -0.2 },
    { value: "maintain", labelKey: "calc.maintain", modifier: 0 },
    { value: "gain", labelKey: "calc.gain", modifier: 0.15 },
  ];

  const paces = [
    { value: "moderate", labelKey: "calc.moderate", modifier: 1 },
    { value: "aggressive", labelKey: "calc.aggressive", modifier: 1.5 },
  ];

  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("");
  const [goal, setGoal] = useState("");
  const [pace, setPace] = useState("moderate");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!age || parseInt(age) < 15 || parseInt(age) > 100) {
      newErrors.age = t("calc.error.age");
    }
    if (!height || parseFloat(height) < 100 || parseFloat(height) > 250) {
      newErrors.height = t("calc.error.height");
    }
    if (!weight || parseFloat(weight) < 30 || parseFloat(weight) > 300) {
      newErrors.weight = t("calc.error.weight");
    }
    if (!activity) {
      newErrors.activity = t("calc.error.activity");
    }
    if (!goal) {
      newErrors.goal = t("calc.error.goal");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculate = () => {
    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      let heightCm = parseFloat(height);
      let weightKg = parseFloat(weight);

      if (unit === "imperial") {
        heightCm = heightCm * 2.54;
        weightKg = weightKg * 0.453592;
      }

      let bmr: number;
      if (gender === "male") {
        bmr = 10 * weightKg + 6.25 * heightCm - 5 * parseInt(age) + 5;
      } else {
        bmr = 10 * weightKg + 6.25 * heightCm - 5 * parseInt(age) - 161;
      }

      const activityMultiplier = parseFloat(activity);
      const tdee = bmr * activityMultiplier;

      const goalObj = goals.find((g) => g.value === goal);
      const paceObj = paces.find((p) => p.value === pace);
      const calorieModifier = (goalObj?.modifier || 0) * (paceObj?.modifier || 1);
      const targetCalories = Math.round(tdee * (1 + calorieModifier));

      let proteinRatio: number, fatRatio: number, carbRatio: number;

      if (goal === "lose") {
        proteinRatio = 0.40;
        fatRatio = 0.30;
        carbRatio = 0.30;
      } else if (goal === "gain") {
        proteinRatio = 0.30;
        fatRatio = 0.25;
        carbRatio = 0.45;
      } else {
        proteinRatio = 0.30;
        fatRatio = 0.30;
        carbRatio = 0.40;
      }

      const protein = Math.round((targetCalories * proteinRatio) / 4);
      const fat = Math.round((targetCalories * fatRatio) / 9);
      const carbs = Math.round((targetCalories * carbRatio) / 4);

      setResult({
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        targetCalories,
        protein,
        fat,
        carbs,
      });
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Form */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-neon">
            <Calculator className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-['Space_Grotesk']">{t("calc.title")}</h1>
            <p className="text-muted-foreground">{t("calc.formula")}</p>
          </div>
        </div>

        <div className="fitness-card space-y-6">
          {/* Unit Toggle */}
          <div className="flex items-center justify-between p-1 bg-muted/50 rounded-xl border border-border/30">
            <button
              onClick={() => setUnit("metric")}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                unit === "metric"
                  ? "bg-primary text-primary-foreground shadow-neon"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              см / кг
            </button>
            <button
              onClick={() => setUnit("imperial")}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                unit === "imperial"
                  ? "bg-primary text-primary-foreground shadow-neon"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              ft / lb
            </button>
          </div>

          {/* Gender */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">{t("calc.gender")}</Label>
            <RadioGroup
              value={gender}
              onValueChange={(v) => setGender(v as "male" | "female")}
              className="flex gap-4"
            >
              <label
                className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  gender === "male"
                    ? "border-primary bg-primary/10 shadow-neon"
                    : "border-border hover:border-primary/30"
                }`}
              >
                <RadioGroupItem value="male" className="sr-only" />
                <span className="font-medium">{t("calc.male")}</span>
              </label>
              <label
                className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  gender === "female"
                    ? "border-primary bg-primary/10 shadow-neon"
                    : "border-border hover:border-primary/30"
                }`}
              >
                <RadioGroupItem value="female" className="sr-only" />
                <span className="font-medium">{t("calc.female")}</span>
              </label>
            </RadioGroup>
          </div>

          {/* Age, Height, Weight */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age" className="text-sm font-medium">
                {t("calc.age")}
              </Label>
              <Input
                id="age"
                type="number"
                placeholder="25"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="input-fitness"
              />
              {errors.age && (
                <p className="text-xs text-destructive">{errors.age}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="height" className="text-sm font-medium flex items-center gap-1">
                <Ruler className="w-3 h-3" />
                {t("calc.height")} {unit === "metric" ? "(см)" : "(in)"}
              </Label>
              <Input
                id="height"
                type="number"
                placeholder={unit === "metric" ? "175" : "69"}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="input-fitness"
              />
              {errors.height && (
                <p className="text-xs text-destructive">{errors.height}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight" className="text-sm font-medium flex items-center gap-1">
                <Scale className="w-3 h-3" />
                {t("calc.weight")} {unit === "metric" ? "(кг)" : "(lb)"}
              </Label>
              <Input
                id="weight"
                type="number"
                placeholder={unit === "metric" ? "70" : "154"}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="input-fitness"
              />
              {errors.weight && (
                <p className="text-xs text-destructive">{errors.weight}</p>
              )}
            </div>
          </div>

          {/* Activity Level */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">{t("calc.activity")}</Label>
            <Select value={activity} onValueChange={setActivity}>
              <SelectTrigger className="input-fitness">
                <SelectValue placeholder={t("calc.selectLevel")} />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {activityLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    <div>
                      <div className="font-medium">{t(level.labelKey)}</div>
                      <div className="text-xs text-muted-foreground">
                        {t(level.descKey)}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.activity && (
              <p className="text-xs text-destructive">{errors.activity}</p>
            )}
          </div>

          {/* Goal */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">{t("calc.goal")}</Label>
            <RadioGroup
              value={goal}
              onValueChange={setGoal}
              className="grid grid-cols-3 gap-3"
            >
              {goals.map((g) => (
                <label
                  key={g.value}
                  className={`flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all text-sm font-medium ${
                    goal === g.value
                      ? "border-primary bg-primary/10 shadow-neon"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <RadioGroupItem value={g.value} className="sr-only" />
                  {t(g.labelKey)}
                </label>
              ))}
            </RadioGroup>
            {errors.goal && (
              <p className="text-xs text-destructive">{errors.goal}</p>
            )}
          </div>

          {/* Pace */}
          {goal && goal !== "maintain" && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">{t("calc.pace")}</Label>
              <RadioGroup
                value={pace}
                onValueChange={setPace}
                className="flex gap-4"
              >
                {paces.map((p) => (
                  <label
                    key={p.value}
                    className={`flex-1 flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all text-sm font-medium ${
                      pace === p.value
                        ? "border-primary bg-primary/10 shadow-neon"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <RadioGroupItem value={p.value} className="sr-only" />
                    {t(p.labelKey)}
                  </label>
                ))}
              </RadioGroup>
            </div>
          )}

          <Button
            onClick={calculate}
            size="lg"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                {t("calc.calculating")}
              </div>
            ) : (
              <>
                <Calculator className="w-5 h-5" />
                {t("calc.calculate")}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold font-['Space_Grotesk']">{t("calc.results")}</h2>

        {result ? (
          <div className="space-y-4 animate-fade-in">
            {/* Main Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="stat-card">
                <div className="text-sm text-muted-foreground mb-1">
                  {t("calc.bmr")}
                </div>
                <div className="text-2xl font-bold font-['Space_Grotesk']">{result.bmr.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">{t("calc.kcalDay")}</div>
              </div>
              <div className="stat-card">
                <div className="text-sm text-muted-foreground mb-1">
                  {t("calc.tdee")}
                </div>
                <div className="text-2xl font-bold font-['Space_Grotesk']">{result.tdee.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">{t("calc.kcalDay")}</div>
              </div>
            </div>

            {/* Target Calories */}
            <div className="fitness-card gradient-primary text-primary-foreground border-glow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm opacity-80 mb-1">
                    {t("calc.recommended")}
                  </div>
                  <div className="text-4xl font-bold font-['Space_Grotesk']">
                    {result.targetCalories.toLocaleString()}
                  </div>
                  <div className="text-sm opacity-80">{t("calc.kcalDay")}</div>
                </div>
                <Flame className="w-16 h-16 opacity-30" />
              </div>
            </div>

            {/* Macros */}
            <div className="fitness-card">
              <h3 className="font-semibold mb-4 font-['Space_Grotesk']">{t("calc.macros")}</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-xl bg-destructive/10 border border-destructive/30">
                  <Zap className="w-6 h-6 text-destructive mx-auto mb-2" />
                  <div className="text-2xl font-bold font-['Space_Grotesk']">{result.protein}</div>
                  <div className="text-xs text-muted-foreground">{t("calc.protein")}, {t("calc.grams")}</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-warning/10 border border-warning/30">
                  <div className="w-6 h-6 text-warning mx-auto mb-2 font-bold">Ж</div>
                  <div className="text-2xl font-bold font-['Space_Grotesk']">{result.fat}</div>
                  <div className="text-xs text-muted-foreground">{t("calc.fat")}, {t("calc.grams")}</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-primary/10 border border-primary/30">
                  <Target className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold font-['Space_Grotesk']">{result.carbs}</div>
                  <div className="text-xs text-muted-foreground">{t("calc.carbs")}, {t("calc.grams")}</div>
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-warning/10 border border-warning/30 text-warning">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="text-sm">
                <strong>{t("common.attention")}:</strong> {t("calc.warning")}
              </div>
            </div>
          </div>
        ) : (
          <div className="fitness-card h-[400px] flex flex-col items-center justify-center text-center text-muted-foreground">
            <Calculator className="w-16 h-16 mb-4 opacity-30" />
            <p className="text-lg font-medium font-['Space_Grotesk']">{t("calc.fillForm")}</p>
            <p className="text-sm">
              {t("calc.resultsHere")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
