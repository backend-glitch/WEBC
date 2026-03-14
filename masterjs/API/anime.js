// gsap.from(".card",{
//     y : -500,
//     ease : "power3.inOut"
// })

gsap.fromTo(".card",{
    y : -100,
    delay : 1,
   
},{
    y:10,
     duration : 4,
    repeat : -1,
    yoyo : true,
    ease : "power1.inOut"

})
/*
gsap.from("h1",{
    x : -1600,
    duration : 1,
    delay : 3
})

gsap.from("#pokiname",{
    x : -900,
    duration : 2,
    delay: 3
})

gsap.from(".btn",{
    x : -900,
    duration : 2,
    delay: 3
})


gsap.from("#pokiimg",{
    x: -900,
    duration : 2,
    delay: 3
})
*/


