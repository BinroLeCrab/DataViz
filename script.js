// Chargement des données depuis le fichier JSON
d3.json("ressources/the_oscar_award.json").then(function(data) {
    // Filtrer les données pour les années de 1928 à 2023
    const filteredData = data.filter(d => d.year_ceremony >= 1928 && d.year_ceremony <= 2023);
  
    // Grouper les données par année de cérémonie et compter les nominations
    const nominationsByYear = d3.nest()
      .key(d => d.year_ceremony)
      .rollup(v => v.length)
      .entries(filteredData);
  
    // Convertir les données en un tableau d'objets avec "year" et "count"
    const finalData = nominationsByYear.map(d => ({
      year: parseInt(d.key),
      count: d.value
    }));
  
    // Création du graphique en colonnes
    const svg = d3.select("#bar-chart");
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;
  
    const x = d3.scaleBand()
      .domain(finalData.map(d => d.year))
      .range([margin.left, width - margin.right])
      .padding(0.1);
  
    const y = d3.scaleLinear()
      .domain([0, d3.max(finalData, d => d.count)])
      .nice()
      .range([height - margin.bottom, margin.top]);
  
    svg.append("g")
      .selectAll("rect")
      .data(finalData)
      .enter()
      .append("rect")
      .attr("x", d => x(d.year))
      .attr("y", d => y(d.count))
      .attr("width", x.bandwidth())
      .attr("height", d => height - margin.bottom - y(d.count))
      .on("click", handleClick);
  
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickValues(finalData.map(d => d.year)))
      .selectAll("text")
      .style("text-anchor", "middle");
  
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(5));
  
    // Fonction pour gérer les clics sur les barres
function handleClick(d) {
    // Trouver les détails du film correspondant à l'année sélectionnée
    const selectedFilm = data.find(film => film.year_ceremony === d.year);
  
    // Afficher les détails dans la section HTML
    const filmDetails = document.getElementById("film-details");
    const filmYear = document.getElementById("film-year");
    const filmName = document.getElementById("film-name");
    const filmDirector = document.getElementById("film-director");
    const filmCategory = document.getElementById("film-category");
    const filmWinner = document.getElementById("film-winner");
  
    filmYear.textContent = selectedFilm.year_film;
    filmName.textContent = selectedFilm.film;
    filmDirector.textContent = selectedFilm.name;
    filmCategory.textContent = selectedFilm.category;
    filmWinner.textContent = selectedFilm.winner ? "Oui" : "Non";
  }
  
  });
  