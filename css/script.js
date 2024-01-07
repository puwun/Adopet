document.addEventListener("DOMContentLoaded", function () {
    gsap.from('#page1-content h3,h4', {
        y: 100,
        opacity: 0,
        delay: 0.5,
        duration: 2,
        stagger: 0.5
    });
});
document.addEventListener("DOMContentLoaded", function () {
    gsap.from('#page1-content h1', {
        y: 100,
        opacity: 0,
        delay: 0.5,
        duration: 1.4,
        stagger: 0.2
    });
});

document.addEventListener("DOMContentLoaded", function () {
    gsap.from('#page2-content h1', {
        y: 100,
        opacity: 0,
        delay: 0.,
        duration: 1.4,
        stagger: 0.2
    });
});