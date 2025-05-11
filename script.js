document.addEventListener('DOMContentLoaded', function() {
    // Get all elements needed
    const slider = document.querySelector('.certificates-slider');
    const track = document.querySelector('.certificates-track');
    const cards = document.querySelectorAll('.certificate-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    const cardCount = cards.length;
    
    // Set up the track width and initial position
    function setupSlider() {
        // Set the width of the track to accommodate all cards
        track.style.width = `${cardCount * 100}%`;
        
        // Set the width of each card to be proportional
        cards.forEach(card => {
            card.style.width = `${100 / cardCount}%`;
        });
        
        // Set initial position
        updateSlider();
    }
    
    // Update the slider position based on currentIndex
    function updateSlider() {
        // Move the track
        track.style.transform = `translateX(-${(currentIndex * 100) / cardCount}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Go to a specific slide
    function goToSlide(index) {
        // Handle bounds
        if (index < 0) {
            currentIndex = cardCount - 1;
        } else if (index >= cardCount) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        
        updateSlider();
    }
    
    // Next slide handler
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    // Previous slide handler
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }
    
    // Add event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Add dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Initialize the slider
    setupSlider();
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', setupSlider);
});

// JavaScript for menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking a nav link
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
    
    // Change navbar style on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});