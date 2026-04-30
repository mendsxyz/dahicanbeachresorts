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

openNav.addEventListener('click', () => toggleSidebar(true));
closeNav.addEventListener('click', () => toggleSidebar(false));
navOverlay.addEventListener('click', () => toggleSidebar(false));

const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  // Calculate the total scrollable height
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  // Get current scroll position
  const scrolled = window.scrollY;
  
  // Check if user has scrolled 70% of the page
  if (scrolled / scrollableHeight > 0.5) {
    // Show button
    backToTopBtn.classList.remove('translate-y-20', 'opacity-0');
    backToTopBtn.classList.add('translate-y-0', 'opacity-100');
  } else {
    // Hide button
    backToTopBtn.classList.remove('translate-y-0', 'opacity-100');
    backToTopBtn.classList.add('translate-y-20', 'opacity-0');
  }
});

// Smooth scroll to top when clicked
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// --- 1. SYNC LABELS WITH INPUTS ---
const inputs = [
  { id: 'checkin', labelId: 'checkin-label' },
  { id: 'checkout', labelId: 'checkout-label' },
  { id: 'guest-select', labelId: 'guest-label' }
];

inputs.forEach(item => {
  const el = document.getElementById(item.id);
  const label = document.getElementById(item.labelId);
  
  el.addEventListener('change', (e) => {
    // If it's a date, format it nicely. If it's a select, just take the value.
    label.innerHTML = e.target.value + ' <i class="fa-solid fa-chevron-down ml-2"></i>';
  });
});

// Room Data
const rooms = [
{
  name: "Dahican Suites",
  price: "6,000",
  desc: "2 guests, 1 King Size, 250 sqm, Smart Tv"
},
{
  name: "Dahican Deluxe",
  price: "8,300",
  desc: "4 guests, 1 Double/1 Queen size, 200sqm, Smart Tv"
},
{
  name: "Dahican Premium Suites",
  price: "13,000",
  desc: "6 guests, 1 Double/1 Queen size, 200sqm, AC/Free WiFi, Garden Access"
},
{
  name: "Dahican Private Villa",
  price: "15,000",
  desc: "7-8 guests, 1 King size, 250sqm, AC/Free WiFi"
},
{
  name: "Dahican Loft",
  price: "20,500",
  desc: "10 guests, 1 Double/1 Queen size, 350sqm, AC/Free WiFi"
},
{
  name: "3-Bedroom Villa",
  price: "29,000",
  desc: "13-15 guests, 1 Double/1 Queen size, 400sqm, AC/Free WiFi"
}
];

const searchBtn = document.getElementById('search-trigger');
const modal = document.getElementById('booking-modal');
const closeModal = document.getElementById('close-modal');
const roomResults = document.getElementById('room-results');

// Function to Open Modal
searchBtn.addEventListener('click', () => {
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
        <a href="https://www.facebook.com/share/1Dfxvd5xLV/?mibextid=wwXIfr" target="_blank" 
          class="bg-[#e99c6d] text-white px-6 py-2 rounded-full font-bold hover:bg-[#3c5134] transition text-center w-full md:w-auto">
          Book
        </a>
      </div>
    `;
    roomResults.innerHTML += roomHTML;
  });
  
  const checkin = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;
  
  // Simple Validation
  if (!checkin || !checkout) {
    alert("Please select your checking dates first!");
    return;
  }
  
  // 3. Show Modal
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // Prevent scroll
});

// Close Modal Logic
closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
});

// Close on clicking outside the content
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
});