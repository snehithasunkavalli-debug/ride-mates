/**
 * RideMates - Modern Website Application Controller
 * "Same route. Same time. Split the fare."
 */

// Preset student accounts for instant demo testing
const presetAccounts = {
  rahul: {
    name: "Rahul Sharma",
    email: "rahul.s@campus.edu.in",
    phone: "+91 98765 43210",
    college: "IIT Delhi",
    branch: "Computer Science '25",
    rating: 4.9,
    ridesCount: 24,
    totalSaved: 4250,
    co2Saved: 38,
    isVerified: true
  },
  ananya: {
    name: "Ananya Iyer",
    email: "ananya.i@campus.edu.in",
    phone: "+91 98112 33445",
    college: "IIT Delhi",
    branch: "Biotech '25",
    rating: 4.9,
    ridesCount: 18,
    totalSaved: 3100,
    co2Saved: 28,
    isVerified: true
  }
};

// Global Application State
const state = {
  isLoggedIn: true, // Default to logged in as Rahul Sharma, can be logged out anytime
  currentUser: { ...presetAccounts.rahul },
  activePage: "welcome",
  currentTheme: "blue",
  soundEnabled: true,
  
  // Currently selected ride for details & confirmation
  selectedRide: null,

  // Sample Campus Rides Dataset
  rides: [
    {
      id: "RIDE-101",
      posterName: "Aman Verma",
      posterAvatar: "AV",
      posterRating: 4.9,
      posterCollege: "IIT Delhi (Mechanical '25)",
      isVerified: true,
      from: "Campus Main Gate",
      to: "New Delhi Railway Station",
      departureTime: "6:30 PM Today",
      seatsTotal: 3,
      seatsLeft: 2,
      totalFare: 300,
      farePerPerson: 100,
      savingsVsSolo: 200,
      vehicle: "White Swift Dzire (DL 01 AB 1234)",
      coriders: [
        { name: "Aman V. (Host)", role: "Driver", rating: 4.9 },
        { name: "Sneha Roy", role: "Co-rider", rating: 4.8 }
      ],
      chatMessages: [
        { sender: "Aman V.", text: "Hey folks! I will be waiting near Gate 2 opposite the Cafe.", isMe: false, time: "6:10 PM" },
        { sender: "Sneha Roy", text: "Got it! Reaching there in 5 minutes with my luggage.", isMe: false, time: "6:12 PM" }
      ]
    },
    {
      id: "RIDE-102",
      posterName: "Priya Sharma",
      posterAvatar: "PS",
      posterRating: 5.0,
      posterCollege: "IIT Delhi (CS '26)",
      isVerified: true,
      from: "Campus Hostel Block C",
      to: "Indira Gandhi Int'l Airport (T3)",
      departureTime: "7:15 PM Today",
      seatsTotal: 4,
      seatsLeft: 1,
      totalFare: 800,
      farePerPerson: 200,
      savingsVsSolo: 600,
      vehicle: "Hyundai i20 (HR 26 DQ 5678)",
      coriders: [
        { name: "Priya S. (Host)", role: "Driver", rating: 5.0 },
        { name: "Kunal M.", role: "Co-rider", rating: 4.9 },
        { name: "Aditi G.", role: "Co-rider", rating: 4.8 }
      ],
      chatMessages: [
        { sender: "Priya S.", text: "Leaving promptly at 7:15 PM to avoid airport flyover toll traffic.", isMe: false, time: "6:30 PM" }
      ]
    },
    {
      id: "RIDE-103",
      posterName: "Rohan Nair",
      posterAvatar: "RN",
      posterRating: 4.8,
      posterCollege: "IIT Delhi (Electrical '24)",
      isVerified: true,
      from: "Campus Library Circle",
      to: "Connaught Place (City Centre)",
      departureTime: "8:00 PM Today",
      seatsTotal: 3,
      seatsLeft: 2,
      totalFare: 360,
      farePerPerson: 120,
      savingsVsSolo: 240,
      vehicle: "Maruti Baleno (DL 04 EF 9012)",
      coriders: [
        { name: "Rohan N. (Host)", role: "Driver", rating: 4.8 }
      ],
      chatMessages: [
        { sender: "Rohan N.", text: "Heading to CP for project dinner. 2 open seats left!", isMe: false, time: "6:45 PM" }
      ]
    },
    {
      id: "RIDE-104",
      posterName: "Ananya Iyer",
      posterAvatar: "AI",
      posterRating: 4.9,
      posterCollege: "IIT Delhi (Biotech '25)",
      isVerified: true,
      from: "Campus Main Gate",
      to: "Cyber Hub, Gurugram",
      departureTime: "8:45 PM Today",
      seatsTotal: 4,
      seatsLeft: 3,
      totalFare: 600,
      farePerPerson: 150,
      savingsVsSolo: 450,
      vehicle: "Honda City (DL 03 Z 4321)",
      coriders: [
        { name: "Ananya I. (Host)", role: "Driver", rating: 4.9 }
      ],
      chatMessages: [
        { sender: "Ananya I.", text: "Comfortable AC sedan booked, splitting fare equally.", isMe: false, time: "7:00 PM" }
      ]
    }
  ],

  // Booked & Posted Rides
  myRides: {
    upcoming: [],
    past: [
      {
        id: "RIDE-089",
        route: "Campus to City Centre",
        date: "Yesterday, 5:30 PM",
        fare: 120,
        status: "Completed",
        withWho: "Rohan & 2 other students"
      },
      {
        id: "RIDE-076",
        route: "Airport T3 to Campus",
        date: "14 Oct, 9:00 PM",
        fare: 200,
        status: "Completed",
        withWho: "Priya & 3 other students"
      }
    ]
  }
};

// Subtle Web Audio Click/Chime Feedback
function playSound(type = "click") {
  if (!state.soundEnabled) return;
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    if (type === "success") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } else {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(320, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    }
  } catch (e) {
    // Audio context may require user gesture on some browsers
  }
}

// Navigation System
function navigateTo(pageId) {
  playSound("click");

  // Authentication Guard: Check if protected page requires login
  const protectedPages = ["profile", "my-rides", "offer-ride"];
  if (protectedPages.includes(pageId) && !state.isLoggedIn) {
    showToast("Please log in with your college email first", "🔒");
    navigateTo("login");
    return;
  }

  // Close dropdown if open
  closeUserDropdown();

  state.activePage = pageId;

  // Toggle page visibility
  const pages = document.querySelectorAll(".page");
  pages.forEach(p => p.classList.remove("active"));

  const target = document.getElementById(`page-${pageId}`);
  if (target) {
    target.classList.add("active");
  }

  // Scroll smoothly to top of window
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Update Navbar Active State
  updateNavbarLinks(pageId);

  // Dynamic Page updates
  if (pageId === "available-rides") {
    renderAvailableRides();
  } else if (pageId === "ride-details") {
    renderRideDetails();
  } else if (pageId === "ride-confirmed") {
    renderRideConfirmed();
  } else if (pageId === "my-rides") {
    renderMyRides();
  } else if (pageId === "home") {
    updateHomeData();
  } else if (pageId === "offer-ride") {
    updateOfferEstimate();
  } else if (pageId === "profile") {
    updateProfileData();
  }
}

// Update top navbar, mobile bottom bar, and drawer active indicators
function updateNavbarLinks(pageId) {
  const navItems = document.querySelectorAll(".nav-link-item");
  navItems.forEach(item => {
    item.classList.toggle("active", item.getAttribute("data-page") === pageId);
  });

  const mobileBottomItems = document.querySelectorAll(".mobile-bottom-item");
  mobileBottomItems.forEach(item => {
    item.classList.toggle("active", item.getAttribute("data-page") === pageId);
  });

  const drawerLinks = document.querySelectorAll(".drawer-link-btn");
  drawerLinks.forEach(item => {
    item.classList.toggle("active", item.getAttribute("data-page") === pageId);
  });
}

// Mobile Slide-over Drawer Controls
function toggleMobileDrawer() {
  playSound("click");
  const overlay = document.getElementById("mobile-drawer-overlay");
  if (overlay) {
    overlay.classList.toggle("active");
  }
}

function closeMobileDrawer() {
  const overlay = document.getElementById("mobile-drawer-overlay");
  if (overlay) {
    overlay.classList.remove("active");
  }
}

// Toast notification display
function showToast(message, icon = "✓") {
  const toast = document.getElementById("toast-notice");
  const msgEl = document.getElementById("toast-message");
  const iconEl = document.getElementById("toast-icon");
  if (!toast) return;

  msgEl.textContent = message;
  iconEl.textContent = icon;
  toast.classList.add("show");

  playSound("success");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

// Theme Switcher: Blue vs Yellow
function toggleTheme(themeName) {
  playSound("click");
  state.currentTheme = themeName;
  document.documentElement.setAttribute("data-theme", themeName);

  const btnYellow = document.querySelectorAll(".theme-toggle-yellow, .yellow-btn");
  const btnBlue = document.querySelectorAll(".theme-toggle-blue, .blue-btn");

  if (themeName === "yellow") {
    btnYellow.forEach(b => b.classList.add("active"));
    btnBlue.forEach(b => b.classList.remove("active"));
    showToast("Theme switched to Taxi Yellow", "🚕");
  } else {
    btnBlue.forEach(b => b.classList.add("active"));
    btnYellow.forEach(b => b.classList.remove("active"));
    showToast("Theme switched to Electric Blue", "⚡");
  }
}

// Feature Pitch Guide Modal
function togglePitchGuide(show = true) {
  playSound("click");
  const modal = document.getElementById("pitch-guide-modal");
  if (!modal) return;
  if (show) {
    modal.classList.add("active");
  } else {
    modal.classList.remove("active");
  }
}

// ================= AUTHENTICATION HANDLERS =================

// Update Navbar and User Header based on Login status
function updateAuthUI() {
  const navAuthGroup = document.getElementById("nav-auth-group");
  const userDropdownContainer = document.getElementById("user-dropdown-container");
  const drawerAuth = document.getElementById("drawer-auth-section");

  const navUserName = document.getElementById("nav-user-name");
  const navUserAvatar = document.getElementById("nav-user-avatar");
  const dropdownUserName = document.getElementById("dropdown-user-name");
  const dropdownUserEmail = document.getElementById("dropdown-user-email");

  const initials = state.currentUser.name.split(" ").map(n => n[0]).join("");

  if (state.isLoggedIn) {
    if (navAuthGroup) navAuthGroup.style.display = "none";
    if (userDropdownContainer) userDropdownContainer.style.display = "block";

    if (navUserName) navUserName.textContent = state.currentUser.name;
    if (navUserAvatar) navUserAvatar.textContent = initials;
    if (dropdownUserName) dropdownUserName.textContent = state.currentUser.name;
    if (dropdownUserEmail) dropdownUserEmail.textContent = state.currentUser.email;

    if (drawerAuth) {
      drawerAuth.innerHTML = `
        <button class="btn-profile-logout" style="margin-top:0;" onclick="handleLogout(); closeMobileDrawer();">
          <span>🚪</span> Log Out (${state.currentUser.name.split(' ')[0]})
        </button>
      `;
    }
  } else {
    if (navAuthGroup) navAuthGroup.style.display = "flex";
    if (userDropdownContainer) userDropdownContainer.style.display = "none";

    if (drawerAuth) {
      drawerAuth.innerHTML = `
        <div style="display:flex; gap:8px;">
          <button class="btn-web-secondary" style="flex:1; justify-content:center; padding:10px;" onclick="navigateTo('login'); closeMobileDrawer();">Log In</button>
          <button class="btn-web-primary" style="flex:1; justify-content:center; padding:10px;" onclick="navigateTo('signup'); closeMobileDrawer();">Sign Up</button>
        </div>
      `;
    }
  }

  updateProfileData();
  updateHomeData();
}

// User Profile Dropdown Toggle
function toggleUserDropdown() {
  playSound("click");
  const menu = document.getElementById("user-dropdown-menu");
  if (menu) {
    menu.classList.toggle("show");
  }
}

function closeUserDropdown() {
  const menu = document.getElementById("user-dropdown-menu");
  if (menu) {
    menu.classList.remove("show");
  }
}

// Handle Login Form Submission
function handleLogin(e) {
  if (e) e.preventDefault();
  const emailInput = document.getElementById("input-login-email");
  const emailVal = emailInput ? emailInput.value.trim() : "rahul.s@campus.edu.in";

  // Check if matched preset account or custom
  if (emailVal.toLowerCase().includes("ananya")) {
    state.currentUser = { ...presetAccounts.ananya };
  } else {
    state.currentUser = { ...presetAccounts.rahul, email: emailVal };
  }

  state.isLoggedIn = true;
  updateAuthUI();
  showToast(`Welcome back, ${state.currentUser.name}! Logged in.`, "🎓");
  navigateTo("home");
}

// 1-Click Quick Login as Preset Student
function quickLogin(accountKey) {
  if (presetAccounts[accountKey]) {
    state.currentUser = { ...presetAccounts[accountKey] };
    state.isLoggedIn = true;
    updateAuthUI();
    showToast(`Logged in as ${state.currentUser.name}`, "👤");
    navigateTo("home");
  }
}

// Sign Up Form Submission
function handleSignUp(e) {
  if (e) e.preventDefault();
  const nameInput = document.getElementById("input-signup-name");
  const emailInput = document.getElementById("input-signup-email");
  const phoneInput = document.getElementById("input-signup-phone");

  if (nameInput && nameInput.value.trim()) state.currentUser.name = nameInput.value.trim();
  if (emailInput && emailInput.value.trim()) state.currentUser.email = emailInput.value.trim();
  if (phoneInput && phoneInput.value.trim()) state.currentUser.phone = phoneInput.value.trim();

  state.isLoggedIn = true;
  updateAuthUI();
  showToast("College Email Verified & Logged In!", "🛡️");
  navigateTo("home");
}

// Handle Logout
function handleLogout() {
  playSound("click");
  state.isLoggedIn = false;
  closeUserDropdown();
  updateAuthUI();
  showToast("Logged out of RideMates", "👋");
  navigateTo("welcome");
}

// Update Home Page Header & User Info
function updateHomeData() {
  const greetingEl = document.getElementById("home-greeting-name");
  if (greetingEl) greetingEl.textContent = state.currentUser.name;
}

// Update Profile Page Data
function updateProfileData() {
  const profileName = document.getElementById("profile-name");
  const profileEmail = document.getElementById("profile-email");
  const profileAvatar = document.getElementById("profile-avatar");
  const profileSaved = document.getElementById("profile-saved");
  const profileRides = document.getElementById("profile-rides");
  const profileRating = document.getElementById("profile-rating");
  const profileCO2 = document.getElementById("profile-co2");

  if (profileName) profileName.textContent = state.currentUser.name;
  if (profileEmail) profileEmail.textContent = state.currentUser.email;
  if (profileAvatar) {
    const initials = state.currentUser.name.split(" ").map(n => n[0]).join("");
    profileAvatar.textContent = initials || "RS";
  }
  if (profileSaved) profileSaved.textContent = `₹${state.currentUser.totalSaved.toLocaleString()}`;
  if (profileRides) profileRides.textContent = `${state.currentUser.ridesCount} Trips`;
  if (profileRating) profileRating.textContent = `★ ${state.currentUser.rating}`;
  if (profileCO2) profileCO2.textContent = `${state.currentUser.co2Saved} kg`;
}

// Search and Filter Rides
function searchRides(fromVal = null, toVal = null) {
  playSound("click");
  const fromInput = document.getElementById("find-from-input");
  const toInput = document.getElementById("find-to-input");

  if (fromInput && fromVal) fromInput.value = fromVal;
  if (toInput && toVal) toInput.value = toVal;

  navigateTo("available-rides");
}

function selectQuickChip(from, to, btn) {
  const fromInput = document.getElementById("find-from-input");
  const toInput = document.getElementById("find-to-input");
  if (fromInput) fromInput.value = from;
  if (toInput) toInput.value = to;

  const chips = document.querySelectorAll(".route-chip-btn");
  chips.forEach(c => c.classList.remove("active"));
  if (btn) btn.classList.add("active");

  playSound("click");
  showToast(`Route selected: ${from} ➔ ${to}`, "📍");
}

// Render Available Rides Feed in Web Card Grid
function renderAvailableRides(filter = "all") {
  const container = document.getElementById("rides-cards-container");
  if (!container) return;

  container.innerHTML = "";
  let list = [...state.rides];

  if (filter === "cheapest") {
    list.sort((a, b) => a.farePerPerson - b.farePerPerson);
  } else if (filter === "rating") {
    list.sort((a, b) => b.posterRating - a.posterRating);
  }

  list.forEach(ride => {
    const card = document.createElement("div");
    card.className = "ride-card-web";
    card.innerHTML = `
      <div>
        <div class="ride-header-row">
          <div class="ride-time-tag">
            <span>🕒</span> ${ride.departureTime}
          </div>
          <div class="seat-status-tag ${ride.seatsLeft <= 1 ? 'urgent' : 'available'}">
            <span>💺</span> ${ride.seatsLeft} of ${ride.seatsTotal} seats left
          </div>
        </div>

        <div class="ride-route-headline">
          <span>📍</span> ${ride.from} ➔ ${ride.to}
        </div>

        <div class="fare-breakdown-box">
          <div>
            <div style="font-size:11.5px; color:var(--text-muted);">Total: ₹${ride.totalFare}</div>
            <div class="fare-price-display">₹${ride.farePerPerson} <span>/ person</span></div>
          </div>
          <div class="savings-tag-pill">
            Save ₹${ride.savingsVsSolo} vs solo cab
          </div>
        </div>
      </div>

      <div class="ride-poster-row">
        <div class="poster-flex-info">
          <div class="poster-avatar-box">${ride.posterAvatar}</div>
          <div class="poster-text-details">
            <h5>${ride.posterName} <span style="color:var(--primary);" title="Verified Student">✓</span></h5>
            <p>★ ${ride.posterRating} • ${ride.posterCollege}</p>
          </div>
        </div>
        <button class="btn-join-ride-web" onclick="selectRideAndOpenDetails('${ride.id}')">
          Join Ride ➔
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

function filterRidesTab(tabName, element) {
  playSound("click");
  const tabs = document.querySelectorAll(".web-filter-btn");
  tabs.forEach(t => t.classList.remove("active"));
  if (element) element.classList.add("active");
  renderAvailableRides(tabName);
}

// Select a Ride to open Ride Details & Fare Split
function selectRideAndOpenDetails(rideId) {
  const ride = state.rides.find(r => r.id === rideId);
  if (!ride) return;
  state.selectedRide = ride;
  navigateTo("ride-details");
}

// Render Ride Details and Fare Split
function renderRideDetails() {
  const ride = state.selectedRide || state.rides[0];
  state.selectedRide = ride;

  const pickupEl = document.getElementById("details-pickup");
  const dropEl = document.getElementById("details-drop");
  const timeEl = document.getElementById("details-time");
  const vehicleEl = document.getElementById("details-vehicle");
  const coridersList = document.getElementById("details-coriders-list");
  const formulaTotal = document.getElementById("formula-total");
  const formulaPeople = document.getElementById("formula-people");
  const formulaPerPerson = document.getElementById("formula-per-person");
  const savingsBannerText = document.getElementById("details-savings-text");
  const confirmBtn = document.getElementById("details-confirm-btn");

  if (pickupEl) pickupEl.textContent = ride.from;
  if (dropEl) dropEl.textContent = ride.to;
  if (timeEl) timeEl.textContent = ride.departureTime;
  if (vehicleEl) vehicleEl.textContent = ride.vehicle;

  // Fare calculations
  const totalRiders = ride.seatsTotal - ride.seatsLeft + 1; // +1 for user
  const perPerson = Math.round(ride.totalFare / totalRiders);
  const userSavings = ride.totalFare - perPerson;

  if (formulaTotal) formulaTotal.textContent = `₹${ride.totalFare}`;
  if (formulaPeople) formulaPeople.textContent = `${totalRiders}`;
  if (formulaPerPerson) formulaPerPerson.textContent = `₹${perPerson}`;
  if (savingsBannerText) {
    savingsBannerText.textContent = `You save ₹${userSavings} compared with riding alone!`;
  }
  if (confirmBtn) {
    confirmBtn.innerHTML = `Confirm Ride (₹${perPerson}) <span>✓</span>`;
  }

  // Co-riders List
  if (coridersList) {
    coridersList.innerHTML = "";
    ride.coriders.forEach(c => {
      const item = document.createElement("div");
      item.className = "corider-pill-row";
      const initials = c.name.split(" ").map(n => n[0]).join("");
      item.innerHTML = `
        <div class="corider-left-meta">
          <div class="corider-mini-avatar">${initials}</div>
          <div>
            <h5 style="font-size:13.5px; font-weight:700; color:var(--text-main);">${c.name}</h5>
            <p style="font-size:11.5px; color:var(--text-muted);">★ ${c.rating} • Verified Student</p>
          </div>
        </div>
        <span class="problem-pill">${c.role}</span>
      `;
      coridersList.appendChild(item);
    });

    // Add current user preview item
    const youItem = document.createElement("div");
    youItem.className = "corider-pill-row";
    youItem.style.background = "var(--primary-light)";
    youItem.style.border = "1px solid var(--primary-glow)";
    youItem.innerHTML = `
      <div class="corider-left-meta">
        <div class="corider-mini-avatar" style="background:var(--primary); color:var(--primary-contrast);">You</div>
        <div>
          <h5 style="font-size:13.5px; font-weight:700; color:var(--text-main);">${state.currentUser.name} (You)</h5>
          <p style="font-size:11.5px; color:var(--text-muted);">★ ${state.currentUser.rating} • Joining now</p>
        </div>
      </div>
      <span class="problem-pill" style="background:var(--primary); color:var(--primary-contrast);">Joining</span>
    `;
    coridersList.appendChild(youItem);
  }
}

// Confirm Ride
function confirmCurrentRide() {
  if (!state.isLoggedIn) {
    showToast("Please log in to confirm your ride booking", "🔒");
    navigateTo("login");
    return;
  }

  const ride = state.selectedRide || state.rides[0];
  const bookedRide = {
    ...ride,
    bookedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    otpCode: Math.floor(1000 + Math.random() * 9000),
    status: "Confirmed"
  };

  const exists = state.myRides.upcoming.some(r => r.id === ride.id);
  if (!exists) {
    state.myRides.upcoming.unshift(bookedRide);
  }

  if (ride.seatsLeft > 0) {
    ride.seatsLeft -= 1;
  }

  showToast("Ride Confirmed! Boarding pass ready.", "🎉");
  navigateTo("ride-confirmed");
}

// Render Confirmed Page
function renderRideConfirmed() {
  const ride = state.selectedRide || state.rides[0];
  const summaryRoute = document.getElementById("confirmed-summary-route");
  const summaryTime = document.getElementById("confirmed-summary-time");
  const summaryFare = document.getElementById("confirmed-summary-fare");
  const summaryDriver = document.getElementById("confirmed-summary-driver");
  const summaryVehicle = document.getElementById("confirmed-summary-vehicle");
  const otpCode = document.getElementById("confirmed-otp-code");

  if (summaryRoute) summaryRoute.textContent = `${ride.from} ➔ ${ride.to}`;
  if (summaryTime) summaryTime.textContent = ride.departureTime;
  if (summaryFare) summaryFare.textContent = `₹${ride.farePerPerson} per person`;
  if (summaryDriver) summaryDriver.textContent = ride.posterName;
  if (summaryVehicle) summaryVehicle.textContent = ride.vehicle;
  if (otpCode) {
    const existing = state.myRides.upcoming.find(r => r.id === ride.id);
    otpCode.textContent = existing ? existing.otpCode : "8492";
  }
}

// Offer a Ride - Seat Counter & Dynamic Live Preview
let offerSeats = 3;
function adjustOfferSeats(delta) {
  playSound("click");
  offerSeats = Math.max(1, Math.min(6, offerSeats + delta));
  const display = document.getElementById("offer-seats-display");
  if (display) display.textContent = offerSeats;
  updateOfferEstimate();
}

function updateOfferEstimate() {
  const fareInput = document.getElementById("offer-fare-input");
  const estimateDisplay = document.getElementById("offer-per-seat-price");
  const previewSeatPrice = document.getElementById("offer-preview-seat-price");
  const previewSeats = document.getElementById("offer-preview-seats");
  const previewRoute = document.getElementById("offer-preview-route");
  const fromInput = document.getElementById("offer-from-input");
  const toInput = document.getElementById("offer-to-input");

  const total = parseFloat(fareInput ? fareInput.value : 300) || 300;
  const perPerson = Math.round(total / (offerSeats + 1));

  if (estimateDisplay) estimateDisplay.textContent = `₹${perPerson}`;
  if (previewSeatPrice) previewSeatPrice.textContent = `₹${perPerson}`;
  if (previewSeats) previewSeats.textContent = `${offerSeats} of ${offerSeats} seats available`;
  if (previewRoute && fromInput && toInput) {
    previewRoute.textContent = `${fromInput.value || "Campus"} ➔ ${toInput.value || "Destination"}`;
  }
}

// Handle Posting a Ride
function handlePostRide(e) {
  if (e) e.preventDefault();
  if (!state.isLoggedIn) {
    showToast("Please log in to post a ride", "🔒");
    navigateTo("login");
    return;
  }

  const from = document.getElementById("offer-from-input").value.trim() || "Campus Main Gate";
  const to = document.getElementById("offer-to-input").value.trim() || "Connaught Place";
  const date = document.getElementById("offer-date-input").value || "Today";
  const time = document.getElementById("offer-time-input").value || "7:30 PM";
  const fare = parseFloat(document.getElementById("offer-fare-input").value) || 300;

  const perSeat = Math.round(fare / (offerSeats + 1));
  const newRide = {
    id: `RIDE-${Math.floor(200 + Math.random() * 800)}`,
    posterName: state.currentUser.name,
    posterAvatar: state.currentUser.name.split(" ").map(n => n[0]).join(""),
    posterRating: state.currentUser.rating,
    posterCollege: `${state.currentUser.college} (Verified)`,
    isVerified: true,
    from,
    to,
    departureTime: `${time} ${date}`,
    seatsTotal: offerSeats,
    seatsLeft: offerSeats,
    totalFare: fare,
    farePerPerson: perSeat,
    savingsVsSolo: fare - perSeat,
    vehicle: "Personal Sedan (DL 09 XY 7890)",
    coriders: [
      { name: `${state.currentUser.name} (Driver)`, role: "Host", rating: state.currentUser.rating }
    ],
    chatMessages: [
      { sender: state.currentUser.name, text: "Ride posted! Traveling safely together.", isMe: true, time: "Just now" }
    ]
  };

  state.rides.unshift(newRide);
  state.myRides.upcoming.unshift({
    ...newRide,
    status: "Host (Your Post)",
    otpCode: "6521"
  });

  showToast("Ride Posted! It is now live for campus peers.", "🚀");
  state.selectedRide = newRide;
  navigateTo("available-rides");
}

// Render My Rides Web Grid
function renderMyRides() {
  const container = document.getElementById("my-rides-list-container");
  if (!container) return;

  container.innerHTML = "";

  if (state.myRides.upcoming.length === 0) {
    container.innerHTML = `
      <div class="web-card" style="text-align:center; padding:48px 24px;">
        <div style="font-size:48px; margin-bottom:14px;">🚗</div>
        <h3 style="font-size:18px; font-weight:800; margin-bottom:6px;">No upcoming booked rides</h3>
        <p style="font-size:13.5px; color:var(--text-muted); margin-bottom:24px; max-width:400px; margin-left:auto; margin-right:auto;">
          Search rides headed towards your destination, or post your own vehicle's empty seats.
        </p>
        <button class="btn-web-primary" onclick="navigateTo('find-ride')">Find a Ride Now ➔</button>
      </div>
    `;
    return;
  }

  state.myRides.upcoming.forEach(ride => {
    const card = document.createElement("div");
    card.className = "ride-card-web";
    card.innerHTML = `
      <div>
        <div class="ride-header-row">
          <div class="ride-time-tag"><span>🕒</span> ${ride.departureTime}</div>
          <span class="seat-status-tag available">✓ Confirmed</span>
        </div>
        <div class="ride-route-headline"><span>📍</span> ${ride.from} ➔ ${ride.to}</div>
        <div class="fare-breakdown-box">
          <div>
            <span style="font-size:11.5px; color:var(--text-muted);">Your fare share:</span>
            <div class="fare-price-display">₹${ride.farePerPerson}</div>
          </div>
          <div class="boarding-otp-strip" style="margin-top:0; padding:6px 14px;">
            <span class="otp-title" style="font-size:11px;">Boarding OTP:</span>
            <span class="otp-number" style="font-size:16px; letter-spacing:2px;">${ride.otpCode || '8492'}</span>
          </div>
        </div>
      </div>
      <div style="display:flex; gap:12px; margin-top:14px;">
        <button class="btn-web-secondary" style="flex:1; justify-content:center;" onclick="openChatModal()">💬 Chat with Co-riders</button>
        <button class="btn-web-secondary" style="flex:1; justify-content:center;" onclick="openShareModal()">🔗 Share Live Status</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function toggleMyRidesTab(tab) {
  playSound("click");
  const upcomingBtn = document.getElementById("tab-my-upcoming");
  const pastBtn = document.getElementById("tab-my-past");
  const list = document.getElementById("my-rides-list-container");

  if (tab === "upcoming") {
    upcomingBtn.classList.add("active");
    pastBtn.classList.remove("active");
    renderMyRides();
  } else {
    pastBtn.classList.add("active");
    upcomingBtn.classList.remove("active");
    list.innerHTML = "";
    state.myRides.past.forEach(p => {
      const card = document.createElement("div");
      card.className = "ride-card-web";
      card.innerHTML = `
        <div class="ride-header-row">
          <div class="ride-time-tag"><span>🕒</span> ${p.date}</div>
          <span class="seat-status-tag" style="background:var(--surface-alt); color:var(--text-muted);">Completed</span>
        </div>
        <div class="ride-route-headline"><span>📍</span> ${p.route}</div>
        <p style="font-size:13px; color:var(--text-muted); margin-bottom:14px;">With: <strong>${p.withWho}</strong></p>
        <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border); padding-top:12px;">
          <div style="font-size:16px; font-weight:800;">₹${p.fare} paid</div>
          <button class="btn-web-secondary" style="padding:6px 14px; font-size:12px;" onclick="showToast('Fare Receipt PDF downloaded', '📄')">Download Receipt 📄</button>
        </div>
      `;
      list.appendChild(card);
    });
  }
}

// Chat Modal Dialog
function openChatModal() {
  playSound("click");
  const modal = document.getElementById("chat-modal");
  if (modal) modal.classList.add("active");
  renderChatMessages();
}

function closeChatModal() {
  playSound("click");
  const modal = document.getElementById("chat-modal");
  if (modal) modal.classList.remove("active");
}

function renderChatMessages() {
  const container = document.getElementById("chat-messages-container");
  if (!container) return;
  const ride = state.selectedRide || state.rides[0];

  container.innerHTML = "";
  ride.chatMessages.forEach(msg => {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble-web ${msg.isMe ? 'me' : 'peer'}`;
    bubble.innerHTML = `
      <div class="chat-sender-heading">${msg.sender} • ${msg.time}</div>
      <div>${msg.text}</div>
    `;
    container.appendChild(bubble);
  });
  container.scrollTop = container.scrollHeight;
}

function sendChatMessage() {
  const input = document.getElementById("chat-input-text");
  if (!input || !input.value.trim()) return;

  const ride = state.selectedRide || state.rides[0];
  const newMsg = {
    sender: state.currentUser.name,
    text: input.value.trim(),
    isMe: true,
    time: "Just now"
  };

  ride.chatMessages.push(newMsg);
  input.value = "";
  renderChatMessages();
  playSound("click");

  // Simulated co-rider automated reply
  setTimeout(() => {
    const replies = [
      "Awesome! I'm already at the pickup spot.",
      "Driver just confirmed car number DL 01 AB 1234.",
      "Got it! See you in 5 minutes."
    ];
    const peerReply = replies[Math.floor(Math.random() * replies.length)];
    ride.chatMessages.push({
      sender: ride.posterName,
      text: peerReply,
      isMe: false,
      time: "Just now"
    });
    renderChatMessages();
    playSound("success");
  }, 1400);
}

// SOS / Emergency Modal
function openSOSModal() {
  playSound("click");
  const modal = document.getElementById("sos-modal");
  if (modal) modal.classList.add("active");
}

function closeSOSModal() {
  playSound("click");
  const modal = document.getElementById("sos-modal");
  if (modal) modal.classList.remove("active");
}

function triggerEmergencyAlert() {
  playSound("success");
  showToast("SOS Alert sent to Campus Security & Mom!", "🚨");
  closeSOSModal();
}

// Share Trip Modal
function openShareModal() {
  playSound("click");
  const modal = document.getElementById("share-modal");
  if (modal) modal.classList.add("active");
}

function closeShareModal() {
  playSound("click");
  const modal = document.getElementById("share-modal");
  if (modal) modal.classList.remove("active");
}

function copyTripLink() {
  playSound("click");
  const link = "https://ridemates.campus/track/DL01AB1234";
  if (navigator.clipboard) {
    navigator.clipboard.writeText(link).catch(() => {});
  }
  showToast("Live Trip Tracking Link Copied!", "🔗");
  closeShareModal();
}

// Star Rating Interaction
let currentStarRating = 0;
function setStarRating(stars) {
  currentStarRating = stars;
  playSound("click");
  const starSymbols = document.querySelectorAll(".star-symbol");
  starSymbols.forEach((s, idx) => {
    if (idx < stars) {
      s.classList.add("active");
      s.textContent = "★";
    } else {
      s.classList.remove("active");
      s.textContent = "☆";
    }
  });
}

function toggleFeedbackTag(el) {
  playSound("click");
  el.classList.toggle("active");
}

function submitRideRating() {
  if (currentStarRating === 0) {
    showToast("Please select a star rating first", "⭐");
    return;
  }
  showToast(`Thank you! Rated ${currentStarRating} stars.`, "🌟");
  setTimeout(() => {
    navigateTo("home");
  }, 1000);
}

// Close dropdown on clicking outside
document.addEventListener("click", (e) => {
  const container = document.getElementById("user-dropdown-container");
  if (container && !container.contains(e.target)) {
    closeUserDropdown();
  }
});

// Initial Setup
window.addEventListener("DOMContentLoaded", () => {
  navigateTo("welcome");

  const fareInput = document.getElementById("offer-fare-input");
  const fromInput = document.getElementById("offer-from-input");
  const toInput = document.getElementById("offer-to-input");

  if (fareInput) fareInput.addEventListener("input", updateOfferEstimate);
  if (fromInput) fromInput.addEventListener("input", updateOfferEstimate);
  if (toInput) toInput.addEventListener("input", updateOfferEstimate);

  updateAuthUI();
});
