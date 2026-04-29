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