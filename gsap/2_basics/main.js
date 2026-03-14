// BASICS
//gsap.to()
//gsap.from()
//gsp.fromTo()

gsap.fromTo(".box1",{
     x: 190,
    duration : 1,
    opacity : 1
},{
    x: -300,
    duration : 6,
    delay: 1,
    opacity : 0 
})


gsap.fromTo(".box2",{
    x : -200,
    opacity : 1,
    duration : 1
},{
    x: 300,
    duration : 6,
    delay : 1,
    opacity : 0
})

gsap.to("h1",{
    y:-80,
    duration : 3,
    delay : 2,
    opacity : 1
    
})