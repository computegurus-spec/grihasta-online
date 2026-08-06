export type UserRole =
  | 'MC_ADMIN'
  | 'MC_MEMBER'
  | 'RESIDENT_OWNER'
  | 'RESIDENT_TENANT'
  | 'SECURITY_GUARD'
  | 'MAINTENANCE_STAFF';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  flatId?: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface Flat {
  id: string; // e.g. "Lane 1 - Plot 12"
  block: string; // "Lane 1", "Lane 2", ..., "Lane 15"
  floor: number;
  flatNumber: string; // Plot / Villa number
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  tenantName?: string;
  tenantPhone?: string;
  occupancyType: 'Owner Occupied' | 'Rented' | 'Vacant';
  sqft: number;
  monthlyDuesRate: number;
  vehiclesCount: number;
  registeredHelpCount: number;
}

export interface Vehicle {
  id: string;
  flatId: string;
  type: 'Car' | 'Bike' | 'EV Car' | 'EV Bike';
  registrationNumber: string;
  parkingSlot: string;
  ownerName: string;
}

export interface DomesticHelp {
  id: string;
  flatId: string;
  name: string;
  role: 'Maid' | 'Cook' | 'Driver' | 'Nanny' | 'Gardener';
  phone: string;
  passCode: string;
  entryTime?: string;
  status: 'In Layout' | 'Out';
}

export interface VisitorLog {
  id: string;
  visitorName: string;
  phone: string;
  flatId: string;
  purpose: 'Guest' | 'Delivery' | 'Service Technician' | 'Cab' | 'Official';
  passCode?: string;
  entryTime: string;
  exitTime?: string;
  approvedBy?: string;
  status: 'Pre-Approved' | 'Checked-In' | 'Checked-Out' | 'Denied';
  vehicleNo?: string;
}

export interface DeliveryLog {
  id: string;
  provider: 'Amazon' | 'Swiggy' | 'Zomato' | 'Flipkart' | 'Blinkit' | 'Courier' | 'Other';
  flatId: string;
  executiveName: string;
  phone: string;
  entryTime: string;
  status: 'At Gate' | 'Delivered to Door' | 'Left at Gate';
  packageCount: number;
}

export interface MaintenanceDue {
  id: string;
  flatId: string;
  month: string; // e.g. "August 2026"
  amount: number;
  dueDate: string;
  paidDate?: string;
  paymentMode?: 'UPI' | 'Bank Transfer' | 'Cash' | 'Cheque';
  transactionId?: string;
  status: 'Paid' | 'Pending' | 'Overdue';
}

export interface LedgerExpense {
  id: string;
  date: string;
  category: 'Security' | 'Gardening' | 'Electricity' | 'Water Tanker' | 'Repairs' | 'Staff Salary' | 'Event' | 'Miscellaneous';
  description: string;
  amount: number;
  vendorName: string;
  approvedBy: string;
  receiptUrl?: string;
}

export type TicketCategory = 'Electrical' | 'Plumbing' | 'Security' | 'Cleanliness' | 'Gardening' | 'Lift/Infrastructure' | 'General';
export type TicketStatus = 'Open' | 'In Progress' | 'Resolved';

export interface ComplaintTicket {
  id: string;
  flatId: string;
  residentName: string;
  category: TicketCategory;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Emergency';
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  assignedStaff?: string;
  assignedStaffPhone?: string;
  slaHours: number;
  rating?: number; // 1 to 5 stars
  feedbackComment?: string;
}

export interface Amenity {
  id: string;
  name: string;
  description: string;
  iconName: string;
  capacity: number;
  operatingHours: string;
  rules: string[];
}

export interface AmenityBooking {
  id: string;
  amenityId: string;
  amenityName: string;
  flatId: string;
  residentName: string;
  bookingDate: string;
  slotTime: string;
  purpose?: string;
  guestsCount: number;
  status: 'Confirmed' | 'Cancelled';
  createdAt: string;
}

export interface Notice {
  id: string;
  title: string;
  category: 'Official MC' | 'Emergency Alert' | 'Maintenance Schedule' | 'Community Event';
  content: string;
  date: string;
  postedBy: string;
  isPinned: boolean;
  isEmergencyBanner?: boolean;
}

export interface CommunityPoll {
  id: string;
  question: string;
  options: { id: string; text: string; votes: number }[];
  totalVotes: number;
  votedFlatIds: string[];
  createdAt: string;
  expiresAt: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: 'Security Guard' | 'Housekeeping' | 'Plumber' | 'Electrician' | 'Gardener' | 'Estate Manager';
  phone: string;
  shift: 'Morning (6 AM - 2 PM)' | 'Evening (2 PM - 10 PM)' | 'Night (10 PM - 6 AM)' | 'General (9 AM - 6 PM)';
  status: 'On Duty' | 'Off Duty' | 'On Leave';
  inTime?: string;
  outTime?: string;
  attendancePercentThisMonth: number;
  monthlySalary: number;
}

// MODULE 09: COMMUNITY & SOCIAL TYPES
export interface ResidentSocialProfile {
  id: string;
  flatId: string;
  name: string;
  moveInYear: number;
  aboutMe: string;
  hobbies: string[];
  profession: string;
  languages: string[];
  familyMembers: string[];
  isMcVerified: boolean;
  showPhoneToNeighbours: boolean;
  phone: string;
  avatarColor: string;
}

export interface PostComment {
  id: string;
  flatId: string;
  authorName: string;
  commentText: string;
  createdAt: string;
}

export interface CommunityPost {
  id: string;
  flatId: string;
  authorName: string;
  category: 'General' | 'Help Needed' | 'Good News' | 'Alert' | 'Question';
  content: string;
  likesCount: number;
  likedFlatIds: string[];
  comments: PostComment[];
  isPinned: boolean;
  createdAt: string;
}

export interface MarketplaceItem {
  id: string;
  flatId: string;
  sellerName: string;
  title: string;
  category: 'Baby Gear' | 'Furniture' | 'Appliances' | 'Books & Games' | 'Sports' | 'Other';
  price: number; // 0 for Free to Take
  isFreeToTake: boolean;
  description: string;
  status: 'Available' | 'Sold' | 'Reserved';
  createdAt: string;
  contactPhone: string;
}

export interface LostAndFoundItem {
  id: string;
  type: 'Lost' | 'Found';
  title: string;
  location: string;
  date: string;
  flatId: string;
  contactName: string;
  contactPhone: string;
  description: string;
  status: 'Active' | 'Resolved';
}

export interface VendorRecommendation {
  id: string;
  flatId: string;
  residentName: string;
  serviceCategory: 'Plumber' | 'Electrician' | 'Tutor' | 'Painter' | 'Carpenter' | 'AC Service' | 'Car Wash';
  vendorName: string;
  vendorPhone: string;
  rating: number; // 1 to 5 stars
  reviewText: string;
  createdAt: string;
}

export interface CarpoolRoute {
  id: string;
  flatId: string;
  driverName: string;
  destination: string; // e.g. "Whitefield", "Koramangala", "Electronic City"
  departureTime: string;
  availableSeats: number;
  notes: string;
  days: string[];
  phone: string;
}

export interface InterestGroup {
  id: string;
  name: string;
  category: 'Parents' | 'Cycling' | 'Seniors' | 'Pet Owners' | 'Sports' | 'Books';
  description: string;
  membersCount: number;
  joinedFlatIds: string[];
  iconName: string;
}
