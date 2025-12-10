/* ================================
   1. NAVIGATION & UI
   ================================ */
document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('is-active');
            navLinks.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) hamburger.classList.remove('is-active');
            if (navLinks) navLinks.classList.remove('active');
        });
    });
});

/* ================================
   2. PARALLAX EFFECTS
   ================================ */
// Mouse move effect for Hero Section
document.addEventListener('mousemove', function(e) {
    const herosection = document.querySelector('.herosection');
    if (herosection) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        herosection.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(1,255,14,0.15), rgba(19,19,23,1) 60%)`;
    }
});

// Scroll Parallax (Optimized)
window.addEventListener('scroll', () => {
    const parallaxEls = document.querySelectorAll('[data-speed]');
    const scrollY = window.scrollY;
    
    parallaxEls.forEach(el => {
        const speed = parseFloat(el.dataset.speed);
        // Limits the movement so it doesn't break layout
        el.style.transform = `translateY(${scrollY * speed}px)`;
    });
});

/* ================================
   GALLERY FILTER & LIGHTBOX LOGIC
   ================================ */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. FILTER FUNCTIONALITY ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.classList.remove('hide');
                        item.classList.add('show');
                    } else {
                        item.classList.remove('show');
                        item.classList.add('hide');
                    }
                });
            });
        });
    }

    // --- 2. LIGHTBOX FUNCTIONALITY ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');

    if (lightbox) {
        // Add click event to all gallery items
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const title = item.querySelector('h3').innerText;
                const desc = item.querySelector('p').innerText;

                lightbox.style.display = 'flex';
                lightboxImg.src = img.src;
                lightboxCaption.innerHTML = `<strong style="color:#01ff0e">${title}</strong><br>${desc}`;
            });
        });

        // Close Lightbox
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }
});
/* ================================
   CV DOWNLOAD / PREVIEW LOGIC
   ================================ */
document.addEventListener('DOMContentLoaded', () => {
    
    // Elements
    const cvTrigger = document.getElementById('cv-trigger');
    const choiceModal = document.getElementById('cv-choice-modal');
    const previewModal = document.getElementById('cv-preview-modal');
    
    const btnView = document.getElementById('btn-view-cv');
    const closeChoice = document.querySelector('.close-cv-btn');
    const closePreview = document.querySelector('.close-preview-btn');
    const iframe = document.getElementById('cv-iframe');

    // Path to your PDF
    const cvPath = 'documents/Enoch_CV.pdf'; 

    // 1. Open Choice Modal
    if (cvTrigger) {
        cvTrigger.addEventListener('click', (e) => {
            e.preventDefault(); // Stop default link jump
            choiceModal.style.display = 'flex';
        });
    }

    // 2. Handle "Preview" Click
    if (btnView) {
        btnView.addEventListener('click', () => {
            choiceModal.style.display = 'none'; // Hide choice
            previewModal.style.display = 'flex'; // Show preview
            // Load PDF only when requested (saves bandwidth)
            iframe.src = cvPath; 
        });
    }

    // 3. Close Modals Logic
    function closeAllModals() {
        if (choiceModal) choiceModal.style.display = 'none';
        if (previewModal) {
            previewModal.style.display = 'none';
            iframe.src = ''; // Stop loading PDF when closed
        }
    }

    // Click X buttons
    if (closeChoice) closeChoice.addEventListener('click', closeAllModals);
    if (closePreview) closePreview.addEventListener('click', closeAllModals);

    // Click Outside to Close
    window.addEventListener('click', (e) => {
        if (e.target === choiceModal || e.target === previewModal) {
            closeAllModals();
        }
    });
});
/* --- TYPEWRITER EFFECT --- */
const TypeWriter = function(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

TypeWriter.prototype.type = function() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if(this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    let typeSpeed = 100; // Typing speed

    if(this.isDeleting) { typeSpeed /= 2; } // Deleting is faster

    if(!this.isDeleting && this.txt === fullTxt) {
        typeSpeed = this.wait; // Pause at end of word
        this.isDeleting = true;
    } else if(this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.wordIndex++;
        typeSpeed = 500; // Pause before new word
    }

    setTimeout(() => this.type(), typeSpeed);
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);
function init() {
    const txtElement = document.querySelector('.txt-type');
    if (txtElement) {
        const words = JSON.parse(txtElement.getAttribute('data-words'));
        const wait = txtElement.getAttribute('data-wait');
        new TypeWriter(txtElement, words, wait);
    }
}
/* --- SCROLL PROGRESS BAR --- */
window.onscroll = function() { updateProgressBar() };

function updateProgressBar() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    const bar = document.getElementById("myBar");
    if(bar) {
        bar.style.width = scrolled + "%";
    }
}
/* --- BACK TO TOP BUTTON --- */
const mybutton = document.getElementById("backToTopBtn");

window.addEventListener('scroll', () => {
    if (mybutton) {
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }
});

function topFunction() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}