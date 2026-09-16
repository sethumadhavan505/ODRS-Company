const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('.desktop-nav');


// =========================
// ADD HOME TO NAVIGATION
// =========================

if (nav && !nav.querySelector('a[href="index.html"]')) {
  const homeLink = document.createElement('a');

  homeLink.href = 'index.html';
  homeLink.textContent = 'Home';

  nav.insertBefore(homeLink, nav.firstChild);
}


// =========================
// ACTIVE PAGE HIGHLIGHT
// =========================

if (nav) {
  const currentPage =
    window.location.pathname.split('/').pop() || 'index.html';

  nav.querySelectorAll('a').forEach(link => {
    link.removeAttribute('aria-current');

    const href = link.getAttribute('href');

    if (!href) return;

    const linkPage = href.split('/').pop();

    if (
      linkPage === currentPage ||
      (currentPage === '' && linkPage === 'index.html')
    ) {
      link.setAttribute('aria-current', 'page');
    }
  });

  const activeStyle = document.createElement('style');

  activeStyle.textContent = `
    .desktop-nav a[aria-current="page"] {
      color: var(--red) !important;
      position: relative;
    }

    .desktop-nav a[aria-current="page"]::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: -8px;
      height: 2px;
      border-radius: 2px;
      background: var(--red);
    }
  `;

  document.head.appendChild(activeStyle);
}


// =========================
// LOGIN REDIRECT
// =========================

document
  .querySelectorAll('a[href="login.html"]')
  .forEach(link => {
    link.href = 'https://odrs-company-io.vercel.app/';
    link.target = '_self';
  });


// =========================
// DARK MODE + LOGOS
// =========================

const headerLogo = document.getElementById('headerLogo');
const heroLogo = document.getElementById('heroLogo');
const whyLogo = document.getElementById('whyLogo');


// Header logo
function updateHeaderLogo() {
  if (!headerLogo) return;

  if (document.body.classList.contains('dark')) {
    headerLogo.src = 'darkmodelogo.png';
  } else {
    headerLogo.src = 'logo.png';
  }
}


// Hero "ODRS SERVICE HUB" logo
function updateHeroLogo() {
  if (!heroLogo) return;

  if (document.body.classList.contains('dark')) {
    heroLogo.src = 'darkmodelogo.png';
  } else {
    heroLogo.src = 'logo.png';
  }
}


// Why ODRS logo
function updateWhyLogo() {
  if (!whyLogo) return;

  if (document.body.classList.contains('dark')) {
    whyLogo.src = 'dark.png';
  } else {
    whyLogo.src = 'brand.png';
  }
}


// =========================
// RESTORE SAVED THEME
// =========================

const savedTheme = localStorage.getItem('odrs-theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark');
}


// =========================
// SET LOGOS ON PAGE LOAD
// =========================

updateHeaderLogo();
updateHeroLogo();
updateWhyLogo();


// =========================
// DARK MODE TOGGLE
// =========================

if (themeToggle) {
  themeToggle.addEventListener('click', () => {

    // Toggle dark mode
    document.body.classList.toggle('dark');

    // Check current mode
    const isDark =
      document.body.classList.contains('dark');

    // Save theme
    localStorage.setItem(
      'odrs-theme',
      isDark ? 'dark' : 'light'
    );

    // Change images
    updateHeaderLogo();
    updateHeroLogo();
    updateWhyLogo();
  });
}


// =========================
// MOBILE MENU
// =========================

if (menuToggle && nav) {

  menuToggle.addEventListener('click', () => {

    const open = nav.classList.toggle('mobile-open');

    nav.style.display = open ? 'flex' : '';

    if (open) {
      nav.style.position = 'absolute';
      nav.style.top = '68px';
      nav.style.left = '0';
      nav.style.right = '0';
      nav.style.padding = '18px 5%';
      nav.style.background = 'var(--card)';
      nav.style.flexDirection = 'column';
      nav.style.borderBottom = '1px solid var(--line)';
    }
  });


  // Close mobile menu after clicking a link
  nav.querySelectorAll('a').forEach(link => {

    link.addEventListener('click', () => {

      nav.classList.remove('mobile-open');

      if (window.innerWidth <= 700) {
        nav.style.display = '';
      }
    });

  });

}


// =========================
// SCROLL REVEAL ANIMATION
// =========================

const observer = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add('visible');

        observer.unobserve(entry.target);
      }

    });

  },
  {
    threshold: 0.12
  }
);


// Observe all reveal elements
document
  .querySelectorAll('.reveal')
  .forEach(el => observer.observe(el));
