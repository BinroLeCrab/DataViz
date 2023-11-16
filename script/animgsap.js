// const histobare = document.getElementsByClassName("histobarre");

// gsap.from(histobare, {
//     duration : 0.3,
//     width : 0
// })

let Btn = document.getElementById("enter");

const tl =gsap.timeline();

Btn.addEventListener("mouseenter", function(){

    tl.to("#door", {
        top : '-20px',
        duration : 0.15,
        ease: "bounce.out"
    })

    tl.to("#door", {
        top : "0px",
        duration: 0.3,
        ease: "bounce.out"
    })

    document.getElementById("door").src = "asset/DoorO.svg";

}, false);

Btn.addEventListener("mouseleave", function(){

    document.getElementById("door").src = "asset/DoorC.svg";

}, false);