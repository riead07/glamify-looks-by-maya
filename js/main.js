/* 
   GLAMIFY LOOKS BY MAYA
   Premium Client Script Logic
*/

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. STICKY HEADER & SCROLL HIGHLIGHT ---
    const header = document.querySelector('.main-navigation');
    const navLinks = document.querySelectorAll('.nav-menu ul li a, .mobile-nav-links li a');
    const sections = document.querySelectorAll('section, header');

    window.addEventListener('scroll', () => {
        // Sticky class toggle
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Link Highlight on scroll
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id') || '';
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === '#' && currentSectionId === '') {
                link.classList.add('active');
            } else if (href === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });


    // --- 2. MOBILE NAVIGATION SIDEBAR ---
    const hamburger = document.getElementById('hamburgerMenu');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    function openMobileMenu() {
        mobileSidebar.classList.add('open');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock background scrolling
    }

    function closeMobileMenu() {
        mobileSidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Unlock scrolling
    }

    hamburger.addEventListener('click', openMobileMenu);
    closeSidebar.addEventListener('click', closeMobileMenu);
    sidebarOverlay.addEventListener('click', closeMobileMenu);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });


    // --- 3. HERO SLIDER CAROUSEL ---
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));

        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000); // Shift slide every 5 seconds
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // Set indicator click events
    indicators.forEach(indicator => {
        indicator.addEventListener('click', (e) => {
            const slideIndex = parseInt(e.target.getAttribute('data-slide'));
            stopSlideShow();
            showSlide(slideIndex);
            startSlideShow();
        });
    });

    // Initialize Slider
    if (slides.length > 0) {
        startSlideShow();
    }


    // --- 4. SERVICES CATEGORY TABS ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // Toggle active buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Toggle active panels
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.getAttribute('id') === targetTab) {
                    pane.classList.add('active');
                }
            });
        });
    });


    // --- 5. SECURE WHATSAPP BOOKING INTEGRATION ---
    const bookingForm = document.getElementById('appointmentForm');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent standard page refresh

            const name = document.getElementById('clientName').value.trim();
            const phone = document.getElementById('clientPhone').value.trim();
            const service = document.getElementById('selectService').value;
            const date = document.getElementById('selectDate').value;
            const time = document.getElementById('selectTime').value;
            const request = document.getElementById('specialRequest').value.trim() || 'None';

            // Security Validation Check
            if (!name || !phone || !service || !date || !time) {
                alert('Please fill out all required fields.');
                return;
            }

            // Simple Phone validation for Bangladesh format
            const cleanPhone = phone.replace(/[^0-9\-+]/g, '');
            if (cleanPhone.length < 9) {
                alert('Please enter a valid phone number.');
                return;
            }

            // Create formatted WhatsApp Message text
            const whatsappNumber = '8801305553486';
            const introText = `Hello *Glamify Looks by Maya*,\n\nI would like to book a salon appointment. Here are my details:\n\n`;
            const clientDetails = 
                `👤 *Name:* ${name}\n` +
                `📞 *Contact Number:* ${phone}\n` +
                `💅 *Service Requested:* ${service}\n` +
                `📅 *Date:* ${date}\n` +
                `⏰ *Preferred Time:* ${time}\n` +
                `📝 *Special Notes:* ${request}\n\n` +
                `Please let me know if this slot is available. Thank you!`;

            const fullMessage = encodeURIComponent(introText + clientDetails);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${fullMessage}`;

            // Secure redirection
            window.open(whatsappUrl, '_blank');
            
            // Clear form and display success alert
            bookingForm.reset();
            alert('Your booking message has been generated! You will be redirected to WhatsApp to confirm your slot with Maya.');
        });
    }

    // --- 6. INTERACTIVE GALLERY LIGHTBOX MODAL ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');

    if (galleryItems.length > 0 && lightboxModal && lightboxImg && lightboxCaption && lightboxClose) {
        
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const titleEl = item.querySelector('.gallery-overlay h4');
                const descEl = item.querySelector('.gallery-overlay p');

                if (img) {
                    lightboxImg.src = img.src;
                    lightboxImg.alt = img.alt || 'Enlarged View';
                    
                    const title = titleEl ? titleEl.textContent : '';
                    const desc = descEl ? descEl.textContent : '';
                    lightboxCaption.innerHTML = `<h4>${title}</h4><p>${desc}</p>`;

                    lightboxModal.classList.add('active');
                    lightboxModal.setAttribute('aria-hidden', 'false');
                    document.body.style.overflow = 'hidden'; // Lock scrolling
                }
            });
        });

        function closeLightbox() {
            lightboxModal.classList.remove('active');
            lightboxModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = ''; // Unlock scrolling
            setTimeout(() => {
                lightboxImg.src = '';
            }, 300); // Clear source after animation fade-out finishes
        }

        lightboxClose.addEventListener('click', closeLightbox);
        
        lightboxModal.addEventListener('click', (e) => {
            // Close when clicking the overlay backdrop itself, not on the image contents
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

});
