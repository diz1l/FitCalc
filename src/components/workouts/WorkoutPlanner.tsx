import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Dumbbell, Home, Building, Play, RefreshCw, Check, Timer, Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Exercise {
  nameKey: string;
  musclesKey: string;
  sets: number;
  reps: string;
  rest: string;
}

interface WorkoutDay {
  dayKey: string;
  titleKey: string;
  duration: string;
  exercises: Exercise[];
}

type BodyType = "ectomorph" | "mesomorph" | "endomorph";

// Workout plans based on body types (ACSM & NSCA guidelines)
const workoutPlansByBodyType: Record<BodyType, Record<string, WorkoutDay[]>> = {
  // Ectomorph: focus on compound movements, lower volume, longer rest
  ectomorph: {
    beginner: [
      {
        dayKey: "day.monday",
        titleKey: "workout.fullBody",
        duration: "45",
        exercises: [
          { nameKey: "exercise.squats", musclesKey: "muscle.quads", sets: 3, reps: "8-10", rest: "120" },
          { nameKey: "exercise.dumbbellBenchPress", musclesKey: "muscle.chest", sets: 3, reps: "8-10", rest: "120" },
          { nameKey: "exercise.dumbbellRow", musclesKey: "muscle.back", sets: 3, reps: "8-10", rest: "90" },
          { nameKey: "exercise.shoulderPress", musclesKey: "muscle.shoulders", sets: 3, reps: "8-10", rest: "90" },
        ],
      },
      {
        dayKey: "day.wednesday",
        titleKey: "workout.fullBody",
        duration: "45",
        exercises: [
          { nameKey: "exercise.romanianDeadlift", musclesKey: "muscle.hamstrings", sets: 3, reps: "8-10", rest: "120" },
          { nameKey: "exercise.inclineDumbbellPress", musclesKey: "muscle.chest", sets: 3, reps: "8-10", rest: "90" },
          { nameKey: "exercise.latPulldown", musclesKey: "muscle.back", sets: 3, reps: "8-10", rest: "90" },
          { nameKey: "exercise.lateralRaises", musclesKey: "muscle.shoulders", sets: 3, reps: "10-12", rest: "60" },
        ],
      },
      {
        dayKey: "day.friday",
        titleKey: "workout.fullBody",
        duration: "45",
        exercises: [
          { nameKey: "exercise.legPress", musclesKey: "muscle.legs", sets: 3, reps: "10-12", rest: "120" },
          { nameKey: "exercise.cableFlyes", musclesKey: "muscle.chest", sets: 3, reps: "10-12", rest: "60" },
          { nameKey: "exercise.seatedRow", musclesKey: "muscle.back", sets: 3, reps: "10-12", rest: "90" },
          { nameKey: "exercise.facePulls", musclesKey: "muscle.rearDelts", sets: 3, reps: "12-15", rest: "60" },
        ],
      },
    ],
    intermediate: [
      {
        dayKey: "day.monday",
        titleKey: "workout.upperBody",
        duration: "50",
        exercises: [
          { nameKey: "exercise.benchPress", musclesKey: "muscle.chest", sets: 4, reps: "6-8", rest: "150" },
          { nameKey: "exercise.barbellRow", musclesKey: "muscle.back", sets: 4, reps: "6-8", rest: "120" },
          { nameKey: "exercise.overheadPress", musclesKey: "muscle.shoulders", sets: 3, reps: "8-10", rest: "120" },
          { nameKey: "exercise.pullups", musclesKey: "muscle.back", sets: 3, reps: "6-10", rest: "120" },
          { nameKey: "exercise.dips", musclesKey: "muscle.triceps", sets: 3, reps: "8-10", rest: "90" },
        ],
      },
      {
        dayKey: "day.tuesday",
        titleKey: "workout.lowerBody",
        duration: "55",
        exercises: [
          { nameKey: "exercise.squats", musclesKey: "muscle.quads", sets: 4, reps: "6-8", rest: "180" },
          { nameKey: "exercise.romanianDeadlift", musclesKey: "muscle.hamstrings", sets: 4, reps: "8-10", rest: "120" },
          { nameKey: "exercise.legPress", musclesKey: "muscle.legs", sets: 3, reps: "10-12", rest: "120" },
          { nameKey: "exercise.legCurl", musclesKey: "muscle.hamstrings", sets: 3, reps: "10-12", rest: "90" },
          { nameKey: "exercise.calfRaises", musclesKey: "muscle.calves", sets: 4, reps: "12-15", rest: "60" },
        ],
      },
      {
        dayKey: "day.thursday",
        titleKey: "workout.upperBody",
        duration: "50",
        exercises: [
          { nameKey: "exercise.inclineBenchPress", musclesKey: "muscle.chest", sets: 4, reps: "8-10", rest: "120" },
          { nameKey: "exercise.tBarRow", musclesKey: "muscle.back", sets: 4, reps: "8-10", rest: "120" },
          { nameKey: "exercise.arnoldPress", musclesKey: "muscle.shoulders", sets: 3, reps: "10-12", rest: "90" },
          { nameKey: "exercise.bicepCurls", musclesKey: "muscle.biceps", sets: 3, reps: "10-12", rest: "60" },
          { nameKey: "exercise.tricepPushdown", musclesKey: "muscle.triceps", sets: 3, reps: "10-12", rest: "60" },
        ],
      },
      {
        dayKey: "day.friday",
        titleKey: "workout.lowerBody",
        duration: "55",
        exercises: [
          { nameKey: "exercise.frontSquats", musclesKey: "muscle.quads", sets: 4, reps: "8-10", rest: "150" },
          { nameKey: "exercise.hipThrust", musclesKey: "muscle.glutes", sets: 4, reps: "10-12", rest: "90" },
          { nameKey: "exercise.walkingLunges", musclesKey: "muscle.legs", sets: 3, reps: "12", rest: "90" },
          { nameKey: "exercise.legExtension", musclesKey: "muscle.quads", sets: 3, reps: "12-15", rest: "60" },
          { nameKey: "exercise.seatedCalfRaise", musclesKey: "muscle.calves", sets: 3, reps: "15-20", rest: "45" },
        ],
      },
    ],
    advanced: [
      {
        dayKey: "day.monday",
        titleKey: "workout.chestTriceps",
        duration: "60",
        exercises: [
          { nameKey: "exercise.benchPress", musclesKey: "muscle.chest", sets: 5, reps: "5-6", rest: "180" },
          { nameKey: "exercise.inclineDumbbellPress", musclesKey: "muscle.chest", sets: 4, reps: "8-10", rest: "120" },
          { nameKey: "exercise.cableFlyes", musclesKey: "muscle.chest", sets: 3, reps: "10-12", rest: "90" },
          { nameKey: "exercise.closeGripBench", musclesKey: "muscle.triceps", sets: 4, reps: "8-10", rest: "90" },
          { nameKey: "exercise.overheadTricepExtension", musclesKey: "muscle.triceps", sets: 3, reps: "10-12", rest: "60" },
        ],
      },
      {
        dayKey: "day.tuesday",
        titleKey: "workout.backBiceps",
        duration: "60",
        exercises: [
          { nameKey: "exercise.deadlift", musclesKey: "muscle.back", sets: 5, reps: "5", rest: "180" },
          { nameKey: "exercise.weightedPullups", musclesKey: "muscle.back", sets: 4, reps: "6-8", rest: "150" },
          { nameKey: "exercise.barbellRow", musclesKey: "muscle.back", sets: 4, reps: "8-10", rest: "120" },
          { nameKey: "exercise.hammerCurls", musclesKey: "muscle.biceps", sets: 3, reps: "10-12", rest: "60" },
          { nameKey: "exercise.preacherCurl", musclesKey: "muscle.biceps", sets: 3, reps: "10-12", rest: "60" },
        ],
      },
      {
        dayKey: "day.thursday",
        titleKey: "workout.legs",
        duration: "65",
        exercises: [
          { nameKey: "exercise.squats", musclesKey: "muscle.quads", sets: 5, reps: "5-6", rest: "180" },
          { nameKey: "exercise.romanianDeadlift", musclesKey: "muscle.hamstrings", sets: 4, reps: "8-10", rest: "120" },
          { nameKey: "exercise.hackSquat", musclesKey: "muscle.quads", sets: 4, reps: "10-12", rest: "120" },
          { nameKey: "exercise.lyingLegCurl", musclesKey: "muscle.hamstrings", sets: 3, reps: "10-12", rest: "90" },
          { nameKey: "exercise.standingCalfRaise", musclesKey: "muscle.calves", sets: 4, reps: "12-15", rest: "60" },
        ],
      },
      {
        dayKey: "day.friday",
        titleKey: "workout.shoulders",
        duration: "55",
        exercises: [
          { nameKey: "exercise.overheadPress", musclesKey: "muscle.shoulders", sets: 4, reps: "6-8", rest: "150" },
          { nameKey: "exercise.arnoldPress", musclesKey: "muscle.shoulders", sets: 4, reps: "8-10", rest: "120" },
          { nameKey: "exercise.lateralRaises", musclesKey: "muscle.shoulders", sets: 4, reps: "12-15", rest: "60" },
          { nameKey: "exercise.rearDeltFlyes", musclesKey: "muscle.rearDelts", sets: 3, reps: "12-15", rest: "60" },
          { nameKey: "exercise.shrugs", musclesKey: "muscle.traps", sets: 3, reps: "12-15", rest: "60" },
        ],
      },
    ],
  },

  // Mesomorph: balanced approach, moderate volume and intensity
  mesomorph: {
    beginner: [
      {
        dayKey: "day.monday",
        titleKey: "workout.pushDay",
        duration: "45",
        exercises: [
          { nameKey: "exercise.pushups", musclesKey: "muscle.chest", sets: 3, reps: "12-15", rest: "60" },
          { nameKey: "exercise.dumbbellBenchPress", musclesKey: "muscle.chest", sets: 3, reps: "10-12", rest: "90" },
          { nameKey: "exercise.shoulderPress", musclesKey: "muscle.shoulders", sets: 3, reps: "10-12", rest: "90" },
          { nameKey: "exercise.tricepDips", musclesKey: "muscle.triceps", sets: 3, reps: "10-12", rest: "60" },
        ],
      },
      {
        dayKey: "day.wednesday",
        titleKey: "workout.pullDay",
        duration: "45",
        exercises: [
          { nameKey: "exercise.latPulldown", musclesKey: "muscle.back", sets: 3, reps: "10-12", rest: "90" },
          { nameKey: "exercise.dumbbellRow", musclesKey: "muscle.back", sets: 3, reps: "10-12", rest: "90" },
          { nameKey: "exercise.facePulls", musclesKey: "muscle.rearDelts", sets: 3, reps: "12-15", rest: "60" },
          { nameKey: "exercise.bicepCurls", musclesKey: "muscle.biceps", sets: 3, reps: "10-12", rest: "60" },
        ],
      },
      {
        dayKey: "day.friday",
        titleKey: "workout.legs",
        duration: "50",
        exercises: [
          { nameKey: "exercise.squats", musclesKey: "muscle.quads", sets: 3, reps: "10-12", rest: "120" },
          { nameKey: "exercise.lunges", musclesKey: "muscle.legs", sets: 3, reps: "10", rest: "90" },
          { nameKey: "exercise.legCurl", musclesKey: "muscle.hamstrings", sets: 3, reps: "12", rest: "60" },
          { nameKey: "exercise.calfRaises", musclesKey: "muscle.calves", sets: 3, reps: "15", rest: "45" },
        ],
      },
    ],
    intermediate: [
      {
        dayKey: "day.monday",
        titleKey: "workout.chestShoulders",
        duration: "55",
        exercises: [
          { nameKey: "exercise.benchPress", musclesKey: "muscle.chest", sets: 4, reps: "8-10", rest: "120" },
          { nameKey: "exercise.inclineDumbbellPress", musclesKey: "muscle.chest", sets: 3, reps: "10-12", rest: "90" },
          { nameKey: "exercise.cableFlyes", musclesKey: "muscle.chest", sets: 3, reps: "12", rest: "60" },
          { nameKey: "exercise.overheadPress", musclesKey: "muscle.shoulders", sets: 4, reps: "8-10", rest: "90" },
          { nameKey: "exercise.lateralRaises", musclesKey: "muscle.shoulders", sets: 3, reps: "12-15", rest: "60" },
        ],
      },
      {
        dayKey: "day.tuesday",
        titleKey: "workout.backArms",
        duration: "55",
        exercises: [
          { nameKey: "exercise.pullups", musclesKey: "muscle.back", sets: 4, reps: "8-10", rest: "90" },
          { nameKey: "exercise.barbellRow", musclesKey: "muscle.back", sets: 4, reps: "8-10", rest: "90" },
          { nameKey: "exercise.seatedRow", musclesKey: "muscle.back", sets: 3, reps: "10-12", rest: "90" },
          { nameKey: "exercise.barbellCurl", musclesKey: "muscle.biceps", sets: 3, reps: "10-12", rest: "60" },
          { nameKey: "exercise.tricepPushdown", musclesKey: "muscle.triceps", sets: 3, reps: "10-12", rest: "60" },
        ],
      },
      {
        dayKey: "day.thursday",
        titleKey: "workout.legs",
        duration: "60",
        exercises: [
          { nameKey: "exercise.squats", musclesKey: "muscle.quads", sets: 4, reps: "8-10", rest: "150" },
          { nameKey: "exercise.romanianDeadlift", musclesKey: "muscle.hamstrings", sets: 4, reps: "10-12", rest: "120" },
          { nameKey: "exercise.legPress", musclesKey: "muscle.legs", sets: 3, reps: "12", rest: "120" },
          { nameKey: "exercise.legCurl", musclesKey: "muscle.hamstrings", sets: 3, reps: "12", rest: "60" },
          { nameKey: "exercise.calfRaises", musclesKey: "muscle.calves", sets: 4, reps: "15-20", rest: "45" },
        ],
      },
      {
        dayKey: "day.saturday",
        titleKey: "workout.fullBody",
        duration: "50",
        exercises: [
          { nameKey: "exercise.deadlift", musclesKey: "muscle.back", sets: 3, reps: "6-8", rest: "180" },
          { nameKey: "exercise.dumbbellBenchPress", musclesKey: "muscle.chest", sets: 3, reps: "10-12", rest: "90" },
          { nameKey: "exercise.bulgarianSplitSquats", musclesKey: "muscle.legs", sets: 3, reps: "10", rest: "90" },
          { nameKey: "exercise.plank", musclesKey: "muscle.core", sets: 3, reps: "60s", rest: "45" },
        ],
      },
    ],
    advanced: [
      {
        dayKey: "day.monday",
        titleKey: "workout.chest",
        duration: "55",
        exercises: [
          { nameKey: "exercise.benchPress", musclesKey: "muscle.chest", sets: 4, reps: "6-8", rest: "150" },
          { nameKey: "exercise.inclineBenchPress", musclesKey: "muscle.chest", sets: 4, reps: "8-10", rest: "120" },
          { nameKey: "exercise.dumbbellFlyes", musclesKey: "muscle.chest", sets: 3, reps: "10-12", rest: "90" },
          { nameKey: "exercise.cableCrossover", musclesKey: "muscle.chest", sets: 3, reps: "12-15", rest: "60" },
          { nameKey: "exercise.pushups", musclesKey: "muscle.chest", sets: 3, reps: "failure", rest: "60" },
        ],
      },
      {
        dayKey: "day.tuesday",
        titleKey: "workout.back",
        duration: "55",
        exercises: [
          { nameKey: "exercise.deadlift", musclesKey: "muscle.back", sets: 4, reps: "5-6", rest: "180" },
          { nameKey: "exercise.weightedPullups", musclesKey: "muscle.back", sets: 4, reps: "6-8", rest: "120" },
          { nameKey: "exercise.barbellRow", musclesKey: "muscle.back", sets: 4, reps: "8-10", rest: "120" },
          { nameKey: "exercise.seatedRow", musclesKey: "muscle.back", sets: 3, reps: "10-12", rest: "90" },
          { nameKey: "exercise.straightArmPulldown", musclesKey: "muscle.lats", sets: 3, reps: "12-15", rest: "60" },
        ],
      },
      {
        dayKey: "day.wednesday",
        titleKey: "workout.shoulders",
        duration: "50",
        exercises: [
          { nameKey: "exercise.overheadPress", musclesKey: "muscle.shoulders", sets: 4, reps: "6-8", rest: "150" },
          { nameKey: "exercise.dumbbellShoulderPress", musclesKey: "muscle.shoulders", sets: 3, reps: "10-12", rest: "90" },
          { nameKey: "exercise.lateralRaises", musclesKey: "muscle.shoulders", sets: 4, reps: "12-15", rest: "60" },
          { nameKey: "exercise.rearDeltFlyes", musclesKey: "muscle.rearDelts", sets: 3, reps: "12-15", rest: "60" },
          { nameKey: "exercise.uprightRow", musclesKey: "muscle.shoulders", sets: 3, reps: "10-12", rest: "60" },
        ],
      },
      {
        dayKey: "day.thursday",
        titleKey: "workout.legs",
        duration: "60",
        exercises: [
          { nameKey: "exercise.squats", musclesKey: "muscle.quads", sets: 5, reps: "5-6", rest: "180" },
          { nameKey: "exercise.legPress", musclesKey: "muscle.legs", sets: 4, reps: "10-12", rest: "120" },
          { nameKey: "exercise.romanianDeadlift", musclesKey: "muscle.hamstrings", sets: 4, reps: "8-10", rest: "120" },
          { nameKey: "exercise.legExtension", musclesKey: "muscle.quads", sets: 3, reps: "12-15", rest: "60" },
          { nameKey: "exercise.legCurl", musclesKey: "muscle.hamstrings", sets: 3, reps: "12-15", rest: "60" },
          { nameKey: "exercise.calfRaises", musclesKey: "muscle.calves", sets: 4, reps: "15-20", rest: "45" },
        ],
      },
      {
        dayKey: "day.friday",
        titleKey: "workout.arms",
        duration: "50",
        exercises: [
          { nameKey: "exercise.closeGripBench", musclesKey: "muscle.triceps", sets: 4, reps: "8-10", rest: "90" },
          { nameKey: "exercise.barbellCurl", musclesKey: "muscle.biceps", sets: 4, reps: "8-10", rest: "90" },
          { nameKey: "exercise.skullCrushers", musclesKey: "muscle.triceps", sets: 3, reps: "10-12", rest: "60" },
          { nameKey: "exercise.hammerCurls", musclesKey: "muscle.biceps", sets: 3, reps: "10-12", rest: "60" },
          { nameKey: "exercise.tricepKickbacks", musclesKey: "muscle.triceps", sets: 3, reps: "12-15", rest: "45" },
          { nameKey: "exercise.concentrationCurl", musclesKey: "muscle.biceps", sets: 3, reps: "12-15", rest: "45" },
        ],
      },
    ],
  },

  // Endomorph: higher volume, shorter rest, more metabolic work
  endomorph: {
    beginner: [
      {
        dayKey: "day.monday",
        titleKey: "workout.fullBodyCircuit",
        duration: "40",
        exercises: [
          { nameKey: "exercise.gobletSquats", musclesKey: "muscle.quads", sets: 3, reps: "12-15", rest: "45" },
          { nameKey: "exercise.pushups", musclesKey: "muscle.chest", sets: 3, reps: "10-15", rest: "45" },
          { nameKey: "exercise.dumbbellRow", musclesKey: "muscle.back", sets: 3, reps: "12", rest: "45" },
          { nameKey: "exercise.plank", musclesKey: "muscle.core", sets: 3, reps: "30-45s", rest: "30" },
          { nameKey: "exercise.jumpingJacks", musclesKey: "muscle.fullBody", sets: 3, reps: "30", rest: "30" },
        ],
      },
      {
        dayKey: "day.wednesday",
        titleKey: "workout.fullBodyCircuit",
        duration: "40",
        exercises: [
          { nameKey: "exercise.lunges", musclesKey: "muscle.legs", sets: 3, reps: "12", rest: "45" },
          { nameKey: "exercise.shoulderPress", musclesKey: "muscle.shoulders", sets: 3, reps: "12", rest: "45" },
          { nameKey: "exercise.latPulldown", musclesKey: "muscle.back", sets: 3, reps: "12", rest: "45" },
          { nameKey: "exercise.mountainClimbers", musclesKey: "muscle.core", sets: 3, reps: "20", rest: "30" },
          { nameKey: "exercise.burpees", musclesKey: "muscle.fullBody", sets: 3, reps: "8-10", rest: "45" },
        ],
      },
      {
        dayKey: "day.friday",
        titleKey: "workout.fullBodyCircuit",
        duration: "40",
        exercises: [
          { nameKey: "exercise.stepUps", musclesKey: "muscle.legs", sets: 3, reps: "12", rest: "45" },
          { nameKey: "exercise.inclinePushups", musclesKey: "muscle.chest", sets: 3, reps: "12-15", rest: "45" },
          { nameKey: "exercise.seatedRow", musclesKey: "muscle.back", sets: 3, reps: "12", rest: "45" },
          { nameKey: "exercise.bicycleCrunches", musclesKey: "muscle.abs", sets: 3, reps: "20", rest: "30" },
          { nameKey: "exercise.highKnees", musclesKey: "muscle.fullBody", sets: 3, reps: "30s", rest: "30" },
        ],
      },
    ],
    intermediate: [
      {
        dayKey: "day.monday",
        titleKey: "workout.upperBody",
        duration: "50",
        exercises: [
          { nameKey: "exercise.benchPress", musclesKey: "muscle.chest", sets: 4, reps: "10-12", rest: "60" },
          { nameKey: "exercise.barbellRow", musclesKey: "muscle.back", sets: 4, reps: "10-12", rest: "60" },
          { nameKey: "exercise.overheadPress", musclesKey: "muscle.shoulders", sets: 3, reps: "12", rest: "60" },
          { nameKey: "exercise.cableFlyes", musclesKey: "muscle.chest", sets: 3, reps: "15", rest: "45" },
          { nameKey: "exercise.facePulls", musclesKey: "muscle.rearDelts", sets: 3, reps: "15", rest: "45" },
        ],
      },
      {
        dayKey: "day.tuesday",
        titleKey: "workout.lowerBody",
        duration: "55",
        exercises: [
          { nameKey: "exercise.squats", musclesKey: "muscle.quads", sets: 4, reps: "12", rest: "90" },
          { nameKey: "exercise.romanianDeadlift", musclesKey: "muscle.hamstrings", sets: 4, reps: "12", rest: "75" },
          { nameKey: "exercise.walkingLunges", musclesKey: "muscle.legs", sets: 3, reps: "12", rest: "60" },
          { nameKey: "exercise.legPress", musclesKey: "muscle.legs", sets: 3, reps: "15", rest: "60" },
          { nameKey: "exercise.calfRaises", musclesKey: "muscle.calves", sets: 4, reps: "20", rest: "30" },
        ],
      },
      {
        dayKey: "day.thursday",
        titleKey: "workout.upperBody",
        duration: "50",
        exercises: [
          { nameKey: "exercise.inclineDumbbellPress", musclesKey: "muscle.chest", sets: 4, reps: "10-12", rest: "60" },
          { nameKey: "exercise.pullups", musclesKey: "muscle.back", sets: 4, reps: "8-12", rest: "60" },
          { nameKey: "exercise.arnoldPress", musclesKey: "muscle.shoulders", sets: 3, reps: "12", rest: "60" },
          { nameKey: "exercise.tricepPushdown", musclesKey: "muscle.triceps", sets: 3, reps: "15", rest: "45" },
          { nameKey: "exercise.bicepCurls", musclesKey: "muscle.biceps", sets: 3, reps: "15", rest: "45" },
        ],
      },
      {
        dayKey: "day.friday",
        titleKey: "workout.lowerBodyCore",
        duration: "55",
        exercises: [
          { nameKey: "exercise.frontSquats", musclesKey: "muscle.quads", sets: 4, reps: "10-12", rest: "90" },
          { nameKey: "exercise.hipThrust", musclesKey: "muscle.glutes", sets: 4, reps: "12-15", rest: "60" },
          { nameKey: "exercise.legCurl", musclesKey: "muscle.hamstrings", sets: 3, reps: "15", rest: "45" },
          { nameKey: "exercise.cableCrunch", musclesKey: "muscle.abs", sets: 3, reps: "15-20", rest: "45" },
          { nameKey: "exercise.russianTwists", musclesKey: "muscle.obliques", sets: 3, reps: "20", rest: "30" },
        ],
      },
      {
        dayKey: "day.saturday",
        titleKey: "workout.hiitCircuit",
        duration: "35",
        exercises: [
          { nameKey: "exercise.kettlebellSwings", musclesKey: "muscle.fullBody", sets: 4, reps: "15", rest: "30" },
          { nameKey: "exercise.boxJumps", musclesKey: "muscle.legs", sets: 4, reps: "10", rest: "30" },
          { nameKey: "exercise.battleRopes", musclesKey: "muscle.fullBody", sets: 4, reps: "30s", rest: "30" },
          { nameKey: "exercise.burpees", musclesKey: "muscle.fullBody", sets: 4, reps: "10", rest: "30" },
        ],
      },
    ],
    advanced: [
      {
        dayKey: "day.monday",
        titleKey: "workout.pushDay",
        duration: "55",
        exercises: [
          { nameKey: "exercise.benchPress", musclesKey: "muscle.chest", sets: 4, reps: "8-10", rest: "90" },
          { nameKey: "exercise.inclineDumbbellPress", musclesKey: "muscle.chest", sets: 4, reps: "10-12", rest: "60" },
          { nameKey: "exercise.overheadPress", musclesKey: "muscle.shoulders", sets: 4, reps: "10-12", rest: "60" },
          { nameKey: "exercise.cableFlyes", musclesKey: "muscle.chest", sets: 3, reps: "15", rest: "45" },
          { nameKey: "exercise.lateralRaises", musclesKey: "muscle.shoulders", sets: 4, reps: "15", rest: "30" },
          { nameKey: "exercise.tricepDips", musclesKey: "muscle.triceps", sets: 3, reps: "12-15", rest: "45" },
        ],
      },
      {
        dayKey: "day.tuesday",
        titleKey: "workout.pullDay",
        duration: "55",
        exercises: [
          { nameKey: "exercise.deadlift", musclesKey: "muscle.back", sets: 4, reps: "6-8", rest: "120" },
          { nameKey: "exercise.pullups", musclesKey: "muscle.back", sets: 4, reps: "10-12", rest: "60" },
          { nameKey: "exercise.barbellRow", musclesKey: "muscle.back", sets: 4, reps: "10-12", rest: "60" },
          { nameKey: "exercise.facePulls", musclesKey: "muscle.rearDelts", sets: 3, reps: "15", rest: "45" },
          { nameKey: "exercise.hammerCurls", musclesKey: "muscle.biceps", sets: 3, reps: "12-15", rest: "45" },
          { nameKey: "exercise.reverseCurls", musclesKey: "muscle.forearms", sets: 3, reps: "15", rest: "30" },
        ],
      },
      {
        dayKey: "day.wednesday",
        titleKey: "workout.legs",
        duration: "60",
        exercises: [
          { nameKey: "exercise.squats", musclesKey: "muscle.quads", sets: 5, reps: "8-10", rest: "120" },
          { nameKey: "exercise.legPress", musclesKey: "muscle.legs", sets: 4, reps: "12-15", rest: "75" },
          { nameKey: "exercise.romanianDeadlift", musclesKey: "muscle.hamstrings", sets: 4, reps: "10-12", rest: "90" },
          { nameKey: "exercise.walkingLunges", musclesKey: "muscle.legs", sets: 3, reps: "15", rest: "60" },
          { nameKey: "exercise.legCurl", musclesKey: "muscle.hamstrings", sets: 3, reps: "15", rest: "45" },
          { nameKey: "exercise.calfRaises", musclesKey: "muscle.calves", sets: 4, reps: "20", rest: "30" },
        ],
      },
      {
        dayKey: "day.thursday",
        titleKey: "workout.upperBodyMetabolic",
        duration: "50",
        exercises: [
          { nameKey: "exercise.dumbbellBenchPress", musclesKey: "muscle.chest", sets: 4, reps: "12", rest: "45" },
          { nameKey: "exercise.dumbbellRow", musclesKey: "muscle.back", sets: 4, reps: "12", rest: "45" },
          { nameKey: "exercise.arnoldPress", musclesKey: "muscle.shoulders", sets: 3, reps: "12", rest: "45" },
          { nameKey: "exercise.diamondPushups", musclesKey: "muscle.triceps", sets: 3, reps: "12-15", rest: "45" },
          { nameKey: "exercise.chinups", musclesKey: "muscle.biceps", sets: 3, reps: "10-12", rest: "45" },
        ],
      },
      {
        dayKey: "day.friday",
        titleKey: "workout.lowerBodyCore",
        duration: "55",
        exercises: [
          { nameKey: "exercise.frontSquats", musclesKey: "muscle.quads", sets: 4, reps: "10-12", rest: "90" },
          { nameKey: "exercise.hipThrust", musclesKey: "muscle.glutes", sets: 4, reps: "12-15", rest: "60" },
          { nameKey: "exercise.bulgarianSplitSquats", musclesKey: "muscle.legs", sets: 3, reps: "12", rest: "60" },
          { nameKey: "exercise.hangingLegRaise", musclesKey: "muscle.abs", sets: 4, reps: "12-15", rest: "45" },
          { nameKey: "exercise.plank", musclesKey: "muscle.core", sets: 3, reps: "60s", rest: "30" },
        ],
      },
      {
        dayKey: "day.saturday",
        titleKey: "workout.hiitCircuit",
        duration: "40",
        exercises: [
          { nameKey: "exercise.kettlebellSwings", musclesKey: "muscle.fullBody", sets: 5, reps: "20", rest: "30" },
          { nameKey: "exercise.boxJumps", musclesKey: "muscle.legs", sets: 5, reps: "12", rest: "30" },
          { nameKey: "exercise.medicBallSlams", musclesKey: "muscle.fullBody", sets: 5, reps: "15", rest: "30" },
          { nameKey: "exercise.prowlerPush", musclesKey: "muscle.fullBody", sets: 5, reps: "20m", rest: "45" },
        ],
      },
    ],
  },
};

export function WorkoutPlanner() {
  const { t } = useLanguage();

  const equipment = [
    { id: "bodyweight", labelKey: "workout.bodyweight" },
    { id: "dumbbells", labelKey: "workout.dumbbells" },
    { id: "barbell", labelKey: "workout.barbell" },
    { id: "pullup_bar", labelKey: "workout.pullupBar" },
    { id: "resistance_bands", labelKey: "workout.bands" },
    { id: "kettlebell", labelKey: "workout.kettlebell" },
  ];

  const levels = [
    { value: "beginner", labelKey: "workout.beginner", descKey: "workout.beginner.desc" },
    { value: "intermediate", labelKey: "workout.intermediate", descKey: "workout.intermediate.desc" },
    { value: "advanced", labelKey: "workout.advanced", descKey: "workout.advanced.desc" },
  ];

  const bodyTypes = [
    { value: "ectomorph", labelKey: "workout.ectomorph", descKey: "workout.ectomorph.desc" },
    { value: "mesomorph", labelKey: "workout.mesomorph", descKey: "workout.mesomorph.desc" },
    { value: "endomorph", labelKey: "workout.endomorph", descKey: "workout.endomorph.desc" },
  ];

  const [location, setLocation] = useState<"home" | "gym" | null>(null);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>(["bodyweight"]);
  const [level, setLevel] = useState("");
  const [bodyType, setBodyType] = useState<BodyType | "">("");
  const [daysPerWeek, setDaysPerWeek] = useState("");
  const [plan, setPlan] = useState<WorkoutDay[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);

  const toggleEquipment = (id: string) => {
    setSelectedEquipment((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const generatePlan = () => {
    if (!bodyType || !level) return;
    
    setIsGenerating(true);
    setTimeout(() => {
      const selectedPlan = workoutPlansByBodyType[bodyType]?.[level] || [];
      setPlan(selectedPlan.slice(0, parseInt(daysPerWeek) || 4));
      setIsGenerating(false);
    }, 1000);
  };

  const toggleExercise = (exerciseName: string) => {
    setCompletedExercises((prev) =>
      prev.includes(exerciseName)
        ? prev.filter((e) => e !== exerciseName)
        : [...prev, exerciseName]
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center shadow-neon">
          <Dumbbell className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-['Space_Grotesk']">{t("workout.title")}</h1>
          <p className="text-muted-foreground">{t("workout.subtitle")}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Settings */}
        <div className="lg:col-span-1 space-y-6">
          <div className="fitness-card space-y-6">
            {/* Body Type */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">{t("workout.bodyType")}</Label>
                <div className="group relative">
                  <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                  <div className="absolute left-0 bottom-6 w-64 p-3 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <p className="text-xs text-muted-foreground">{t("workout.bodyType.hint")}</p>
                  </div>
                </div>
              </div>
              <Select value={bodyType} onValueChange={(v) => setBodyType(v as BodyType)}>
                <SelectTrigger className="input-fitness">
                  <SelectValue placeholder={t("workout.selectBodyType")} />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {bodyTypes.map((bt) => (
                    <SelectItem key={bt.value} value={bt.value}>
                      <div>
                        <div className="font-medium">{t(bt.labelKey)}</div>
                        <div className="text-xs text-muted-foreground">
                          {t(bt.descKey)}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">{t("workout.location")}</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setLocation("home")}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    location === "home"
                      ? "border-primary bg-primary/10 shadow-neon"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <Home className="w-6 h-6" />
                  <span className="text-sm font-medium">{t("workout.home")}</span>
                </button>
                <button
                  onClick={() => setLocation("gym")}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    location === "gym"
                      ? "border-primary bg-primary/10 shadow-neon"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <Building className="w-6 h-6" />
                  <span className="text-sm font-medium">{t("workout.gym")}</span>
                </button>
              </div>
            </div>

            {/* Equipment */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">{t("workout.equipment")}</Label>
              <div className="grid grid-cols-2 gap-2">
                {equipment.map((item) => (
                  <label
                    key={item.id}
                    className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedEquipment.includes(item.id)
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <Checkbox
                      checked={selectedEquipment.includes(item.id)}
                      onCheckedChange={() => toggleEquipment(item.id)}
                    />
                    <span className="text-sm">{t(item.labelKey)}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Level */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">{t("workout.level")}</Label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger className="input-fitness">
                  <SelectValue placeholder={t("calc.selectLevel")} />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {levels.map((l) => (
                    <SelectItem key={l.value} value={l.value}>
                      <div>
                        <div className="font-medium">{t(l.labelKey)}</div>
                        <div className="text-xs text-muted-foreground">
                          {t(l.descKey)}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Days per week */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">{t("workout.daysPerWeek")}</Label>
              <Select value={daysPerWeek} onValueChange={setDaysPerWeek}>
                <SelectTrigger className="input-fitness">
                  <SelectValue placeholder={t("workout.howManyDays")} />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {[2, 3, 4, 5, 6].map((days) => (
                    <SelectItem key={days} value={String(days)}>
                      {days} {t("workout.days")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={generatePlan}
              className="w-full"
              disabled={!location || !level || !daysPerWeek || !bodyType || isGenerating}
            >
              {isGenerating ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  {t("workout.generating")}
                </div>
              ) : (
                <>
                  <Dumbbell className="w-5 h-5" />
                  {t("workout.generate")}
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Plan */}
        <div className="lg:col-span-2 space-y-4">
          {plan ? (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold font-['Space_Grotesk']">{t("workout.yourPlan")}</h2>
                  <p className="text-sm text-muted-foreground">
                    {t(`workout.${bodyType}`)} • {t(`workout.${level}`)}
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setPlan(null)}>
                  <RefreshCw className="w-4 h-4" />
                  {t("workout.regenerate")}
                </Button>
              </div>

              <Accordion type="single" collapsible className="space-y-3">
                {plan.map((day, index) => (
                  <AccordionItem
                    key={t(day.dayKey)}
                    value={t(day.dayKey)}
                    className="fitness-card border-0 overflow-hidden"
                  >
                    <AccordionTrigger className="hover:no-underline px-0">
                      <div className="flex items-center gap-4 w-full">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold font-['Space_Grotesk']">
                          {index + 1}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-semibold font-['Space_Grotesk']">{t(day.dayKey)}</div>
                          <div className="text-sm text-muted-foreground">
                            {t(day.titleKey)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Timer className="w-4 h-4" />
                          {day.duration} {t("workout.min")}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <div className="space-y-3">
                        {day.exercises.map((exercise) => (
                          <div
                            key={t(exercise.nameKey)}
                            className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                              completedExercises.includes(t(exercise.nameKey))
                                ? "bg-primary/10 border border-primary/30"
                                : "bg-muted/50 border border-border/30"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => toggleExercise(t(exercise.nameKey))}
                                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                                  completedExercises.includes(t(exercise.nameKey))
                                    ? "bg-primary text-primary-foreground shadow-neon"
                                    : "bg-muted hover:bg-primary/10"
                                }`}
                              >
                                {completedExercises.includes(t(exercise.nameKey)) ? (
                                  <Check className="w-4 h-4" />
                                ) : (
                                  <Play className="w-4 h-4" />
                                )}
                              </button>
                              <div>
                                <div className="font-medium">{t(exercise.nameKey)}</div>
                                <div className="text-xs text-muted-foreground">
                                  {t(exercise.musclesKey)}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium font-mono">
                                {exercise.sets}×{exercise.reps}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {t("workout.rest")}: {exercise.rest}s
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ) : (
            <div className="fitness-card h-[500px] flex flex-col items-center justify-center text-center text-muted-foreground">
              <Dumbbell className="w-16 h-16 mb-4 opacity-30" />
              <p className="text-lg font-medium font-['Space_Grotesk']">{t("workout.setupLeft")}</p>
              <p className="text-sm">
                {t("workout.planHere")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}