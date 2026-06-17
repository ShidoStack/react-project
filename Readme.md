# 🎭 MehfilX

### Every Great Night Starts With A Mehfil.

A modern event discovery and ticket booking platform built with **React, PixiJS, Tailwind CSS, and React Router**, featuring immersive venue exploration, large-scale interactive seat maps, synchronized seat reservations, and a seamless checkout experience.

---

## ✨ About The Project

MehfilX is a frontend-focused event booking platform designed to replicate the experience of discovering, selecting, and booking tickets for live events such as concerts, comedy shows, festivals, and stadium experiences.

The project focuses on creating a premium user experience through modern design patterns, responsive interfaces, and high-performance seat visualization powered by WebGL.

From event discovery to booking confirmation, MehfilX delivers a complete end-to-end ticket booking workflow.

---

## 🚀 Key Features

### 🎫 Event Discovery

Discover upcoming experiences through an intuitive browsing interface.

* Event category filtering
* City-based search
* Sorting options
* Responsive event cards
* Empty-state handling
* Featured event recommendations

---

### 🎭 Detailed Event Experience

Comprehensive event pages designed to help users make informed booking decisions.

Features include:

* Event hero banners
* Event descriptions
* Artist lineup showcase
* Performance schedule timeline
* Venue information
* Ticket tier breakdowns
* Live booking countdown

---

### 💺 Interactive Seat Selection

The core highlight of MehfilX.

Built using **PixiJS + WebGL**, the seat selection experience is optimized for performance while maintaining visual clarity across large venue layouts.

#### Capabilities

* Interactive seat selection
* Dynamic venue rendering
* Hover tooltips
* Category-based seating
* Zoom controls
* Fit-to-screen controls
* Responsive booking sidebar
* Mobile-friendly booking experience
* Real-time pricing calculations

#### Supported Venue Layouts

* Concert Arenas
* Comedy Venues
* Festival Grounds
* Open-Air Events
* Cricket Stadium Layouts

#### Performance

* WebGL-powered rendering
* Optimized seat visualization
* Supports venue maps exceeding **10,000 seats**
* Smooth interaction even on large seating plans

---

### ⏳ Seat Reservation Workflow

To simulate a real-world ticketing experience, MehfilX implements a synchronized seat reservation system.

#### Reservation Features

* Automatic seat locking after selection
* 3-minute reservation timer
* Reservation persistence between pages
* Automatic seat release on expiration
* Checkout synchronization
* Reservation expiry handling

This ensures selected seats remain temporarily unavailable while a user completes checkout.

---

### 💳 Checkout Experience

A multi-step checkout interface inspired by modern ticketing platforms.

#### Supported Payment Methods

##### UPI

* UPI ID input
* QR code payment simulation

##### Credit & Debit Cards

* Interactive payment form
* Animated card preview
* Secure payment workflow

##### Net Banking

* Major Indian banking options
* Simplified bank selection

#### Additional Features

* Live reservation countdown
* Order summary
* Service fee calculations
* GST calculations
* Secure payment simulation
* Processing states

---

### 🎉 Booking Confirmation

After successful payment, users receive a digital ticket experience.

#### Includes

* Booking confirmation ID
* Event summary
* Venue information
* Seat details
* QR Code entry pass
* Barcode generation
* Download ticket option

---

### 🏟️ Venue Discovery

Browse venues hosting upcoming events.

#### Features

* Venue discovery page
* Venue filtering
* Venue detail pages
* Capacity information
* Ratings
* Live events
* Upcoming events

---

### 🔐 Authentication Screens

Minimal and modern authentication flows.

#### Includes

* Login page
* Signup page
* Social authentication UI
* Responsive layouts

---

# 🎨 Design Philosophy

MehfilX follows a dual-theme design system that separates browsing experiences from booking experiences.

---

## Light Experience

Used across:

* Home Page
* Event Discovery
* Event Details
* Checkout
* Authentication
* Venue Discovery

Characteristics:

* Clean white surfaces
* Neutral backgrounds
* Subtle borders
* Modern typography
* Spacious layouts

---

## Venue Experience

Used exclusively during seat selection.

Characteristics:

* Immersive dark venue atmosphere
* Radial-gradient seating canvas
* High-contrast seat visualization
* Event-night inspired appearance
* Focused booking environment

---

# 🛠️ Technology Stack

## Frontend

* React.js
* React Router DOM
* JavaScript (ES6+)

## Styling

* Tailwind CSS

## Graphics & Rendering

* PixiJS
* WebGL

## Development Tools

* Vite
* ESLint

---

# 📄 Implemented Pages

| Route                    | Description          |
| ------------------------ | -------------------- |
| `/`                      | Home Page            |
| `/events`                | Event Discovery      |
| `/events/:slug`          | Event Details        |
| `/events/:slug/seats`    | Seat Selection       |
| `/events/:slug/checkout` | Checkout             |
| `/events/:slug/success`  | Booking Confirmation |
| `/venues`                | Venue Discovery      |
| `/venues/:id`            | Venue Details        |
| `/login`                 | Login                |
| `/signup`                | Signup               |

---

# 🔄 Booking Flow

```text
Home Page
      ↓
Explore Events
      ↓
Event Discovery
      ↓
Event Details
      ↓
Book Tickets
      ↓
Seat Selection
      ↓
3-Minute Seat Hold Activated
      ↓
Checkout
      ↓
Payment Processing
      ↓
Booking Confirmation
      ↓
QR Ticket Generated
```

---

# 📂 Project Structure

```text
src/
│
├── assets/
│   └── screen.png
│
├── components/
│   ├── common/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── EmptyState.jsx
│   │   ├── FilterChips.jsx
│   │   ├── Icon.jsx
│   │   ├── ImageWithSkeleton.jsx
│   │   ├── InfiniteRail.jsx
│   │   └── LoadingSkeleton.jsx
│   │
│   ├── events/
│   │   ├── EventCard.jsx
│   │   ├── EventHeroCard.jsx
│   │   └── EventSearch.jsx
│   │
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   │
│   ├── seat-selection/
│   │   ├── BookingSidebar.jsx
│   │   ├── EventSummary.jsx
│   │   ├── Seat.jsx
│   │   ├── SeatLegend.jsx
│   │   └── SeatMap.jsx
│   │
│   └── venues/
│       └── VenueCard.jsx
│
├── context/
│
├── data/
│   ├── events.js
│   ├── eventDetails.js
│   ├── venues.js
│   └── seatLayouts.js
│
├── hooks/
│
├── pages/
│   ├── Home.jsx
│   ├── EventDiscovery.jsx
│   ├── EventDetails.jsx
│   ├── SeatSelection.jsx
│   ├── Checkout.jsx
│   ├── BookingSuccess.jsx
│   ├── VenueDiscovery.jsx
│   ├── VenueDetail.jsx
│   ├── Login.jsx
│   └── Signup.jsx
│
├── routes/
│   └── AppRoutes.jsx
│
├── utils/
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# ⚡ Performance Highlights

* PixiJS-powered WebGL rendering
* Large-scale seat visualization
* Optimized React component structure
* Responsive desktop and mobile layouts
* Persistent seat reservation workflow
* Efficient venue data management
* Smooth zoom and pan interactions

---

# ⚙️ Getting Started

## Clone Repository

```bash
git clone <https://github.com/ShidoStack/react-project/>
```

## Navigate To Project

```bash
cd mehfilx
```

## Install Dependencies

```bash
npm install
```

## Start Development Server

```bash
npm run dev
```

The application is available at:

```text
https://mehfilx.vercel.app/
```

---

# 🎯 Learning Objectives

This project was built to explore and demonstrate:

* Modern React architecture
* Component-driven development
* WebGL-powered UI rendering
* Interactive data visualization
* Frontend state management
* Real-world booking workflows
* Responsive UI engineering
* Performance optimization techniques

---

# 🔮 Future Enhancements

Planned improvements include:

* Additional venue geometries
* More event categories
* Enhanced mobile booking experience
* Accessibility improvements
* Improved seat interaction mechanics
* Advanced venue visualizations
* Buyer dashboard
* Organizer dashboard
* Admin dashboard
* Premium features like backstage access to limited(per event) premium members

---

### 🎭 MehfilX

**Discover • Reserve • Experience**

Built with React, PixiJS, Tailwind CSS, and a passion for unforgettable live experiences.
