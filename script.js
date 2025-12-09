/* make herosection background respond to mouse movement */
document.addEventListener('mousemove', function(e) {
    const herosection = document.querySelector('.herosection');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    herosection.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(1,255,14,0.2), rgba(19,19,23,1) 70%)`;
});
/*display navBar items on hamburger menu click for mobile*/
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        // Toggle the 'active' class on both elements
        hamburger.classList.toggle('is-active');
        navLinks.classList.toggle('active');

        // Toggle ARIA attribute for accessibility
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
        hamburger.setAttribute('aria-expanded', (!isExpanded).toString());
    });
});
/* Close nav menu when a link is clicked (for better UX) */
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        hamburger.classList.remove('is-active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }
);
});

/* Close menu when clicking outside or pressing Escape */
document.addEventListener('click', (e) => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (!hamburger || !navLinks) return;

    // If menu is open and click is outside navBar, close it
    if (navLinks.classList.contains('active')) {
        const navBar = document.querySelector('.navBar');
        if (navBar && !navBar.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('is-active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        if (!hamburger || !navLinks) return;
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('is-active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    }
});
/*add parallax effect on pagescroll*/
/*add parallax effect on pagescroll - optimized with rAF*/
(() => {
    const parallaxEls = document.querySelectorAll('[data-speed]');
    if (!parallaxEls.length) return;

    let latestScrollY = 0;
    let ticking = false;

    function update() {
        const scrollY = latestScrollY;
        parallaxEls.forEach(el => {
            const speed = parseFloat(el.dataset.speed) || 0;
            // Move element vertically relative to scroll. Positive speed -> moves with scroll, smaller values -> slower.
            const translate = Math.round(scrollY * speed);
            el.style.transform = `translateY(${translate}px)`;
        });
        ticking = false;
    }

    function onScroll() {
        latestScrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    // run once to initialize
    latestScrollY = window.scrollY;
    update();
})();
