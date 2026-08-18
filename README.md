# grihasta.online — Artha Grihasta Residential Layout Management Portal

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.0-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646cff.svg)](https://vitejs.dev/)
[![Status](https://img.shields.io/badge/Phase_2-Release_Ready-success.svg)](#)

A comprehensive digital management portal built specifically for **Artha Grihasta Residential Layout** in Malur, Kolar, Karnataka. Designed to eliminate reliance on fragmented WhatsApp groups, paper registers, and manual cash follow-ups. No mobile app download required — works seamlessly on any smartphone, tablet, or desktop browser.

---

## 📚 Project Documentation Directory (`docs/`)

Comprehensive documentation is maintained in the `docs/` folder:

* 🏛️ **[Architecture & System Design](docs/ARCHITECTURE_AND_DESIGN.md)** — Layout parameters (40 Acres, 400 Villas, 15 Lanes), demographic water & garbage models, 9 Core Portal Modules, Auth0 SSO strategy, and PostgreSQL database schema.
* 🚀 **[Progress & Completed Work Log](docs/PROGRESS_AND_COMPLETED_WORK.md)** — Full chronological changelog of completed features, mobile responsiveness overhaul, 1-click MC access approvals, live notification bell, and commit history.

---

## 📐 Layout Parameters & Data Model

| Metric | Specification |
|---|---|
| **Layout Location** | Sonnur, Alambadi PO, Malur Taluk, Kolar, Karnataka 563160 |
| **Total Layout Area** | 40 Acres |
| **Total Villa / Plot Units** | 400 Units (Plots 1 to 400) |
| **Master Lane Mapping** | 15 Lanes (Lanes 1 to 15) |
| **Waste Collection Rule** | Segregate wet/dry waste. Daily collection **between 7:30 AM and 9:00 AM**. |
| **Vehicle Parking Rule** | Strict flat slot or visitor bay parking. Driveway parking prohibited. |

---

## 🔑 MC Temporary Test Credentials

To log in and test Management Committee Admin privileges:
* **Email:** `test@test.com`
* **Password:** `test`

*(Tomorrow, MC members will log in via Auth0 / Gmail IDs and reset their passwords on first login).*

---

## ⚡ 9 Core Portal Modules Overview

1. **🏘️ Module 01: Resident & Villa Directory** — 400-Villa directory mapped across Lanes 1–15, owner & tenant profiles, vehicle parking registrations, domestic staff pass codes, and water/waste demographic calculators.
2. **🛡️ Module 02: Multi-Gate Security & Visitors** — Entrance tracking for **Main Gate** and **Water Tank Back Gate**, pre-approved WhatsApp QR visitor passes, and delivery logs.
3. **💰 Module 03: Maintenance & Finance** — Quarterly dues ledgers (₹9,000/quarter), WhatsApp defaulter reminders, transaction UTR logging, and society expense tracker.
4. **🔧 Module 04: Complaints & Helpdesk** — Ticket logging with category tags, SLA timers, staff assignment, and resident 1–5 star ratings.
5. **🏊 Module 05: Amenities Reservations** — Clubhouse, Swimming Pool, Badminton Court, and **Car Washing Bay** bookings with time-collision detection.
6. **📢 Module 06: Communication Hub** — Official MC notices, **Red Emergency Broadcast Trigger**, and resident voting polls.
7. **👷 Module 07: Staff Duty Roster** — Security, housekeeping, and maintenance duty clock-in/out logs with MC payroll summary generator.
8. **📊 Module 08: MC Executive Admin Dashboard** — Collection rate KPIs, occupancy %, **⚡ 1-Click Resident Access Request Approval Queue**, and Cloud DB connector setup card.
9. **🤝 Module 09: Community Social Hub** — Verified resident feed, neighbour marketplace, carpooling directory, lost & found, and local vendor recommendations.

---

## 👥 3-Tier Access Portals (6 RBAC Roles)

1. **👑 Management & Committee:** `MC_ADMIN` (Full Admin), `MC_MEMBER` (Elevated Admin)
2. **🏡 Resident Portal:** `RESIDENT_OWNER` (Owner View), `RESIDENT_TENANT` (Tenant View)
3. **🛡️ Operations & Staff:** `SECURITY_GUARD` (Gate Operations), `MAINTENANCE_STAFF` (Duty Tickets)

---

## 🛠️ Local Development & Deployment

### Prerequisites
- Node.js 18+ and npm

### Quick Start
```bash
# Clone the repository
git clone https://github.com/computegurus-spec/grihasta-online.git

# Navigate to project root
cd grihasta-online

# Install dependencies
npm install

# Run dev server
npm run dev
```

Open `http://localhost:5173/` in your browser.

### Build Verification & Deployment
```bash
# Test production build locally
npm run build

# Push commits to trigger automatic Vercel deployment
git push origin main
```

---

## 📄 Contact & Maintenance
- **Domain:** [grihasta.online](https://grihasta.online)
- **Official MC Email:** `mc@grihasta.online`
- **Lead Developer & MC Ownership:** Sadish Sugumaran (`+91 99000 15844`)
- **Annual Development Cost:** ₹0 (Built in-house with full MC ownership)
