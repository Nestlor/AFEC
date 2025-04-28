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