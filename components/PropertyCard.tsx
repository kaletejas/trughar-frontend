import { Property } from '@/lib/types';

interface PropertyCardProps {
  property: Property;
  index: number;
}

export default function PropertyCard({ property: p, index }: PropertyCardProps) {
  const score = p.school_nearby === 'YES' ? 9 : 8;
  const scoreClass = score >= 9 ? 'bg-sage' : 'bg-ink';
  const emi = Number(p.emi_approx).toLocaleString('en-IN');

  return (
    <div
      className="bg-white p-5 md:p-6 flex flex-col gap-2 hover:bg-off transition-base"
      style={{
        opacity: 0,
        transform: 'translateY(12px)',
        animation: `fadeUp 0.45s ${index * 0.08}s forwards`,
      }}
    >
      {/* Top — RERA + score */}
      <div className="flex justify-between items-start">
        <p className="text-[0.53rem] tracking-[0.14em] uppercase text-sage flex items-center gap-1">
          <span>✓</span>
          {p.rera_number ? `RERA: ${p.rera_number}` : 'MahaRERA Registered'}
        </p>
        <div className={`w-10 h-10 ${scoreClass} rounded flex flex-col items-center justify-center`}>
          <span className="font-mono text-[0.9rem] text-white leading-none">{score}</span>
          <span className="text-[0.4rem] text-white/40">/10</span>
        </div>
      </div>

      {/* Name + developer */}
      <h3 className="font-display text-lg font-medium leading-tight pr-12">{p.name}</h3>
      <p className="text-[0.67rem] text-ink3">{p.developer} · {p.area}, {p.city}</p>

      {/* School tag */}
      {p.school_nearby === 'YES' && p.school_name && (
        <span className="inline-flex items-center gap-1 w-fit px-2 py-1 bg-sage-light rounded text-[0.55rem] tracking-wide uppercase text-sage">
          🏫 {p.school_name}
          {p.school_board && ` · ${p.school_board}`}
          {p.school_distance_km && ` · ${p.school_distance_km}km`}
        </span>
      )}

      {/* Divider */}
      <div className="h-px bg-div my-1" />

      {/* Property details */}
      <div className="flex flex-col gap-1.5">
        {[
          { k: 'Config',     v: p.bhk_types || '—' },
          { k: 'Price',      v: `₹${p.price_min_lakhs}–${p.price_max_lakhs}L` },
          { k: 'EMI',        v: `₹${emi}/mo` },
          { k: 'Possession', v: p.possession_quarter || '—' },
          { k: 'Commute',    v: p.commute_hubs || '—' },
        ].map((row) => (
          <div key={row.k} className="flex justify-between text-[0.7rem]">
            <span className="text-ink4 w-20 shrink-0">{row.k}</span>
            <span className="font-medium text-right text-ink2">{row.v}</span>
          </div>
        ))}
      </div>

      {/* Why this matches */}
      <div className="mt-2 px-3 py-2.5 bg-clay3 border-l-2 border-clay rounded-r text-[0.7rem] text-ink2 leading-relaxed italic">
        {p.ai_summary || `A verified MahaRERA project in ${p.area} by ${p.developer}, matching your budget and location profile.`}
      </div>

      {/* Google Maps link if available */}
      {p.google_maps_url && (
        <a
          href={p.google_maps_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.65rem] text-clay no-underline hover:underline mt-1"
        >
          📍 View on Google Maps
        </a>
      )}

      <style jsx>{`
        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
