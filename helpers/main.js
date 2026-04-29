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