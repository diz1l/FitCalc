import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { CalorieCalculator } from "@/components/calculator/CalorieCalculator";

const CalculatorPage = () => {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      <main className="container py-8 md:py-12">
        <CalorieCalculator />
      </main>
      <MobileNav />
    </div>
  );
};

export default CalculatorPage;
