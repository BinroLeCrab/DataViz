window.addEventListener("load", affiche_accueil, false);

console.log('AA');

function affiche_accueil() {
  d3.select("#Decennie")
    .style("display", "none");

  let btn = document.getElementById("enter");
  
  

  btn.addEventListener("click", affiche_decenie, false);
}

function Aff_annee(data, d){
    console.log(d);
    console.log(d.year);

    let cat = d.category;

    console.log(cat);

    d3.select("#info-Bulle")
        .style("display", "none")
        .selectAll(".AnnDec")
        .remove();

    d3.select("#Decennie")
        .style("display", "none");

    d3.select("#Annee")
        .style("display", "block");

    d3.select("#NomAn")
        .text(d.year);
    
    d3.select("#Annee")
        .append("div")
        .attr("class", "infoAn");

      for (let i = 0; i < cat.length; i++) {

          let currentcat = cat[i]["nomine"];

          d3.select(".infoAn")
              .append("p")
              .text(cat[i]["name"]);

          console.log(currentcat);

          for (let y = 0; y < currentcat.length; y++) {

              if (currentcat[y]['winner']== true) {

                d3.select(".infoAn")
                  .append("p")
                  .text(`${currentcat[y]["name"]} - ${currentcat[y]["film"]}`);

              }
          }

          d3.select(".infoAn")
              .append("p")
              .text("------");
      }
    
    document.getElementById("back").addEventListener("click", affiche_decenie, false);

    
}


function affiche_decenie() {

    function Aff_infoBulle(data, d, index, pointer){

        let coo = [[30,18], [4,28], [2,35], [2,42], [2,50], [2,58], [2,65], [2,39], [2,32], [2,25], [25,15]]; // =>7 => right

        let liste = d.list;
        console.log(data);
        console.log(liste);

        d3.select("#info-Bulle")
             .selectAll(".AnnDec")
             .remove();

        d3.select("#info-Bulle")
          .style("display", "block")
          .style("top",`${coo[index][0]}vh`)
          .style("left",`unset`)
          .style("right",`unset`)
          .selectAll("h3")
          .text(d.year);
        
          if (index >= 7) {
            d3.select("#info-Bulle")
                .style("right",`${coo[index][1]}vw`);
          } else {
            d3.select("#info-Bulle")
                .style("left",`${coo[index][1]}vw`);
          };

        // d3.select("#info-Bulle")
        //   .style("display", "block")
        //   .selectAll("h3")
        //   .data(d.list)
        //   .join("div")
        //   .attr("class", "AnnDec");
        
        // d3.selectAll(".AnnDec")
        //   // .data(d.list)
        //   .selectAll("p")
        //   .data(d.list)
        //   .join("p")
        //   .text((d,i) => d[i].year);

          for (let i = 0; i < liste.length; i++) {

              d3.select("#info-Bulle")
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

          d3.selectAll(".AnnDec")
              .join(liste)
              .on("click", (d,i) => Aff_annee(data, liste[i]));
    }

    // console.log('une constante ?');
    // console.log(Data);

    d3.select("#Decennie")
      .style("display", "block");

    d3.select("#Annee")
      .style("display", "none")
      .selectAll(".infoAn")
      .remove();

    d3.select("#Accueil")
      .style("display", "none");

  
    d3.json("./src/dataGroup.json").then(function (data) {


      console.log('AbA');
      // console.log(data);
      const Data = data;
      
      // console.log(Data)      

  // d3.json("./src/data.json").then(function (data) {

  //   console.log(data);

  //   const DataByYear = groupByAnn(data);

  //   console.log ("bb")
  //   console.log(DataByYear); // Débogage
  //   console.log("Hay"); // Débogage

  //   const DataDec = groupByDec(DataByYear);

  //   console.log("DataDec");
      
    const svg = d3.select("#bar-chart");
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
              .on("click", (d, i) => Aff_infoBulle(Data, d, i)); //Aff_annee(Data, d)

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

                  // Aff_infoBulle(Data, d, i);
          });

          d3.selectAll(".histobarre")
              .on("mouseleave",function(e,d){ //this = objeft touché
                  d3.selectAll(".histobarre")
                      .style("opacity", 1);

                  d3.select("#infoDec") 
                      .style("display", "none");  
                  
                  // d3.select("#info-Bulle")
                  //     .style("display", "none")
                  //     .selectAll(".AnnDec")
                  //     .remove();
            });
        }, "350");

     });
  }

  
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
    */