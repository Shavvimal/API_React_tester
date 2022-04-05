import gsap from "gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger";

export const bubble1Anim = (elem1, elem2) => {
let tlb1 = gsap.timeline({repeat: -1});
tlb1.to([elem1, elem2], {
    duration: 3,
    y:4,
    ease: "power2. inout", 
} );
tlb1.to([elem1, elem2], {
    duration:3,
    y:0,
    ease: "power2. inout", 
} )
}

export const bubble2Anim = (elem1, elem2) => {
let tlb2 = gsap.timeline({repeat: -1});
tlb2.to([elem1, elem2], {
    duration: 5,
    y:-4,
    ease: "power2. inout", 
} );
tlb2.to([elem1, elem2], {
    duration:2.3,
    y:0,
    ease: "power2. inout", 
} )
}

export const bubble3Anim = (elem1, elem2) => {
let tlb3 = gsap.timeline({repeat: -1});
tlb3.to([elem1, elem2], {
    duration: 2.5,
    y:4,
    ease: "power2. inout", 
} );
tlb3.to([elem1, elem2], {
    duration:2.5,
    y:0,
    ease: "power2. inout", 
} )
}

export const bubble4Anim = (elem1, elem2) => {
let tlb4 = gsap.timeline({repeat: -1});
tlb4.to([elem1, elem2], {
    duration: 2,
    y:3,
    ease: "power2. inout", 
} );
tlb4.to([elem1, elem2], {
    duration:2,
    y:0,
    ease: "power2. inout", 
} )
}

// Non Central Bubbles
export const bubble5Anim = (elem1) => {
let tlb5 = gsap.timeline({repeat: -1});
tlb5.to(elem1, {
    duration:0,
    y:270,
    ease: "none", 
} )
tlb5.to(elem1, {
    duration: 11,
    y:-100,
    ease: "none", 
} );
}

export const bubble6Anim = (elem1) => {
let tlb6 = gsap.timeline({repeat: -1});
tlb6.to(elem1, {
    duration:0,
    y:270,
    ease: "none", 
} )
tlb6.to(elem1, {
    duration: 12,
    y:-120,
    ease: "none", 
} );
}

export const bubble7Anim = (elem1) => {
let tlb7 = gsap.timeline({repeat: -1, delay: 1});
tlb7.to(elem1, {
    duration:0,
    y:190,
    ease: "none", 
    opacity: 0,
} )
tlb7.to(elem1, {
    duration: 14,
    y:-230,
    ease: "none", 
} );
}

export const bubble8Anim = (elem1) => {
let tlb8 = gsap.timeline({repeat: -1, delay: 3});
tlb8.to(elem1, {
    duration:0,
    y:200,
    ease: "none", 
} )
tlb8.to(elem1, {
    duration: 13,
    y:-130,
    ease: "none", 
} );
}

export const bubble9Anim = (elem1) => {
let tlb9 = gsap.timeline({repeat: -1, delay: 2});
tlb9.to(elem1, {
    duration:0,
    y:30,
    ease: "none", 
} )
tlb9.to(elem1, {
    duration: 10,
    y:-300,
    ease: "none", 
} );
}

export const bubble10Anim = (elem1) => {
let tlb10 = gsap.timeline({repeat: -1, delay: 5});
tlb10.to(elem1, {
    duration:0,
    y:50,
    ease: "none", 
} )
tlb10.to(elem1, {
    duration: 9,
    y:-300,
    ease: "none", 
} );
}

export const bubble11Anim = (elem1) => {
let tlb11 = gsap.timeline({repeat: -1, delay: 3});
tlb11.to(elem1, {
    duration:0,
    y:50,
    ease: "none", 
} )
tlb11.to(elem1, {
    duration: 10,
    y:-300,
    ease: "none", 
} );
}

export const bubble12Anim = (elem1) => {
let tlb12 = gsap.timeline({repeat: -1, delay: 4});
tlb12.to(elem1, {
    duration:0,
    y:300,
    ease: "none", 
} )
tlb12.to(elem1, {
    duration: 14,
    y:-50,
    ease: "none", 
} );
}

export const bubble14Anim = (elem1) => {
let tlb14 = gsap.timeline({repeat: -1, delay: 6});
tlb14.to(elem1, {
    duration:0,
    y:180,
    ease: "none", 
} )
tlb14.to(elem1, {
    duration: 17,
    y:-180,
    ease: "none", 
} )
}

export const bubble15Anim = (elem1) => {
let tlb15 = gsap.timeline({repeat: -1, delay: 0});
tlb15.to(elem1, {
    duration:0,
    y:300,
    x: -40,
    ease: "none", 
} )
tlb15.to(elem1, {
    duration: 9,
    y:-50,
    ease: "none", 
} );
}

export const initAnim = (elem1, elem2) => {
    let tl = gsap.timeline({delay: 0.5});
    tl.from(elem1, {duration: 0.6, ease: "power2. out", opacity:0, y:-40});
    tl.from(elem2, {duration: 0.6, ease: "power2. out", opacity:0});
    }