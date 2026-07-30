'use client';

import { useState, useCallback } from 'react';
import { IncomeBracket } from '@/lib/types';
import { MUMBAI_AREAS, OFFICE_AREAS } from '@/lib/constants';

interface SearchBarProps {
  onLocationDetected: (v: string) => void;
  onOfficeDetected: (v: string) => void;
  onSchoolDetected: (v: string) => void;
  onIncomeDetected: (v: IncomeBracket) => void;
}

// ── Income pattern matching ──────────────────────────────────────────────────
const INCOME_PATTERNS: { pattern: RegExp; bracket: IncomeBracket }[] = [
  // Match variations: "50k", "50,000", "50000", "50 thousand"
  { pattern: /\b(?:income|salary|earn(?:ing)?s?)\s*(?:of|is|around|about|roughly)?\s*(?:rs\.?|₹|inr)?\s*([4-7]\d)\s*(?:k|thousand)/i, bracket: 'A' },
  { pattern: /\b(?:income|salary|earn(?:ing)?s?)\s*(?:of|is|around|about|roughly)?\s*(?:rs\.?|₹|inr)?\s*(?:under|below|less than)\s*75/i, bracket: 'A' },

  // 75k - 1.5L
  { pattern: /\b(?:income|salary|earn(?:ing)?s?)\s*(?:of|is|around|about|roughly)?\s*(?:rs\.?|₹|inr)?\s*(?:7[5-9]|[89]\d|1[0-4]\d)\s*(?:k|thousand)/i, bracket: 'B' },
  { pattern: /\b(?:income|salary|earn(?:ing)?s?)\s*(?:of|is|around|about|roughly)?\s*(?:rs\.?|₹|inr)?\s*1\s*(?:lakh|lac|l)\b/i, bracket: 'B' },

  // 1.5L - 3L
  { pattern: /\b(?:income|salary|earn(?:ing)?s?)\s*(?:of|is|around|about|roughly)?\s*(?:rs\.?|₹|inr)?\s*(?:1\.5|1\.7|2|2\.5)\s*(?:lakh|lac|l)/i, bracket: 'C' },
  { pattern: /\b(?:rs\.?|₹|inr)?\s*(?:1\.5|1\.7|2|2\.5)\s*(?:lakh|lac|l)\s*(?:per\s*month|monthly|pm|\/\s*(?:mo|month))\b/i, bracket: 'C' },
  { pattern: /\bincome\s+2\s*(?:lakh|lac|l)/i, bracket: 'C' },

  // 3L+
  { pattern: /\b(?:income|salary|earn(?:ing)?s?)\s*(?:of|is|around|about|roughly)?\s*(?:rs\.?|₹|inr)?\s*(?:[3-9]|[1-9]\d)\s*(?:lakh|lac|l)/i, bracket: 'D' },
  { pattern: /\b(?:rs\.?|₹|inr)?\s*(?:[3-9]|[1-9]\d)\s*(?:lakh|lac|l)\s*(?:per\s*month|monthly|pm|\/\s*(?:mo|month))\b/i, bracket: 'D' },
];

// Simple number-only income patterns (fallback)
const SIMPLE_INCOME: { pattern: RegExp; bracket: IncomeBracket }[] = [
  { pattern: /\b(?:[4-6]\d)\s*(?:k|thousand)\b/i, bracket: 'A' },
  { pattern: /\b(?:7[5-9]|[89]\d|1[0-2]\d)\s*(?:k|thousand)\b/i, bracket: 'B' },
  { pattern: /\b(?:1\.5|2|2\.5)\s*(?:lakh|lac|l)\b/i, bracket: 'C' },
  { pattern: /\b(?:[3-9])\s*(?:lakh|lac|l)\b/i, bracket: 'D' },
];

export default function SearchBar({
  onLocationDetected,
  onOfficeDetected,
  onSchoolDetected,
  onIncomeDetected,
}: SearchBarProps) {
  const [text, setText] = useState('');
  const [detectedFields, setDetectedFields] = useState<string[]>([]);

  // ── Extract keywords from text ──────────────────────────────────────────────
  const extractFromText = useCallback((input: string) => {
    const lower = input.toLowerCase();
    const detected: string[] = [];

    // ── Detect area (location) ────────────────────────────────────────────────
    // Sort by length descending so "Kandivali East" matches before "Kandivali"
    const sortedAreas = [...MUMBAI_AREAS].sort((a, b) => b.length - a.length);

    let locationFound = '';
    let officeFound = '';
    let schoolArea = '';

    for (const area of sortedAreas) {
      const areaLower = area.toLowerCase();
      if (lower.includes(areaLower)) {
        // Check context — is it near "office" or "work"?
        const officeContext = new RegExp(
          `(?:office|work(?:place)?|job)\\s+(?:in|at|near|around)\\s+${areaLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}|` +
          `${areaLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s+(?:office|work(?:place)?)`,
          'i'
        );
        const schoolContext = new RegExp(
          `(?:school|college|education)\\s+(?:in|at|near|around)\\s+${areaLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}|` +
          `${areaLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s+(?:school|college)`,
          'i'
        );

        if (officeContext.test(input) && !officeFound) {
          officeFound = area;
          onOfficeDetected(area);
          detected.push(`Office: ${area}`);
        } else if (schoolContext.test(input) && !schoolArea) {
          schoolArea = area;
          onSchoolDetected(area);
          detected.push(`School: ${area}`);
        } else if (!locationFound) {
          locationFound = area;
          onLocationDetected(area);
          detected.push(`Location: ${area}`);
        }
      }
    }

    // If "school" is mentioned but no specific school area found, use the location
    if (!schoolArea && /school/i.test(input) && locationFound) {
      onSchoolDetected(locationFound);
      detected.push(`School: ${locationFound} (assumed)`);
    }

    // ── Detect income ─────────────────────────────────────────────────────────
    let incomeFound = false;

    // Try specific income patterns first
    for (const { pattern, bracket } of INCOME_PATTERNS) {
      if (pattern.test(input)) {
        onIncomeDetected(bracket);
        const labels: Record<IncomeBracket, string> = {
          A: '< ₹75K', B: '₹75K–1.5L', C: '₹1.5L–3L', D: '₹3L+',
        };
        detected.push(`Income: ${labels[bracket]}`);
        incomeFound = true;
        break;
      }
    }

    // Fallback to simple number patterns
    if (!incomeFound) {
      for (const { pattern, bracket } of SIMPLE_INCOME) {
        if (pattern.test(input)) {
          onIncomeDetected(bracket);
          const labels: Record<IncomeBracket, string> = {
            A: '< ₹75K', B: '₹75K–1.5L', C: '₹1.5L–3L', D: '₹3L+',
          };
          detected.push(`Income: ${labels[bracket]}`);
          break;
        }
      }
    }

    setDetectedFields(detected);
  }, [onLocationDetected, onOfficeDetected, onSchoolDetected, onIncomeDetected]);

  // ── Handle input change with debounce ───────────────────────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setText(val);

    // Only extract after user has typed a reasonable amount
    if (val.length > 15) {
      extractFromText(val);
    } else {
      setDetectedFields([]);
    }
  };

  return (
    <div className="px-8 md:px-16 pt-8 pb-0">
      {/* Search input */}
      <div className="relative">
        <textarea
          value={text}
          onChange={handleChange}
          rows={2}
          placeholder='e.g. "Looking for a 2BHK near Kandivali East, income around 1.5 lakh, children go to school in Malad"'
          className="w-full px-5 py-4 pr-12 border-[1.5px] border-[var(--border)] rounded-lg
            text-[0.95rem] font-light leading-relaxed
            bg-[var(--surface-2)] text-[var(--text-primary)]
            placeholder:text-[var(--text-muted)] placeholder:text-[0.82rem] placeholder:font-light
            outline-none resize-none
            focus:border-[#B5522A] focus:shadow-[0_0_0_3px_rgba(181,82,42,0.08)]
            transition-all duration-200"
        />
        <span className="absolute right-4 top-4 text-xl text-[var(--text-muted)] pointer-events-none select-none">
          ⌕
        </span>
      </div>

      {/* Hint text */}
      <p className="text-[0.7rem] text-[var(--text-muted)] mt-2 leading-relaxed">
        Type naturally — mention{' '}
        <span className="text-[#B5522A] font-medium">area</span>,{' '}
        <span className="text-[#B5522A] font-medium">office location</span>,{' '}
        <span className="text-[#B5522A] font-medium">income</span>,{' '}
        <span className="text-[#B5522A] font-medium">school</span>.
        We&apos;ll fill the filters below automatically.
      </p>

      {/* Detected fields — shows what was extracted */}
      {detectedFields.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3 mb-1">
          {detectedFields.map((field) => (
            <span
              key={field}
              className="text-[0.65rem] px-2.5 py-1 rounded-full
                bg-[#FAF0E8] text-[#B5522A] font-medium
                flex items-center gap-1"
            >
              <span className="text-[#2D5C44]">✓</span> {field}
            </span>
          ))}
        </div>
      )}

      {/* "or" divider */}
      <div className="flex items-center gap-3 mt-6 mb-2">
        <div className="flex-1 h-px bg-[var(--border)]" />
        <span className="text-[0.6rem] tracking-[0.15em] uppercase text-[var(--text-muted)]">
          or select manually
        </span>
        <div className="flex-1 h-px bg-[var(--border)]" />
      </div>
    </div>
  );
}
