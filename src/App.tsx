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
import Inmobiliarias from './pages/Inmobiliarias';
import EscabiadosChat from './pages/EscabiadosChat';
import Privacidad from './pages/Privacidad';

function HomePage() {
  return (
    <>
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

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const normalized = path.replace(/\/+$/, '') || '/';

  if (normalized === '/inmobiliarias') return <Inmobiliarias />;
  if (normalized === '/escabiados') return <EscabiadosChat />;
  if (normalized === '/privacidad') return <Privacidad />;
  return <HomePage />;
}

export default App;
