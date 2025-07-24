document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Close mobile nav when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navLinks.forEach(item => {
                item.style.animation = ''; // Reset animation on close
            });
        });
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Adjust scroll position for fixed header
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Reveal Animation (Enhanced with staggered children)
    const observeElements = (elements, options) => {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active'); // Activate section/element

                    // Animate section title's ::after pseudo-element
                    if (entry.target.classList.contains('section-title')) {
                        entry.target.classList.add('animated');
                    }

                    // Staggered animations for children based on parent section
                    let childElements = [];
                    if (entry.target.classList.contains('about-section')) {
                        childElements = document.querySelectorAll('.about-section p');
                    } else if (entry.target.classList.contains('services-section')) {
                        childElements = document.querySelectorAll('.service-item');
                    } else if (entry.target.classList.contains('team-section')) {
                        childElements = document.querySelectorAll('.team-member');
                    } else if (entry.target.classList.contains('contact-section')) {
                        childElements = document.querySelectorAll('.contact-info p, .social-links');
                    } else if (entry.target.tagName === 'FOOTER') {
                        // Footer itself animates, no specific children to stagger
                        childElements = [entry.target];
                    }

                    childElements.forEach((child, index) => {
                        child.style.animationDelay = `${index * 0.15}s`;
                        child.classList.add('active'); // Add active to trigger fadeInUp animation
                    });

                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, options);

        elements.forEach(el => {
            observer.observe(el);
        });
    };

    const sectionOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Section becomes active when 15% visible
    };

    const titleOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Title becomes active when 50% visible
    };

    // Observe all sections and the footer
    observeElements(document.querySelectorAll('.scroll-reveal, footer'), sectionOptions);
    // Observe section titles for their specific animations
    observeElements(document.querySelectorAll('.section-title'), titleOptions);


    // Specific behavior for "Scroll for More" button
    const scrollMoreButton = document.querySelector('.scroll-more');
    if (scrollMoreButton) {
        scrollMoreButton.addEventListener('click', function(e) {
            e.preventDefault();
            // Scroll to the next section after the hero (which is #about)
            const headerOffset = document.querySelector('header').offsetHeight;
            const targetElement = document.querySelector('#about');
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    }

    // Sparkle Tail Line Effect
    document.addEventListener('mousemove', (e) => {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.style.left = `${e.clientX}px`;
        sparkle.style.top = `${e.clientY}px`;
        document.body.appendChild(sparkle);

        // Remove the sparkle after its animation finishes
        sparkle.addEventListener('animationend', () => {
            sparkle.remove();
        });
    });
});