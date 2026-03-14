// Control properies 

// duration , 
// delay, 
// repeat, 
// yoyo


gsap.to(".ball", {
    y: -250,
    duration: 1, // 1 second ka animation hoga 
    // delay: 2, // animation kitni der ke bad start hoga
    repeat: -1, // infinite loop ke liye hum -1 use or if apko specific repeat karna hia to ap number add kar sakte ho 
    yoyo: true,
    ease: "power1.inOut"
})

gsap.to(".shadow", {
    scaleX: 0.5,
    opacity: 0.3,
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"

})