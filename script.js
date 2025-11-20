// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', function() {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const isClickInsideNav = navMenu.contains(event.target);
    const isClickOnToggle = menuToggle.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Contact form logic
const wantContactCheckbox = document.getElementById('wantContact');
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxBYKCTdpn6ZQEkl7pOhfNCrbrVTsBZxx_osaNXc1957JDH_vhLlHtI4moNIywEOuwI/exec';

// Form submission handler
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const submitButton = contactForm.querySelector('.btn-submit');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Build a FormData object from the form (more compatible with Apps Script endpoints)
    const formData = new FormData(contactForm);
    // Ensure the checkbox value is explicit
    formData.set('wantContact', wantContactCheckbox.checked ? 'yes' : 'no');

    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    formMessage.style.display = 'none';

    // Helper: JSONP sender returns a Promise
    function sendContactViaJSONP(formElement, endpointUrl, timeoutMs = 15000) {
        return new Promise((resolve, reject) => {
            const params = new URLSearchParams();
            const data = new FormData(formElement);
            for (const [key, value] of data) {
                params.append(key, value);
            }

            const callbackName = 'jsonp_cb_' + Date.now() + '_' + Math.floor(Math.random() * 100000);

            window[callbackName] = function(response) {
                cleanup();
                resolve(response);
            };

            function handleError() {
                cleanup();
                reject(new Error('JSONP request failed (network or blocked).'));
            }

            function cleanup() {
                if (script.parentNode) script.parentNode.removeChild(script);
                try { delete window[callbackName]; } catch (e) { window[callbackName] = undefined; }
                if (timer) clearTimeout(timer);
            }

            const script = document.createElement('script');
            script.async = true;
            script.src = endpointUrl + '?' + params.toString() + '&callback=' + callbackName;
            script.onerror = handleError;

            const timer = setTimeout(() => {
                handleError();
            }, timeoutMs);

            document.head.appendChild(script);
        });
    }

    try {
        // First try a normal fetch POST with FormData
        const response = await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            body: formData
        });

        // Try to read response as text first (some endpoints return plain text)
        const text = await response.text();

        let result = null;
        try {
            result = JSON.parse(text);
        } catch (err) {
            result = { raw: text };
        }

        const serverSaysSuccess = (result && result.status === 'success') || (typeof result.raw === 'string' && /success/i.test(result.raw));

        if (!response.ok || !serverSaysSuccess) {
            console.warn('Fetch failed or returned non-success. Falling back to JSONP.', { status: response.status, text, parsed: result });
            // Attempt JSONP fallback
            const jsonpResult = await sendContactViaJSONP(contactForm, APPS_SCRIPT_URL);
            if (jsonpResult && jsonpResult.status === 'success') {
                showMessage('¡Gracias por tu interés! Te contactaremos pronto.', 'success');
                contactForm.reset();
                wantContactCheckbox.checked = false;
            } else {
                console.error('JSONP fallback returned non-success:', jsonpResult);
                throw new Error('Error al enviar el formulario (JSONP).');
            }
        } else {
            showMessage('¡Gracias por tu interés! Te contactaremos pronto.', 'success');
            contactForm.reset();
            wantContactCheckbox.checked = false;
        }
    } catch (error) {
        console.warn('Fetch attempt failed, trying JSONP if possible.', error);
        try {
            const jsonpResult = await sendContactViaJSONP(contactForm, APPS_SCRIPT_URL);
            if (jsonpResult && jsonpResult.status === 'success') {
                showMessage('¡Gracias por tu interés! Te contactaremos pronto.', 'success');
                contactForm.reset();
                wantContactCheckbox.checked = false;
            } else {
                console.error('JSONP fallback returned non-success:', jsonpResult);
                throw new Error('Error al enviar el formulario (JSONP).');
            }
        } catch (jsonpErr) {
            console.error('Form submission error (fetch+jsonp):', jsonpErr);
            showMessage('Hubo un problema al enviar el formulario. Inténtalo nuevamente más tarde.', 'error');
        }
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Enviar Solicitud';
    }
});

// Function to show form messages
function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.detail-card, .testimonial-card, .video-container');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// Add active state to navigation items on scroll
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    allNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Optional: Add active class styling to CSS via JavaScript
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: var(--primary-color);
    }
    .nav-menu a.active::after {
        width: 100%;
    }
    @media (max-width: 768px) {
        .nav-menu a.active {
            border-left: 3px solid var(--primary-color);
            padding-left: 10px;
        }
    }
`;
document.head.appendChild(style);

// Return to Top Button
const returnToTopButton = document.getElementById('returnToTop');

// Show/hide button based on scroll position
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        returnToTopButton.classList.add('show');
    } else {
        returnToTopButton.classList.remove('show');
    }
});

// Scroll to top when button is clicked
returnToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Client-side JSONP helper
function sendContactViaJSONP(formElement, endpointUrl, onSuccess, onError) {
  // Build query string from form
  const params = new URLSearchParams();
  const data = new FormData(formElement);
  for (const [key, value] of data) {
    params.append(key, value);
  }

  // JSONP callback name (unique)
  const callbackName = 'jsonp_cb_' + Date.now() + '_' + Math.floor(Math.random() * 100000);

  // Create the callback function
  window[callbackName] = function(response) {
    cleanup();
    onSuccess && onSuccess(response);
  };

  // Error handler (script load error)
  function handleError() {
    cleanup();
    onError && onError(new Error('JSONP request failed (network or blocked).'));
  }

  // Remove script and callback after done
  function cleanup() {
    if (script.parentNode) script.parentNode.removeChild(script);
    try { delete window[callbackName]; } catch (e) { window[callbackName] = undefined; }
  }

  // Compose script tag
  const script = document.createElement('script');
  script.async = true;
  // Append callback param; endpointUrl should be the full Apps Script URL (the /exec URL)
  script.src = endpointUrl + '?' + params.toString() + '&callback=' + callbackName;
  script.onerror = handleError;

  // Add timeout to fail gracefully
  const timeout = setTimeout(() => {
    handleError();
    clearTimeout(timeout);
  }, 15000); // 15s

  document.head.appendChild(script);
}

