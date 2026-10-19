# 🚗 RideMates — Modern Web Prototype

> **"Same route. Same time. Split the fare."**  
> A clean, responsive modern website prototype for student carpooling, automatic fare splitting, and verified campus mobility.

---

## 🌟 Quick Launch

You can open the website directly in any web browser without any installation:

### Option 1: Direct File Launch
Double-click [`index.html`](file:///C:/Users/SNEHITHA/.gemini/antigravity/scratch/ridemates/index.html) in Windows File Explorer.

### Option 2: Run via Local HTTP Server
Run this command in PowerShell:
```powershell
python -m http.server 3000 --directory "C:\Users\SNEHITHA\.gemini\antigravity\scratch\ridemates"
```
Then open [`http://localhost:3000`](http://localhost:3000) in your browser.

---

## 💻 Modern Website & 📱 Mobile Phone Features

- **Full Responsive Web Design**: Built to adapt flawlessly across **desktop monitors, laptops, tablets, and mobile phones** (from wide 1440px displays down to compact 375px phone screens like iPhone SE/14/15/16 and Android devices).
- **Mobile Bottom Navigation Bar**:
  - Automatically activates on mobile screens (`<= 768px`) like modern native mobile apps (Uber, Airbnb).
  - Quick, single-thumb access to: **Home (🏠)**, **Find (🔍)**, **Offer (🚗)**, **My Rides (📋)**, and **Profile (👤)**.
- **Mobile Hamburger & Slide-Over Drawer**:
  - Tappable `☰` menu in the header opens an off-canvas drawer with full site navigation, theme switcher, and account controls.
- **Native Bottom-Sheet Modals**:
  - On mobile devices, dialogs (Chat with co-riders, SOS emergency alert, Live tracking share, Pitch guide) smoothly transform into ergonomic **slide-up bottom sheets** with visual drag handles.
- **Touch-Optimized Styling**:
  - Minimum 44px tap targets for buttons and inputs.
  - Form inputs set to 16px to prevent iOS Safari auto-zooming.
  - Multi-column card grids collapse cleanly into comfortable single-column cards with responsive fluid typography.
- **Login & Logout Authentication**:
  - Full authentication workflow supporting login, registration, and logout.
  - Interactive **User Profile Dropdown** in the navbar with quick access to Profile, My Rides, Post a Ride, and **Log Out**.
  - **1-Click Demo Accounts Switcher**: Instant login presets for **Rahul Sharma** (IIT Delhi CS '25) and **Ananya Iyer** (IIT Delhi Biotech '25) for rapid presentation testing.
  - Dedicated **Log Out button** on the Profile page dashboard.
  - Protected page route guards (prompts login when trying to book, post, or view personal rides while logged out).
- **Primary Color Switcher**: One-click toggle in the top announcement bar to switch between **Electric Blue** and **Taxi Yellow**.
- **Sticky Navigation Bar**: Instant routing to Home, Find a Ride, Offer a Ride, My Rides, and Profile with real-time active indicators.
- **Pitch & Feature Guide (💡)**: One-click interactive overlay detailing the 5 core problems solved by RideMates for presentation evaluations.

---

## 📄 Complete Pages & Flows

| Page | Website Layout & Interactive Elements | Flow |
|---|---|---|
| **1. Welcome Page** | Hero section with tagline badge, value propositions 3-column grid, popular routes, and CTA buttons (**Get Started**, **Log In**, **Browse Rides**). | ➔ Sign Up / Login |
| **Login Page** | Dedicated student authentication screen with 1-Click Demo Account pills (Rahul Sharma / Ananya Iyer), email/token input, and link to Sign Up. | ➔ Home |
| **2. Sign Up Page** | Centered authentication card, verified email domain check (`.edu.in`), trust notice, and link to existing Login. | ➔ Home |
| **3. Home Page** | Greeting ("Hi, Rahul 👋"), Verified student badge ("IIT Delhi • Verified"), two large hero action cards (**Find a Ride** & **Offer a Ride**), and 3-column popular routes grid. | ➔ Find / Offer |
| **4. Find a Ride** | Search form with pickup, destination, travel date/time, and quick-destination chips (*Railway Station, Airport, City Centre, Cyber Hub*). | ➔ Available Rides |
| **5. Available Rides** | 2-column card grid showing departure time, route, seats left, total & per-person fare, savings vs solo cab, verified poster details, and "Join Ride" buttons. Filterable by cheapest or top-rated. | ➔ Ride Details |
| **6. Ride Details & Fare Split** | 2-column layout: Route timeline & co-riders list on the left; sticky fare split card on the right with the mathematical breakdown (`₹300 ÷ 3 = ₹100 each`), "You save ₹200 vs solo" banner, Share, SOS Emergency, and Confirm Ride buttons. | ➔ Ride Confirmed |
| **7. Ride Confirmed** | 2-column layout: Booking OTP badge (`8492`) & trip summary on the left; interactive group chat drawer, live trip share link, and interactive 5-star rating widget with feedback chips on the right. | ➔ Home / My Rides |
| **8. Offer a Ride** | 2-column layout: Ride creation form on the left with interactive seat counter (`- [3] +`) and total fare input; live interactive card preview on the right showing real-time updates as you type. | ➔ Available Rides |
| **Extra: My Rides** | Filter tabs for Upcoming booked rides with boarding OTPs and Past completed trips with downloadable receipts. | Tab |
| **Extra: Profile** | Student dashboard with verified academic credentials, 4.9★ rating, ₹4,250 total saved counter, 38 kg CO2 reduction, emergency contact settings, and **Log Out of RideMates** button. | Tab |


---

## 🎯 Features to Show & Why (Demo Evaluation Table)

| Feature | Problem It Solves | Where to See It |
|---|---|---|
| **Verified college email** | **Safety and trust** | Sign Up page & verified shields throughout the app. |
| **Ratings** | **Trust & peer accountability** | Available Rides cards, co-rider lists, and Ride Confirmed rating widget. |
| **Automatic fare split** | **Payment disputes & awkwardness** | Ride Details screen: `₹300 ÷ 3 = ₹100 each` with instant savings highlight. |
| **Share trip & Emergency contact** | **Safety & peace of mind** | "Emergency SOS" button (safety modal) and "Share Trip Status" (live link). |
| **Seats left & time on each card** | **Timing mismatch & full cabs** | Available Rides cards display exact departure windows and seat badges. |
