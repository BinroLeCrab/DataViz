
window.addEventListener("load", affiche_accueil, false);

function affiche_accueil() {
    d3.select("#Decennie")
      .style("display", "none");
    
    document.getElementById("enter").addEventListener("click", affiche_decenie, false);
}

function Aff_annee(d){
    console.log(d.list[2022]["count"]);
}
  


  
function affiche_decenie() {

    // Fonction de groupement par décennie
    function groupByDec(tab) {
      // Définition des variables
      let annee_debut = 1928;
      let annee_fin;
      let value = 0;
      let group = [];
      let index = 0;
      let indexAnn = 0;
      let annee = "";
      let listA = [];
  
      // console.log("hey"); // Débogage
  
      // Parcours du tableau par année
      for (let i = 0; i < tab.length; i++) {

        if (tab[i]["year"] == 1931 || tab[i]["year"] == annee_debut + 10) {

          // Pour finir une décennie
          // console.log(tab[i]); // Débogage
  
          annee = `${annee_debut} - ${annee_fin}`;
          // console.log(annee); // Débogage
  
          group[index] = { year: annee, count: value, list: listA }; // Compilation dans le tableau de fin
          index++;
          // console.log(group); // Débogage
          listA = [];
          indexAnn = 0;

          listA[indexAnn] = tab[i];
          indexAnn++;
          annee_debut = tab[i]["year"];
          value = tab[i]["count"];

        } else if (tab[i]["year"] == 2023) {

          // Pour que le tableau aille jusqu'à 2023
          // console.log(tab[i]); // Débogage
  
          annee_fin = tab[i]["year"];
          value = value + tab[i]["count"];
  
          annee = `${annee_debut} - ${annee_fin}`;
          // console.log(annee); // Débogage

          listA[indexAnn] = tab[i];
          indexAnn++;
          // console.log(listA);
  
          group[index] = { year: annee, count: value, list: listA };
          index++;
          // console.log(group); // Débogage

        } else {

          // Pour les années classiques
          annee_fin = tab[i]["year"];
          value = value + tab[i]["count"];
          listA[indexAnn] = tab[i];
          indexAnn++;
          // console.log(listA); //Débogage

        }
      }
  
      // Renvoi du tableau des décennies
      return group;
    }

    // Fonction de groupement par catégorie
    function groupByCat(tab){

        let catval = 0;
        let CurrentCat = tab[0]["category"];
        let index = 0;
        let group = [];
        let listN = [];
    
        // console.log("-------------")
        // console.log(tab);
    
        // console.log(tab.length);
        // console.log("-------------")
    
        for (let i = 0; i < tab.length; i++) {
    
            if (tab[i]["category"] == CurrentCat){
    
                listN[catval] = tab[i];
                catval++;
    
            } else {
    
                // console.log(CurrentCat);
    
                group[index] = {name: CurrentCat, count: catval, nomine: listN};
                catval = 0;
    
                CurrentCat = tab[i]["category"];
                listN = [];
                index++;
    
                listN[catval] = tab[i];
                catval++;
    
            }
        }
    
        group[index] = {name: CurrentCat, count: catval, nomine: listN};
    
        return group;
        
      }
  
    // Fonction de groupement pas année
    function groupByAnn(tab) {
    
        let annvalue = 0;
        let CurrentAnn = tab[0]["year_ceremony"];
        let index = 0;
        let group = [];
        let listN = [];
    
        for (let i = 0; i < tab.length; i++) {
            if (tab[i]["year_ceremony"] == CurrentAnn){
                
                listN[annvalue] = tab[i];
                annvalue++;
    
            } else {
    
                console.log(CurrentAnn);
                group[index] = {year: CurrentAnn, count: annvalue, category: groupByCat(listN)};
                annvalue = 0;
    
                CurrentAnn = tab[i]["year_ceremony"];
                listN = [];
                index++;
    
                listN[annvalue] = tab[i];
                annvalue++;
    
            }
            
        }
    
        group[index] = {year: CurrentAnn, count: annvalue, category: groupByCat(listN)};
    
        // console.log(CurrentAnn);
        // console.log(listN);
        // console.log(index);
    
        return group;
    }

    

    d3.select("#Decennie")
      .style("display", "block");

    d3.select("#Accueil")
      .style("display", "none");
  
    d3.json("./src/data.json").then(function (data) {

      console.log(data);

      // groupByAnn(data);


      const filteredData = data.filter(
        (d) => d.year_ceremony >= 1928 && d.year_ceremony <= 2023
      );
      const nominationsByYear = d3
        .nest()
        .key((d) => d.year_ceremony)
        .rollup((v) => v.length)
        .entries(filteredData);
      const finalData = nominationsByYear.map((d) => ({
        year: parseInt(d.key),
        count: d.value,
      }));

      const DataByYear = groupByAnn(data);

      console.log ("bb")
      console.log(DataByYear); // Débogage
      console.log("Hay"); // Débogage

      const DataDec = groupByDec(DataByYear);

      console.log(DataDec);
        
      const svg = d3.select("#bar-chart");
      const margin = 10;
      const width = 100;

      d3.select("#legAnn")
          .selectAll("text")
          .data(DataDec)
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
          .data(DataDec)
          .join("rect")
          .attr("class", "histobarre")
          .style("width", width)
          .style("height", 0)
          .style("fill", "url(#gradient)")
          .attr("transform", (d,i) => `translate(${i * (width + margin)}, 0) scale(1,-1)`)
          .transition().duration(350).ease(d3.easeLinear)
          .style("height", d => `${d.count / 3}`);
          
          setTimeout(() => {
            d3.selectAll(".histobarre")
              .data(DataDec)
              .on("click", d => Aff_annee(d));

            d3.selectAll(".histobarre")
                .on("mouseenter",function(e,d){ //this = objeft touché
                    d3.selectAll(".histobarre")
                        .transition()
                        .style("opacity", 0.5);
                    
                    d3.select(this)
                        .transition()
                        .style("opacity", 1)
                        .filter("drop-shadow", "0px 0px 10px 0px #C294FC");

                    d3.select("#infoDec") 
                        .style("display", "block");
            });

            d3.selectAll(".histobarre")
                .on("mouseleave",function(e,d){ //this = objeft touché
                    d3.selectAll(".histobarre")
                        .style("opacity", 1);

                    d3.select("#infoDec") 
                        .style("display", "none");  
              });
          }, "350");
      
      

      /*const margin = { top: 20, right: 100, bottom: 20, left: -120 };
      const width = window.innerWidth * 0.8;
      const height = window.innerHeight * 0.6 - margin.top - margin.bottom;
  
      const x = d3.scaleBand()
        .domain(DataDec.map((d) => d.year))
        .range([margin.left, width - margin.right])
        .padding(0.1);
      const y = d3.scaleLinear()
        .domain([0, d3.max(DataDec, (d) => d.count)])
        .nice()
        .range([height - margin.bottom, margin.top]);
  
      // Définition du dégradé
      const defs = svg.append("defs");
      const gradient = defs
        .append("linearGradient")
        .attr("id", "bar-gradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", "0")
        .attr("y1", "0")
        .attr("x2", "0")
        .attr("y2", height)
        .selectAll("stop")
        .data([
          { offset: "0%", color: "#753FC7" },
          { offset: "100%", color: "#C294FC" },
        ])
        .enter()
        .append("stop")
        .attr("offset", (d) => d.offset)
        .attr("stop-color", (d) => d.color);
  
      svg.append("g")
        .selectAll("rect")
        .data(DataDec)
        .enter()
        .append("rect")
        .attr("x", (d) => x(d.year))
        .attr("y", (d) => y(d.count))
        .attr("width", x.bandwidth())
        .attr("height", (d) => height - margin.bottom - y(d.count))
        .attr("fill", "url(#bar-gradient)")
        .on("click", handleClick);
  
      svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickValues(DataDec.map((d) => d.year)))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "translate(1,0)");
  
      svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(null, "s"));
  
      function handleClick(d, i) {
        const filmDetails = document.getElementById("film-details");
        filmDetails.innerHTML = "";
  
        const selectedFilms = data.filter(
          (film) => film.year_ceremony === d.year
        );
        selectedFilms.forEach((film) => {
          const p = document.createElement("p");
          p.textContent = `Nomination: ${film.category} - Film: ${film.film}`;
          filmDetails.appendChild(p);
        });
      }
    */});
  }
  
