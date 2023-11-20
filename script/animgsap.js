
let Btn = document.getElementById("enter");

const tl = gsap.timeline();

Btn.addEventListener("mouseenter", function(){

    tl.to("#door", {
        top : '-20px',
        duration : 0.15,
        ease: "bounce.out"
    })

    document.getElementById("door").src = "asset/DoorO.svg";

    tl.to("#door", {
        top : "0px",
        duration: 0.3,
        ease: "bounce.out"
    })

    gsap.to("#logo", {
        opacity: 1,
        height: "150vh",
        duration: 5
    })

   

}, false);

Btn.addEventListener("mouseleave", function(){

    document.getElementById("door").src = "asset/DoorC.svg";

    gsap.to("#logo", {
        opacity: 0,
        height: "120vh",
        duration: 5
    })

}, false);

// Début Easter Egg

let Eg = document.getElementById("EG");
let c = 0;

Eg.addEventListener("click", function(){
    if (c == 0) {
        c = 1;
    } else {
        c = 0;
    }
})

Eg.addEventListener("mouseenter", function(){

    gsap.to("#Goat", {
        top: "92vh",
        duration : 0.15,
        ease: "bounce.out"
    })

});

Eg.addEventListener("mouseleave", function(){

    if (c==0) {
        gsap.to("#Goat", {
            top: "110vh",
            duration : 0.15,
            ease: "bounce.out"
        })
    }

})

// Fin Easter Egg