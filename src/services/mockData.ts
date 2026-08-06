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

// Clean initial data — ready for real resident onboarding
export const INITIAL_FLATS: Flat[] = [];
export const INITIAL_DOMESTIC_HELP: DomesticHelp[] = [];
export const INITIAL_VISITOR_LOGS: VisitorLog[] = [];
export const INITIAL_DELIVERIES: DeliveryLog[] = [];
export const INITIAL_MAINTENANCE_DUES: MaintenanceDue[] = [];
export const INITIAL_EXPENSES: LedgerExpense[] = [];
export const INITIAL_TICKETS: ComplaintTicket[] = [];

// Standard Grihasta Layout Amenities
export const INITIAL_AMENITIES: Amenity[] = [
  { id: 'AMN-1', name: 'Artha Clubhouse Party Hall', description: 'Air-conditioned hall with seating for 120 guests, audio system, and pantry area.', iconName: 'Building', capacity: 120, operatingHours: '09:00 AM - 11:00 PM', rules: ['No loud music after 10 PM', 'Clean up required after event', 'Security deposit ₹2,000'] },
  { id: 'AMN-2', name: 'Swimming Pool', description: '25-meter lap pool with kids wading section & changing rooms.', iconName: 'Waves', capacity: 30, operatingHours: '06:00 AM - 09:00 PM', rules: ['Swimming costume mandatory', 'Shower before entry', 'Children below 10 must be accompanied by adults'] },
  { id: 'AMN-3', name: 'Badminton Court 1', description: 'Indoor wooden floor badminton court with LED spotlighting.', iconName: 'Activity', capacity: 4, operatingHours: '06:00 AM - 10:00 PM', rules: ['Non-marking shoes mandatory', 'Max 1 hour slot per flat per day'] },
  { id: 'AMN-4', name: 'Layout Gymnasium', description: 'Fully equipped gym with treadmills, ellipticals, free weights & multi-gym.', iconName: 'Dumbbell', capacity: 15, operatingHours: '05:30 AM - 09:30 PM', rules: ['Carry personal gym towel', 'Wipe down equipment after use', 'Sports shoes mandatory'] }
];

export const INITIAL_BOOKINGS: AmenityBooking[] = [];
export const INITIAL_NOTICES: Notice[] = [];
export const INITIAL_POLLS: CommunityPoll[] = [];
export const INITIAL_STAFF: StaffMember[] = [];

// MODULE 09 SEED DATA - CLEAN
export const INITIAL_RESIDENT_PROFILES: ResidentSocialProfile[] = [];
export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [];
export const INITIAL_MARKETPLACE: MarketplaceItem[] = [];
export const INITIAL_LOST_FOUND: LostAndFoundItem[] = [];
export const INITIAL_RECOMMENDATIONS: VendorRecommendation[] = [];
export const INITIAL_CARPOOLS: CarpoolRoute[] = [];

export const INITIAL_GROUPS: InterestGroup[] = [
  { id: 'GRP-1', name: 'Artha Grihasta Parents Forum', category: 'Parents', description: 'Group for parents in the layout to coordinate playdates, school bus drop-offs, and kids sports activities.', membersCount: 0, joinedFlatIds: [], iconName: 'Users' },
  { id: 'GRP-2', name: 'Grihasta Weekend Cyclists', category: 'Cycling', description: 'Early morning cycling enthusiasts doing rides around Sarjapur & Varthur routes.', membersCount: 0, joinedFlatIds: [], iconName: 'Activity' },
  { id: 'GRP-3', name: 'Green Thumb & Organic Gardening', category: 'Pet Owners', description: 'Tips on terrace gardening, composting, balcony pots, and plant swaps.', membersCount: 0, joinedFlatIds: [], iconName: 'Flower2' }
];
