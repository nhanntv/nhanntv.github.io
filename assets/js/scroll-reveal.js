(function() {
    'use strict';

    var observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.12
    };

    function revealElement(el) {
        el.classList.add('revealed');
    }

    function handleIntersection(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                revealElement(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }

    var observer = new IntersectionObserver(handleIntersection, observerOptions);

    function init() {
        var elements = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');

        elements.forEach(function(el, index) {
            var rect = el.getBoundingClientRect();
            var inViewport = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;

            if (inViewport) {
                // Elements already in viewport: reveal with staggered delay for nice load effect
                var delay = Math.min(index * 120, 600);
                setTimeout(function() { revealElement(el); }, delay);
            } else {
                observer.observe(el);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
