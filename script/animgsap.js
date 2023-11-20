// -------- FICHIER DEDIE AUX ANIMATIONS NON PROPRE A L'APPARITION D'UN OBJET ----------

let Btn = document.getElementById("enter"); //def de l'objet Bonton entrer

const tl = gsap.timeline(); //création du'ne timeline GSAP

Btn.addEventListener("mouseenter", function(){ //au survol

    //animation de l'icon porte Part 1
    tl.to("#door", {
        top : '-20px',
        duration : 0.15,
        ease: "bounce.out"
    })

    document.getElementById("door").src = "asset/DoorO.svg"; //changement de l'icone de la porte

    //animation de l'icon porte Part 2
    tl.to("#door", {
        top : "0px",
        duration: 0.3,
        ease: "bounce.out"
    })

    //animation du logo en arrière plan
    gsap.to("#logo", {
        opacity: 1,
        height: "150vh",
        duration: 5
    })

   

}, false);

//fin du hover
Btn.addEventListener("mouseleave", function(){

    document.getElementById("door").src = "asset/DoorC.svg"; //changement de l'icone porte

    //animation arrière du logo
    gsap.to("#logo", {
        opacity: 0,
        height: "120vh",
        duration: 5
    })

}, false);

// Début Easter Egg

let Eg = document.getElementById("EG"); //définition de l'objet Eg
let c = 0; //def de si click ou non

Eg.addEventListener("click", function(){ //au click 
    if (c == 0) { // si pas de click -> click = oui
        c = 1;
    } else { //sinon on enlève le click
        c = 0;
    }
})

Eg.addEventListener("mouseenter", function(){ //au survol apparition de l'objet Goat

    //animation GSAP d'apparition
    gsap.to("#Goat", {
        top: "92vh",
        duration : 0.15,
        ease: "bounce.out"
    })

});

Eg.addEventListener("mouseleave", function(){ //fin du survol -> disparition de Goat

    if (c==0) { //SI si click = NON
        //animation GSAP de désapparition
        gsap.to("#Goat", {
            top: "110vh",
            duration : 0.15,
            ease: "bounce.out"
        })
    }

})

// Fin Easter Egg