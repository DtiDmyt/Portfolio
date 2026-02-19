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

// ======= PROJECTS: Filter + Show More =======
document.addEventListener('DOMContentLoaded', function () {
    const INITIAL_VISIBLE = 4; // jumlah card yang ditampilkan awal
    const filterBtns = document.querySelectorAll('.filter-btn');
    const allCards = document.querySelectorAll('.project-card');
    const showMoreBtn = document.getElementById('showMoreProjects');
    const noMsg = document.querySelector('.no-projects-msg');

    let activeFilter = 'all';
    let showAll = false;

    // Kembalikan animasi pada card tertentu
    function triggerAnimation(card) {
        card.style.animation = 'none';
        // Force reflow
        void card.offsetWidth;
        card.style.animation = '';
    }

    function applyFilter() {
        // Ambil kartu yang cocok dengan filter aktif
        const matched = Array.from(allCards).filter(card => {
            const cat = card.getAttribute('data-category');
            return activeFilter === 'all' || cat === activeFilter;
        });

        const limit = showAll ? matched.length : INITIAL_VISIBLE;

        // Hide semua dulu
        allCards.forEach(card => card.classList.add('hidden'));

        // Tampilkan yang sesuai limit
        matched.slice(0, limit).forEach((card, i) => {
            card.classList.remove('hidden');
            // Stagger animation tiap card
            card.style.animationDelay = `${i * 0.07}s`;
            triggerAnimation(card);
        });

        // Pesan kosong
        if (matched.length === 0) {
            noMsg.style.display = 'block';
        } else {
            noMsg.style.display = 'none';
        }

        // Tampilkan Show More hanya kalau ada lebih banyak dari limit
        if (matched.length > INITIAL_VISIBLE) {
            showMoreBtn.style.display = 'inline-flex';
            if (showAll) {
                showMoreBtn.innerHTML = '<i class="fas fa-chevron-up"></i> Show Less';
                showMoreBtn.classList.add('expanded');
            } else {
                showMoreBtn.innerHTML = '<i class="fas fa-chevron-down"></i> Show More';
                showMoreBtn.classList.remove('expanded');
            }
        } else {
            showMoreBtn.style.display = 'none';
            showMoreBtn.classList.remove('expanded');
        }
    }

    // Filter tab click
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            activeFilter = this.getAttribute('data-filter');
            showAll = false; // reset show-more saat filter berubah
            applyFilter();
        });
    });

    // Show More / Show Less click
    showMoreBtn.addEventListener('click', function () {
        showAll = !showAll;
        applyFilter();
    });

    // Inisialisasi
    applyFilter();
});

// ======= SCROLL REVEAL (IntersectionObserver) =======
document.addEventListener('DOMContentLoaded', function () {
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // animasi hanya sekali
                }
            });
        },
        { threshold: 0.15 }
    );

    revealEls.forEach(function (el) {
        observer.observe(el);
    });
});