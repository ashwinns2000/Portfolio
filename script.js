// Initialize Lucide Icons
if (window.lucide) {
  lucide.createIcons();
}

// 1. Theme Toggle (Adaptive Light / Dark Mode with Persistence)
const themeToggleBtn = document.getElementById('themeToggle');
const htmlEl = document.documentElement;

function applyTheme(isDark) {
  if (isDark) {
    htmlEl.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    htmlEl.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
  if (window.lucide) {
    lucide.createIcons();
  }
}

// Check saved theme or system preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
  applyTheme(true);
} else {
  applyTheme(false);
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const isCurrentlyDark = htmlEl.classList.contains('dark');
    applyTheme(!isCurrentlyDark);
  });
}

// 2. Mobile Hamburger Menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// 3. Client-side Interactive Contact Form
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const submitBtnText = document.getElementById('submitBtnText');
const formSuccessToast = document.getElementById('formSuccessToast');

if (contactForm && submitBtn && submitBtnText && formSuccessToast) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    submitBtn.disabled = true;
    submitBtnText.textContent = 'Sending...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtnText.textContent = 'Message Sent';
      submitBtn.classList.remove('bg-apple-blue', 'hover:bg-apple-blueHover');
      submitBtn.classList.add('bg-emerald-600');
      
      formSuccessToast.classList.remove('hidden');
      contactForm.reset();

      setTimeout(() => {
        submitBtnText.textContent = 'Send Another Message';
        submitBtn.classList.remove('bg-emerald-600');
        submitBtn.classList.add('bg-apple-blue', 'hover:bg-apple-blueHover');
      }, 4000);
    }, 700);
  });
}

// 4. Copy Email to Clipboard Shortcut
const copyEmailBtn = document.getElementById('copyEmailBtn');
const copiedTooltip = document.getElementById('copiedTooltip');
const emailTextEl = document.getElementById('emailText');

if (copyEmailBtn && copiedTooltip && emailTextEl) {
  copyEmailBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(emailTextEl.textContent.trim()).then(() => {
      copiedTooltip.classList.remove('hidden');
      setTimeout(() => {
        copiedTooltip.classList.add('hidden');
      }, 2000);
    });
  });
}

// 5. Dynamic Typewriter Effect ('engineer.' <-> 'developer.')
const roleFlipper = document.getElementById('roleFlipper');
if (roleFlipper) {
  const roles = ['engineer.', 'developer.'];
  let roleIndex = 0;
  let charIndex = roles[0].length;
  let isDeleting = true;

  function typeEffect() {
    const currentWord = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
      roleFlipper.textContent = currentWord.substring(0, charIndex);
    } else {
      charIndex++;
      roleFlipper.textContent = currentWord.substring(0, charIndex);
    }

    let typeSpeed = isDeleting ? 50 : 95;

    // Finished typing full word
    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2500; // Display pause
      isDeleting = true;
    } 
    // Finished deleting word
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 350; // Pause before starting next word
    }

    setTimeout(typeEffect, typeSpeed);
  }

  // Start typewriter after brief initial pause
  setTimeout(typeEffect, 2200);
}

// 6. Live Clock & Current Year in Footer
const currentYearEl = document.getElementById('currentYear');
if (currentYearEl) {
  currentYearEl.textContent = new Date().getFullYear();
}

function updateClock() {
  const now = new Date();
  const options = { 
    hour12: true, 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  };
  const timeString = now.toLocaleTimeString([], options);
  const clockEl = document.getElementById('localClock');
  if (clockEl) {
    clockEl.textContent = `Local Time • ${timeString}`;
  }
}
updateClock();
setInterval(updateClock, 1000);

// 7. Dynamic ScrollSpy / Active Nav Section Color Tint
const sections = document.querySelectorAll('section[id]');
const desktopNavLinks = document.querySelectorAll('#desktopNav .nav-link');
const mobileNavLinksList = document.querySelectorAll('#mobileMenu .mobile-nav-link');

function highlightNav() {
  const scrollPosition = window.scrollY + 180;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      desktopNavLinks.forEach((link) => {
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('nav-link-active');
        } else {
          link.classList.remove('nav-link-active');
        }
      });

      mobileNavLinksList.forEach((link) => {
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('text-apple-blue', 'dark:text-apple-neonBlue', 'font-bold');
        } else if (link.getAttribute('href') !== '#contact') {
          link.classList.remove('text-apple-blue', 'dark:text-apple-neonBlue', 'font-bold');
        }
      });
    }
  });

  // Clear tint when scrolled near top / Hero section
  if (window.scrollY < 250) {
    desktopNavLinks.forEach((link) => link.classList.remove('nav-link-active'));
    mobileNavLinksList.forEach((link) => {
      if (link.getAttribute('href') !== '#contact') {
        link.classList.remove('text-apple-blue', 'dark:text-apple-neonBlue', 'font-bold');
      }
    });
  }
}

window.addEventListener('scroll', highlightNav, { passive: true });
highlightNav();


