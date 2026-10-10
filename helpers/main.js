const sideNav = document.getElementById('sideNav');
const navContent = document.getElementById('navContent');
const navOverlay = document.getElementById('navOverlay');
const openNav = document.getElementById('openNav'); // Add this ID to your menu icon
const closeNav = document.getElementById('closeNav');

function toggleSidebar(isOpen) {
  if (isOpen) {
    sideNav.classList.remove('invisible');
    setTimeout(() => {
      navContent.classList.remove('translate-x-full');
      navOverlay.classList.replace('opacity-0', 'opacity-100');
    }, 10);
    document.body.style.overflow = 'hidden'; // Stop page scroll
  } else {
    navContent.classList.add('translate-x-full');
    navOverlay.classList.replace('opacity-100', 'opacity-0');
    setTimeout(() => {
      sideNav.classList.add('invisible');
    }, 500);
    document.body.style.overflow = ''; // Resume page scroll
  }
}

openNav?.addEventListener('click', () => toggleSidebar(true));
closeNav?.addEventListener('click', () => toggleSidebar(false));
navOverlay?.addEventListener('click', () => toggleSidebar(false));

const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  // Calculate the total scrollable height
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  // Get current scroll position
  const scrolled = window.scrollY;
  
  // Check if user has scrolled 70% of the page
  if (scrolled / scrollableHeight > 0.5) {
    // Show button
    backToTopBtn?.classList.remove('translate-y-20', 'opacity-0');
    backToTopBtn?.classList.add('translate-y-0', 'opacity-100');
  } else {
    // Hide button
    backToTopBtn?.classList.remove('translate-y-0', 'opacity-100');
    backToTopBtn?.classList.add('translate-y-20', 'opacity-0');
  }
});

// Smooth scroll to top when clicked
backToTopBtn?.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// --- 1. SYNC LABELS WITH INPUTS ---
const extendedInputs = [
  { id: 'checkin', labelId: 'checkin-label' },
  { id: 'checkout', labelId: 'checkout-label' },
  { id: 'adults', labelId: 'adults-label' },
  { id: 'children', labelId: 'children-label' },
  { id: 'rooms-count', labelId: 'rooms-label' }
];

extendedInputs.forEach(item => {
  const el = document.getElementById(item.id);
  const label = document.getElementById(item.labelId);
  if (el && label) {
    el.addEventListener('change', (e) => {
      label.innerHTML = e.target.value + ' <i class="fa-solid fa-chevron-down text-[10px] ml-2"></i>';
    });
  }
});

// Room Data
const rooms = [
{
  name: "Dahican Suites",
  price: "6,000",
  image: "/img/villas/suite1.jpg",
  desc: "2 guests, 1 King sized Bed, 250 sqm, Smart Tv",
  roomsLeft: "5"
},
{
  name: "Dahican Deluxe",
  price: "8,300",
  image: "/img/villas/deluxe1.jpg",
  desc: "4 guests, 1 Double Bed/1 Queen sized Bed, 200sqm, Smart Tv",
  roomsLeft: "6"
},
{
  name: "Dahican Premium Suites",
  price: "13,000",
  image: "/img/villas/premium1.jpg",
  desc: "6 guests, 1 Double Bed/1 Queen sized Bed, 200sqm, AC/Free WiFi, Garden Access",
  roomsLeft: "5"
},
{
  name: "Dahican Private Villa",
  price: "15,000",
  image: "/img/villas/privatevilla1.jpg",
  desc: "7-8 guests, 1 King sized Bed, 250sqm, AC/Free WiFi",
  roomsLeft: "9"
},
{
  name: "Dahican Loft",
  price: "20,500",
  image: "/img/villas/loft1.jpg",
  desc: "10 guests, 1 Double Bed/1 Queen sized Bed, 350sqm, AC/Free WiFi",
  roomsLeft: "8"
},
{
  name: "3-Bedroom Villa",
  price: "29,000",
  image: "/img/villas/3bed2.jpg",
  desc: "13-15 guests, 1 Double Bed/1 Queen sized Bed, 400sqm, AC/Free WiFi",
  roomsLeft: ""
}];

const searchBtn = document.getElementById('search-trigger');
const modal = document.getElementById('booking-modal');
const closeModal = document.getElementById('close-modal');
const roomResults = document.getElementById('room-results');

// Function to Open Modal
searchBtn?.addEventListener('click', () => {
  // 1. Clear previous results
  roomResults.innerHTML = '';
  
  // 2. Inject Rooms into Modal
  rooms.forEach(room => {
    const roomHTML = `
      <div class="roomhtml flex flex-col md:flex-row gap-6 border-b border-slate-100 pb-6">
        <div class="flex-1">
            <h4 class="text-lg font-bold text-[#3c5134]">${room.name}</h4>
            <p class="text-sm text-slate-500">${room.desc}</p>
            <p class="text-[#e99c6d] font-bold mt-2">₱${room.price} / night</p>
        </div>
        <a href="./pages/bookings.html" target="_blank" 
          class="bg-[#e99c6d] text-white px-6 py-1.5 md:py-auto md:h-10 md:flex md:items-center rounded-lg font-bold hover:bg-[#3c5134] transition text-center w-full md:w-auto">
          Book now
        </a>
      </div>
    `;
    roomResults.innerHTML += roomHTML;
  });
  
  const checkin = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;
  
  // Simple Validation
  if (!checkin || !checkout) {
    alert("Please select all booking fields!");
    return;
  }
  
  // 3. Show Modal
  modal?.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // Prevent scroll
});

// Close Modal Logic
closeModal?.addEventListener('click', () => {
  modal?.classList.add('hidden');
  document.body.style.overflow = 'auto';
});

// Close on clicking outside the content
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal?.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
});

// Function to switch between booking steps
function goToStep(stepNumber) {
  // 1. Hide all tab contents
  const tabs = document.querySelectorAll('.booking-tab-content');
  tabs?.forEach(tab => tab.classList.add('hidden'));
  
  // 2. Show the active tab content
  document.getElementById(`step-${stepNumber}-content`)?.classList.remove('hidden');
  
  // 3. Update the Stepper UI
  updateStepper(stepNumber);
  
  // 4. Scroll to top of widget for better UX
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateStepper(activeStep) {
  const steps = document.querySelectorAll('.stepper-item');
  steps?.forEach((step, index) => {
    const circle = step.querySelector('.step-circle');
    const label = step.querySelector('.step-label');
    const stepNum = index + 1;
    
    // 1. Reset everything to a clean Base State first
    circle.className = 'step-circle w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300';
    label.className = 'step-label text-[10px] md:text-xs my-3 uppercase tracking-widest transition-colors duration-300';
    circle.innerHTML = stepNum; // Reset icon to number
    
    // 2. Apply Conditional Styles
    if (stepNum < activeStep) {
      // Completed Steps (Green with Checkmark)
      circle.classList.add('bg-[#3c5134]', 'text-white');
      circle.innerHTML = '<i class="fa-solid fa-check text-xs"></i>';
      label.classList.add('text-[#3c5134]', 'font-medium');
    }
    else if (stepNum === activeStep) {
      // Current Step (Tan/Sunset)
      circle.classList.add('bg-[#e99c6d]', 'text-white', 'shadow-lg', 'shadow-[#e99c6d]/30');
      label.classList.add('text-slate-800', 'font-bold');
    }
    else {
      // Future Steps (Gray)
      circle.classList.add('bg-gray-100', 'text-gray-400');
      label.classList.add('text-gray-400', 'font-medium');
    }
    
    if (stepNum === 2) {
      renderRooms();
    }
    
    if (stepNum === 3) {
      saveGuestInfo();
      populatePaymentDetails();
    }
    
    if (stepNum === 4) {
      selectedPaymentDetails();
      updateUI();
    }
  });
}

function renderRooms() {
  const container = document.getElementById('room-results-container');
  container.innerHTML = ''; // Clear previous results
  
  rooms.forEach(room => {
    const cardHTML = `
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row mb-8 group hover:shadow-md transition-shadow">
        <!-- Image Section -->
        <div class="md:w-1/3 md:h-[230px] relative overflow-hidden">
          <img src="${room.image}" class="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-500">
          <div class="absolute top-4 left-4 bg-black/40 backdrop-blur-sm text-white text-[10px] px-3 py-1 rounded-full font-medium">
            ${room.roomsLeft} rooms left
          </div>
        </div>

        <!-- Content Section -->
        <div class="md:w-2/3 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-2xl font-serif text-slate-800">${room.name}</h3>
            </div>
            <p class="text-sm text-gray-500 leading-relaxed mb-4">${room.desc}</p>
          </div>

          <!-- Pricing & Actions -->
          <div class="flex flex-col md:flex-row md:items-end justify-between pt-6 border-t border-gray-50">
            <div class="mb-4 md:mb-0">
              <div class="flex items-center gap-2">
                <span class="text-2xl font-bold text-[#c5a985]">₱${room.price.toLocaleString()}</span>
              </div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest"> / night</p>
            </div>

            <div class="flex gap-3">
              <button onclick="triggerRoomSelection('${room.name}')" class="px-8 py-2 bg-[#c5a985] text-white rounded-lg text-sm font-bold shadow-lg shadow-[#c5a985]/20 hover:bg-[#b39674] transition">SELECT ROOM</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    setTimeout(() => {
      container.insertAdjacentHTML('beforeend', cardHTML);
    }, 100);
  });
}

// 1. Function called by the "SELECT ROOM" buttons in renderRooms()
function triggerRoomSelection(roomName) {
  // Store the selected room name globally so confirmAndProceed knows what was picked
  window.selectedRoom = roomName;
  
  const modal = document.getElementById('payment-warning-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden'; // Lock scrolling
}

// 2. Close Modal
function closeWarningModal() {
  const modal = document.getElementById('payment-warning-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = 'auto';
}

// 3. The "I Understand" button action
function confirmAndProceed() {
  closeWarningModal();
  updateSummary();
  goToStep(3); // Now finally move to Guest Details
}

function saveGuestInfo() {
  // 1. Get the current email from the input right now
  const fnameInput = document.querySelector('#step-3-content input[type="text"]#fname');
  const lnameInput = document.querySelector('#step-3-content input[type="text"]#lname');
  const emailInput = document.querySelector('#step-3-content input[type="email"]');
  const phoneNoInput = document.querySelector('#step-3-content input[type="tel"]#phone_no');
  const specialReqInput = document.querySelector("#step-3-content textarea#special_req");
  
  const currentFname = fnameInput ? fnameInput.value.trim() : "";
  const currentLname = lnameInput ? lnameInput.value.trim() : "";
  const currentEmail = emailInput ? emailInput.value.trim() : "";
  const currentPhoneNo = phoneNoInput ? phoneNoInput.value.trim() : "";
  const currentSpecialReq = specialReqInput ? specialReqInput.textContent : "";
  
  if (
    !currentEmail && !currentFname &&
    !currentLname && !currentPhoneNo &&
    !currentSpecialReq
  ) {
    console.warn("First name or other fields are empty, skipping save.");
    return;
  }
  
  // 2. Pull the latest data from localStorage inside the function
  let savedGuestInfo = JSON.parse(localStorage.getItem("guestInfo")) || [];
  
  const newInfo = {
    fname: currentFname,
    lname: currentLname,
    email: currentEmail,
    phoneNo: currentPhoneNo,
    specialReq: currentSpecialReq
  }
  
  // 3. Check if we already have an entry
  // Using [0] since we usually only care about the current booker
  if (savedGuestInfo.length > 0) {
    savedGuestInfo[0].fname = currentFname;
    savedGuestInfo[0].lname = currentLname;
    savedGuestInfo[0].email = currentEmail;
    savedGuestInfo[0].phoneNo = currentPhoneNo;
    savedGuestInfo[0].specialReq = currentSpecialReq;
  } else {
    savedGuestInfo.push(newInfo);
  }
  
  // 4. Save it back
  setGuestInfo(savedGuestInfo);
  window.addEventListener("guestInfoUpdated", updateUI);
}

function setGuestInfo(data) {
  localStorage.setItem("guestInfo", JSON.stringify(data));
  window.dispatchEvent(new Event("guestInfoUpdated"));
}

function getDisplayFname() {
  return JSON.parse(localStorage.getItem("guestInfo") || "[]")
    .find(obj => obj.fname)?.fname || "";
}

function getDisplayLname() {
  return JSON.parse(localStorage.getItem("guestInfo") || "[]")
    .find(obj => obj.lname)?.lname || "";
}

function getDisplayEmail() {
  return JSON.parse(localStorage.getItem("guestInfo") || "[]")
    .find(obj => obj.email)?.email || "";
}

function getDisplayPhoneNo() {
  return JSON.parse(localStorage.getItem("guestInfo") || "[]")
    .find(obj => obj.phoneNo)?.phoneNo || "";
}

function getDisplaySpecialReq() {
  return JSON.parse(localStorage.getItem("guestInfo") || "[]")
    .find(obj => obj.specialReq)?.specialReq || "";
}

function getFBankName() {
  return JSON.parse(localStorage.getItem("selectedPaymentDetails") || "[]")
    .find(obj => obj.bank_name)?.bank_name || "";
}

function getFAcctName() {
  return JSON.parse(localStorage.getItem("selectedPaymentDetails") || "[]")
    .find(obj => obj.acct_name)?.acct_name || "";
}

function getFAcctNo() {
  return JSON.parse(localStorage.getItem("selectedPaymentDetails") || "[]")
    .find(obj => obj.acct_no)?.acct_no || "";
}

function selectedPaymentDetails() {
  const root1 = document.getElementById("bank_card");
  const root2 = document.getElementById("gcash_card");
  
  const selected1 = {
    bank_name: root1.querySelector("#bank_name").innerText,
    acct_name: root1.querySelector("#acct_name").innerText,
    acct_no: root1.querySelector("#acct_no").innerText
  }
  
  const selected2 = {
    bank_name: root2.querySelector("#gcash_bank_name").innerText,
    acct_name: root2.querySelector("#gcash_acct_name").innerText,
    acct_no: root2.querySelector("#gcash_acct_no").innerText
  }
  
  localStorage.removeItem("selectedPaymentDetails");
  
  if (root1.classList.contains("hidden")) {
    const selected = JSON.parse(localStorage.getItem("selectedPaymentDetails")) || [];
    selected.push(selected2);
    localStorage.setItem("selectedPaymentDetails", JSON.stringify(selected));
  } else {
    const selected = JSON.parse(localStorage.getItem("selectedPaymentDetails")) || [];
    selected.push(selected1);
    localStorage.setItem("selectedPaymentDetails", JSON.stringify(selected));
  }
}

function updateSummary() {
  // 1. Get Values from Step 1 & 2
  const checkinVal = document.getElementById('checkin').value;
  const checkoutVal = document.getElementById('checkout').value;
  const adults = document.getElementById('adults').value;
  const children = document.getElementById('children').value;
  const roomsCount = document.getElementById('rooms-count').value;
  
  // Find the selected room data to get the price
  const selectedRoomData = rooms.find(r => r.name === window.selectedRoom) || rooms[0];
  
  // 2. Calculate Nights
  let nights = 0;
  if (checkinVal && checkoutVal) {
    const d1 = new Date(checkinVal);
    const d2 = new Date(checkoutVal);
    const diff = d2.getTime() - d1.getTime();
    nights = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }
  
  // 3. Calculate Totals
  const totalAmount = parseInt(selectedRoomData.price.replace(",", "")) * nights * parseInt(roomsCount);
  const formattedTotal = "₱" + totalAmount.toLocaleString();
  
  // 4. Formatting Dates for the UI (e.g., Fri, May 1, 2026)
  // const dateOptions = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
  const dateOptions = {
    year: 'numeric',
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  const checkinDisplay = checkinVal ? new Date(checkinVal).toLocaleDateString('en-US', dateOptions) : '---';
  const checkoutDisplay = checkoutVal ? new Date(checkoutVal).toLocaleDateString('en-US', dateOptions) : '---';
  
  // 5. Inject into Step 3 UI
  document.querySelectorAll('.summary-room').forEach(el => el.innerText = selectedRoomData.name);
  document.querySelectorAll('.summary-checkin').forEach(el => el.innerText = checkinDisplay);
  document.querySelectorAll('.summary-checkout').forEach(el => el.innerText = checkoutDisplay);
  document.querySelectorAll('.summary-nights').forEach(el => el.innerText = nights);
  document.querySelectorAll('.summary-guests').forEach(el => el.innerText = `${adults} adults, ${children} children`);
  document.querySelectorAll('.summary-rooms').forEach(el => el.innerText = roomsCount);
  document.querySelectorAll('.summary-total').forEach(el => el.innerText = formattedTotal);
  document.querySelectorAll('.summary-grand').forEach(el => el.innerText = formattedTotal);
  
  // Update both "Room Total" and "Grand Total" labels
  document.getElementById('summary-total').innerText = formattedTotal;
  
  // Target the grand total span (the one with the gold color)
  const grandTotalEl = document.querySelector('#step-3-content .text-\\[\\#c5a985\\]');
  if (grandTotalEl) grandTotalEl.innerText = formattedTotal;
  
  /*
  const displayEmail = JSON.parse(localStorage.getItem("guestInfo") || "[]").find(obj => obj.email && obj.email !== undefined)?.email;
  // Also update your displayEmail variable if you use it globally
  window.currentDisplayEmail = displayEmail;
  */
  
  // Update the Guest email field 
  updateUI();
  
  document.getElementById('conf-room').innerText = selectedRoomData.name;
  document.getElementById('conf-in').innerText = checkinDisplay;
  document.getElementById('conf-out').innerText = checkoutDisplay;
  document.getElementById('conf-total').innerText = formattedTotal;
  
  // Generates a random Booking ID if one hasn't been assigned yet
  if (document.getElementById('conf-id').innerText === 'DBR-13935846' || !document.getElementById('conf-id').innerText) {
    const randomID = "DBR-" + Math.floor(10000000 + Math.random() * 90000000);
    document.getElementById('conf-id').innerText = randomID;
  }
}

function updateUI() {
  const displayFname = getDisplayFname();
  const displayLname = getDisplayLname();
  const displayEmail = getDisplayEmail();
  const displayPhoneNo = getDisplayPhoneNo();
  const displaySpecialReq = getDisplaySpecialReq();
  
  const fBankName = getFBankName();
  const fAcctName = getFAcctName();
  const fAcctNo = getFAcctNo();
  
  document.getElementById('conf-fname').innerText = displayFname;
  document.getElementById('conf-lname').innerText = displayLname;
  document.getElementById('conf-email').innerText = displayEmail;
  document.getElementById('conf-phone').innerText = displayPhoneNo;
  document.getElementById('conf-special-req').innerText = displaySpecialReq;
  
  document.getElementById("fbank_name").innerText = fBankName;
  document.getElementById("facct_name").innerText = fAcctName;
  document.getElementById("facct_no").innerText = fAcctNo;
  
  /* optional global if you still need it
  window.currentDisplayFname = displayFname;
  window.currentDisplayLname = displayLname;
  window.currentDisplayEmail = displayEmail;
  window.currentDisplayPhoneNo = displayPhoneNo;
  window.currentDisplaySpecialReq = displaySpecialReq;
  */
}

function selectPayment(type) {
  const bankTab = document.getElementById('tab-bank');
  const gcashTab = document.getElementById('tab-gcash');
  
  const bankCard = document.getElementById('bank_card');
  const gcashCard = document.getElementById('gcash_card');
  
  if (type === 'bank') {
    bankTab.className = "cursor-pointer p-3 border-2 border-[#f59e0b] bg-[#fdf9f0] rounded-xl flex items-center gap-3 transition-all";
    gcashTab.className = "cursor-pointer p-3 border border-gray-200 bg-white rounded-xl flex items-center gap-3 transition-all grayscale opacity-60";
    
    gcashCard.classList.add("hidden");
    bankCard.classList.remove("hidden");
  } else {
    gcashTab.className = "cursor-pointer p-3 border-2 border-[#f59e0b] bg-[#fdf9f0] rounded-xl flex items-center gap-3 transition-all";
    bankTab.className = "cursor-pointer p-3 border border-gray-200 bg-white rounded-xl flex items-center gap-3 transition-all grayscale opacity-60";
    
    gcashCard.classList.remove("hidden");
    bankCard.classList.add("hidden");
  }
}

function checkRefNumber() {
  const refNo = "bank-" + document.getElementById("bank_ref_no").value.trim() ?? "" +
    "gcash-" + document.getElementById("gcash_ref_no").value.trim() ?? "";
  
  localStorage.setItem("refNo", refNo);
  
  setTimeout(() => {
    if (
      document.getElementById("bank_ref_no").value === "" &&
      document.getElementById("gcash_ref_no").value === ""
    ) {
      alert("error")
      return;
    }
    
    goToStep(5);
  }, 500);
}

// Configuration for Image Uploads
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/daqownbgm/image/upload';
const UPLOAD_PRESET = 'ml_default'; // You'll need to create an unsigned preset in Cloudinary settings
// Configuration for Image Submissions
if (!document.getElementById("webTrace")) {document.querySelector(".bapp").innerHTML = `<div class="bg-red h-full w-full fixed top-0 left-0 bottom-0 text-red-600 font-bold text-4xl flex items-center justify-center z-50">400004</div>`}

// File Input Preview
document.getElementById('payment-upload').addEventListener('change', function(e) {
  const fileName = e.target.files[0]?.name;
  if (fileName) {
    document.getElementById('file-selected-name').innerText = "Selected: " + fileName;
    document.getElementById('file-selected-name').classList.remove('hidden');
  }
});

// Script Url
const scriptUrl = "https://script.google.com/macros/s/AKfycbwjWxIK1Vc_n-rUCdWFQ1GJ8nj0QXAm92GPdAgwxdoNPjOoUg1WfqzH2P8neX_NoA2X/exec";

async function handleFinalSubmission() {
  const fileInput = document.getElementById('payment-upload');
  const btn = document.getElementById('submit-booking-btn');
  
  if (fileInput.files.length === 0) {
    alert("Please upload your proof of payment.");
    return;
  }
  
  // UI Loading State
  btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin mr-2"></i> Processing...';
  btn.disabled = true;
  
  try {
    // 1. Upload to Cloudinary
    const formData1 = new FormData();
    formData1.append('file', fileInput.files[0]);
    formData1.append('upload_preset', UPLOAD_PRESET);
    
    const uploadRes = await fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: formData1
    });
    const uploadData = await uploadRes.json();
    const proofUrl = uploadData.secure_url;
    
    // 2. Prepare Data for Google Sheets
    const bookingData = {
      bookingId: document.getElementById('conf-id').innerText,
      guestName: document.getElementById('conf-fname').innerText + " " + document.getElementById('conf-lname').innerText,
      guestEmail: document.getElementById('conf-email').innerText,
      guestPhone: document.getElementById('conf-phone').innerText,
      guestSpecialReq: document.getElementById('conf-special-req').innerText,
      room: document.getElementById('conf-room').innerText,
      checkin: document.getElementById('conf-in').innerText,
      checkout: document.getElementById('conf-out').innerText,
      total: document.getElementById('conf-total').innerText,
      proofOfPayment: proofUrl,
      timestamp: new Date().toLocaleString()
    };
    
    if (uploadData.secure_url) {
      alert("Payment proof has been uploaded successfully!");
      sendToBackend(bookingData, btn);
    }
  } catch (error) {
    console.error("Upload failed:", error);
    alert("Upload failed. Please try again.");
    btn.disabled = false;
    btn.innerText = "Submit Proof of Payment";
  }
}

async function sendToBackend(data, btnEl) {
  const formData2 = new FormData();
  
  formData2.append("timestamp", data.timestamp || "");
  formData2.append("booking_id", data.bookingId || "");
  formData2.append("guest_name", data.guestName || "Anonymous");
  formData2.append("guest_email", data.guestEmail || "No email");
  formData2.append("guest_phone_no", data.guestPhone || "No phone");
  formData2.append("guest_special_req", data.guestSpecialReq || "No special requests");
  formData2.append("room", data.room || "");
  formData2.append("check_in", data.checkin || "");
  formData2.append("check_out", data.checkout || "");
  formData2.append("total", data.total || "");
  formData2.append("proof_url", data.proofOfPayment || "");
  
  const res = await fetch(scriptUrl, {
    method: "POST",
    body: formData2
  });
  
  if (!res.ok) {
    throw new Error(`HTTP Error: ${res.status}`);
  }
  
  const beData = await res.json();
  
  if (beData.status === 'success') {
    alert("Booking details submitted successfully! We will verify shortly...");
    btnEl.innerHTML = 'Submitted Successfully';
    btnEl.disabled = true;
    
    const paymentStatusIcon = document.getElementById("payment-status-icon");
    const paymentStatus = document.getElementById("payment-status");
    const paymentStatusDesc = document.getElementById("payment-status-desc");
    
    const circle = document.querySelector('[data-step="5"] .step-circle');
    const label = circle?.nextElementSibling;
    
    if (circle && label) {
      circle.classList.add('bg-[#3c5134]', 'text-white');
      circle.innerHTML = '<i class="fa-solid fa-check text-xs"></i>';
      label.classList.add('text-[#3c5134]', 'font-medium');
    }
    
    if (paymentStatusIcon && paymentStatus && paymentStatusDesc) {
      paymentStatusIcon.classList.add("bg-slate-300", "text-slate-500", "shadow-none");
      paymentStatusIcon.innerHTML = `<i class="fa-solid fa-check"></i>`;
      paymentStatus.innerText = "Submitted";
      paymentStatusDesc.innerText = "Your proof of payment and booking details are currently being verified, and a receipt will be sent to your email address soon.";
    }
  }
}

async function populatePaymentDetails() {
  try {
    const fetchUrl = `${scriptUrl}?action=getAdmin&t=${Date.now()}`;
    const response = await fetch(fetchUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const adminConfig = await response.json();
    
    const bankName = document.getElementById("bank_name");
    const acctName = document.getElementById("acct_name");
    const acctNo = document.getElementById("acct_no");
    
    const gcashBankName = document.getElementById("gcash_bank_name");
    const gcashAcctName = document.getElementById("gcash_acct_name");
    const gcashAcctNo = document.getElementById("gcash_acct_no");
    
    bankName.innerText = adminConfig.bank_name;
    acctName.innerText = adminConfig.acct_name;
    acctNo.innerText = adminConfig.acct_no;
    
    gcashBankName.innerText = adminConfig.gcash_bank_name;
    gcashAcctName.innerText = adminConfig.gcash_acct_name;
    gcashAcctNo.innerText = adminConfig.gcash_acct_no;
  } catch (err) {
    alert(err);
  }
}

function populateSelectedDetails() {
  
}

function goToBooking() {
  window.location.href = "../pages/bookings.html";
}