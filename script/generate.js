// -------- FICHIER DEDIE AU CHARGEMENT DES DIFFERENTS AFFICHAGES ET AUX GENERATIONS DES GRAPH AVEC D3 ----------

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

    function CatAnn(donneeAnn, donneCat) {
        // Fonction de groupement par catégorie
        console.log(donneeAnn); // Débogage

        let ListCatAnn = []; // Liste des catégories de l'année à retourner
        let Autre = { // Définition du tableau de la catégorie autre
            "nameFR": "Autres Catégories",
            "nameR": "Autres Catégories",
            "emote": "&#128193",
            "color1": "#A4B3C5",
            "color2": "#1C2128",
            "gradient": "linear-gradient(180deg, #1C212800 0%, #1C2128 100%)",
            "count": 0,
            "nomine": []
        };

        for (let i = 0; i < donneeAnn.length; i++) { // Parcours des données de l'année
            let categorieTrouvee = false; // Drapeau pour vérifier si la catégorie a été trouvée

            for (let y = 0; y < donneCat.length; y++) { // Parcours des données du fichier catégories
                // Pour chaque catégorie de l'année, vérifier la correspondance avec une catégorie définie
                if ((donneeAnn[i]["name"] == donneCat[y]["original"]) || ( typeof donneCat[y]["original2"] !== 'undefined' && (donneeAnn[i]["name"] == donneCat[y]["original2"])) || ( typeof donneCat[y]["original3"] !== 'undefined' && (donneeAnn[i]["name"] == donneCat[y]["original3"]))   || ( typeof donneCat[y]["original4"] !== 'undefined' && (donneeAnn[i]["name"] == donneCat[y]["original4"])) || ( typeof donneCat[y]["original5"] !== 'undefined' && (donneeAnn[i]["name"] == donneCat[y]["original5"])) || ( typeof donneCat[y]["original6"] !== 'undefined' && (donneeAnn[i]["name"] == donneCat[y]["original6"])) || ( typeof donneCat[y]["original7"] !== 'undefined' && (donneeAnn[i]["name"] == donneCat[y]["original7"]))) {
                    // Mise à jour des paramètres de donneeAnn[i]
                    donneeAnn[i]["emote"] = donneCat[y]["emote"];
                    donneeAnn[i]["color1"] = donneCat[y]["color1"];
                    donneeAnn[i]["color2"] = donneCat[y]["color2"];
                    donneeAnn[i]["gradient"] = donneCat[y]["gradient"];
                    donneeAnn[i]["nameFR"] = donneCat[y]["name"];
                    donneeAnn[i]["nameR"] = donneCat[y]["nameR"];
                    categorieTrouvee = true;
                    break;
                }
            }

            if (!categorieTrouvee) { // Si la catégorie ne correspond pas, ajout à "Autres"
                Autre["nomine"].push(...donneeAnn[i]["nomine"]);
                Autre["count"] += donneeAnn[i]["nomine"].length;
            } else {
                // Si la catégorie est reconnue, ajout à ListCatAnn
                ListCatAnn.push(donneeAnn[i]);
            }
        }

        // Ajout de la catégorie "Autres" à ListCatAnn si elle contient des nominés
        if (Autre["count"] > 0) {
            ListCatAnn.push(Autre);
        }

        console.log(Autre); // Débogage
        return ListCatAnn; // Renvoie la liste modifiée
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

    
    d3.json("./src/categorie.json").then(function(data) { //récupération des données du json catégorie
        // console.log(d);
        console.log(d.year); //Débogage
        position[1] = index; //Màj de la position actuelle avec l'index de l'année
        console.log(position); //Débogage
        
        let pos = []; //déclaration de la liste pos (version "locale" de position)
        pos = position; //pos rempli avec position
        console.log(pos); //Débogage
        
        let cat = d.category; //déclaration de la liste des catégorie
    
        let ListCatAnn = CatAnn(cat,data); //Appel de la fonction qui va trié la liste des catégorie de cette année en les croisant avec celle du json
    
        // console.log(cat); //Débogage
        // console.log("-----"); //Débogage
        // console.log(ListCatAnn); //Débogage
    
        d3.select("#info-Bulle") //Nettoyage de l'info bulle en display none
            .style("display", "none")
            .selectAll(".AnnDec")
            .remove();
    
        d3.select("#Decennie") // Display none de la page décénnie
            .style("display", "none");
    
        d3.select("#Annee") // Affichege de la page année
            .style("display", "grid")
            .selectAll(".infoAn") //Nettoyage de la partie info année pour éviter que les info s'accumule
            .remove();
        
        d3.select("#BasAside") //Nouvelle partie info année
            .append("div")
            .attr("class", "infoAn");
    
        d3.selectAll(".An") //Remplassage de l'année en cours dans les endroit prévu
            .text(d.year);

        d3.select("#nbNomi") //Remplissage des info avec le nombre de nomination de l'année
            .text(d.count);

        d3.select("#nbCate") // Même chose que juste avant pour les nombre de catégories
            .text(d.category.length);
        
        GenCamembert(ListCatAnn); //Génération du camembert

        if (d.year == 2023) { //Si 2023 on masque le bouton +1
            d3.select("#More")
                .style("display", "none");
        } else {
            d3.select("#More") //Sinon on y marque l'année +1
                .style("display", "flex")
                .select("#MoreAn")
                .text(d.year + 1);
        }

        if (d.year == 1928) { //Si 1928 on masque le bouton -1
            d3.select("#Less")
                .style("display", "none");
        } else {
            d3.select("#Less") //Sinon on y marque l'année -1
                .style("display", "flex")
                .select("#LessAn")
                .text(d.year - 1);
        }
    
        for (let i = 0; i < ListCatAnn.length; i++) { //Parcours de la liste des catégorie de l'année mise à jour avec la fonction plus haut

            let currentcat = ListCatAnn[i]["nomine"]; //Màj du la catégorie courrante

            if (typeof ListCatAnn[i]["nameFR"] !== 'undefined') { //On vérifie que le nom fr est défini

                if (ListCatAnn[i]["nameFR"] == "Meilleur Film") { //SI c'est la catégorie Meilleur film on ne fait rien
                    
                } else { //SInon

                    d3.select(".infoAn") //On créer un nouveau bloc de la catégorie dans infoAn
                        .append("div")
                        .attr("id", `Cat${i}`) //on lui donne un id propre pour le retrouver après
                        .attr("class", "Divcate")
                        .append("p")   // On rajoute le petit tag du nom de la catégorie
                        .attr("class", "TagCate")
                        .html(`${ListCatAnn[i]["emote"]}; ${ListCatAnn[i]["nameFR"]}`) //en récupérant son emote, nom et sa couleur
                        .style("border", `solid 3px ${ListCatAnn[i]["color1"]}`)
                        .style("color", ListCatAnn[i]["color1"]);
                        // .text(ListCatAnn[i]["name"]);
                }
            
            } else { //Si name fr est pas définie (partie utile avec une ancienne version du code)

                d3.select(".infoAn") // On définit un nouveau div pour la catégorie
                    .append("div")
                    .attr("id", `Cat${i}`)
                    .attr("class", "Divcate")
                    .append("p")  //Mais on affiche que le nom de la catégorie
                    .text(ListCatAnn[i]["name"]);

            }

            // console.log(currentcat); //Débogage

            for (let y = 0; y < currentcat.length; y++) { //Mtn on parcours les nominés de la catégori courrante

                if (currentcat[y]['winner']== true) { //Si le nominé est le lauréat de sa catégorie

                    if (ListCatAnn[i]["nameFR"] == "Meilleur Film") { // SI c'est le meilleur film

                        d3.select("#imgAn") //On met son poster en couverture du aside
                            .style("background", `linear-gradient(180deg, #0D111700 0%, #0d1117cc 100%), linear-gradient(180deg, #0d111759 0%, #0d111759 100%), center / cover no-repeat url(${currentcat[y]["lien_affiche"]})`);
                        d3.select("#imgBck") //Et en fond du aside
                            .style("background-image", `url(${currentcat[y]["lien_affiche"]})`);
                        d3.select("#FilmName") //On met aussi son nom sous la tag meilleur film dans la partie haute du aside
                            .text(currentcat[y]["film"]);
                        
                            
                    } else if (ListCatAnn[i]["nameFR"] == "Meilleur Acteur") { //Si c'est le meilleur acteur

                        if (currentcat[y]["lien_portrait"] == "Erreur de requête pour le portrait") { //Si il y a eu une erreur lors de l'utilisation de l'API
                            d3.select("#imgAn") //On met L'image Not Found en couverture du aside
                                .style("background", `linear-gradient(180deg, #0D111700 0%, #0d1117cc 100%), linear-gradient(180deg, #0d111759 0%, #0d111759 100%), center / cover no-repeat url(../asset/NotFound.png)`);
                            d3.select("#imgBck") //Et en fond du aside
                                .style("background-image", `url(../asset/NotFound.png)`);
                        }

                        d3.select("#imgAn") //Sinon comme pour le meilleur film on met sa photo en couverture
                            .style("background", `linear-gradient(180deg, #0D111700 0%, #0d1117cc 100%), linear-gradient(180deg, #0d111759 0%, #0d111759 100%), center / cover no-repeat url(${currentcat[y]["lien_portrait"]})`);
                        d3.select("#imgBck") //Et en fond
                            .style("background-image", `url(${currentcat[y]["lien_portrait"]})`);

                        d3.select(`#Cat${i}`) // Plus on rajoute son nom et son film pour lequel il est nominé dans le div dédié à sa catégorie
                            .append("p")
                            .html(`<span class="bold">${currentcat[y]["name"]}</span> - ${currentcat[y]["film"]}`);

                    } else if (ListCatAnn[i]["nameFR"] == "Oscar d'honneur") { 

                        // Si c'est l'oscar d'honneur il n'y a pas de nom de film donc juste l'intitulé de la nomination
                        d3.select(`#Cat${i}`)
                            .append("p")
                            .text(currentcat[y]["name"]);

                    } else {
                        
                        //Sinon on va chercher le bon div et on y rajoute le nom et le film du nominé
                        d3.select(`#Cat${i}`)
                            .append("p")
                            .html(`<span class="bold">${currentcat[y]["name"]}</span> - ${currentcat[y]["film"]}`);

                    }

                }
            }

        }
            
        //Petite animation GSAP à l'apparition des lauréats
        gsap.from(".Divcate", {
            duration : 0.15,
            opacity : 0,
            stagger: 0.1
        })

        //Au click sur le bouton retour -> retour à la page décennie (on effectue la fonction "affiche_decenie")
        document.getElementById("back").addEventListener("click", affiche_decenie, false);

        //Pour éviter les spam click qui font buger le code
        setTimeout(() => {

            // document.getElementById("More").addEventListener("click", MoreAndLess(donnee, pos, 1), false);
            
            // document.getElementById("Less").addEventListener("click", MoreAndLess(donnee, pos, 0), false);

            //Au click sur année +1 on augment d'une année
            document.getElementById("More").addEventListener("click", () => {

                //année +1

                let indexDec = 0; //définition de la variable
                indexDec = pos[0]; //récupération de l'index de la décenie actuelle 
                let indexAn = 0; //def de la variable
                indexAn = pos[1]+1; //détermination de l'index de l'année à afficher à partir de l'index de l'année actuelle

                //Si l'index de l'année est trop grand -> on change de décennie
                if (indexAn == donnee[indexDec].list.length){
                    indexDec = indexDec + 1; //Donc on fait +1 à l'index de la décennie
                    indexAn = 0; //et on met l'index de l'année à 0
                }
                
                console.log(donnee[indexDec].list[indexAn]); //Débogage
                Aff_annee(donnee, donnee[indexDec].list[indexAn], indexAn, [indexDec] ); //effectuation récursif de ma foncyion affichage de l'année avec les nouveau paramètres
            
            }, false);
            
            //Au click sur année -1 on diminue d'une année
            document.getElementById("Less").addEventListener("click", () => {
            
                //année -1
                
                let indexDec = 0; //définition de la variable
                indexDec = pos[0];//récupération de l'index de la décenie actuelle 
                let indexAn = 0; //def de la variable
                indexAn = pos[1]-1; //détermination de l'index de l'année à afficher à partir de l'index de l'année actuelle

                //Si l'index de l'année est trop petit -> on change de décennie
                if (indexAn == -1){
                    indexDec = indexDec - 1; //Donc on fait -1 à l'index de la décennie
                    indexAn = donnee[indexDec].list.length -1; //et on met l'index de l'année au max de la nouvelle décennie
                }
                
                console.log(donnee[indexDec].list[indexAn]); //Débogage
                Aff_annee(donnee, donnee[indexDec].list[indexAn], indexAn, [indexDec] ); //effectuation récursif de ma foncyion affichage de l'année avec les nouveau paramètres
            
            }, false);

        }, 350);                  
    });
}

// Fonction de l'affichage de la page décennie
function affiche_decenie() {

    // Fonction d'affichage de l'info bulle
    function Aff_infoBulle(data, d, index, pointer){

        let coo = [[30,18], [4,28], [2,35], [2,42], [2,50], [2,58], [2,45], [2,39], [2,32], [2,25], [25,15]]; // définition des coo de placement de l'infoB pour chaque histobarre (la récupération des coo de la souris ne marche pas :/)

        let position = [index]; //Def de la liste position avec la position de la décénnie en [0]

        let liste = d.list; //Def de la liste des année de la décennie

        d3.select("#info-Bulle") //Nettoyage de l'info bulle pour éviter les accumulation
            .selectAll(".AnnDec")
            .remove();

        d3.select("#info-Bulle") //Affiche de l'info bulle
            .style("display", "block")
            .style("left",`unset`) //remise à zéro de ces coo
            .style("right",`unset`)
            .selectAll("h3") //Ajout du "titre" de la décennie
            .text(d.year);

        //en fonction de l'id de la barre on va placer l'info bulle à certainne coo
        if (index >= 6) {  //Si index > ou = à 6

            d3.select("#info-Bulle") //on affiche l'infob à partir de la droite
                .style("right",`${coo[index][1]}vw`);

            //animationde l'affichage de l'infoB
            gsap.from("#info-Bulle", {
                duration : 0.3,
                top : `${coo[index][0]}vh`,
                right : `${coo[index][1]-30}vw`,
                ease: "expo.out"
            })

        } else { //Sinon

            d3.select("#info-Bulle") //l'affichage se fait à partir de la gauche
                .style("left",`${coo[index][1]}vw`);

            //animation à l'affichage
            gsap.from("#info-Bulle", {
                duration : 0.3,
                top : `${coo[index][0]}vh`,
                left : `${coo[index][1]-30}vw`,
                ease: "expo.out"
            })

        };
        
        for (let i = 0; i < liste.length; i++) { //Parcours de la liste des années

            d3.select(".infoCrop") //Pour chaque année on rajoute un div avec un id propre
                .append("div")
                .attr("class", "AnnDec")
                .attr("id", `Ann${i}`);

            d3.select(`#Ann${i}`) // dans l'id de l'année séléc on rajoute le nom de l'année
                .append("p")
                .attr("class", "bold")
                .text(liste[i]['year']);
              
            d3.select(`#Ann${i}`) // on rajoute une barre dont la largeur dépend de nombre de nomination de l'année
                .append("div")
                .attr("class", "barAnn")
                .style("width", `${liste[i]["count"]/2}px`);
              
            d3.select(`#Ann${i}`) //on rajoute le nombre de nomination de l'année
                .append("p")
                .attr("class", "bold violetTxt AnnCount")
                .text(`${liste[i]['count']} nominations`);
        }

        //animation gsap à l'affichage de l'infoBulle
        gsap.from("#info-Bulle", {
            duration : 0.3,
            transform : "scale(0)",
            opacity: 0,
            ease: "expo.out"
        })

        //animation gsap des barre des année
        gsap.from(".barAnn", {
            duration : 0.15,
            width : "0px",
            stagger: 0.1
        })

        // Au click sur l'une des année on affiche la page année avec les infos de cette année là
        d3.selectAll(".AnnDec")
            .join(liste)
            .on("click", (d,i) => Aff_annee(data, liste[i], i, position));
    }

    // Affichega de la page décennie
    d3.select("#Decennie")
        .style("display", "block");

    // On masque la page année
    d3.select("#Annee")
        .style("display", "none")
        .selectAll(".infoAn") //On la nettoye pour evité les accumulation
        .remove();

    d3.select("#Accueil") //On masque l'accueil
        .style("display", "none");

  
    d3.json("./src/dataGroup.json").then(function (data) { //Récupération des data

        const Data = data; //rangement des data dans la constante Data
        
        const margin = 10; //définition de la taille des margin entre les barre
        const width = 100; //def de la largeur des barres

        d3.select("#legAnn") //ajout des légendes
            .selectAll("text")
            .data(Data) //croisement avec les datas
            .join("text")
            .text(d => d.year)
            .attr("text-anchor", "middle") //ancrache au centre
            .attr("transform", (d,i) => `translate(${i * (width + margin)}, 0)`) //placement au bonne coo de leurs barre respective
            .style("font-family", "'Inter', sans-serif") //style
            .style("font-weight", 700)
            .style("fill", "#E8E8E8");

        d3.select("#legCount") //mise en style des légende en y
            .selectAll("text")
            .style("font-family", "'Inter', sans-serif")
            .style("font-weight", 700)
            .style("fill", "#E8E8E8");

        d3.select("#histogramme") //génération de l'histogramme
            .selectAll("rect")
            .data(Data) //join avec les data et des rectangles pour chaque données
            .join("rect")
            .attr("class", "histobarre")
            .attr("width", width) //width = taille définie
            // .attr("height", 0)
            .style("fill", "url(#gradient)") //fill avec le gradient défini
            .attr("transform", (d,i) => `translate(${i * (width + margin)}, 0) scale(1,-1)`) //répartition des barre sur le graph et on les retourne pour qu'elles soient du bon côté
            // .transition().duration(350).ease(d3.easeLinear)
            .attr("height", d => `${d.count / 3}`); //définition de la hauteur en fonction du nombre de nomination divisé par 3 pour les mettre à la bonne taille

        //animation GSAP des histobarre à l'apparition du graph
        gsap.from(".histobarre", {
            duration : 0.15,
            height : "0px",
            stagger: 0.1
        })
        
        //pour éviter que les état hover et autres arrète la génération du graph par erreur
        setTimeout(() => {

            d3.selectAll(".histobarre") //au click sur une histobarre -> afficheg de l'infobulle
                .data(Data)
                .on("click", (d, i) => Aff_infoBulle(Data, d, i)); 

            d3.selectAll(".ClickNone") //auclick sur une surface ou objet de la class ClickNone -> fermeture du l'inf bulle + nettoyage
                .on("click", function() {

                    d3.select("#info-Bulle")
                        .style("display", "none")
                        .selectAll(".AnnDec")
                        .remove();
                        
                });

            d3.selectAll(".histobarre") // au hover d'une barre
                .data(Data)
                .on("mouseenter", function(d, i){ //this = objeft touché

                    d3.selectAll(".histobarre") // toute les barre en oppa 0.5
                        .transition()
                        .style("opacity", 0.5);
                    
                    d3.select(this) //barre hover en oppacité 1
                        .transition()
                        .style("opacity", 1);

                    d3.select("#infoDec")  //affichage de la partie stats sur la dcénnie
                        .style("display", "block");
                    
                    d3.select('#nbNomDec') //remplissage du nombre de nomination dans la décénnie
                        .text(d.count);

                    d3.select('#dateDebut') //remplissage de la date de début de la décénnie
                        .text(d.list[0]['year']);

                    d3.select('#dateFin') //remplissage de la date de fin
                        .text(d.list[(d.list.length)-1]['year']);

                });

            // on quitte le survol d'une barre
            d3.selectAll(".histobarre")
                .on("mouseleave",function(e,d){ //this = objeft touché

                    d3.selectAll(".histobarre") //toutes les barres en oppa 1
                        .style("opacity", 1);

                    d3.select("#infoDec") //partie stats en display none
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
