import { Topbar } from '@/components/layout/Topbar';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Stats } from '@/components/sections/Stats';
import { Credits } from '@/components/sections/Credits';
import { Testimonials } from '@/components/sections/Testimonials';
import { Footer } from '@/components/layout/Footer';

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Topbar />
      <main className="flex-1 pt-16"> {/* Add padding-top to account for fixed header */}
        <Hero />
        <Features />
        <Stats />
        <Credits />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}