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
import { AuroraBackground } from './components/fx/AuroraBackground';
import { ParticleField } from './components/fx/ParticleField';
import { CursorGlow } from './components/fx/CursorGlow';
import { ScrollProgress } from './components/fx/ScrollProgress';
import { Marquee } from './components/fx/Marquee';

const marqueeItems = [
  'Leadership', 'Mentorship', 'Masterclasses', 'Global Network', 'Social Impact',
  'Career Growth', 'Strategic Thinking', 'Community', 'Innovation', 'Lifelong Learning',
];

function App() {
  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-brand-accent/30 selection:text-brand-accent relative">
      <Splash />
      <CursorGlow />
      <ScrollProgress />

      {/* Global Cinematic Background Video */}
      <div className="fixed inset-0 w-full h-full -z-50">
        <div className="absolute inset-0 bg-white/85 dark:bg-black/80 z-10 transition-colors duration-500" />
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

      {/* Animated layers on top of the video, below content */}
      <AuroraBackground />
      <ParticleField />

      <AvatarJourney />
      <Navbar />
      <main>
        <Hero />
        <div className="relative z-10 border-y border-slate-200/40 dark:border-white/5 bg-white/30 dark:bg-black/30 backdrop-blur-sm">
          <Marquee items={marqueeItems} />
        </div>
        <Pathway />
        <ImpactCounters />
        <Solutions />
        <div className="relative z-10 border-y border-slate-200/40 dark:border-white/5 bg-white/30 dark:bg-black/30 backdrop-blur-sm">
          <Marquee items={marqueeItems} reverse />
        </div>
        <OnboardingTeaser />
      </main>
      <Footer />
    </div>
  );
}

export default App;
