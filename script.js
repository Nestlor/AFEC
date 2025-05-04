// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
      menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.classList.toggle('active');
      });
    }
  
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close mobile menu when link is clicked
        if (nav.classList.contains('active')) {
          nav.classList.remove('active');
          menuToggle.classList.remove('active');
        }
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
          
          // Update active link
          document.querySelectorAll('nav ul li a').forEach(link => {
            link.classList.remove('active');
          });
          this.classList.add('active');
        }
      });
    });
  
    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !message) {
          alert('Пожалуйста, заполните все необходимые поля.');
          return;
        }
        
        // In a real application, you would send this data to a server
        console.log('Form submitted:', { name, email, subject, message });
        
        // Show success message
        alert('Спасибо! Ваше сообщение успешно отправлено.');
        
        // Reset form
        contactForm.reset();
      });
    }
  
  
    // Update active menu item based on scroll position
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      
      // Change header style on scroll
      const header = document.querySelector('header');
      if (scrollPosition > 100) {
        header.style.padding = '10px 0';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
      } else {
        header.style.padding = '20px 0';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
      }
      
      // Update active menu item
      document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          document.querySelectorAll('nav ul li a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + sectionId) {
              link.classList.add('active');
            }
          });
        }
      });
    });
  });
  
  function sendToWhatsApp() {
    // Получаем сообщение из input
    const message = document.getElementById('messageInput').value;
    
    // Кодируем сообщение для URL
    const encodedMessage = encodeURIComponent(message);
    
    // Формируем ссылку WhatsApp
    const whatsappUrl = `https://wa.me/77471465700?text=${encodedMessage}`;
    
    // Открываем WhatsApp в новом окне
    window.open(whatsappUrl, '_blank');
}

  // NEW: Animate elements on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in-element');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight * 0.85;
      
      if (elementPosition < screenPosition) {
        element.classList.add('animate');
      }
    });
  };
  
  // Add fade-in-element class to all section headers and cards
  document.querySelectorAll('.section-header, .stat-item, .program-card, .gallery-item, .admissions-card, .contact-card, .step')
    .forEach(el => el.classList.add('fade-in-element'));
  
  // Run on scroll
  window.addEventListener('scroll', animateOnScroll);
  // Initial check
  animateOnScroll();
  
  // NEW: Hero text animation
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    setTimeout(() => {
      heroContent.classList.add('animate');
    }, 300);
  }

  // NEW: Stat counter animation
  const statItems = document.querySelectorAll('.stat-item h3');
  let statAnimationDone = false;
  
  const animateStats = () => {
    if (statAnimationDone) return;
    
    const statsSection = document.querySelector('.about-stats');
    if (!statsSection) return;
    
    const statsSectionPosition = statsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight * 0.8;
    
    if (statsSectionPosition < screenPosition) {
      statItems.forEach(stat => {
        const targetValue = parseInt(stat.textContent.replace(/,/g, '').replace(/\+/g, ''));
        let startValue = 0;
        const duration = 2000; // 2 seconds
        const increment = targetValue / (duration / 20);
        const timer = setInterval(() => {
          startValue += increment;
          if (startValue >= targetValue) {
            stat.textContent = stat.textContent.includes('+') ? 
                               Math.floor(targetValue).toLocaleString() + '+' : 
                               Math.floor(targetValue).toLocaleString();
            clearInterval(timer);
          } else {
            stat.textContent = stat.textContent.includes('+') ? 
                               Math.floor(startValue).toLocaleString() + '+' : 
                               Math.floor(startValue).toLocaleString();
          }
        }, 20);
      });
      
      statAnimationDone = true;
    }
  };
  
  window.addEventListener('scroll', animateStats);
  
  // NEW: Button hover effects
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.classList.add('pulse');
    });
    
    btn.addEventListener('mouseleave', () => {
      setTimeout(() => {
        btn.classList.remove('pulse');
      }, 300);
    });
  });
  
  // NEW: Form field animations
  const formFields = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
  
  formFields.forEach(field => {
    field.addEventListener('focus', () => {
      field.parentElement.classList.add('active-field');
    });
    
    field.addEventListener('blur', () => {
      if (field.value === '') {
        field.parentElement.classList.remove('active-field');
      }
    });
  });
  
  // NEW: Gallery item hover effects
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.classList.add('hover-zoom');
    });
    
    item.addEventListener('mouseleave', () => {
      item.classList.remove('hover-zoom');
    });
  });
  
  // NEW: Make navigation active based on scroll position
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav ul li a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  initCarousel();
    
    function initCarousel() {
      const track = document.querySelector('.carousel-track');
      const cards = document.querySelectorAll('.carousel-card');
      const dots = document.querySelectorAll('.carousel-dot');
      const prevBtn = document.querySelector('.carousel-arrow.prev');
      const nextBtn = document.querySelector('.carousel-arrow.next');
      
      if (!track || cards.length === 0) return;
      
      let currentIndex = 0;
      let isAnimating = false;
      let autoplayInterval;
      
      // Set up automatic sliding
      startAutoplay();
      
      // Add event listeners for navigation
      prevBtn.addEventListener('click', () => {
        if (isAnimating) return;
        navigateCarousel('prev');
        resetAutoplay();
      });
      
      nextBtn.addEventListener('click', () => {
        if (isAnimating) return;
        navigateCarousel('next');
        resetAutoplay();
      });
      
      // Add event listeners for dot navigation
      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          if (isAnimating || currentIndex === index) return;
          navigateToDot(index);
          resetAutoplay();
        });
      });
      
      // Pause autoplay on hover
      track.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
      });
      
      track.addEventListener('mouseleave', () => {
        startAutoplay();
      });
      
      // Handle touch events for mobile
      let touchStartX = 0;
      let touchEndX = 0;
      
      track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      
      track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true });
      
      function handleSwipe() {
        const swipeThreshold = 50; // minimum distance for swipe
        if (touchEndX < touchStartX - swipeThreshold) {
          // Swipe left - next slide
          navigateCarousel('next');
          resetAutoplay();
        } else if (touchEndX > touchStartX + swipeThreshold) {
          // Swipe right - previous slide
          navigateCarousel('prev');
          resetAutoplay();
        }
      }
      
      function navigateCarousel(direction) {
        if (isAnimating) return;
        isAnimating = true;
        
        // Remove active class from current card and dot
        cards[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        
        // Determine new index
        let newIndex;
        if (direction === 'next') {
          newIndex = (currentIndex + 1) % cards.length;
          cards[currentIndex].classList.add('prev-animate');
        } else {
          newIndex = (currentIndex - 1 + cards.length) % cards.length;
          cards[currentIndex].classList.add('next-animate');
        }
        
        // Add active classes to new card and dot
        setTimeout(() => {
          cards[currentIndex].classList.remove('prev-animate', 'next-animate');
          cards[newIndex].classList.add('active', 'active-animate');
          dots[newIndex].classList.add('active');
          
          // Update current index
          currentIndex = newIndex;
          
          // Reset animation state after animation completes
          setTimeout(() => {
            cards[newIndex].classList.remove('active-animate');
            isAnimating = false;
          }, 600);
        }, 300);
      }
      
      function navigateToDot(index) {
        if (isAnimating) return;
        isAnimating = true;
        
        // Determine direction based on index
        const direction = index > currentIndex ? 'next' : 'prev';
        
        // Remove active class from current card and dot
        cards[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        
        // Apply appropriate animation
        if (direction === 'next') {
          cards[currentIndex].classList.add('prev-animate');
        } else {
          cards[currentIndex].classList.add('next-animate');
        }
        
        // Add active classes to new card and dot
        setTimeout(() => {
          cards[currentIndex].classList.remove('prev-animate', 'next-animate');
          cards[index].classList.add('active', 'active-animate');
          dots[index].classList.add('active');
          
          // Update current index
          currentIndex = index;
          
          // Reset animation state after animation completes
          setTimeout(() => {
            cards[index].classList.remove('active-animate');
            isAnimating = false;
          }, 600);
        }, 300);
      }
      
      function startAutoplay() {
        autoplayInterval = setInterval(() => {
          navigateCarousel('next');
        }, 5000); // Change slide every 5 seconds
      }
      
      function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
      }
      
      // Add keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          navigateCarousel('prev');
          resetAutoplay();
        } else if (e.key === 'ArrowRight') {
          navigateCarousel('next');
          resetAutoplay();
        }
      });
    }