
d3.json("./src/dataGroup.json").then(function (data) {

window.addEventListener("load", affiche_accueil, false);

console.log('AbA');
// console.log(data);
const Data = data;

// console.log(Data)

function affiche_accueil() {
  d3.select("#Decennie")
    .style("display", "none");
  
  document.getElementById("enter").addEventListener("click", affiche_decenie, false);
}

function Aff_annee(d){
  console.log(d.list[0]["count"]);
}

function affiche_decenie() {

  // console.log('une constante ?');
  // console.log(Data);

  d3.select("#Decennie")
    .style("display", "block");

  d3.select("#Accueil")
    .style("display", "none");

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
        .style("width", width)
        .style("height", 0)
        .style("fill", "url(#gradient)")
        .attr("transform", (d,i) => `translate(${i * (width + margin)}, 0) scale(1,-1)`)
        .transition().duration(350).ease(d3.easeLinear)
        .style("height", d => `${d.count / 3}`);
        
        setTimeout(() => {
          d3.selectAll(".histobarre")
            .data(Data)
            .on("click", d => Aff_annee(d));

          d3.selectAll(".histobarre")
              .data(Data)
              .on("mouseenter", function(d){ //this = objeft touché
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

    // });
  }
});
  
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