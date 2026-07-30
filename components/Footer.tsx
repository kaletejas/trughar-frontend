export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-6 border-t border-div gap-3 text-center md:text-left">
      <div className="font-display text-base tracking-wide">
        TruGhar<sup className="text-[0.45rem] text-clay ml-0.5">Mumbai</sup>
      </div>
      <p className="text-[0.62rem] text-ink4">
        © {new Date().getFullYear()} TruGhar Realty. Mumbai, India. All rights reserved.
      </p>
      <p className="font-mono text-[0.58rem] text-ink4">
        MahaRERA · RERA Compliant
      </p>
    </footer>
  );
}
