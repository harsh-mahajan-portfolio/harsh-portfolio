/**
 * HARSH'S IMPORT & EXPORT - MAIN JAVASCRIPT FILE
 * Clean, modular Vanilla JavaScript for interactive website features.
 * Well-commented for beginner understanding and future customization.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. MOBILE HAMBURGER NAVIGATION
  // Toggles the mobile menu open/closed when tapping the hamburger icon.
  // ==========================================================================
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburger.classList.toggle('is-active');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Automatically close the mobile menu when any navigation link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ==========================================================================
  // 2. STICKY NAVBAR SHADOW ON SCROLL
  // Adds a shadow and darker background when the user scrolls down the page.
  // ==========================================================================
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // ==========================================================================
  // 3. ACTIVE NAVIGATION LINK HIGHLIGHTER
  // Highlights the current page link based on the browser's current URL.
  // ==========================================================================
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ==========================================================================
  // 4. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
  // Reveals elements smoothly with a subtle fade/slide up as they enter the viewport.
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Reveal only once for performance
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers: show elements immediately
    revealElements.forEach(el => el.classList.add('active'));
  }

  // ==========================================================================
  // 5. FAQ ACCORDION (Interactive Toggle)
  // Allows users to expand and collapse frequently asked questions.
  // ==========================================================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Optional: Close any other open FAQ items for a clean single-open look
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });

        // Toggle the clicked FAQ
        if (!isActive) {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
        } else {
          item.classList.remove('active');
          questionBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });

  // ==========================================================================
  // 6. BACK TO TOP BUTTON
  // Displays a floating button to quickly scroll back to the top of the page.
  // ==========================================================================
  const backToTopBtn = document.getElementById('backToTop');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================================================
  // 7. CONTACT FORM VALIDATION & HANDLING
  // Validates user input before showing a friendly confirmation message.
  // (Frontend demonstration: does not send emails without a configured backend)
  // ==========================================================================
  const contactForm = document.getElementById('businessEnquiryForm');
  const formSuccessAlert = document.getElementById('formSuccessAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent standard page reload

      let isValid = true;

      // Field References
      const fullName = document.getElementById('fullName');
      const email = document.getElementById('email');
      const phone = document.getElementById('phone');
      const country = document.getElementById('country');
      const service = document.getElementById('service');
      const message = document.getElementById('message');

      // Helper function to validate a field
      function validateField(field, condition, errorMsgId) {
        const errorEl = document.getElementById(errorMsgId);
        if (!condition) {
          field.classList.add('error');
          if (errorEl) errorEl.style.display = 'block';
          isValid = false;
        } else {
          field.classList.remove('error');
          if (errorEl) errorEl.style.display = 'none';
        }
      }

      // 1. Validate Full Name (At least 2 letters)
      if (fullName) {
        validateField(fullName, fullName.value.trim().length >= 2, 'nameError');
      }

      // 2. Validate Email (Simple email pattern check)
      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        validateField(email, emailRegex.test(email.value.trim()), 'emailError');
      }

      // 3. Validate Phone (At least 7 digits)
      if (phone) {
        const phoneClean = phone.value.replace(/\D/g, '');
        validateField(phone, phoneClean.length >= 7, 'phoneError');
      }

      // 4. Validate Country
      if (country) {
        validateField(country, country.value.trim().length > 0, 'countryError');
      }

      // 5. Validate Service Selection
      if (service) {
        validateField(service, service.value !== '', 'serviceError');
      }

      // 6. Validate Message (At least 10 characters)
      if (message) {
        validateField(message, message.value.trim().length >= 10, 'messageError');
      }

      // If all fields pass validation:
      if (isValid) {
        // Show simulated success banner
        if (formSuccessAlert) {
          formSuccessAlert.style.display = 'block';
          formSuccessAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Reset the form inputs
        contactForm.reset();

        // Optional: Hide success banner after 8 seconds
        setTimeout(() => {
          if (formSuccessAlert) {
            formSuccessAlert.style.display = 'none';
          }
        }, 8000);
      }
    });

    // Clear individual error styling as the user types
    const inputs = contactForm.querySelectorAll('.form-control');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        input.classList.remove('error');
        const errorMsg = input.parentElement.querySelector('.error-message');
        if (errorMsg) errorMsg.style.display = 'none';
      });
    });
  }

  // ==========================================================================
  // 8. WORLD MAP INTERACTIVE HUB TOOLTIPS
  // Allows users to click or hover on target hubs to see route descriptions.
  // ==========================================================================
  const targetHubs = document.querySelectorAll('.target-hub');
  const regionInfoDisplay = document.getElementById('regionInfoDisplay');

  if (targetHubs.length > 0 && regionInfoDisplay) {
    targetHubs.forEach(hub => {
      hub.addEventListener('mouseenter', () => {
        const regionName = hub.getAttribute('data-region') || 'Target Region';
        const routeInfo = hub.getAttribute('data-info') || 'Planned commercial connectivity corridor';
        regionInfoDisplay.innerHTML = `<strong>📍 ${regionName}:</strong> ${routeInfo}`;
      });
    });
  }
});
