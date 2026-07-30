'use client';

import { useState, useRef } from 'react';
import { IncomeBracket, Property, BracketInfo } from '@/lib/types';
import { INCOME_BRACKETS } from '@/lib/constants';
import { getRecommendations } from '@/lib/api';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import HeroSection from '@/components/HeroSection';
import StatsStrip from '@/components/StatsStrip';
import ResultsSection from '@/components/ResultsSection';
import Footer from '@/components/Footer';

export default function Home() {
  // ── Input state ─────────────────────────────────────────────────────────────
  const [location, setLocation] = useState('');
  const [office, setOffice]     = useState('');
  const [school, setSchool]     = useState('');
  const [income, setIncome]     = useState<IncomeBracket | ''>('');

  // ── Results state ───────────────────────────────────────────────────────────
  const [properties, setProperties]   = useState<Property[]>([]);
  const [bracketInfo, setBracketInfo] = useState<BracketInfo | null>(null);
  const [totalFound, setTotalFound]   = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading]         = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  // ── Submit handler ──────────────────────────────────────────────────────────
  async function handleSubmit() {
    if (!location || !office || !income) return;

    setLoading(true);

    try {
      const data = await getRecommendations({
        current_location: location,
        office_location:  office,
        school_location:  school || undefined,
        income_bracket:   income,
      });

      setProperties(data.properties);
      setBracketInfo(data.bracket_info);
      setTotalFound(data.total_found);
      setShowResults(true);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch {
      setProperties([]);
      setBracketInfo(null);
      setTotalFound(0);
      setShowResults(true);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } finally {
      setLoading(false);
    }
  }

  // ── Reset handler ───────────────────────────────────────────────────────────
  function handleReset() {
    setLocation('');
    setOffice('');
    setSchool('');
    setIncome('');
    setProperties([]);
    setBracketInfo(null);
    setTotalFound(0);
    setShowResults(false);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      <Navbar />

      <main>
        {/* Hero + Inputs section */}
        <section className="pt-[70px] border-b border-[var(--border)]">
          {/* Hero headline */}
          <div className="relative px-8 md:px-16 pt-12 md:pt-20 pb-4">
            <div className="absolute right-4 md:right-8 top-8 font-display text-[120px] md:text-[200px] font-extralight text-[var(--border)] select-none pointer-events-none leading-none">
              4
            </div>

            <p className="text-[0.62rem] font-normal tracking-[0.24em] uppercase text-[#B5522A] mb-6 flex items-center gap-3">
              <span className="w-9 h-px bg-[#B5522A]" />
              Mumbai real estate &middot; reimagined
            </p>

            <h1 className="font-display text-[clamp(2.6rem,7vw,5.5rem)] font-extralight leading-[0.92] tracking-tight mb-3">
              Not the most listings.
              <br />
              <span className="italic text-[#B5522A] font-light">The right one.</span>
            </h1>

            <p className="text-[0.85rem] text-[var(--text-secondary)] leading-relaxed max-w-sm">
              Tell us what you&apos;re looking for.
            </p>
          </div>

          {/* Search bar — natural language input */}
          <SearchBar
            onLocationDetected={setLocation}
            onOfficeDetected={setOffice}
            onSchoolDetected={setSchool}
            onIncomeDetected={setIncome}
          />

          {/* Dropdown inputs — below the search bar */}
          <HeroSection
            location={location}
            office={office}
            school={school}
            income={income}
            onLocationChange={setLocation}
            onOfficeChange={setOffice}
            onSchoolChange={setSchool}
            onIncomeChange={setIncome}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </section>

        <StatsStrip />

        {/* Results */}
        <div ref={resultsRef}>
          {showResults && (
            <ResultsSection
              properties={properties}
              bracketInfo={bracketInfo || { label: '', safe_emi: 0, max_price_lakhs: 0 }}
              totalFound={totalFound}
              userProfile={{
                location,
                office,
                school,
                income: income ? INCOME_BRACKETS[income].label : '',
              }}
              onReset={handleReset}
            />
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
