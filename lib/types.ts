// ── Property from API response ────────────────────────────────────────────────
export interface Property {
  id: number;
  name: string;
  developer: string;
  is_active: 'YES' | 'NO' | 'FEATURED';
  area: string;
  city: string;
  latitude: number;
  longitude: number;
  google_maps_url?: string;
  bhk_types: string;
  price_min_lakhs: number;
  price_max_lakhs: number;
  emi_approx: number;
  possession_quarter: string;
  rera_number: string;
  rera_verified: 'YES' | 'NO';
  school_nearby: 'YES' | 'NO';
  school_name?: string;
  school_board?: string;
  school_distance_km?: number;
  commute_hubs?: string;
  nearest_station?: string;
  station_distance_km?: number;
  image_url?: string;
  listing_url?: string;
  ai_summary?: string;
  match_tags?: string;
}

// ── Wizard inputs ─────────────────────────────────────────────────────────────
export type IncomeBracket = 'A' | 'B' | 'C' | 'D';

export interface WizardInput {
  current_location: string;
  office_location: string;
  school_location?: string;
  income_bracket: IncomeBracket;
}

// ── API responses ─────────────────────────────────────────────────────────────
export interface BracketInfo {
  label: string;
  safe_emi: number;
  max_price_lakhs: number;
}

export interface RecommendResponse {
  success: boolean;
  properties: Property[];
  bracket_info: BracketInfo;
  total_found: number;
}

export interface EnquiryInput {
  name: string;
  phone: string;
  property_id: number;
  property_name: string;
}
