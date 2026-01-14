import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { WorkoutPlanner } from "@/components/workouts/WorkoutPlanner";

const WorkoutsPage = () => {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      <main className="container py-8 md:py-12">
        <WorkoutPlanner />
      </main>
      <MobileNav />
    </div>
  );
};

export default WorkoutsPage;
