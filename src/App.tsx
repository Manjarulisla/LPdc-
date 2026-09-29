import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Pathway } from './components/Pathway';
import { ImpactCounters } from './components/ImpactCounters';
import { Solutions } from './components/Solutions';
import { OnboardingTeaser } from './components/OnboardingTeaser';
import { Footer } from './components/Footer';
import { AvatarJourney } from './components/AvatarJourney';
import { Splash } from './components/Splash';

function App() {
  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-brand-accent/30 selection:text-brand-accent relative">
      <Splash />
      {/* Global Cinematic Background Video */}
      <div className="fixed inset-0 w-full h-full -z-50">
        <div className="absolute inset-0 bg-black/60 dark:bg-black/80 z-10" />
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2850&auto=format&fit=crop"
        >
          <source src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da3f3c0ff7372f9be877140bc7c77c0800d11&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
        </video>
      </div>

      <AvatarJourney />
      <Navbar />
      <main>
        <Hero />
        <Pathway />
        <ImpactCounters />
        <Solutions />
        <OnboardingTeaser />
      </main>
      <Footer />
    </div>
  );
}

export default App;
