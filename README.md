# grihasta.online — Artha Grihasta Residential Layout Management Portal

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.0-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A complete digital management portal for **Artha Grihasta Residential Layout**, built to eliminate reliance on WhatsApp groups, paper registers, and manual cash follow-ups. No app installation required — works seamlessly on any smartphone, tablet, or desktop browser.

---

## 🎨 Color Palette & Design System

Custom Earthy & Ocean-Forest theme tailored for Artha Grihasta Layout:
- **Midnight Dark (`#031D34`)**: Primary navigation bar & modal headers
- **Ocean Navy (`#0B4769`)**: Main headings, active tabs, and primary actions
- **Teal Blue (`#1E6B85`)**: Secondary buttons & active module badges
- **Deep Forest Green (`#31532C`)**: Badges & verified statuses
- **Warm Amber (`#E9BB76`)**: Star ratings, visitor QR badges, & highlights
- **Sage Light Green (`#D2E0B0`)**: Soft card backgrounds & soft tags
- **Soft Cream (`#EFEED2`)**: Clean, low-glare background

---

## ⚡ Core Modules Overview

### 🏘️ Module 01: Resident & Flat Management
- Directory of Blocks A–D, owner & tenant profiles, vehicle parking registrations (Cars, Bikes, EV slots), and registered domestic staff (maids, cooks, drivers).

### 🛡️ Module 02: Security & Gate Management
- Digital visitor gate entry log, **Resident Pre-Approved Visitor Pass Generator** with digital QR preview and WhatsApp share integration, and delivery log tracker (Amazon, Swiggy, Zomato, Blinkit).

### 💰 Module 03: Maintenance & Finance
- Flat maintenance dues tracking (Paid, Pending, Overdue for August 2026). One-click payment marking with transaction UTR recording, **WhatsApp Defaulter Reminders**, and society expense ledger.

### 🔧 Module 04: Complaints & Helpdesk
- Category ticket submission (Electrical, Plumbing, Security, Cleanliness, Gardening, Lift). MC staff assignment with target SLA timers, status progression (`Open` ➔ `In Progress` ➔ `Resolved`), and resident 1–5 star ratings.

### 🏊 Module 05: Amenities Booking
- Reservations for Artha Clubhouse Party Hall, Swimming Pool, Badminton Court 1, and Gymnasium with **automated time-range conflict detection**.

### 📢 Module 06: Communication Hub
- Official MC circular notice board, **Red Emergency Broadcast Banner Trigger**, and community voting polls with real-time percentage bars.

### 👷 Module 07: Staff Attendance
- Roster log for security guards, housekeeping, plumbers, electricians, and gardeners. One-click duty clock-in/out and **MC Payroll Input Summary Generator**.

### 📊 Module 08: MC Executive Admin Dashboard
- Real-time KPIs: Maintenance Collection Rate %, Open Helpdesk Tickets, Staff On-Site, Layout Occupancy %, defaulter snapshot, and **8-Week Implementation Roadmap**.

### 🤝 Module 09: Community & Social Hub
- **MC-Verified Resident Profiles** (move-in year, hobbies, profession, privacy settings).
- **Layout Community Feed** (category posts, likes & comments tied to verified flat numbers).
- **Neighbour Marketplace** (buy/sell items & "Free to Take" giveaways).
- **Lost & Found Board** (pets, keys, found items).
- **Trusted Vendor Recommendations** (rated plumbers, electricians, painters).
- **Carpooling & Ride Share** (daily routes to Whitefield, Koramangala, Electronic City).
- **Layout Interest Groups** (Parents Forum, Weekend Cyclists, Gardening Club).

---

## 👥 Role-Based Access Control (RBAC)

Supports 6 interactive role views accessible via the top role switcher:
1. **MC Administrator** (Full admin access to all modules, finance, reports, settings)
2. **MC Member** (Elevated access for tickets, staff, notices)
3. **Resident (Owner)** (Flat directory, dues payment, visitor passes, amenity bookings, complaints)
4. **Resident (Tenant)** (Limited resident access: visitor passes, tickets, amenities, notices)
5. **Security Guard** (Gate access: visitor log, pass scanner, delivery tracker, shift check-in)
6. **Maintenance Staff** (Staff view: assigned tickets, attendance logging, status updates)

---

## 💵 Annual Cost Breakdown

| Item | Cost |
|---|---|
| Domain (`grihasta.online`) Renewal | ~ ₹1,500 / year |
| Cloud Hosting (Vercel / Netlify) | ~ ₹7,200 / year |
| Business Email (`mc@grihasta.online`) | ~ ₹3,600 / year |
| SMS / WhatsApp Gateway | ~ ₹2,000 / year |
| **Development Cost** | **₹0 — Built In-House** |
| **Annual Total** | **~ ₹14,300 / year** |

---

## 🛠️ Local Development & Build Setup

### Prerequisites
- Node.js 18+ and npm

### Installation
```bash
# Clone the repository
git clone https://github.com/computegurus-spec/grihasta-online.git

# Navigate to directory
cd grihasta-online

# Install dependencies
npm install

# Start local dev server
npm run dev
```

Open `http://localhost:5173/` in your browser.

### Production Build
```bash
npm run build
```

---

## 📄 Reference & Documentation
- Official Resident Manual: [Artha Grihasta Google Site Manual](https://sites.google.com/view/grihastamanual/home)
- Prepared for: Management Committee, Grihasta Residential Layout
- Author: Sadish Sugumaran (`sadish.sugumaran@gmail.com` · +91 99000 15844)
