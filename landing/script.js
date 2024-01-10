// function locomotiveAnimation() {
//   gsap.registerPlugin(ScrollTrigger);

//   Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

//   const locoScroll = new LocomotiveScroll({
//     el: document.querySelector("#main"),
//     smooth: true,
//   });
//    each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
//   locoScroll.on("scroll", ScrollTrigger.update);

//    tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
//   ScrollTrigger.scrollerProxy("#main", {
//     scrollTop(value) {
//       return arguments.length
//         ? locoScroll.scrollTo(value, 0, 0)
//         : locoScroll.scroll.instance.scroll.y;
//     }, // we don't have to define a scrollLeft because we're only scrolling vertically.
//     getBoundingClientRect() {
//       return {
//         top: 0,
//         left: 0,
//         width: window.innerWidth,
//         height: window.innerHeight,
//       };
//     },
//      LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
//     pinType: document.querySelector("#main").style.transform
//       ? "transform"
//       : "fixed",
//   });

//    each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
//   ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

//    after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
//   ScrollTrigger.refresh();
// }
// locomotiveAnimation();

// function navbarAnimation() {
//   gsap.to("#nav-part1 svg", {
//     transform: "translateY(-100%)",
//     scrollTrigger: {
//       trigger: "#page1",
//       scroller: "#main",
//       start: "top 0",
//       end: "top -5%",
//       scrub: true,
//     },
//   });
//   gsap.to("#nav-part2 #links", {
//     transform: "translateY(-100%)",
//     opacity: 0,
//     scrollTrigger: {
//       trigger: "#page1",
//       scroller: "#main",
//       start: "top 0",
//       end: "top -5%",
//       scrub: true,
//     },
//   });
// }
// navbarAnimation()

// function videoconAnimation() {
//   var videocon = document.querySelector("#video-container");
//   var playbtn = document.querySelector("#play");
//   videocon.addEventListener("mouseenter", function () {
//     gsap.to(playbtn, {
//       scale: 1,
//       opacity: 1,
//     });
//   });
//   videocon.addEventListener("mouseleave", function () {
//     gsap.to(playbtn, {
//       scale: 0,
//       opacity: 0,
//     });
//   });
//   document.addEventListener("mousemove", function (dets) {
//     gsap.to(playbtn, {
//       left: dets.x - 70,
//       top: dets.y - 80,
//     });
//   });
// }
// videoconAnimation();

// function loadinganimation() {
//   gsap.from("#page1 h1", {
//     y: 100,
//     opacity: 0,
//     delay: 0.5,
//     duration: 0.9,
//     stagger: 0.3,
//   });
//   gsap.from("#page1 #video-container", {
//     scale: 0.9,
//     opacity: 0,
//     delay: 1.3,
//     duration: 0.5,
//   });
// }
// loadinganimation();

// function cursorAnimation() {
//   document.addEventListener("mousemove", function (dets) {
//     gsap.to("#cursor", {
//       left: dets.x,
//       top: dets.y,
//     });
//   });
//   document.querySelector("#child1").addEventListener("mouseenter",function(){

//   })

//   document.querySelector("#child1").addEventListener("mouseleave",function(){
//     gsap.to("#cursor",{
//       transform: 'translate(-50%,-50%) scale(0)'
//     })
//   })
//   document.querySelectorAll(".child").forEach(function (elem) {
//     elem.addEventListener("mouseenter", function () {
//       gsap.to("#cursor", {
//         transform: "translate(-50%,-50%) scale(1)",
//       });
//     });
//     elem.addEventListener("mouseleave", function () {
//       gsap.to("#cursor", {
//         transform: "translate(-50%,-50%) scale(0)",
//       });
//     });
//   });
// }
// cursorAnimation();


gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    const sections = gsap.utils.toArray('section');

    let scrollTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
        scrollTrigger: {
            trigger: '.wrapper',
            pin: true,
            scrub: 0.5,
            snap: 1 / (sections.length - 1),
            start: 'top top',
            end: 3000,
        }
    })

    gsap.to('.logo', {
        fontSize: '2.5rem',
        top: '4rem',
        scrollTrigger: {
            trigger: '.logo',
            start: 'top top',
            end: 1500,
            scrub: 0.5,
        }
    })

    gsap.to('.line', {
        height: '10rem',
        scrollTrigger: {
            trigger: '.line',
            scrub: 0.5,
            start: 'center center',
            end: 2000,
        }
    })

    document.querySelectorAll('.character').forEach(el => {

        gsap.to(el.querySelector('.caption'), {
            x: 0,
            y: 0,
            scrollTrigger: {
                containerAnimation: scrollTween,
                trigger: el.querySelector('.caption'),
                start: 'top bottom',
                end: '+=1000',
                scrub: 0.5,
            }
        })

        gsap.to(el.querySelector('.quote'), {
            y: 0,
            ease: 'none',
            scrollTrigger: {
                containerAnimation: scrollTween,
                trigger: el.querySelector('.quote'),
                start: 'top bottom',
                end: '+=20%',
                scrub: 0.5,
            }
        })

        gsap.to(el.querySelector('.nickname'), {
            y: 0,
            ease: 'none',
            scrollTrigger: {
                containerAnimation: scrollTween,
                trigger: el.querySelector('.nickname'),
                start: 'top bottom',
                end: '+=10%',
                scrub: 0.5,
            }
        })

        gsap.to(el.querySelector('.block'), {
            x: 0,
            ease: 'none',
            scrollTrigger: {
                containerAnimation: scrollTween,
                trigger: el.querySelector('.block'),
                start: 'top bottom',
                end: '+=' + window.innerWidth,
                scrub: 0.5,
            }
        })

        gsap.to(el.querySelector('img'), {
            y: 0,
            ease: 'none',
            scrollTrigger: {
                containerAnimation: scrollTween,
                trigger: el.querySelector('img'),
                start: 'top bottom',
                end: '+=50%',
                scrub: 0.5,
            }
        })

        gsap.to(el.querySelector('.huge-text'), {
            y: 0,
            ease: 'none',
            scrollTrigger: {
                containerAnimation: scrollTween,
                trigger: el.querySelector('.huge-text'),
                start: 'top bottom',
                end: '+=100%',
                scrub: 0.5,
            }
        })

    })

})
