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
  { id: 'A-101', block: 'Block A', floor: 1, flatNumber: '101', ownerName: 'Sadish Sugumaran', ownerPhone: '+91 99000 15844', ownerEmail: 'sadish.sugumaran@gmail.com', occupancyType: 'Owner Occupied', sqft: 1850, monthlyDuesRate: 3500, vehiclesCount: 2, registeredHelpCount: 1 },
  { id: 'A-102', block: 'Block A', floor: 1, flatNumber: '102', ownerName: 'Ramesh Kumar', ownerPhone: '+91 98450 11223', ownerEmail: 'ramesh.k@gmail.com', tenantName: 'Vikram Sethi', tenantPhone: '+91 97411 55667', occupancyType: 'Rented', sqft: 1650, monthlyDuesRate: 3200, vehiclesCount: 1, registeredHelpCount: 1 },
  { id: 'A-201', block: 'Block A', floor: 2, flatNumber: '201', ownerName: 'Priya Sharma', ownerPhone: '+91 99801 22334', ownerEmail: 'priya.s@gmail.com', occupancyType: 'Owner Occupied', sqft: 2100, monthlyDuesRate: 4000, vehiclesCount: 2, registeredHelpCount: 2 },
  { id: 'A-202', block: 'Block A', floor: 2, flatNumber: '202', ownerName: 'Anil Deshmukh', ownerPhone: '+91 98860 33445', ownerEmail: 'anil.d@gmail.com', occupancyType: 'Vacant', sqft: 1650, monthlyDuesRate: 3200, vehiclesCount: 0, registeredHelpCount: 0 },
  
  { id: 'B-101', block: 'Block B', floor: 1, flatNumber: '101', ownerName: 'Srinivas Murthy', ownerPhone: '+91 94480 55667', ownerEmail: 'smurthy@yahoo.com', occupancyType: 'Owner Occupied', sqft: 1750, monthlyDuesRate: 3400, vehiclesCount: 1, registeredHelpCount: 1 },
  { id: 'B-102', block: 'Block B', floor: 1, flatNumber: '102', ownerName: 'Kavita Reddy', ownerPhone: '+91 99451 66778', ownerEmail: 'kavita.r@gmail.com', tenantName: 'Arjun Mehta', tenantPhone: '+91 98112 33445', occupancyType: 'Rented', sqft: 1750, monthlyDuesRate: 3400, vehiclesCount: 2, registeredHelpCount: 1 },
  { id: 'B-201', block: 'Block B', floor: 2, flatNumber: '201', ownerName: 'Deepak Patel', ownerPhone: '+91 98200 77889', ownerEmail: 'deepak.p@gmail.com', occupancyType: 'Owner Occupied', sqft: 2200, monthlyDuesRate: 4200, vehiclesCount: 2, registeredHelpCount: 1 },
  { id: 'B-202', block: 'Block B', floor: 2, flatNumber: '202', ownerName: 'Meenakshi Sundaram', ownerPhone: '+91 94432 88990', ownerEmail: 'meena.s@gmail.com', occupancyType: 'Owner Occupied', sqft: 1650, monthlyDuesRate: 3200, vehiclesCount: 1, registeredHelpCount: 0 },

  { id: 'C-101', block: 'Block C', floor: 1, flatNumber: '101', ownerName: 'Rajesh Iyer', ownerPhone: '+91 98440 99001', ownerEmail: 'rajesh.iyer@gmail.com', occupancyType: 'Owner Occupied', sqft: 1900, monthlyDuesRate: 3600, vehiclesCount: 2, registeredHelpCount: 1 },
  { id: 'C-102', block: 'Block C', floor: 1, flatNumber: '102', ownerName: 'Sunita Nair', ownerPhone: '+91 99011 00112', ownerEmail: 'sunita.n@gmail.com', occupancyType: 'Owner Occupied', sqft: 1900, monthlyDuesRate: 3600, vehiclesCount: 1, registeredHelpCount: 1 },
  
  { id: 'D-101', block: 'Block D', floor: 1, flatNumber: '101', ownerName: 'Harish Chandra', ownerPhone: '+91 98800 11223', ownerEmail: 'harish.c@gmail.com', occupancyType: 'Owner Occupied', sqft: 2400, monthlyDuesRate: 4500, vehiclesCount: 3, registeredHelpCount: 2 },
  { id: 'D-102', block: 'Block D', floor: 1, flatNumber: '102', ownerName: 'Gaurav Gupta', ownerPhone: '+91 99160 22334', ownerEmail: 'gaurav.g@gmail.com', tenantName: 'Sneha Roy', tenantPhone: '+91 97311 44556', occupancyType: 'Rented', sqft: 2000, monthlyDuesRate: 3800, vehiclesCount: 1, registeredHelpCount: 1 }
];

export const INITIAL_VEHICLES: Vehicle[] = [
  { id: 'V-101', flatId: 'A-101', type: 'Car', registrationNumber: 'KA-01-MJ-4892', parkingSlot: 'P-A101', ownerName: 'Sadish Sugumaran' },
  { id: 'V-102', flatId: 'A-101', type: 'EV Bike', registrationNumber: 'KA-01-EP-1204', parkingSlot: 'P-A101B', ownerName: 'Sadish Sugumaran' },
  { id: 'V-103', flatId: 'A-201', type: 'Car', registrationNumber: 'KA-05-NB-7788', parkingSlot: 'P-A201', ownerName: 'Priya Sharma' },
  { id: 'V-104', flatId: 'B-102', type: 'EV Car', registrationNumber: 'KA-03-EV-9900', parkingSlot: 'P-B102', ownerName: 'Arjun Mehta' },
  { id: 'V-105', flatId: 'C-101', type: 'Car', registrationNumber: 'KA-51-MD-3344', parkingSlot: 'P-C101', ownerName: 'Rajesh Iyer' },
  { id: 'V-106', flatId: 'D-101', type: 'Car', registrationNumber: 'KA-04-HA-1111', parkingSlot: 'P-D101A', ownerName: 'Harish Chandra' }
];

export const INITIAL_DOMESTIC_HELP: DomesticHelp[] = [
  { id: 'DH-1', flatId: 'A-101', name: 'Lakshmi Devi', role: 'Maid', phone: '+91 98444 11223', passCode: 'GH-301', status: 'In Layout', entryTime: '08:30 AM' },
  { id: 'DH-2', flatId: 'A-201', name: 'Raju Gowda', role: 'Driver', phone: '+91 97410 99887', passCode: 'GH-302', status: 'Out' },
  { id: 'DH-3', flatId: 'B-101', name: 'Saraswathi', role: 'Cook', phone: '+91 99022 33445', passCode: 'GH-303', status: 'In Layout', entryTime: '07:45 AM' },
  { id: 'DH-4', flatId: 'D-101', name: 'Muniyappa', role: 'Gardener', phone: '+91 98801 55443', passCode: 'GH-304', status: 'Out' }
];

export const INITIAL_VISITOR_LOGS: VisitorLog[] = [
  { id: 'VIS-101', visitorName: 'Senthil Kumar', phone: '+91 98452 77112', flatId: 'A-101', purpose: 'Guest', passCode: 'VP-9821', entryTime: '10:15 AM', status: 'Checked-In', approvedBy: 'Sadish Sugumaran', vehicleNo: 'KA-03-MS-2211' },
  { id: 'VIS-102', visitorName: 'Ramesh (Swiggy)', phone: '+91 97400 33221', flatId: 'B-102', purpose: 'Delivery', entryTime: '11:05 AM', exitTime: '11:18 AM', status: 'Checked-Out' },
  { id: 'VIS-103', visitorName: 'Dr. Anita Roy', phone: '+91 99001 88776', flatId: 'C-101', purpose: 'Guest', passCode: 'VP-4491', entryTime: 'Pending', status: 'Pre-Approved', approvedBy: 'Rajesh Iyer' },
  { id: 'VIS-104', visitorName: 'Urban Company Tech', phone: '+91 98860 11998', flatId: 'A-201', purpose: 'Service Technician', passCode: 'VP-7720', entryTime: '09:00 AM', status: 'Checked-In', approvedBy: 'Priya Sharma' }
];

export const INITIAL_DELIVERIES: DeliveryLog[] = [
  { id: 'DEL-01', provider: 'Amazon', flatId: 'A-101', executiveName: 'Mahesh B', phone: '+91 98800 44332', entryTime: '09:45 AM', status: 'Left at Gate', packageCount: 2 },
  { id: 'DEL-02', provider: 'Swiggy', flatId: 'B-102', executiveName: 'Ramesh', phone: '+91 97400 33221', entryTime: '11:05 AM', status: 'Delivered to Door', packageCount: 1 },
  { id: 'DEL-03', provider: 'Blinkit', flatId: 'D-101', executiveName: 'Kiran', phone: '+91 99011 55667', entryTime: '11:40 AM', status: 'Delivered to Door', packageCount: 3 }
];

export const INITIAL_MAINTENANCE_DUES: MaintenanceDue[] = [
  { id: 'DUE-A101-AUG', flatId: 'A-101', month: 'August 2026', amount: 3500, dueDate: '2026-08-10', paidDate: '2026-08-02', paymentMode: 'UPI', transactionId: 'UPI/6219804412/OKAXIS', status: 'Paid' },
  { id: 'DUE-A102-AUG', flatId: 'A-102', month: 'August 2026', amount: 3200, dueDate: '2026-08-10', status: 'Pending' },
  { id: 'DUE-A201-AUG', flatId: 'A-201', month: 'August 2026', amount: 4000, dueDate: '2026-08-10', paidDate: '2026-08-04', paymentMode: 'Bank Transfer', transactionId: 'NEFT/887123904', status: 'Paid' },
  { id: 'DUE-A202-AUG', flatId: 'A-202', month: 'August 2026', amount: 3200, dueDate: '2026-08-10', status: 'Overdue' },
  { id: 'DUE-B101-AUG', flatId: 'B-101', month: 'August 2026', amount: 3400, dueDate: '2026-08-10', paidDate: '2026-08-05', paymentMode: 'UPI', transactionId: 'UPI/998127341/PAYTM', status: 'Paid' },
  { id: 'DUE-B102-AUG', flatId: 'B-102', month: 'August 2026', amount: 3400, dueDate: '2026-08-10', status: 'Pending' },
  { id: 'DUE-B201-AUG', flatId: 'B-201', month: 'August 2026', amount: 4200, dueDate: '2026-08-10', status: 'Overdue' },
  { id: 'DUE-C101-AUG', flatId: 'C-101', month: 'August 2026', amount: 3600, dueDate: '2026-08-10', paidDate: '2026-08-01', paymentMode: 'UPI', transactionId: 'UPI/001928472/GPAY', status: 'Paid' },
  { id: 'DUE-D101-AUG', flatId: 'D-101', month: 'August 2026', amount: 4500, dueDate: '2026-08-10', paidDate: '2026-08-03', paymentMode: 'Bank Transfer', transactionId: 'IMPS/772183940', status: 'Paid' }
];

export const INITIAL_EXPENSES: LedgerExpense[] = [
  { id: 'EXP-101', date: '2026-08-01', category: 'Security', description: 'G4S Gate Guard Services Monthly Invoice', amount: 48000, vendorName: 'G4S Security Systems', approvedBy: 'MC Treasurer' },
  { id: 'EXP-102', date: '2026-08-03', category: 'Electricity', description: 'BESCOM Common Area & Street Lights Bill', amount: 22450, vendorName: 'BESCOM', approvedBy: 'MC Secretary' },
  { id: 'EXP-103', date: '2026-08-04', category: 'Water Tanker', description: 'Supply of 5 Water Tankers (12,000L each)', amount: 7500, vendorName: 'Cauvery Water Tankers', approvedBy: 'MC President' },
  { id: 'EXP-104', date: '2026-08-05', category: 'Gardening', description: 'Lawn Mowing, Tree Pruning & Organic Fertilizer', amount: 6000, vendorName: 'GreenThumb Landscaping', approvedBy: 'MC Member' }
];

export const INITIAL_TICKETS: ComplaintTicket[] = [
  { id: 'TKT-101', flatId: 'A-101', residentName: 'Sadish Sugumaran', category: 'Plumbing', title: 'Water Pressure Low in 2nd Bathroom', description: 'Flow rate has dropped significantly since yesterday evening.', priority: 'Medium', status: 'In Progress', createdAt: '2026-08-05 09:30 AM', updatedAt: '2026-08-05 11:00 AM', assignedStaff: 'Govind (Plumber)', assignedStaffPhone: '+91 98450 66778', slaHours: 24 },
  { id: 'TKT-102', flatId: 'B-102', residentName: 'Arjun Mehta', category: 'Electrical', title: 'Corridor Light Blinking near B-102', description: 'LED tubelight fixture flickers continuously.', priority: 'Low', status: 'Open', createdAt: '2026-08-06 08:15 AM', updatedAt: '2026-08-06 08:15 AM', slaHours: 48 },
  { id: 'TKT-103', flatId: 'D-101', residentName: 'Harish Chandra', category: 'Cleanliness', title: 'Dry Leaves accumulated near Block D Entrance', description: 'Needs sweeping after rain yesterday.', priority: 'Low', status: 'Resolved', createdAt: '2026-08-04 10:00 AM', updatedAt: '2026-08-04 02:00 PM', assignedStaff: 'Raju (Housekeeping)', slaHours: 24, rating: 5, feedbackComment: 'Cleaned promptly! Excellent service.' }
];

export const INITIAL_AMENITIES: Amenity[] = [
  { id: 'AMN-1', name: 'Artha Clubhouse Party Hall', description: 'Air-conditioned hall with seating for 120 guests, audio system, and pantry area.', iconName: 'Building', capacity: 120, operatingHours: '09:00 AM - 11:00 PM', rules: ['No loud music after 10 PM', 'Clean up required after event', 'Security deposit ₹2,000'] },
  { id: 'AMN-2', name: 'Swimming Pool', description: '25-meter lap pool with kids wading section & changing rooms.', iconName: 'Waves', capacity: 30, operatingHours: '06:00 AM - 09:00 PM', rules: ['Swimming costume mandatory', 'Shower before entry', 'Children below 10 must be accompanied by adults'] },
  { id: 'AMN-3', name: 'Badminton Court 1', description: 'Indoor wooden floor badminton court with LED spotlighting.', iconName: 'Activity', capacity: 4, operatingHours: '06:00 AM - 10:00 PM', rules: ['Non-marking shoes mandatory', 'Max 1 hour slot per flat per day'] },
  { id: 'AMN-4', name: 'Layout Gymnasium', description: 'Fully equipped gym with treadmills, ellipticals, free weights & multi-gym.', iconName: 'Dumbbell', capacity: 15, operatingHours: '05:30 AM - 09:30 PM', rules: ['Carry personal gym towel', 'Wipe down equipment after use', 'Sports shoes mandatory'] }
];

export const INITIAL_BOOKINGS: AmenityBooking[] = [
  { id: 'BKG-501', amenityId: 'AMN-1', amenityName: 'Artha Clubhouse Party Hall', flatId: 'A-101', residentName: 'Sadish Sugumaran', bookingDate: '2026-08-15', slotTime: '04:00 PM - 08:00 PM', purpose: 'Independence Day Family Gathering', guestsCount: 45, status: 'Confirmed', createdAt: '2026-08-02' },
  { id: 'BKG-502', amenityId: 'AMN-3', amenityName: 'Badminton Court 1', flatId: 'C-101', residentName: 'Rajesh Iyer', bookingDate: '2026-08-07', slotTime: '08:00 AM - 10:00 AM', purpose: 'Morning Game', guestsCount: 2, status: 'Confirmed', createdAt: '2026-08-05' }
];

export const INITIAL_NOTICES: Notice[] = [
  { id: 'NTC-1', title: 'Monthly Management Committee AGM Meeting', category: 'Official MC', content: 'All layout homeowners are invited to attend the Annual General Meeting at Artha Clubhouse on Sunday, Aug 23 at 10:00 AM. Agenda includes audit review and security upgrades.', date: '2026-08-05', postedBy: 'MC President', isPinned: true },
  { id: 'NTC-2', title: 'Scheduled Water Overhead Tank Cleaning', category: 'Maintenance Schedule', content: 'Cauvery & Borewell overhead tanks will be cleaned on Thursday, Aug 12 from 9 AM to 2 PM. Water supply will be interrupted during this period. Please store sufficient water.', date: '2026-08-04', postedBy: 'Estate Manager', isPinned: false },
  { id: 'NTC-3', title: 'Ganesh Chaturthi Celebrations & Cultural Evening', category: 'Community Event', content: 'Grihasta Cultural Committee invites suggestions and participation for the upcoming layout celebration. Volunteers please contact A-101.', date: '2026-08-02', postedBy: 'Cultural Committee', isPinned: false }
];

export const INITIAL_POLLS: CommunityPoll[] = [
  { id: 'POL-1', question: 'Should we install Solar Roof Panels on the Clubhouse to reduce common BESCOM electricity bills?', options: [{ id: 'opt1', text: 'Yes, full solar deployment', votes: 24 }, { id: 'opt2', text: 'Partial solar pilot first', votes: 12 }, { id: 'opt3', text: 'No, initial cost too high', votes: 3 }], totalVotes: 39, votedFlatIds: ['A-101', 'A-201', 'B-101', 'C-101', 'D-101'], createdAt: '2026-08-01', expiresAt: '2026-08-20' }
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
  { id: 'PROF-A101', flatId: 'A-101', name: 'Sadish Sugumaran', moveInYear: 2021, aboutMe: 'Tech enthusiast & layout MC member. Passionate about green layout initiatives & badminton.', hobbies: ['Badminton', 'Tech', 'Gardening'], profession: 'Software Lead', languages: ['English', 'Kannada', 'Tamil'], familyMembers: ['Deepa S. (Spouse)', 'Kiran S. (Son)'], isMcVerified: true, showPhoneToNeighbours: true, phone: '+91 99000 15844', avatarColor: '#0B4769' },
  { id: 'PROF-A201', flatId: 'A-201', name: 'Priya Sharma', moveInYear: 2022, aboutMe: 'Yoga practitioner and avid reader. Always happy to organize weekend kids workshops in the clubhouse.', hobbies: ['Yoga', 'Reading', 'Baking'], profession: 'Architect', languages: ['English', 'Hindi'], familyMembers: ['Amit Sharma (Spouse)'], isMcVerified: true, showPhoneToNeighbours: true, phone: '+91 99801 22334', avatarColor: '#31532C' },
  { id: 'PROF-B102', flatId: 'B-102', name: 'Arjun Mehta', moveInYear: 2023, aboutMe: 'Cycling fanatic & EV car owner. Leads the weekend Artha Grihasta Cycling Club.', hobbies: ['Cycling', 'Photography'], profession: 'Financial Analyst', languages: ['English', 'Gujarati', 'Hindi'], familyMembers: ['Neha Mehta (Spouse)'], isMcVerified: true, showPhoneToNeighbours: false, phone: '+91 98112 33445', avatarColor: '#1E6B85' },
  { id: 'PROF-C101', flatId: 'C-101', name: 'Rajesh Iyer', moveInYear: 2020, aboutMe: 'Senior resident, loves gardening & evening walks near the central park.', hobbies: ['Gardening', 'Carnatic Music'], profession: 'Retd. Engineer', languages: ['English', 'Tamil', 'Kannada'], familyMembers: ['Radha Iyer (Spouse)'], isMcVerified: true, showPhoneToNeighbours: true, phone: '+91 98440 99001', avatarColor: '#031D34' }
];

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  { id: 'POST-101', flatId: 'A-101', authorName: 'Sadish Sugumaran', category: 'Good News', content: 'Happy to share that the layout solar street lighting project proposal has received initial MC approval! Looking forward to greener energy across Block A-D driveways. 🌿⚡', likesCount: 14, likedFlatIds: ['A-201', 'B-101', 'B-102', 'C-101', 'D-101'], comments: [{ id: 'C-1', flatId: 'A-201', authorName: 'Priya Sharma', commentText: 'Fantastic initiative! Thank you MC team.', createdAt: '2026-08-05 10:15 AM' }], isPinned: true, createdAt: '2026-08-05 09:00 AM' },
  { id: 'POST-102', flatId: 'B-102', authorName: 'Arjun Mehta', category: 'General', content: 'Sunday morning 15km layout cycling ride starting 6:30 AM from main gate. All skill levels welcome!', likesCount: 8, likedFlatIds: ['A-101', 'C-101'], comments: [], isPinned: false, createdAt: '2026-08-06 07:30 AM' }
];

export const INITIAL_MARKETPLACE: MarketplaceItem[] = [
  { id: 'MKT-1', flatId: 'A-201', sellerName: 'Priya Sharma', title: 'Chicco Wooden Baby High Chair (Mint Condition)', category: 'Baby Gear', price: 1500, isFreeToTake: false, description: 'Adjustable height, barely used for 6 months. Clean and sanitized.', status: 'Available', createdAt: '2026-08-04', contactPhone: '+91 99801 22334' },
  { id: 'MKT-2', flatId: 'C-101', sellerName: 'Rajesh Iyer', title: 'Set of 10 Hardcover Gardening & Plant Books', category: 'Books & Games', price: 0, isFreeToTake: true, description: 'Free to take for any interested resident gardener! Pick up from C-101.', status: 'Available', createdAt: '2026-08-05', contactPhone: '+91 98440 99001' },
  { id: 'MKT-3', flatId: 'B-102', sellerName: 'Arjun Mehta', title: 'Decathlon Adult Bicycle Helmet (Medium)', category: 'Sports', price: 400, isFreeToTake: false, description: 'Good quality red helmet with adjustable strap.', status: 'Available', createdAt: '2026-08-06', contactPhone: '+91 98112 33445' }
];

export const INITIAL_LOST_FOUND: LostAndFoundItem[] = [
  { id: 'LF-1', type: 'Found', title: 'Keyring with 3 keys found near Swimming Pool', location: 'Swimming Pool Deck', date: '2026-08-05', flatId: 'Security Gate', contactName: 'Bahadur Singh (Security)', contactPhone: '+91 98450 11990', description: 'Has a blue Toyota key fob attached. Handed over to main security gate.', status: 'Active' },
  { id: 'LF-2', type: 'Lost', title: 'Golden Retriever Dog Collar (Red Color)', location: 'Central Park Walkway', date: '2026-08-04', flatId: 'A-201', contactName: 'Priya Sharma', contactPhone: '+91 99801 22334', description: 'Brass name tag engraved with "Bruno". Please contact if spotted.', status: 'Active' }
];

export const INITIAL_RECOMMENDATIONS: VendorRecommendation[] = [
  { id: 'REC-1', flatId: 'A-101', residentName: 'Sadish Sugumaran', serviceCategory: 'Plumber', vendorName: 'Govindappa Plumbing', vendorPhone: '+91 98450 66778', rating: 5, reviewText: 'Very reliable for overhead tank valve leaks and bathroom pressure motor fittings.', createdAt: '2026-08-02' },
  { id: 'REC-2', flatId: 'C-101', residentName: 'Rajesh Iyer', serviceCategory: 'Painter', vendorName: 'Suresh Royal Paints', vendorPhone: '+91 99012 44556', rating: 5, reviewText: 'Neat damp-proof exterior painting work done for Block C balcony.', createdAt: '2026-08-03' },
  { id: 'REC-3', flatId: 'B-102', residentName: 'Arjun Mehta', serviceCategory: 'AC Service', vendorName: 'CoolAir Technicians', vendorPhone: '+91 97411 88990', rating: 4, reviewText: 'Quick copper coil cleaning and gas top-up before summer.', createdAt: '2026-08-04' }
];

export const INITIAL_CARPOOLS: CarpoolRoute[] = [
  { id: 'CP-1', flatId: 'A-101', driverName: 'Sadish Sugumaran', destination: 'Whitefield (ITPL / Hoodi)', departureTime: '08:30 AM (Return 05:45 PM)', availableSeats: 2, notes: 'EV Car with AC. Route via Varthur main road.', days: ['Mon', 'Tue', 'Thu', 'Fri'], phone: '+91 99000 15844' },
  { id: 'CP-2', flatId: 'B-102', driverName: 'Arjun Mehta', destination: 'Electronic City Phase 1', departureTime: '09:00 AM (Return 06:30 PM)', availableSeats: 3, notes: 'Non-smoking car. Shared fuel contribution.', days: ['Mon', 'Wed', 'Fri'], phone: '+91 98112 33445' }
];

export const INITIAL_GROUPS: InterestGroup[] = [
  { id: 'GRP-1', name: 'Artha Grihasta Parents Forum', category: 'Parents', description: 'Group for parents in the layout to coordinate playdates, school bus drop-offs, and kids sports activities.', membersCount: 18, joinedFlatIds: ['A-101', 'A-201', 'B-102', 'D-101'], iconName: 'Users' },
  { id: 'GRP-2', name: 'Grihasta Weekend Cyclists', category: 'Cycling', description: 'Early morning cycling enthusiasts doing 15-30km rides around Sarjapur & Varthur routes.', membersCount: 12, joinedFlatIds: ['B-102', 'A-101', 'C-101'], iconName: 'Activity' },
  { id: 'GRP-3', name: 'Green Thumb & Organic Gardening', category: 'Pet Owners', description: 'Tips on terrace gardening, composting, balcony pots, and plant swaps.', membersCount: 14, joinedFlatIds: ['C-101', 'A-201', 'D-101'], iconName: 'Flower2' }
];
