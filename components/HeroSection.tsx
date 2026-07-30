'use client';

import { IncomeBracket } from '@/lib/types';
import { MUMBAI_AREAS, OFFICE_AREAS, SCHOOL_BOARDS } from '@/lib/constants';
import Dropdown from './Dropdown';
import IncomeSelector from './IncomeSelector';

interface HeroSectionProps {
  location: string;
  office: string;
  school: string;
  income: IncomeBracket | '';
  onLocationChange: (v: string) => void;
  onOfficeChange: (v: string) => void;
  onSchoolChange: (v: string) => void;
  onIncomeChange: (v: IncomeBracket) => void;
  onSubmit: () => void;
  loading: boolean;
}

export default function HeroSection({
  location, office, school, income,
  onLocationChange, onOfficeChange, onSchoolChange, onIncomeChange,
  onSubmit, loading,
}: HeroSectionProps) {
  const ready = location && office && income;

  return (
    <>
      {/* Input zone — dropdowns + income tiles + find button */}
      <div className="px-8 md:px-16 pb-8">
        <p className="text-[0.62rem] tracking-[0.15em] uppercase text-[var(--text-muted)] mb-4">
          Your preferences
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <Dropdown
            label="Where you live"
            icon="🏠"
            options={MUMBAI_AREAS}
            value={location}
            onChange={onLocationChange}
            placeholder="Select your area"
          />
          <Dropdown
            label="Where you work"
            icon="💼"
            options={OFFICE_AREAS}
            value={office}
            onChange={onOfficeChange}
            placeholder="Select office area"
          />
          <Dropdown
            label="School priority (optional)"
            icon="🏫"
            options={[
              'Not applicable',
              ...MUMBAI_AREAS,
              ...SCHOOL_BOARDS.map((b) => `${b} schools`),
            ]}
            value={school}
            onChange={onSchoolChange}
            placeholder="Select or skip"
          />
          <IncomeSelector
            value={income as IncomeBracket}
            onChange={onIncomeChange}
          />
        </div>

        {/* Find button */}
        <button
          type="button"
          onClick={onSubmit}
          disabled={!ready || loading}
          className={`btn-primary w-full rounded ${!ready ? 'opacity-30 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <span className="animate-pulse">Searching Mumbai inventory…</span>
          ) : (
            <>
              <span>Find my home</span>
              <span>→</span>
            </>
          )}
        </button>
      </div>

      {/* Trust badges */}
      <div className="flex flex-wrap gap-5 md:gap-8 px-8 md:px-16 py-3 border-t border-[var(--border)]">
        {[
          { icon: '✓', text: 'MahaRERA verified' },
          { icon: '✓', text: 'Under-construction only' },
          { icon: '✓', text: 'Zero cold calls' },
          { icon: '✓', text: 'Real properties only' },
        ].map((t) => (
          <span key={t.text} className="text-[0.7rem] text-[var(--text-secondary)] flex items-center gap-1.5">
            <span className="text-[#2D5C44] font-bold">{t.icon}</span>
            {t.text}
          </span>
        ))}
      </div>
    </>
  );
}
