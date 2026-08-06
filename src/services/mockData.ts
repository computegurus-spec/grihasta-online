import type {
  Flat,
  Vehicle,
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

export const INITIAL_FLATS: Flat[] = [
  { id: 'L01-P12', block: 'Lane 1', floor: 1, flatNumber: 'Plot 12', ownerName: 'Sadish Sugumaran', ownerPhone: '+91 99000 15844', ownerEmail: 'sadish.sugumaran@gmail.com', occupancyType: 'Owner Occupied', sqft: 2400, monthlyDuesRate: 3500, vehiclesCount: 2, registeredHelpCount: 1 },
  { id: 'L01-P15', block: 'Lane 1', floor: 1, flatNumber: 'Plot 15', ownerName: 'Ramesh Kumar', ownerPhone: '+91 98450 11223', ownerEmail: 'ramesh.k@gmail.com', tenantName: 'Vikram Sethi', tenantPhone: '+91 97411 55667', occupancyType: 'Rented', sqft: 1800, monthlyDuesRate: 3200, vehiclesCount: 1, registeredHelpCount: 1 },
  
  { id: 'L02-P24', block: 'Lane 2', floor: 1, flatNumber: 'Plot 24', ownerName: 'Priya Sharma', ownerPhone: '+91 99801 22334', ownerEmail: 'priya.s@gmail.com', occupancyType: 'Owner Occupied', sqft: 3000, monthlyDuesRate: 4000, vehiclesCount: 2, registeredHelpCount: 2 },
  { id: 'L02-P28', block: 'Lane 2', floor: 1, flatNumber: 'Plot 28', ownerName: 'Anil Deshmukh', ownerPhone: '+91 98860 33445', ownerEmail: 'anil.d@gmail.com', occupancyType: 'Vacant', sqft: 2400, monthlyDuesRate: 3200, vehiclesCount: 0, registeredHelpCount: 0 },
  
  { id: 'L03-P35', block: 'Lane 3', floor: 1, flatNumber: 'Plot 35', ownerName: 'Srinivas Murthy', ownerPhone: '+91 94480 55667', ownerEmail: 'smurthy@yahoo.com', occupancyType: 'Owner Occupied', sqft: 2400, monthlyDuesRate: 3400, vehiclesCount: 1, registeredHelpCount: 1 },
  { id: 'L04-P42', block: 'Lane 4', floor: 1, flatNumber: 'Plot 42', ownerName: 'Kavita Reddy', ownerPhone: '+91 99451 66778', ownerEmail: 'kavita.r@gmail.com', tenantName: 'Arjun Mehta', tenantPhone: '+91 98112 33445', occupancyType: 'Rented', sqft: 2400, monthlyDuesRate: 3400, vehiclesCount: 2, registeredHelpCount: 1 },
  
  { id: 'L05-P58', block: 'Lane 5', floor: 1, flatNumber: 'Plot 58', ownerName: 'Deepak Patel', ownerPhone: '+91 98200 77889', ownerEmail: 'deepak.p@gmail.com', occupancyType: 'Owner Occupied', sqft: 3600, monthlyDuesRate: 4200, vehiclesCount: 2, registeredHelpCount: 1 },
  { id: 'L07-P72', block: 'Lane 7', floor: 1, flatNumber: 'Plot 72', ownerName: 'Meenakshi Sundaram', ownerPhone: '+91 94432 88990', ownerEmail: 'meena.s@gmail.com', occupancyType: 'Owner Occupied', sqft: 2400, monthlyDuesRate: 3200, vehiclesCount: 1, registeredHelpCount: 0 },

  { id: 'L09-P94', block: 'Lane 9', floor: 1, flatNumber: 'Plot 94', ownerName: 'Rajesh Iyer', ownerPhone: '+91 98440 99001', ownerEmail: 'rajesh.iyer@gmail.com', occupancyType: 'Owner Occupied', sqft: 2800, monthlyDuesRate: 3600, vehiclesCount: 2, registeredHelpCount: 1 },
  { id: 'L12-P120', block: 'Lane 12', floor: 1, flatNumber: 'Plot 120', ownerName: 'Sunita Nair', ownerPhone: '+91 99011 00112', ownerEmail: 'sunita.n@gmail.com', occupancyType: 'Owner Occupied', sqft: 2800, monthlyDuesRate: 3600, vehiclesCount: 1, registeredHelpCount: 1 },
  
  { id: 'L14-P142', block: 'Lane 14', floor: 1, flatNumber: 'Plot 142', ownerName: 'Harish Chandra', ownerPhone: '+91 98800 11223', ownerEmail: 'harish.c@gmail.com', occupancyType: 'Owner Occupied', sqft: 4000, monthlyDuesRate: 4500, vehiclesCount: 3, registeredHelpCount: 2 },
  { id: 'L15-P150', block: 'Lane 15', floor: 1, flatNumber: 'Plot 150', ownerName: 'Gaurav Gupta', ownerPhone: '+91 99160 22334', ownerEmail: 'gaurav.g@gmail.com', tenantName: 'Sneha Roy', tenantPhone: '+91 97311 44556', occupancyType: 'Rented', sqft: 3000, monthlyDuesRate: 3800, vehiclesCount: 1, registeredHelpCount: 1 }
];

export const INITIAL_VEHICLES: Vehicle[] = [
  { id: 'V-101', flatId: 'L01-P12', type: 'Car', registrationNumber: 'KA-01-MJ-4892', parkingSlot: 'P-L01-12', ownerName: 'Sadish Sugumaran' },
  { id: 'V-102', flatId: 'L01-P12', type: 'EV Bike', registrationNumber: 'KA-01-EP-1204', parkingSlot: 'P-L01-12B', ownerName: 'Sadish Sugumaran' },
  { id: 'V-103', flatId: 'L02-P24', type: 'Car', registrationNumber: 'KA-05-NB-7788', parkingSlot: 'P-L02-24', ownerName: 'Priya Sharma' },
  { id: 'V-104', flatId: 'L04-P42', type: 'EV Car', registrationNumber: 'KA-03-EV-9900', parkingSlot: 'P-L04-42', ownerName: 'Arjun Mehta' },
  { id: 'V-105', flatId: 'L09-P94', type: 'Car', registrationNumber: 'KA-51-MD-3344', parkingSlot: 'P-L09-94', ownerName: 'Rajesh Iyer' },
  { id: 'V-106', flatId: 'L14-P142', type: 'Car', registrationNumber: 'KA-04-HA-1111', parkingSlot: 'P-L14-142', ownerName: 'Harish Chandra' }
];

export const INITIAL_DOMESTIC_HELP: DomesticHelp[] = [
  { id: 'DH-1', flatId: 'L01-P12', name: 'Lakshmi Devi', role: 'Maid', phone: '+91 98444 11223', passCode: 'GH-301', status: 'In Layout', entryTime: '08:30 AM' },
  { id: 'DH-2', flatId: 'L02-P24', name: 'Raju Gowda', role: 'Driver', phone: '+91 97410 99887', passCode: 'GH-302', status: 'Out' },
  { id: 'DH-3', flatId: 'L03-P35', name: 'Saraswathi', role: 'Cook', phone: '+91 99022 33445', passCode: 'GH-303', status: 'In Layout', entryTime: '07:45 AM' },
  { id: 'DH-4', flatId: 'L14-P142', name: 'Muniyappa', role: 'Gardener', phone: '+91 98801 55443', passCode: 'GH-304', status: 'Out' }
];

export const INITIAL_VISITOR_LOGS: VisitorLog[] = [
  { id: 'VIS-101', visitorName: 'Senthil Kumar', phone: '+91 98452 77112', flatId: 'L01-P12', purpose: 'Guest', passCode: 'VP-9821', entryTime: '10:15 AM', status: 'Checked-In', approvedBy: 'Sadish Sugumaran', vehicleNo: 'KA-03-MS-2211' },
  { id: 'VIS-102', visitorName: 'Ramesh (Swiggy)', phone: '+91 97400 33221', flatId: 'L04-P42', purpose: 'Delivery', entryTime: '11:05 AM', exitTime: '11:18 AM', status: 'Checked-Out' },
  { id: 'VIS-103', visitorName: 'Dr. Anita Roy', phone: '+91 99001 88776', flatId: 'L09-P94', purpose: 'Guest', passCode: 'VP-4491', entryTime: 'Pending', status: 'Pre-Approved', approvedBy: 'Rajesh Iyer' },
  { id: 'VIS-104', visitorName: 'Urban Company Tech', phone: '+91 98860 11998', flatId: 'L02-P24', purpose: 'Service Technician', passCode: 'VP-7720', entryTime: '09:00 AM', status: 'Checked-In', approvedBy: 'Priya Sharma' }
];

export const INITIAL_DELIVERIES: DeliveryLog[] = [
  { id: 'DEL-01', provider: 'Amazon', flatId: 'L01-P12', executiveName: 'Mahesh B', phone: '+91 98800 44332', entryTime: '09:45 AM', status: 'Left at Gate', packageCount: 2 },
  { id: 'DEL-02', provider: 'Swiggy', flatId: 'L04-P42', executiveName: 'Ramesh', phone: '+91 97400 33221', entryTime: '11:05 AM', status: 'Delivered to Door', packageCount: 1 },
  { id: 'DEL-03', provider: 'Blinkit', flatId: 'L14-P142', executiveName: 'Kiran', phone: '+91 99011 55667', entryTime: '11:40 AM', status: 'Delivered to Door', packageCount: 3 }
];

export const INITIAL_MAINTENANCE_DUES: MaintenanceDue[] = [
  { id: 'DUE-L01-P12-AUG', flatId: 'L01-P12', month: 'August 2026', amount: 3500, dueDate: '2026-08-10', paidDate: '2026-08-02', paymentMode: 'UPI', transactionId: 'UPI/6219804412/OKAXIS', status: 'Paid' },
  { id: 'DUE-L01-P15-AUG', flatId: 'L01-P15', month: 'August 2026', amount: 3200, dueDate: '2026-08-10', status: 'Pending' },
  { id: 'DUE-L02-P24-AUG', flatId: 'L02-P24', month: 'August 2026', amount: 4000, dueDate: '2026-08-10', paidDate: '2026-08-04', paymentMode: 'Bank Transfer', transactionId: 'NEFT/887123904', status: 'Paid' },
  { id: 'DUE-L02-P28-AUG', flatId: 'L02-P28', month: 'August 2026', amount: 3200, dueDate: '2026-08-10', status: 'Overdue' },
  { id: 'DUE-L03-P35-AUG', flatId: 'L03-P35', month: 'August 2026', amount: 3400, dueDate: '2026-08-10', paidDate: '2026-08-05', paymentMode: 'UPI', transactionId: 'UPI/998127341/PAYTM', status: 'Paid' },
  { id: 'DUE-L04-P42-AUG', flatId: 'L04-P42', month: 'August 2026', amount: 3400, dueDate: '2026-08-10', status: 'Pending' },
  { id: 'DUE-L05-P58-AUG', flatId: 'L05-P58', month: 'August 2026', amount: 4200, dueDate: '2026-08-10', status: 'Overdue' },
  { id: 'DUE-L09-P94-AUG', flatId: 'L09-P94', month: 'August 2026', amount: 3600, dueDate: '2026-08-10', paidDate: '2026-08-01', paymentMode: 'UPI', transactionId: 'UPI/001928472/GPAY', status: 'Paid' },
  { id: 'DUE-L14-P142-AUG', flatId: 'L14-P142', month: 'August 2026', amount: 4500, dueDate: '2026-08-10', paidDate: '2026-08-03', paymentMode: 'Bank Transfer', transactionId: 'IMPS/772183940', status: 'Paid' }
];

export const INITIAL_EXPENSES: LedgerExpense[] = [
  { id: 'EXP-101', date: '2026-08-01', category: 'Security', description: 'G4S Gate Guard Services Monthly Invoice', amount: 48000, vendorName: 'G4S Security Systems', approvedBy: 'MC Treasurer' },
  { id: 'EXP-102', date: '2026-08-03', category: 'Electricity', description: 'BESCOM Common Area & Street Lights Bill', amount: 22450, vendorName: 'BESCOM', approvedBy: 'MC Secretary' },
  { id: 'EXP-103', date: '2026-08-04', category: 'Water Tanker', description: 'Supply of 5 Water Tankers (12,000L each)', amount: 7500, vendorName: 'Cauvery Water Tankers', approvedBy: 'MC President' },
  { id: 'EXP-104', date: '2026-08-05', category: 'Gardening', description: 'Lawn Mowing, Tree Pruning & Organic Fertilizer', amount: 6000, vendorName: 'GreenThumb Landscaping', approvedBy: 'MC Member' }
];

export const INITIAL_TICKETS: ComplaintTicket[] = [
  { id: 'TKT-101', flatId: 'L01-P12', residentName: 'Sadish Sugumaran', category: 'Plumbing', title: 'Water Pressure Low in Villa 12', description: 'Flow rate has dropped significantly since yesterday evening.', priority: 'Medium', status: 'In Progress', createdAt: '2026-08-05 09:30 AM', updatedAt: '2026-08-05 11:00 AM', assignedStaff: 'Govind (Plumber)', assignedStaffPhone: '+91 98450 66778', slaHours: 24 },
  { id: 'TKT-102', flatId: 'L04-P42', residentName: 'Arjun Mehta', category: 'Electrical', title: 'Lane 4 Street Light Blinking', description: 'LED fixture flickers continuously near Plot 42.', priority: 'Low', status: 'Open', createdAt: '2026-08-06 08:15 AM', updatedAt: '2026-08-06 08:15 AM', slaHours: 48 },
  { id: 'TKT-103', flatId: 'L14-P142', residentName: 'Harish Chandra', category: 'Cleanliness', title: 'Dry Leaves accumulated on Lane 14 walkway', description: 'Needs sweeping after rain yesterday.', priority: 'Low', status: 'Resolved', createdAt: '2026-08-04 10:00 AM', updatedAt: '2026-08-04 02:00 PM', assignedStaff: 'Raju (Housekeeping)', slaHours: 24, rating: 5, feedbackComment: 'Cleaned promptly! Excellent service.' }
];

export const INITIAL_AMENITIES: Amenity[] = [
  { id: 'AMN-1', name: 'Artha Clubhouse Party Hall', description: 'Air-conditioned hall with seating for 120 guests, audio system, and pantry area.', iconName: 'Building', capacity: 120, operatingHours: '09:00 AM - 11:00 PM', rules: ['No loud music after 10 PM', 'Clean up required after event', 'Security deposit ₹2,000'] },
  { id: 'AMN-2', name: 'Swimming Pool', description: '25-meter lap pool with kids wading section & changing rooms.', iconName: 'Waves', capacity: 30, operatingHours: '06:00 AM - 09:00 PM', rules: ['Swimming costume mandatory', 'Shower before entry', 'Children below 10 must be accompanied by adults'] },
  { id: 'AMN-3', name: 'Badminton Court 1', description: 'Indoor wooden floor badminton court with LED spotlighting.', iconName: 'Activity', capacity: 4, operatingHours: '06:00 AM - 10:00 PM', rules: ['Non-marking shoes mandatory', 'Max 1 hour slot per flat per day'] },
  { id: 'AMN-4', name: 'Layout Gymnasium', description: 'Fully equipped gym with treadmills, ellipticals, free weights & multi-gym.', iconName: 'Dumbbell', capacity: 15, operatingHours: '05:30 AM - 09:30 PM', rules: ['Carry personal gym towel', 'Wipe down equipment after use', 'Sports shoes mandatory'] }
];

export const INITIAL_BOOKINGS: AmenityBooking[] = [
  { id: 'BKG-501', amenityId: 'AMN-1', amenityName: 'Artha Clubhouse Party Hall', flatId: 'L01-P12', residentName: 'Sadish Sugumaran', bookingDate: '2026-08-15', slotTime: '04:00 PM - 08:00 PM', purpose: 'Independence Day Family Gathering', guestsCount: 45, status: 'Confirmed', createdAt: '2026-08-02' },
  { id: 'BKG-502', amenityId: 'AMN-3', amenityName: 'Badminton Court 1', flatId: 'L09-P94', residentName: 'Rajesh Iyer', bookingDate: '2026-08-07', slotTime: '08:00 AM - 10:00 AM', purpose: 'Morning Game', guestsCount: 2, status: 'Confirmed', createdAt: '2026-08-05' }
];

export const INITIAL_NOTICES: Notice[] = [
  { id: 'NTC-1', title: 'Monthly Management Committee AGM Meeting', category: 'Official MC', content: 'All layout homeowners are invited to attend the Annual General Meeting at Artha Clubhouse on Sunday, Aug 23 at 10:00 AM. Agenda includes audit review and security upgrades.', date: '2026-08-05', postedBy: 'MC President', isPinned: true },
  { id: 'NTC-2', title: 'Scheduled Water Overhead Tank Cleaning', category: 'Maintenance Schedule', content: 'Cauvery & Borewell overhead tanks will be cleaned on Thursday, Aug 12 from 9 AM to 2 PM. Water supply will be interrupted during this period. Please store sufficient water.', date: '2026-08-04', postedBy: 'Estate Manager', isPinned: false },
  { id: 'NTC-3', title: 'Ganesh Chaturthi Celebrations & Cultural Evening', category: 'Community Event', content: 'Grihasta Cultural Committee invites suggestions and participation for the upcoming layout celebration. Volunteers please contact Lane 1 - Plot 12.', date: '2026-08-02', postedBy: 'Cultural Committee', isPinned: false }
];

export const INITIAL_POLLS: CommunityPoll[] = [
  { id: 'POL-1', question: 'Should we install Solar Roof Panels on the Clubhouse to reduce common BESCOM electricity bills?', options: [{ id: 'opt1', text: 'Yes, full solar deployment', votes: 24 }, { id: 'opt2', text: 'Partial solar pilot first', votes: 12 }, { id: 'opt3', text: 'No, initial cost too high', votes: 3 }], totalVotes: 39, votedFlatIds: ['L01-P12', 'L02-P24', 'L03-P35', 'L09-P94', 'L14-P142'], createdAt: '2026-08-01', expiresAt: '2026-08-20' }
];

export const INITIAL_STAFF: StaffMember[] = [
  { id: 'STF-01', name: 'Bahadur Singh', role: 'Security Guard', phone: '+91 98450 11990', shift: 'Morning (6 AM - 2 PM)', status: 'On Duty', inTime: '05:55 AM', attendancePercentThisMonth: 98, monthlySalary: 16500 },
  { id: 'STF-02', name: 'Ramesh Guard', role: 'Security Guard', phone: '+91 97411 22334', shift: 'Evening (2 PM - 10 PM)', status: 'Off Duty', attendancePercentThisMonth: 95, monthlySalary: 16500 },
  { id: 'STF-03', name: 'Govindappa', role: 'Plumber', phone: '+91 98450 66778', shift: 'General (9 AM - 6 PM)', status: 'On Duty', inTime: '08:50 AM', attendancePercentThisMonth: 96, monthlySalary: 18000 },
  { id: 'STF-04', name: 'Raju Clean', role: 'Housekeeping', phone: '+91 99011 88776', shift: 'General (9 AM - 6 PM)', status: 'On Duty', inTime: '08:30 AM', attendancePercentThisMonth: 92, monthlySalary: 14000 },
  { id: 'STF-05', name: 'Murugan', role: 'Gardener', phone: '+91 98801 55443', shift: 'General (9 AM - 6 PM)', status: 'On Leave', attendancePercentThisMonth: 88, monthlySalary: 15000 }
];

// MODULE 09 INITIAL SEED DATA
export const INITIAL_RESIDENT_PROFILES: ResidentSocialProfile[] = [
  { id: 'PROF-L01-12', flatId: 'L01-P12', name: 'Sadish Sugumaran', moveInYear: 2021, aboutMe: 'Tech enthusiast & layout MC member. Passionate about green layout initiatives & badminton.', hobbies: ['Badminton', 'Tech', 'Gardening'], profession: 'Software Lead', languages: ['English', 'Kannada', 'Tamil'], familyMembers: ['Deepa S. (Spouse)', 'Kiran S. (Son)'], isMcVerified: true, showPhoneToNeighbours: true, phone: '+91 99000 15844', avatarColor: '#0B4769' },
  { id: 'PROF-L02-24', flatId: 'L02-P24', name: 'Priya Sharma', moveInYear: 2022, aboutMe: 'Yoga practitioner and avid reader. Always happy to organize weekend kids workshops in the clubhouse.', hobbies: ['Yoga', 'Reading', 'Baking'], profession: 'Architect', languages: ['English', 'Hindi'], familyMembers: ['Amit Sharma (Spouse)'], isMcVerified: true, showPhoneToNeighbours: true, phone: '+91 99801 22334', avatarColor: '#31532C' },
  { id: 'PROF-L04-42', flatId: 'L04-P42', name: 'Arjun Mehta', moveInYear: 2023, aboutMe: 'Cycling fanatic & EV car owner. Leads the weekend Artha Grihasta Cycling Club.', hobbies: ['Cycling', 'Photography'], profession: 'Financial Analyst', languages: ['English', 'Gujarati', 'Hindi'], familyMembers: ['Neha Mehta (Spouse)'], isMcVerified: true, showPhoneToNeighbours: false, phone: '+91 98112 33445', avatarColor: '#1E6B85' },
  { id: 'PROF-L09-94', flatId: 'L09-P94', name: 'Rajesh Iyer', moveInYear: 2020, aboutMe: 'Senior resident, loves gardening & evening walks near the central park.', hobbies: ['Gardening', 'Carnatic Music'], profession: 'Retd. Engineer', languages: ['English', 'Tamil', 'Kannada'], familyMembers: ['Radha Iyer (Spouse)'], isMcVerified: true, showPhoneToNeighbours: true, phone: '+91 98440 99001', avatarColor: '#031D34' }
];

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  { id: 'POST-101', flatId: 'L01-P12', authorName: 'Sadish Sugumaran', category: 'Good News', content: 'Happy to share that the layout solar street lighting project proposal has received initial MC approval! Looking forward to greener energy across Lanes 1–15. 🌿⚡', likesCount: 14, likedFlatIds: ['L02-P24', 'L03-P35', 'L04-P42', 'L09-P94', 'L14-P142'], comments: [{ id: 'C-1', flatId: 'L02-P24', authorName: 'Priya Sharma', commentText: 'Fantastic initiative! Thank you MC team.', createdAt: '2026-08-05 10:15 AM' }], isPinned: true, createdAt: '2026-08-05 09:00 AM' },
  { id: 'POST-102', flatId: 'L04-P42', authorName: 'Arjun Mehta', category: 'General', content: 'Sunday morning 15km layout cycling ride starting 6:30 AM from main gate. All skill levels welcome!', likesCount: 8, likedFlatIds: ['L01-P12', 'L09-P94'], comments: [], isPinned: false, createdAt: '2026-08-06 07:30 AM' }
];

export const INITIAL_MARKETPLACE: MarketplaceItem[] = [
  { id: 'MKT-1', flatId: 'L02-P24', sellerName: 'Priya Sharma', title: 'Chicco Wooden Baby High Chair (Mint Condition)', category: 'Baby Gear', price: 1500, isFreeToTake: false, description: 'Adjustable height, barely used for 6 months. Clean and sanitized.', status: 'Available', createdAt: '2026-08-04', contactPhone: '+91 99801 22334' },
  { id: 'MKT-2', flatId: 'L09-P94', sellerName: 'Rajesh Iyer', title: 'Set of 10 Hardcover Gardening & Plant Books', category: 'Books & Games', price: 0, isFreeToTake: true, description: 'Free to take for any interested resident gardener! Pick up from Lane 9 - Plot 94.', status: 'Available', createdAt: '2026-08-05', contactPhone: '+91 98440 99001' },
  { id: 'MKT-3', flatId: 'L04-P42', sellerName: 'Arjun Mehta', title: 'Decathlon Adult Bicycle Helmet (Medium)', category: 'Sports', price: 400, isFreeToTake: false, description: 'Good quality red helmet with adjustable strap.', status: 'Available', createdAt: '2026-08-06', contactPhone: '+91 98112 33445' }
];

export const INITIAL_LOST_FOUND: LostAndFoundItem[] = [
  { id: 'LF-1', type: 'Found', title: 'Keyring with 3 keys found near Swimming Pool', location: 'Swimming Pool Deck', date: '2026-08-05', flatId: 'Security Gate', contactName: 'Bahadur Singh (Security)', contactPhone: '+91 98450 11990', description: 'Has a blue Toyota key fob attached. Handed over to main security gate.', status: 'Active' },
  { id: 'LF-2', type: 'Lost', title: 'Golden Retriever Dog Collar (Red Color)', location: 'Lane 2 Walkway', date: '2026-08-04', flatId: 'L02-P24', contactName: 'Priya Sharma', contactPhone: '+91 99801 22334', description: 'Brass name tag engraved with "Bruno". Please contact if spotted near Lane 2.', status: 'Active' }
];

export const INITIAL_RECOMMENDATIONS: VendorRecommendation[] = [
  { id: 'REC-1', flatId: 'L01-P12', residentName: 'Sadish Sugumaran', serviceCategory: 'Plumber', vendorName: 'Govindappa Plumbing', vendorPhone: '+91 98450 66778', rating: 5, reviewText: 'Very reliable for overhead tank valve leaks and bathroom pressure motor fittings.', createdAt: '2026-08-02' },
  { id: 'REC-2', flatId: 'L09-P94', residentName: 'Rajesh Iyer', serviceCategory: 'Painter', vendorName: 'Suresh Royal Paints', vendorPhone: '+91 99012 44556', rating: 5, reviewText: 'Neat damp-proof exterior painting work done for Lane 9 Villa.', createdAt: '2026-08-03' },
  { id: 'REC-3', flatId: 'L04-P42', residentName: 'Arjun Mehta', serviceCategory: 'AC Service', vendorName: 'CoolAir Technicians', vendorPhone: '+91 97411 88990', rating: 4, reviewText: 'Quick copper coil cleaning and gas top-up before summer.', createdAt: '2026-08-04' }
];

export const INITIAL_CARPOOLS: CarpoolRoute[] = [
  { id: 'CP-1', flatId: 'L01-P12', driverName: 'Sadish Sugumaran', destination: 'Whitefield (ITPL / Hoodi)', departureTime: '08:30 AM (Return 05:45 PM)', availableSeats: 2, notes: 'EV Car with AC. Route via Varthur main road.', days: ['Mon', 'Tue', 'Thu', 'Fri'], phone: '+91 99000 15844' },
  { id: 'CP-2', flatId: 'L04-P42', driverName: 'Arjun Mehta', destination: 'Electronic City Phase 1', departureTime: '09:00 AM (Return 06:30 PM)', availableSeats: 3, notes: 'Non-smoking car. Shared fuel contribution.', days: ['Mon', 'Wed', 'Fri'], phone: '+91 98112 33445' }
];

export const INITIAL_GROUPS: InterestGroup[] = [
  { id: 'GRP-1', name: 'Artha Grihasta Parents Forum', category: 'Parents', description: 'Group for parents in the layout to coordinate playdates, school bus drop-offs, and kids sports activities.', membersCount: 18, joinedFlatIds: ['L01-P12', 'L02-P24', 'L04-P42', 'L14-P142'], iconName: 'Users' },
  { id: 'GRP-2', name: 'Grihasta Weekend Cyclists', category: 'Cycling', description: 'Early morning cycling enthusiasts doing 15-30km rides around Sarjapur & Varthur routes.', membersCount: 12, joinedFlatIds: ['L04-P42', 'L01-P12', 'L09-P94'], iconName: 'Activity' },
  { id: 'GRP-3', name: 'Green Thumb & Organic Gardening', category: 'Pet Owners', description: 'Tips on terrace gardening, composting, balcony pots, and plant swaps.', membersCount: 14, joinedFlatIds: ['L09-P94', 'L02-P24', 'L14-P142'], iconName: 'Flower2' }
];
