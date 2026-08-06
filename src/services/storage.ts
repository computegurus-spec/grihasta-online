import type {
  Flat,
  DomesticHelp,
  VisitorLog,
  DeliveryLog,
  MaintenanceDue,
  LedgerExpense,
  ComplaintTicket,
  Amenity,
  AmenityBooking,
  Notice,
  CommunityPoll,
  StaffMember,
  ResidentSocialProfile,
  CommunityPost,
  MarketplaceItem,
  LostAndFoundItem,
  VendorRecommendation,
  CarpoolRoute,
  InterestGroup
} from '../types';

import {
  INITIAL_FLATS,
  INITIAL_DOMESTIC_HELP,
  INITIAL_VISITOR_LOGS,
  INITIAL_DELIVERIES,
  INITIAL_MAINTENANCE_DUES,
  INITIAL_EXPENSES,
  INITIAL_TICKETS,
  INITIAL_AMENITIES,
  INITIAL_BOOKINGS,
  INITIAL_NOTICES,
  INITIAL_POLLS,
  INITIAL_STAFF,
  INITIAL_RESIDENT_PROFILES,
  INITIAL_COMMUNITY_POSTS,
  INITIAL_MARKETPLACE,
  INITIAL_LOST_FOUND,
  INITIAL_RECOMMENDATIONS,
  INITIAL_CARPOOLS,
  INITIAL_GROUPS
} from './mockData';

const KEYS = {
  FLATS: 'grihasta_flats_v2',
  DOMESTIC_HELP: 'grihasta_domestic_help_v2',
  VISITORS: 'grihasta_visitors_v2',
  DELIVERIES: 'grihasta_deliveries_v2',
  DUES: 'grihasta_dues_v2',
  EXPENSES: 'grihasta_expenses_v2',
  TICKETS: 'grihasta_tickets_v2',
  AMENITIES: 'grihasta_amenities_v2',
  BOOKINGS: 'grihasta_bookings_v2',
  NOTICES: 'grihasta_notices_v2',
  POLLS: 'grihasta_polls_v2',
  STAFF: 'grihasta_staff_v2',
  PROFILES: 'grihasta_social_profiles_v2',
  POSTS: 'grihasta_community_posts_v2',
  MARKETPLACE: 'grihasta_marketplace_v2',
  LOST_FOUND: 'grihasta_lost_found_v2',
  RECOMMENDATIONS: 'grihasta_recommendations_v2',
  CARPOOLS: 'grihasta_carpools_v2',
  GROUPS: 'grihasta_groups_v2'
};

function getItem<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error writing ${key} to localStorage`, e);
  }
}

export const StorageEngine = {
  getFlats: (): Flat[] => getItem(KEYS.FLATS, INITIAL_FLATS),
  saveFlats: (flats: Flat[]) => setItem(KEYS.FLATS, flats),

  getDomesticHelp: (): DomesticHelp[] => getItem(KEYS.DOMESTIC_HELP, INITIAL_DOMESTIC_HELP),
  saveDomesticHelp: (help: DomesticHelp[]) => setItem(KEYS.DOMESTIC_HELP, help),

  getVisitorLogs: (): VisitorLog[] => getItem(KEYS.VISITORS, INITIAL_VISITOR_LOGS),
  saveVisitorLogs: (logs: VisitorLog[]) => setItem(KEYS.VISITORS, logs),

  getDeliveries: (): DeliveryLog[] => getItem(KEYS.DELIVERIES, INITIAL_DELIVERIES),
  saveDeliveries: (del: DeliveryLog[]) => setItem(KEYS.DELIVERIES, del),

  getDues: (): MaintenanceDue[] => getItem(KEYS.DUES, INITIAL_MAINTENANCE_DUES),
  saveDues: (dues: MaintenanceDue[]) => setItem(KEYS.DUES, dues),

  getExpenses: (): LedgerExpense[] => getItem(KEYS.EXPENSES, INITIAL_EXPENSES),
  saveExpenses: (exp: LedgerExpense[]) => setItem(KEYS.EXPENSES, exp),

  getTickets: (): ComplaintTicket[] => getItem(KEYS.TICKETS, INITIAL_TICKETS),
  saveTickets: (tickets: ComplaintTicket[]) => setItem(KEYS.TICKETS, tickets),

  getAmenities: (): Amenity[] => getItem(KEYS.AMENITIES, INITIAL_AMENITIES),
  saveAmenities: (amenities: Amenity[]) => setItem(KEYS.AMENITIES, amenities),

  getBookings: (): AmenityBooking[] => getItem(KEYS.BOOKINGS, INITIAL_BOOKINGS),
  saveBookings: (bkg: AmenityBooking[]) => setItem(KEYS.BOOKINGS, bkg),

  getNotices: (): Notice[] => getItem(KEYS.NOTICES, INITIAL_NOTICES),
  saveNotices: (n: Notice[]) => setItem(KEYS.NOTICES, n),

  getPolls: (): CommunityPoll[] => getItem(KEYS.POLLS, INITIAL_POLLS),
  savePolls: (p: CommunityPoll[]) => setItem(KEYS.POLLS, p),

  getStaff: (): StaffMember[] => getItem(KEYS.STAFF, INITIAL_STAFF),
  saveStaff: (s: StaffMember[]) => setItem(KEYS.STAFF, s),

  getSocialProfiles: (): ResidentSocialProfile[] => getItem(KEYS.PROFILES, INITIAL_RESIDENT_PROFILES),
  saveSocialProfiles: (p: ResidentSocialProfile[]) => setItem(KEYS.PROFILES, p),

  getCommunityPosts: (): CommunityPost[] => getItem(KEYS.POSTS, INITIAL_COMMUNITY_POSTS),
  saveCommunityPosts: (p: CommunityPost[]) => setItem(KEYS.POSTS, p),

  getMarketplaceItems: (): MarketplaceItem[] => getItem(KEYS.MARKETPLACE, INITIAL_MARKETPLACE),
  saveMarketplaceItems: (m: MarketplaceItem[]) => setItem(KEYS.MARKETPLACE, m),

  getLostAndFound: (): LostAndFoundItem[] => getItem(KEYS.LOST_FOUND, INITIAL_LOST_FOUND),
  saveLostAndFound: (lf: LostAndFoundItem[]) => setItem(KEYS.LOST_FOUND, lf),

  getRecommendations: (): VendorRecommendation[] => getItem(KEYS.RECOMMENDATIONS, INITIAL_RECOMMENDATIONS),
  saveRecommendations: (r: VendorRecommendation[]) => setItem(KEYS.RECOMMENDATIONS, r),

  getCarpools: (): CarpoolRoute[] => getItem(KEYS.CARPOOLS, INITIAL_CARPOOLS),
  saveCarpools: (c: CarpoolRoute[]) => setItem(KEYS.CARPOOLS, c),

  getGroups: (): InterestGroup[] => getItem(KEYS.GROUPS, INITIAL_GROUPS),
  saveGroups: (g: InterestGroup[]) => setItem(KEYS.GROUPS, g),

  resetAllToDefault: () => {
    localStorage.clear();
    console.log('All local storage cleared');
  }
};
