import Hero from './components/Hero';
import ProblemGrid from './components/ProblemGrid';
import CostSection from './components/CostSection';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import Offer from './components/Offer';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import StickyNav from './components/StickyNav';
import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <>
      <CustomCursor />
      <Hero />
      <StickyNav />
      <main className="relative z-[2]">
        <ProblemGrid />
        <CostSection />
        <Services />
        <HowItWorks />
        <Offer />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

export default App;
