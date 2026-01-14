import { Header } from "../components/layout/Header";
import { MobileNav } from "../components/layout/MobileNav";
import { ProgressTracker } from "../components/progress/ProgressTracker";

const ProgressPage = () => {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      <main className="container py-8 md:py-12">
        <ProgressTracker />
      </main>
      <MobileNav />
    </div>
  );
};

export default ProgressPage;
