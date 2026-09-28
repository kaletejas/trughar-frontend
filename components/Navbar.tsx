'use client';

import PwaInstallButton from './PwaInstallButton';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 h-[70px] bg-white/90 backdrop-blur-xl border-b border-div">
      {/* Logo */}
      <a href="/" className="font-display text-xl font-normal tracking-wide text-ink no-underline">
        TruGhar<sup className="text-[0.5rem] text-clay ml-0.5 font-body font-light tracking-widest">Mumbai</sup>
      </a>

      <div className="flex items-center gap-4 md:gap-6">
        {/* Install app */}
        <PwaInstallButton
          text="Install TruGhar"
          className="text-[0.65rem] tracking-wide bg-[#4B2D35] text-[#C19F6A] px-4 py-1.5 rounded-full hover:bg-[#3a2229] transition-base border border-[#C19F6A]/30 whitespace-nowrap"
        />

        {/* Phone */}
        <a href="tel:+919762866937" className="font-mono text-[0.7rem] text-ink2 no-underline border-l border-div2 pl-4 md:pl-6 hover:text-clay transition-base">
          +91&nbsp;97628&nbsp;66937
        </a>
      </div>
    </nav>
  );
}
