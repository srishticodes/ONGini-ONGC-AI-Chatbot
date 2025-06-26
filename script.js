function updateScrollProgress() {
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById("scroll-progress").style.width = scrollPercent + "%";
}

// Header scroll effect
function handleHeaderScroll() {
  const header = document.getElementById("header");
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

// Fade in animation on scroll
function handleFadeInAnimation() {
  const elements = document.querySelectorAll(".fade-in");
  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("visible");
    }
  });
}

// Mobile menu toggle
function toggleMobileMenu() {
  const navMenu = document.getElementById("nav-menu");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");

  navMenu.classList.toggle("active");
  mobileMenuBtn.textContent = navMenu.classList.contains("active") ? "✕" : "☰";
}

// Smooth scrolling for navigation links
function smoothScroll(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");
  counters.forEach((counter) => {
    const target = parseInt(counter.textContent);
    const increment = target / 100;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent =
        Math.floor(current) +
        (counter.textContent.includes("+") ? "+" : "") +
        (counter.textContent.includes("%") ? "%" : "");
    }, 20);
  });
}

// Contact form submission
function handleFormSubmission(e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(e.target);
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  // Simple validation
  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields.");
    return;
  }

  // Simulate form submission
  alert("Thank you for your message! We will get back to you soon.");
  e.target.reset();
}

// Event listeners
window.addEventListener("scroll", () => {
  updateScrollProgress();
  handleHeaderScroll();
  handleFadeInAnimation();
});

document
  .getElementById("mobile-menu-btn")
  .addEventListener("click", toggleMobileMenu);

// Navigation link click handlers
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = link.getAttribute("href");
    smoothScroll(target);

    // Close mobile menu if open
    const navMenu = document.getElementById("nav-menu");
    if (navMenu.classList.contains("active")) {
      toggleMobileMenu();
    }
  });
});

// CTA button click handlers
document.querySelectorAll('.btn[href^="#"]').forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const target = btn.getAttribute("href");
    smoothScroll(target);
  });
});

document
  .getElementById("contact-form")
  .addEventListener("submit", handleFormSubmission);

// Initialize animations on page load
window.addEventListener("load", () => {
  handleFadeInAnimation();

  // Animate counters when stats section is in view
  const statsSection = document.querySelector(".stats");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  });
  observer.observe(statsSection);
});

// Add some interactive hover effects
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Initialize typing effect after a short delay
setTimeout(() => {
  const heroTitle = document.querySelector(".hero h1");
  const originalText = heroTitle.textContent;
  typeWriter(heroTitle, originalText, 80);
}, 500);

