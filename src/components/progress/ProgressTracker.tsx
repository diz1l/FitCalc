import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  TrendingUp,
  Scale,
  Flame,
  Dumbbell,
  Plus,
  Calendar,
  CheckCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useLanguage } from "./../../contexts/LanguageContext";

const mockWeightData = [
  { date: "01.01", weight: 75 },
  { date: "08.01", weight: 74.5 },
  { date: "15.01", weight: 74.2 },
  { date: "22.01", weight: 73.8 },
  { date: "29.01", weight: 73.5 },
  { date: "05.02", weight: 73.2 },
  { date: "12.02", weight: 72.8 },
];

const mockCaloriesData = [
  { date: "Mon", calories: 1850, target: 1900 },
  { date: "Tue", calories: 1920, target: 1900 },
  { date: "Wed", calories: 1780, target: 1900 },
  { date: "Thu", calories: 1900, target: 1900 },
  { date: "Fri", calories: 2100, target: 1900 },
  { date: "Sat", calories: 1950, target: 1900 },
  { date: "Sun", calories: 1820, target: 1900 },
];

const streakDays = [
  { day: 1, completed: true },
  { day: 2, completed: true },
  { day: 3, completed: true },
  { day: 4, completed: true },
  { day: 5, completed: true },
  { day: 6, completed: false },
  { day: 7, completed: false },
];

export function ProgressTracker() {
  const { t } = useLanguage();
  const [weight, setWeight] = useState("");
  const [calories, setCalories] = useState("");
  const [workoutDone, setWorkoutDone] = useState(false);

  const currentStreak = streakDays.filter((d) => d.completed).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-warning/10 border border-warning/30 flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-warning" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-['Space_Grotesk']">{t("progress.title")}</h1>
          <p className="text-muted-foreground">{t("progress.subtitle")}</p>
        </div>
      </div>

      {/* Quick Add */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="fitness-card">
          <div className="flex items-center gap-2 mb-4">
            <Scale className="w-5 h-5 text-primary" />
            <span className="font-medium">{t("progress.todayWeight")}</span>
          </div>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="72.5"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="input-fitness"
            />
            <Button size="icon" disabled={!weight}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="fitness-card">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-5 h-5 text-destructive" />
            <span className="font-medium">{t("progress.caloriesEaten")}</span>
          </div>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="1850"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="input-fitness"
            />
            <Button size="icon" disabled={!calories}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="fitness-card">
          <div className="flex items-center gap-2 mb-4">
            <Dumbbell className="w-5 h-5 text-primary" />
            <span className="font-medium">{t("progress.workout")}</span>
          </div>
          <Button
            className={`w-full ${workoutDone ? "gradient-primary shadow-neon" : ""}`}
            variant={workoutDone ? "default" : "outline"}
            onClick={() => setWorkoutDone(!workoutDone)}
          >
            {workoutDone ? (
              <>
                <CheckCircle className="w-4 h-4" />
                {t("progress.done")}
              </>
            ) : (
              t("progress.markDone")
            )}
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="text-sm text-muted-foreground mb-1">{t("progress.currentWeight")}</div>
          <div className="text-3xl font-bold font-['Space_Grotesk']">72.8 kg</div>
          <div className="text-sm text-primary">-2.2 kg {t("progress.perMonth")}</div>
        </div>
        <div className="stat-card">
          <div className="text-sm text-muted-foreground mb-1">{t("progress.avgCalories")}</div>
          <div className="text-3xl font-bold font-['Space_Grotesk']">1,903</div>
          <div className="text-sm text-muted-foreground">{t("calc.kcalDay")}</div>
        </div>
        <div className="stat-card">
          <div className="text-sm text-muted-foreground mb-1">{t("progress.workoutsCount")}</div>
          <div className="text-3xl font-bold font-['Space_Grotesk']">12</div>
          <div className="text-sm text-muted-foreground">{t("progress.thisMonth")}</div>
        </div>
        <div className="stat-card">
          <div className="text-sm text-muted-foreground mb-1">{t("progress.streak")}</div>
          <div className="text-3xl font-bold font-['Space_Grotesk']">{currentStreak} {t("progress.days")}</div>
          <div className="text-sm text-primary">🔥 {t("progress.keepGoing")}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weight Chart */}
        <div className="fitness-card">
          <h3 className="font-semibold mb-6 font-['Space_Grotesk']">{t("progress.weightChart")}</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockWeightData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  domain={["dataMin - 1", "dataMax + 1"]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Calories Chart */}
        <div className="fitness-card">
          <h3 className="font-semibold mb-6 font-['Space_Grotesk']">{t("progress.caloriesChart")}</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockCaloriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  domain={[1500, 2200]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="calories"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--destructive))", strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Streak Calendar */}
      <div className="fitness-card">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="w-5 h-5 text-primary" />
          <h3 className="font-semibold font-['Space_Grotesk']">{t("progress.streakCalendar")}</h3>
        </div>
        <div className="flex items-center justify-center gap-3">
          {streakDays.map((day) => (
            <div
              key={day.day}
              className={`w-12 h-12 rounded-xl flex items-center justify-center font-semibold transition-all ${
                day.completed
                  ? "gradient-primary text-primary-foreground shadow-neon"
                  : "bg-muted text-muted-foreground border border-border"
              }`}
            >
              {day.completed ? <CheckCircle className="w-5 h-5" /> : day.day}
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-4">
          {t("progress.currentStreak")}: <span className="font-semibold text-foreground">{currentStreak} {t("progress.days")}</span> {t("progress.inARow")}
        </p>
      </div>
    </div>
  );
}
