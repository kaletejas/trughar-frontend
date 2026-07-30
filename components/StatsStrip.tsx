export default function StatsStrip() {
  const stats = [
    { num: '01', value: '4',    label: 'Questions that define\nthe right home' },
    { num: '02', value: '100%', label: 'MahaRERA-registered\nprojects only' },
    { num: '03', value: '0',    label: 'Cold calls after\nyour enquiry' },
    { num: '04', value: '1',    label: 'Advisor. Complete\nfocus on you.' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 border-b border-div">
      {stats.map((s, i) => (
        <div
          key={s.num}
          className={`px-6 md:px-10 py-8 flex flex-col gap-2 transition-base hover:bg-off
            ${i < 3 ? 'border-r border-div' : ''}
            ${i < 2 ? 'md:border-r' : ''}
            ${i === 1 ? 'border-r-0 md:border-r' : ''}
            ${i >= 2 ? 'border-t md:border-t-0' : ''}`}
        >
          <span className="font-mono text-[0.55rem] text-clay tracking-wide">{s.num}</span>
          <span className="font-display text-3xl md:text-4xl font-extralight text-ink leading-none">{s.value}</span>
          <span className="text-[0.73rem] text-ink3 leading-snug whitespace-pre-line">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
