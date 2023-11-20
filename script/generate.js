//chargement de l'acceuil à l'ouverture
window.addEventListener("load", affiche_accueil, false);

// console.log('AA');

//fonction accueil
function affiche_accueil() {

    d3.select("#Decennie")  //On masque la section décennie
    .style("display", "none");

    let btn = document.getElementById("enter"); //selection btn entrer
    btn.addEventListener("click", affiche_decenie, false); //au click on passe sur les décénie

}

// function MoreAndLess(data, pos, param) { //fction fail pour changer d'année

//     let indexDec = 0; //décla de l'indice de la décennie
//     let indexAn = 0;  //décla de l'indice de l'année
//     let position = []; //décla de la liste position

//     if (param == 1){ //si année + 1
        
//         indexDec = pos[0];  //def id Decennie en fonction de la position de l'année actuelle
//         indexAn = pos[1]+1; //def id année en fonction de la position de l'année actuelle

//         if (indexAn == data[indexDec].list.length){  //si on change de décennie
//             indexDec = indexDec + 1; // + 1 à la décennie
//             indexAn = 0; //On revient à zéro
//         }
        
//         position[0] = indexDec;  //reboot de la position
        
//         console.log(data[indexDec].list[indexAn]);  //débogage
//         Aff_annee(data, data[indexDec].list[indexAn], indexAn, position );  //appel de l'année avec les nouveau param pour la nouvelle année
        
//     } else if (param == 0) { //la même chose que pour le if mais pour année -1
        
//         indexDec = pos[0];
//         indexAn = pos[1]-1;
        
//         if (indexAn == -1){
//             indexDec = indexDec - 1;
//             indexAn = data[indexDec].list.length -1;
//         }
        
//         position[0] = indexDec;
        
//         console.log(data[indexDec].list[indexAn]);
//         Aff_annee(data, data[indexDec].list[indexAn], indexAn, position );

//     }    
// }

// function affichage de l'année
function Aff_annee(donnee, d, index, position){ //donnee = les data complètes, d = les données de l'année, index = index de l'annnée dans sa décénnie, position = la position de la décennie dans les data

    function CatAnn(donneeAnn, donneCat){ // fct de groupement par catégorie

        console.log(donneeAnn); //débogage
  
        let ListCatAnn = {};  //Def de la liste des caté de l'année à retrouner
        let idAutre = donneeAnn.length; // def de l'id où mettre ma catégorie autre
        let Autre = {}; // def du tableau de la catégroie autre
        let idA = 0; // def du compteur pour l'id des nomination à mettre dans autre

        //définition du tableau autres
        // donneeAnn[idAutre] = {}; 
        Autre["nameFR"] = "Autres Catégories";
        Autre["nameR"] = "Autres Catégories";
        Autre["emote"] = "&#128193";
        Autre["color1"] = "#A4B3C5";
        Autre["color2"] = "#1C2128";
        Autre["gradient"] = "linear-gradient(180deg, #1C212800 0%, #1C2128 100%)";
        Autre["count"] = 0;
        Autre["nomine"] = [];
  
        for (let i = 0; i < donneeAnn.length; i++) { //parcours des donnée de l'année
  
            for (let y = 0; y < donneCat.length; y++) { // parcours des données du fichier catégories
                
                //pour chaque cétgorie de l'année on regarde si elle correspond à une catégorie définie 
                if ((donneeAnn[i]["name"] == donneCat[y]["original"]) || ( typeof donneCat[y]["original2"] !== 'undefined' && (donneeAnn[i]["name"] == donneCat[y]["original2"])) || ( typeof donneCat[y]["original3"] !== 'undefined' && (donneeAnn[i]["name"] == donneCat[y]["original3"]))   || ( typeof donneCat[y]["original4"] !== 'undefined' && (donneeAnn[i]["name"] == donneCat[y]["original4"])) || ( typeof donneCat[y]["original5"] !== 'undefined' && (donneeAnn[i]["name"] == donneCat[y]["original5"])) || ( typeof donneCat[y]["original6"] !== 'undefined' && (donneeAnn[i]["name"] == donneCat[y]["original6"])) || ( typeof donneCat[y]["original7"] !== 'undefined' && (donneeAnn[i]["name"] == donneCat[y]["original7"]))) {
                    
                    // on set dons tout ses paramaètre
                    donneeAnn[i]["emote"] = donneCat[y]["emote"];
                    donneeAnn[i]["color1"] = donneCat[y]["color1"];
                    donneeAnn[i]["color2"] = donneCat[y]["color2"];
                    donneeAnn[i]["gradient"] = donneCat[y]["gradient"];
                    donneeAnn[i]["nameFR"] = donneCat[y]["name"];
                    donneeAnn[i]["nameR"] = donneCat[y]["nameR"];
                    
                } // else { // sinon on range ses nomination dans autres

                //     // for (let j = 0; j < donneeAnn[i]["nomine"].length; j++) {

                //     //     Autre["nomine"][idA] = donneeAnn[i]["nomine"][j];
                //     //     Autre["count"] = Autre["count"] + donneeAnn[i]["count"];
                //     //     idA++;
                //     // }

                //     Autre["nomine"][idA] = donneeAnn[i]["nomine"];
                //     Autre["count"] = Autre["count"] + donneeAnn[i]["count"];
                //     idA++;
                // }
                
            }
        
        }
  
        ListCatAnn = donneeAnn; // on defini la list à envoyer en fonction des modification effectuer

        console.log(Autre); //debogage
    
        return ListCatAnn; //on la renvoie
    
    }
  
    //fonction de génération du camembret
    function GenCamembert(data){

        //on récupère le svg
        const cam = d3.select("#cam");
        
        //on le nettoie
        cam.selectAll("g").remove();

        //on défini les différente var de auteur, largeur etc... puis un rajoute un groupe dans lequel se trouvera le cam
        const width = 200;
        const height = 200;
        const radius = Math.min(width,height) / 2;
        const gPie = cam.append("g") .attr("transform", `translate(0,0)`);

        // on définie que les valeur à utilisé pour la génération sont celle de la clé "count"
        const pie = d3.pie()
            .sort(null)
            .value(d => d.count);
        
        //on défini le radius de l'arc
        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius - 10);

        //et celui où seront présent les labels
        const tag = d3.arc()
            .innerRadius(0)
            .outerRadius(radius * 2);
  
        //on créer des objet arc pour chaque donnée
        const arcs = gPie.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");
  
        // pour chaque objet on créer un chemin qui correspond a la partie ducam qui lui corrspond
        arcs.append("path")
            .attr("d", arc)
            .attr("fill", (d, i) => data[i].color1); // on lui donne la couleur 1 de la ligne de donnée corrspondante 
  
        // pour chaque arc on rajoute son label
        arcs.append("text")
            .attr("transform", d => `translate(${tag.centroid(d)})`) //on le centre entre les radius défini
            .attr("dy", "0.35em")
            .html((d,i) => `${data[i].emote}; ${data[i].nameR}`) // on rajoute son contenu
            .attr("class", "tag")
            .style("text-anchor", "middle")
            .style("opacity", "0"); // on défini son opacité à 0 pour qu'il apparaissent uniquement au hover
        
        arcs.on("mouseenter", function(){ //intéraction au hover (l'objet touché reste tels quel et affiche son label, les autres passe en oppacité 0.5)

            arcs.transition()
                .style("opacity", 0.5);
            
            d3.select(this)
                .transition()
                .style("opacity", 1)
                .selectAll(".tag")
                .transition()
                .style("opacity", 1);
            
        });

        arcs.on("mouseleave", function(){ //remise à zéro des intéraction au hover à la sortie de l'objet touché

            arcs.transition()
                .style("opacity", 1);
            
            d3.select(this)
                .selectAll(".tag")
                .transition()
                .style("opacity", 0);
            
        });

    }

    
    d3.json("./src/categorie.json").then(function(data) {
        // console.log(d);
        console.log(d.year);
        position[1] = index;
        console.log(position);
        
        let pos = [];
    
        pos = position;
        console.log(pos);
        
        let cat = d.category;
    
        let ListCatAnn = CatAnn(cat,data);
    
        // console.log(cat);
        // console.log("-----");
        // console.log(ListCatAnn);
    
        d3.select("#info-Bulle")
            .style("display", "none")
            .selectAll(".AnnDec")
            .remove();
    
        d3.select("#Decennie")
            .style("display", "none");
    
        d3.select("#Annee")
            .style("display", "grid")
            .selectAll(".infoAn")
            .remove();
    
        d3.selectAll(".An")
            .text(d.year);
        
        d3.select("#BasAside")
            .append("div")
            .attr("class", "infoAn");
        
        GenCamembert(ListCatAnn);

        if (d.year == 2023) {
            d3.select("#More")
                .style("display", "none");
        } else {
            d3.select("#More")
                .style("display", "flex")
                .select("#MoreAn")
                .text(d.year + 1);
        }

        if (d.year == 1928) {
            d3.select("#Less")
                .style("display", "none");
        } else {
            d3.select("#Less")
                .style("display", "flex")
                .select("#LessAn")
                .text(d.year - 1);
        }
    
        for (let i = 0; i < ListCatAnn.length; i++) {

            let currentcat = ListCatAnn[i]["nomine"];

            if (typeof ListCatAnn[i]["nameFR"] !== 'undefined') {

                if (ListCatAnn[i]["nameFR"] == "Meilleur Film") {
                    
                } else {
                    d3.select(".infoAn")
                        .append("div")
                        .attr("id", `Cat${i}`)
                        .attr("class", "Divcate")
                        .append("p")
                        .attr("class", "TagCate")
                        .html(`${ListCatAnn[i]["emote"]}; ${ListCatAnn[i]["nameFR"]}`)
                        .style("border", `solid 3px ${ListCatAnn[i]["color1"]}`)
                        .style("color", ListCatAnn[i]["color1"]);
                        // .text(ListCatAnn[i]["name"]);
                }
            
            } else {

                d3.select(".infoAn")
                    .append("div")
                    .attr("id", `Cat${i}`)
                    .attr("class", "Divcate")
                    .append("p")
                    .text(ListCatAnn[i]["name"]);

            }

            // console.log(currentcat);

            for (let y = 0; y < currentcat.length; y++) {

                if (currentcat[y]['winner']== true) {

                    if (ListCatAnn[i]["nameFR"] == "Meilleur Film") {

                        d3.select("#imgAn")
                            .style("background", `linear-gradient(180deg, #0D111700 0%, #0d1117cc 100%), linear-gradient(180deg, #0d111759 0%, #0d111759 100%), center / cover no-repeat url(${currentcat[y]["lien_affiche"]})`);
                        d3.select("#imgBck")
                            .style("background-image", `url(${currentcat[y]["lien_affiche"]})`);
                        d3.select("#FilmName")
                            .text(currentcat[y]["film"]);
                        
                            
                    } else if (ListCatAnn[i]["nameFR"] == "Meilleur Acteur") {

                        d3.select("#imgAn")
                            .style("background", `linear-gradient(180deg, #0D111700 0%, #0d1117cc 100%), linear-gradient(180deg, #0d111759 0%, #0d111759 100%), center / cover no-repeat url(${currentcat[y]["lien_portrait"]})`);
                        d3.select("#imgBck")
                            .style("background-image", `url(${currentcat[y]["lien_portrait"]})`);

                        d3.select(`#Cat${i}`)
                            .append("p")
                            .html(`<span class="bold">${currentcat[y]["name"]}</span> - ${currentcat[y]["film"]}`);

                    } else if (ListCatAnn[i]["nameFR"] == "Oscar d'honneur") {

                        d3.select(`#Cat${i}`)
                            .append("p")
                            .text(currentcat[y]["name"]);

                    } else {

                        d3.select(`#Cat${i}`)
                            .append("p")
                            .html(`<span class="bold">${currentcat[y]["name"]}</span> - ${currentcat[y]["film"]}`);

                    }

                }
            }

        }

            // let tabcat = data;

            // d3.select(".cate")
            //     .selectAll("p")
            //     .data(tabcat)
            //     .join("p")
            //     .html(d => `${d.emote}; ${d.name}`);

            
        document.getElementById("back").addEventListener("click", affiche_decenie, false);

        setTimeout(() => {

            // document.getElementById("More").addEventListener("click", MoreAndLess(donnee, pos, 1), false);
            
            // document.getElementById("Less").addEventListener("click", MoreAndLess(donnee, pos, 0), false);

            document.getElementById("More").addEventListener("click", () => {

                //année +1

                let indexDec = 0;
                indexDec = pos[0];
                let indexAn = 0;
                indexAn = pos[1]+1;

                if (indexAn == donnee[indexDec].list.length){
                    indexDec = indexDec + 1;
                    indexAn = 0;
                }
                
                console.log(donnee[indexDec].list[indexAn]);
                Aff_annee(donnee, donnee[indexDec].list[indexAn], indexAn, [indexDec] );
            
            }, false);
            
            document.getElementById("Less").addEventListener("click", () => {
            
                //année -1
                
                let indexDec = 0;
                indexDec = pos[0];
                let indexAn = 0;
                indexAn = pos[1]-1;

                if (indexAn == -1){
                    indexDec = indexDec - 1;
                    indexAn = donnee[indexDec].list.length -1;
                }
                
                console.log(donnee[indexDec].list[indexAn]);
                Aff_annee(donnee, donnee[indexDec].list[indexAn], indexAn, [indexDec] );
            
            }, false);

        }, 350);                  
    });
}

function affiche_decenie() {

    function Aff_infoBulle(data, d, index, pointer){

        let coo = [[30,18], [4,28], [2,35], [2,42], [2,50], [2,58], [2,45], [2,39], [2,32], [2,25], [25,15]]; // =>7 => right

        let position = [index];

        let liste = d.list;

        d3.select("#info-Bulle")
             .selectAll(".AnnDec")
             .remove();

        d3.select("#info-Bulle")
          .style("display", "block")
          .style("left",`unset`)
          .style("right",`unset`)
          .selectAll("h3")
          .text(d.year);
        
        for (let i = 0; i < liste.length; i++) {

            d3.select(".infoCrop")
                .append("div")
                .attr("class", "AnnDec")
                .attr("id", `Ann${i}`);

            d3.select(`#Ann${i}`)
                .append("p")
                .attr("class", "bold")
                .text(liste[i]['year']);
              
            d3.select(`#Ann${i}`)
                .append("div")
                .attr("class", "barAnn")
                .style("width", `${liste[i]["count"]/2}px`);
              
            d3.select(`#Ann${i}`)
                .append("p")
                .attr("class", "bold violetTxt AnnCount")
                .text(`${liste[i]['count']} nominations`);
        }

        if (index >= 6) {

            d3.select("#info-Bulle")
                .style("right",`${coo[index][1]}vw`);

            gsap.from("#info-Bulle", {
                duration : 0.3,
                top : `${coo[index][0]}vh`,
                right : `${coo[index][1]-30}vw`,
                ease: "expo.out"
            })

        } else {

            d3.select("#info-Bulle")
                .style("left",`${coo[index][1]}vw`);

            gsap.from("#info-Bulle", {
                duration : 0.3,
                top : `${coo[index][0]}vh`,
                left : `${coo[index][1]-30}vw`,
                ease: "expo.out"
            })

        };

        gsap.from("#info-Bulle", {
            duration : 0.3,
            transform : "scale(0)",
            opacity: 0,
            ease: "expo.out"
        })

        gsap.from(".barAnn", {
            duration : 0.15,
            width : "0px",
            stagger: 0.1
        })

        d3.selectAll(".AnnDec")
            .join(liste)
            .on("click", (d,i) => Aff_annee(data, liste[i], i, position));
    }


    d3.select("#Decennie")
        .style("display", "block");

    d3.select("#Annee")
        .style("display", "none")
        .selectAll(".infoAn")
        .remove();

    d3.select("#Accueil")
        .style("display", "none");

  
    d3.json("./src/dataGroup.json").then(function (data) {

        const Data = data;
        
        const margin = 10;
        const width = 100;

        d3.select("#legAnn")
            .selectAll("text")
            .data(Data)
            .join("text")
            .text(d => d.year)
            .attr("text-anchor", "middle")
            .attr("transform", (d,i) => `translate(${i * (width + margin)}, 0)`)
            .style("font-family", "'Inter', sans-serif")
            .style("font-weight", 700)
            .style("fill", "#E8E8E8");

        d3.select("#legCount")
            .selectAll("text")
            .style("font-family", "'Inter', sans-serif")
            .style("font-weight", 700)
            .style("fill", "#E8E8E8");

        d3.select("#histogramme")
            .selectAll("rect")
            .data(Data)
            .join("rect")
            .attr("class", "histobarre")
            .attr("width", width)
            // .attr("height", 0)
            .style("fill", "url(#gradient)")
            .attr("transform", (d,i) => `translate(${i * (width + margin)}, 0) scale(1,-1)`)
            // .transition().duration(350).ease(d3.easeLinear)
            .attr("height", d => `${d.count / 3}`);

        gsap.from(".histobarre", {
            duration : 0.15,
            height : "0px",
            stagger: 0.1
        })
        
        setTimeout(() => {

            d3.selectAll(".histobarre")
                .data(Data)
                .on("click", (d, i) => Aff_infoBulle(Data, d, i)); 

            d3.selectAll(".ClickNone")
                .on("click", function() {

                    d3.select("#info-Bulle")
                        .style("display", "none")
                        .selectAll(".AnnDec")
                        .remove();
                        
                });

            d3.selectAll(".histobarre")
                .data(Data)
                .on("mouseenter", function(d, i){ //this = objeft touché

                    d3.selectAll(".histobarre")
                        .transition()
                        .style("opacity", 0.5);
                    
                    d3.select(this)
                        .transition()
                        .style("opacity", 1);

                    d3.select("#infoDec") 
                        .style("display", "block");
                    
                    d3.select('#nbNomDec')
                        .text(d.count);

                    d3.select('#dateDebut')
                        .text(d.list[0]['year']);

                    d3.select('#dateFin')
                        .text(d.list[(d.list.length)-1]['year']);

                });

            d3.selectAll(".histobarre")
                .on("mouseleave",function(e,d){ //this = objeft touché

                    d3.selectAll(".histobarre")
                        .style("opacity", 1);

                    d3.select("#infoDec") 
                        .style("display", "none"); 

                });

        }, "350");

    });
}


































// document.getElementById("btn_decenie").addEventListener("click",function decenie(e){

//     document.getElementById("btn_decenie").classList.add("btn_press");
//     document.getElementById("btn_categorie").classList.remove("btn_press");
//     document.getElementById("btn_categorie").classList.add("btn_unpress");
//     document.getElementById("btn_decenie").classList.remove("btn_unpress");

// });

// document.getElementById("btn_categorie").addEventListener("click",function categorie(e){
//     document.getElementById("btn_decenie").classList.add("btn_unpress");
//     document.getElementById("btn_categorie").classList.remove("btn_unpress");
//     document.getElementById("btn_decenie").classList.remove("btn_press");
//     document.getElementById("btn_categorie").classList.add("btn_press");

// });

// document.querySelectorAll(".btn_unpress").addEventListener("Click", function switch_visuel(elementClicked){
//     elementClicked.classList.add("btn_press");
// })
