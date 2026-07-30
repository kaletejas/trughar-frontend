'use client';

import { IncomeBracket } from '@/lib/types';
import { INCOME_BRACKETS } from '@/lib/constants';

interface IncomeSelectorProps {
  value: IncomeBracket | '';
  onChange: (bracket: IncomeBracket) => void;
}

const BRACKETS: IncomeBracket[] = ['A', 'B', 'C', 'D'];

export default function IncomeSelector({ value, onChange }: IncomeSelectorProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[0.68rem] text-ink4 tracking-wide flex items-center gap-1.5">
        <span>💰</span> Monthly household income
      </label>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5">
        {BRACKETS.map((key) => {
          const bracket = INCOME_BRACKETS[key];
          const selected = value === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onChange(key)}
              className={`px-3 py-3 border rounded text-center transition-base
                ${selected
                  ? 'bg-ink border-ink'
                  : 'bg-white border-div2 hover:border-clay hover:bg-clay3'
                }`}
            >
              <span
                className={`font-display text-[0.9rem] block mb-0.5
                  ${selected ? 'text-white' : 'text-ink'}`}
              >
                {bracket.shortLabel}
              </span>
              <span
                className={`text-[0.6rem] leading-tight
                  ${selected ? 'text-white/60' : 'text-ink3'}`}
              >
                {bracket.budget}
              </span>
            </button>
          );
        })}
      </div>

      {/* Affordability info box */}
      {value && (
        <div className="mt-2 px-4 py-3 bg-clay3 border-l-2 border-clay rounded-r text-[0.73rem] text-ink2 leading-relaxed animate-in">
          <strong>{INCOME_BRACKETS[value].label}:</strong>&nbsp;
          Safe EMI ≈ {INCOME_BRACKETS[value].safeEmi} ·
          Loan ≈ {INCOME_BRACKETS[value].loanEligibility} ·
          Budget: <strong>{INCOME_BRACKETS[value].budget}</strong>
          <br />
          <span className="text-ink3">{INCOME_BRACKETS[value].note}</span>
        </div>
      )}
    </div>
  );
}
