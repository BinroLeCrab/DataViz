d3.json("data.json").then(function(data) {
  const filteredData = data.filter(d => d.year_ceremony >= 1928 && d.year_ceremony <= 2023);

  function getDecade(year) {
    return Math.floor(year / 10) * 10;
  }

  const nominationsByDecade = d3.nest()
    .key(d => getDecade(d.year_ceremony))
    .rollup(v => v.length)
    .entries(filteredData);

  const finalData = nominationsByDecade.map(d => ({
    decade: parseInt(d.key),
    count: d.value
  }));

  const svg = d3.select("#bar-chart");
  const margin = { top: 20, right: 30, bottom: 30, left: 40 };
  const width = +svg.attr("width") - margin.left - margin.right;
  const height = +svg.attr("height") - margin.top - margin.bottom;

  const x = d3.scaleBand()
    .domain(finalData.map(d => d.decade))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  const y = d3.scaleLinear()
    .domain([0, d3.max(finalData, d => d.count)])
    .nice()
    .range([height - margin.bottom, margin.top]);

  function showTooltip(d) {
      const tooltip = document.getElementById("tooltip");
      tooltip.innerHTML = `Décennie : ${d.decade}s <br> Nominations : ${d.count}`;
      tooltip.style.top = (d3.event.pageY - 10) + "px";
      tooltip.style.left = (d3.event.pageX + 10) + "px";
      tooltip.style.visibility = "visible";
  }

  function hideTooltip() {
      const tooltip = document.getElementById("tooltip");
      tooltip.style.visibility = "hidden";
  }

  svg.append("g")
    .selectAll("rect")
    .data(finalData)
    .enter()
    .append("rect")
    .attr("x", d => x(d.decade))
    .attr("y", d => y(d.count))
    .attr("width", x.bandwidth())
    .attr("height", d => height - margin.bottom - y(d.count))
    .on("click", handleClick)

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickValues(finalData.map(d => d.decade)))
    .selectAll("text")
    .style("text-anchor", "middle");

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(5));

  function handleClick(d) {
      const selectedYear = parseInt(prompt("Sélectionnez une année pour " + d.decade + "s:", d.decade));
      if (selectedYear) {
          const selectedFilms = data.filter(film => film.year_ceremony == selectedYear);

          const filmDetails = document.getElementById("film-details");
          filmDetails.innerHTML = "";

          const filmList = document.createElement("ul");
          selectedFilms.forEach(selectedFilm => {
              const listItem = document.createElement("li");
              listItem.innerHTML = 
              `<p><strong>Année de création:</strong> ${selectedFilm.year_film}</p>
              <strong>Nom du film:</strong> ${selectedFilm.film}, 
              <strong>Réalisateur(rice) ou Acteur(rise):</strong> ${selectedFilm.name}, 
              <strong>Catégorie:</strong> ${selectedFilm.category}, 
              <strong>Gagnant:</strong> ${selectedFilm.winner ? "Oui" : "Non"}`;
              filmList.appendChild(listItem);
          });

          filmDetails.appendChild(filmList);
      }
  }
});
