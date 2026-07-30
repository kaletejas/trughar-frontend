import { IncomeBracket } from './types';

// ── Mumbai Western Line areas — dropdown options ─────────────────────────────
export const MUMBAI_AREAS = [
  'Churchgate', 'Marine Lines', 'Charni Road', 'Grant Road', 'Mumbai Central',
  'Mahalaxmi', 'Lower Parel', 'Elphinstone', 'Dadar', 'Matunga Road',
  'Mahim', 'Bandra', 'Khar Road', 'Santacruz', 'Vile Parle',
  'Andheri East', 'Andheri West', 'Jogeshwari', 'Goregaon East', 'Goregaon West',
  'Malad East', 'Malad West', 'Kandivali East', 'Kandivali West',
  'Borivali East', 'Borivali West', 'Dahisar East', 'Dahisar West',
  'Mira Road', 'Bhayandar', 'Vasai', 'Virar',
  'Thane West', 'Thane East', 'Mulund', 'Powai', 'Chembur',
  'Navi Mumbai', 'Kharghar', 'Panvel', 'BKC', 'Worli',
  'Other',
];

// ── Office hub areas ─────────────────────────────────────────────────────────
export const OFFICE_AREAS = [
  'BKC', 'Lower Parel', 'Nariman Point', 'Andheri East', 'Goregaon East',
  'Powai', 'Worli', 'Fort', 'Thane', 'Malad West',
  'Navi Mumbai', 'Airoli', 'Vikhroli', 'Chandivali', 'Borivali',
  'Other',
];

// ── School board options ─────────────────────────────────────────────────────
export const SCHOOL_BOARDS = ['CBSE', 'ICSE', 'IB', 'State Board', 'Any board'];

// ── Income brackets with affordability data ──────────────────────────────────
export const INCOME_BRACKETS: Record<IncomeBracket, {
  label: string;
  shortLabel: string;
  safeEmi: string;
  loanEligibility: string;
  budget: string;
  note: string;
}> = {
  A: {
    label: 'Below ₹75,000',
    shortLabel: '< ₹75K',
    safeEmi: '₹22,000–30,000',
    loanEligibility: '₹20–28L',
    budget: '₹28–44L',
    note: 'Best zones: Virar, Nallasopara, Kalyan West, Badlapur',
  },
  B: {
    label: '₹75K – ₹1.5 Lakh',
    shortLabel: '₹75K–1.5L',
    safeEmi: '₹30,000–60,000',
    loanEligibility: '₹28–55L',
    budget: '₹44–90L',
    note: 'Best zones: Thane West, Mira-Bhayandar, Mulund, Navi Mumbai',
  },
  C: {
    label: '₹1.5L – ₹3 Lakh',
    shortLabel: '₹1.5L–3L',
    safeEmi: '₹60,000–₹1.2L',
    loanEligibility: '₹55L–₹1.1Cr',
    budget: '₹90L–₹1.8Cr',
    note: 'Best zones: Powai, Kandivali East, Thane West premium, Chembur',
  },
  D: {
    label: 'Above ₹3 Lakh',
    shortLabel: '₹3L+',
    safeEmi: '₹1.2L+',
    loanEligibility: '₹1.1Cr+',
    budget: '₹1.8Cr+',
    note: 'Best zones: Bandra East, BKC-adjacent, Borivali luxury, Seawoods',
  },
};
