import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import Timeline from '../components/sections/Timeline';
import Prizes from '../components/sections/Prizes';
import FAQ from '../components/sections/FAQ';
import CTA from '../components/sections/CTA';

const Home = () => {
  return (
    <div>
      <Hero />
      <Features />
      <Timeline />
      <Prizes />
      <FAQ />
      <CTA />
    </div>
  );
};

export default Home;