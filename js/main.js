document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
    
    // Sticky Navigation on Scroll
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scrolled');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            // Scroll Down
            navbar.classList.remove('scrolled-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            // Scroll Up
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scrolled-up');
            navbar.classList.add('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Schedule Tabs
    const scheduleTabs = document.querySelectorAll('.schedule-tab');
    const scheduleDays = document.querySelectorAll('.schedule-day');
    
    if (scheduleTabs.length > 0) {
        scheduleTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const day = this.getAttribute('data-day');
                
                // Remove active class from all tabs and days
                scheduleTabs.forEach(t => t.classList.remove('active'));
                scheduleDays.forEach(d => d.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding day
                this.classList.add('active');
                document.querySelector(`.schedule-day[data-day="${day}"]`).classList.add('active');
            });
        });
        
        // Activate first tab by default
        if (scheduleTabs.length > 0) {
            scheduleTabs[0].click();
        }
    }
    
    // Testimonial Slider
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-slide');
    const testimonialCount = testimonials.length;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonialCount;
        showTestimonial(currentTestimonial);
    }
    
    // Auto-rotate testimonials every 5 seconds
    if (testimonialCount > 1) {
        setInterval(nextTestimonial, 5000);
        showTestimonial(0);
    }
    
    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = this.querySelector('input[type="text"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim();
            const message = this.querySelector('textarea').value.trim();
            
            if (!name || !email || !message) {
                alert('Bitte füllen Sie alle Pflichtfelder aus.');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            alert('Vielen Dank für Ihre Nachricht! Wir werden uns in Kürze bei Ihnen melden.');
            this.reset();
        });
    }
    
    // Email validation helper function
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .training-card, .schedule-container, .testimonial-slide, .contact-info');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Run once on page load
    animateOnScroll();
    
    // Then on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Add loading class to body to prevent FOUC
    document.body.classList.add('loaded');
});

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});
