import { useEffect, useState } from 'react';
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
import Inmobiliarias from './pages/Inmobiliarias';
import DemoInmobiliaria from './pages/DemoInmobiliaria';

function HomePage() {
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

function App() {
  const [path, setPath] = useState<string>(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  // Listen to back/forward navigation so SPA-style links keep the page in sync
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Normalize trailing slashes (treat /inmobiliarias/ same as /inmobiliarias)
  const normalized = path.replace(/\/+$/, '') || '/';

  if (normalized === '/inmobiliarias') return <Inmobiliarias />;
  if (normalized === '/demo-inmobiliaria') return <DemoInmobiliaria />;
  return <HomePage />;
}

export default App;
