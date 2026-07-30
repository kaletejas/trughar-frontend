'use client';

import { useState } from 'react';
import { Property, BracketInfo } from '@/lib/types';
import PropertyCard from './PropertyCard';

interface ResultsSectionProps {
  properties: Property[];
  bracketInfo: BracketInfo;
  totalFound: number;
  userProfile: {
    location: string;
    office: string;
    school: string;
    income: string;
  };
  onReset: () => void;
}

type ViewMode = 'cards' | 'map';

export default function ResultsSection({
  properties, bracketInfo, totalFound, userProfile, onReset,
}: ResultsSectionProps) {
  const [view, setView] = useState<ViewMode>('cards');

  // Empty state
  if (properties.length === 0) {
    return (
      <section className="px-8 md:px-16 py-16 md:py-24 border-b border-div text-center">
        <h2 className="font-display text-[clamp(1.6rem,4vw,2.8rem)] font-extralight mb-4">
          No properties found for your profile.
        </h2>
        <p className="text-[0.82rem] text-ink3 leading-relaxed max-w-md mx-auto mb-8">
          We don&apos;t have matching inventory right now. Please call our advisor — they&apos;ll find the right match manually.
        </p>
        <a
          href="tel:+919762866937"
          className="font-display text-2xl text-ink hover:text-clay transition-base no-underline block mb-4"
        >
          +91 97628 66937
        </a>
        <button
          type="button"
          onClick={onReset}
          className="text-[0.66rem] tracking-[0.14em] uppercase text-ink4 border border-div2 px-5 py-2 hover:bg-off transition-base"
        >
          ← New search
        </button>
      </section>
    );
  }

  return (
    <section className="border-b border-div" id="results">
      <div className="px-8 md:px-16 py-10 md:py-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-[clamp(1.6rem,4vw,2.8rem)] font-extralight leading-tight mb-2">
              {properties.length} properties matched to your life.
            </h2>
            <p className="text-[0.75rem] text-ink3">
              Lives in: {userProfile.location} · Office: {userProfile.office}
              {userProfile.school && userProfile.school !== 'Not applicable'
                ? ` · School: ${userProfile.school}`
                : ''}
              {' '}· Income: {userProfile.income}
            </p>
          </div>

          {/* View toggle */}
          <div className="flex border border-div2 rounded overflow-hidden shrink-0">
            <button
              type="button"
              onClick={() => setView('cards')}
              className={`px-4 py-1.5 text-[0.7rem] tracking-wide border-none transition-fast
                ${view === 'cards' ? 'bg-off font-medium text-ink' : 'bg-transparent text-ink3'}`}
            >
              Cards
            </button>
            <button
              type="button"
              onClick={() => setView('map')}
              className={`px-4 py-1.5 text-[0.7rem] tracking-wide border-none transition-fast
                ${view === 'map' ? 'bg-off font-medium text-ink' : 'bg-transparent text-ink3'}`}
            >
              Map
            </button>
          </div>
        </div>

        {/* Affordability strip */}
        <div className="flex flex-wrap gap-8 mb-8 px-5 py-4 border border-div2 border-l-[3px] border-l-clay bg-white">
          <div>
            <p className="text-[0.6rem] text-ink4 tracking-wide mb-0.5">Loan eligibility</p>
            <p className="font-display text-lg font-light text-ink">{bracketInfo.label}</p>
          </div>
          <div>
            <p className="text-[0.6rem] text-ink4 tracking-wide mb-0.5">Safe EMI</p>
            <p className="font-display text-lg font-light text-ink">₹{bracketInfo.safe_emi.toLocaleString('en-IN')}</p>
          </div>
          <div>
            <p className="text-[0.6rem] text-ink4 tracking-wide mb-0.5">Total matches</p>
            <p className="font-display text-lg font-light text-ink">{totalFound}</p>
          </div>
        </div>

        {/* Card view */}
        {view === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-div2 border border-div2 rounded-sm mb-8">
            {properties.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>
        )}

        {/* Map view placeholder */}
        {view === 'map' && (
          <div className="bg-off border border-div2 rounded min-h-[300px] md:min-h-[420px] flex flex-col items-center justify-center gap-4 mb-8">
            <span className="text-3xl">📍</span>
            <p className="text-ink3 text-[0.85rem]">Interactive map — coming soon</p>
            <p className="text-ink4 text-[0.7rem] max-w-xs text-center leading-relaxed">
              Properties, schools, and your office plotted on a live Google Map. Phase 2 feature.
            </p>
            <div className="flex gap-5 text-[0.65rem] text-ink3 mt-2">
              <span><span className="inline-block w-2 h-2 rounded-full bg-clay mr-1" /> Properties</span>
              <span><span className="inline-block w-2 h-2 rounded-full bg-sage mr-1" /> Schools</span>
              <span><span className="inline-block w-2 h-2 rounded-full bg-[#185FA5] mr-1" /> Office</span>
            </div>
          </div>
        )}

        {/* Bottom CTA — single advisor contact */}
        <div className="text-center py-10 border-t border-div">
          <p className="text-[0.6rem] tracking-[0.2em] uppercase text-ink4 mb-3">
            Interested? Talk to our advisor.
          </p>
          <a
            href="tel:+919762866937"
            className="font-display text-[clamp(1.4rem,3.5vw,2.4rem)] font-extralight text-ink no-underline hover:text-clay transition-base block mb-2"
          >
            +91 97628 66937
          </a>
          <p className="text-[0.65rem] text-ink4 mb-6">
            Monday – Saturday · 9 AM – 7 PM · No spam · One advisor, complete focus
          </p>
          <button
            type="button"
            onClick={onReset}
            className="text-[0.66rem] tracking-[0.14em] uppercase text-ink border border-div2 px-5 py-2.5 bg-transparent hover:bg-ink hover:text-white hover:border-ink transition-base"
          >
            ← New search
          </button>
        </div>
      </div>
    </section>
  );
}
