// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

// const home = gsap.utils.toArray('.home');
// home.forEach(home => {
//     gsap.to(home, {
//         x: 300,
//         scrollTrigger:{
//             trigger: home,
//             scrub: true
//         }
//     })
// });
// Home Section animation
gsap.from(".right h1", {
    x: -5000,
    duration: 1.5,
    ease: "elastic.inOut" ,
    scrollTrigger: {
        trigger: "#invisible",
        start: "top 70%",
        end: "bottom center",
        scrub: 2,
        // markers: true,
    }
});

gsap.from(".right p", {
    x: 15000,
    duration: 1.5,
    ease: "elastic.inOut",
    scrollTrigger: {
        trigger: "#invisible",
        start: "top 65%",
        end: "bottom center",
        scrub: 2,
        // markers: true
    }
});

gsap.from(".left #profile_wrap", {
    y: -500,
    ease: "power4.in",
    scrollTrigger: {
        trigger: "#invisible",
        start: "top 65%",
        end: "bottom center",
        scrub: 2,
        // markers: true
    }
});

// About Section animation
gsap.from("#about h2", {
    y: 50,
    opacity: 0,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#about",
        start: "top center",
        end: "bottom center",
        scrub: 1,
    }
});

gsap.from("#about p", {
    opacity: 0,
    duration: 1.5,
    delay: 0.5,
    scrollTrigger: {
        trigger: "#about",
        start: "top center",
        end: "bottom center",
        scrub: 1,
    }
});

gsap.from(".about_me_text", {
    x: -10000,
    duration: 1.5,
    delay: 1.0,
    ease: "power4.out",
    scrollTrigger: {
        trigger: "#contact",
        start: "top 135%",
        end: "bottom bottom",
        // markers: true
    }
})

gsap.to(".card", {
    y: 100,
    opacity: 10,
    delay: 1,
    duration: 0.9,
    stagger: 0.5,
    scrollTrigger: {
        trigger: "#contact",
        start: "top 135%",
        end: "bottom bottom",
        // scrub: true,
        // markers: true
    }
})

// Contact Section animation
gsap.from("#contact h1", {
    x: 100,
    opacity: 0,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#contact",
        start: "top center",
        end: "bottom center",
        scrub: 1,
    }
});

gsap.from("#contact p", {
    opacity: 0,
    duration: 1.5,
    delay: 0.5,
    scrollTrigger: {
        trigger: "#contact",
        start: "top center",
        end: "bottom center",
        scrub: 1,
    }
});

gsap.from(".link", {
    y: 100,
    opacity: 10,
    delay: 1,
    duration: 0.9,
    stagger: 0.5,
    scrollTrigger: {
        trigger: "#contact",
        start: "top 60%",
        end: "bottom bottom",
        scrub: 1,
        // markers: true
    }
})

// Smooth Scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
