window.addEventListener("load", affiche_accueil, false);

// console.log('AA');

function affiche_accueil() {

    d3.select("#Decennie")
    .style("display", "none");

    let btn = document.getElementById("enter");
    btn.addEventListener("click", affiche_decenie, false);

}

function Aff_annee(donnee, d, index, position){

    function CatAnn(donneeAnn, donneCat){
  
        let ListCatAnn = {};
  
        for (let i = 0; i < donneeAnn.length; i++) {
  
            for (let y = 0; y < donneCat.length; y++) {
                
                if ((donneeAnn[i]["name"] == donneCat[y]["original"]) || ( typeof donneCat[y]["original2"] !== 'undefined' && (donneeAnn[i]["name"] == donneCat[y]["original2"])) || ( typeof donneCat[y]["original3"] !== 'undefined' && (donneeAnn[i]["name"] == donneCat[y]["original3"]))) {
                    
                    donneeAnn[i]["emote"] = donneCat[y]["emote"];
                    donneeAnn[i]["color1"] = donneCat[y]["color1"];
                    donneeAnn[i]["color2"] = donneCat[y]["color2"];
                    donneeAnn[i]["gradient"] = donneCat[y]["gradient"];
                    donneeAnn[i]["nameFR"] = donneCat[y]["name"];
        
                }
                
            }
        
        }
  
        ListCatAnn = donneeAnn;
    
        return ListCatAnn;
    
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
            .style("display", "block")
            .selectAll("div")
            .remove();
    
        d3.select("#NomAn")
            .text(d.year);
        
        d3.select("#Annee")
            .append("div")
            .attr("class", "infoAn");
    
        d3.selectAll(".cate")
            .remove();
    
        d3.select("#Annee")
            .append("div")
            .attr("class", "cate");
    
        for (let i = 0; i < ListCatAnn.length; i++) {

            let currentcat = ListCatAnn[i]["nomine"];

            if (typeof ListCatAnn[i]["nameFR"] !== 'undefined') {

                d3.select(".infoAn")
                    .append("div")
                    .attr("id", `Cat${i}`)
                    .attr("class", "Divcate Goodcate")
                    .append("p")
                    .html(`${ListCatAnn[i]["emote"]}; ${ListCatAnn[i]["nameFR"]}`);
                    // .text(ListCatAnn[i]["name"]);
            
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

                    d3.select(`#Cat${i}`)
                        .append("p")
                        .text(`${currentcat[y]["name"]} - ${currentcat[y]["film"]}`)
                        .append("p")
                        .text("------");

                }
            }

            d3.select(`#Cat${i}`)
                .append("p")
                .text("------");
        }

            
            d3.selectAll(`.Goodcate`).style("display", 'none');

            let tabcat = data;

            d3.select(".cate")
                .selectAll("p")
                .data(tabcat)
                .join("p")
                .html(d => `${d.emote}; ${d.name}`);

            
        document.getElementById("back").addEventListener("click", affiche_decenie, false);

        setTimeout(() => {

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
                        .style("opacity", 1)
                        .filter("drop-shadow", "0px 0px 10px 0px #C294FC");

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
