'use client';

import { useState, useRef, useEffect } from 'react';

interface DropdownProps {
  label: string;
  icon: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function Dropdown({ label, icon, options, value, onChange, placeholder = 'Select' }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = options.filter((o) =>
    o.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-1" ref={ref}>
      <label className="text-[0.68rem] text-ink4 tracking-wide flex items-center gap-1.5">
        <span>{icon}</span> {label}
      </label>

      <button
        type="button"
        onClick={() => { setOpen(!open); setSearch(''); }}
        className={`w-full px-3 py-2.5 border rounded text-left text-[0.82rem] flex items-center justify-between transition-base
          ${value
            ? 'border-clay bg-clay3 text-ink'
            : 'border-div2 bg-off text-ink3 hover:border-ink4'
          }`}
      >
        <span>{value || placeholder}</span>
        <span className="text-ink4 text-[0.7rem]">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="relative z-40">
          <div className="absolute top-0 left-0 right-0 bg-white border border-div2 rounded shadow-lg max-h-56 overflow-y-auto">
            {/* Search input */}
            <div className="sticky top-0 bg-white border-b border-div p-2">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type to search..."
                className="w-full px-2 py-1.5 text-[0.78rem] border border-div2 rounded outline-none focus:border-clay bg-off"
                autoFocus
              />
            </div>

            {/* Options */}
            {filtered.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => { onChange(option); setOpen(false); }}
                className={`w-full px-3 py-2 text-left text-[0.78rem] hover:bg-off transition-fast
                  ${value === option ? 'bg-clay3 text-clay font-medium' : 'text-ink2'}`}
              >
                {option}
              </button>
            ))}

            {filtered.length === 0 && (
              <div className="px-3 py-3 text-[0.75rem] text-ink4 text-center">
                No match found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
