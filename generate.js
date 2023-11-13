function affiche_accueil(){
  document.innerHTML = "";
}

window.addEventListener("load", affiche_decenie, false);

function affiche_decenie() {

    // Fonction de groupement par décénie
    function groupByDec(tab){

        // def des variables
        let annee_debut = 1928;
        let annee_fin;
        let value = 0;
        let group = [];
        let index = 0;
        let annee = "";
        
        console.log("hey"); //Débogage
    
        // Parcours du tableau par annéee
        for (let i = 0; i < tab.length; i++) {

            if ((tab[i]['year'] == 1931) || (tab[i]['year'] == (annee_debut + 10))){ // Pour finir une décénie
                console.log(tab[i]);//Débogage
    
                annee = `${annee_debut} - ${annee_fin}`;
                console.log(annee);//Débogage
    
                group[index] = {'year': annee, 'count':value}; // Compilation dans le tab de fin
                index++;
                console.log(group);//Débogage
    
                annee_debut = tab[i]['year'];
                value = tab[i]['count'];
                
            } else if (tab[i]['year'] == 2023){ // Pour que le tab ayent jusqu'à 2023
    
                console.log(tab[i]);//Débogage
    
                annee_fin = tab[i]['year'];
                value = value + tab[i]['count'];
    
                annee = `${annee_debut} - ${annee_fin}`;
                console.log(annee);//Débogage
    
                group[index] = {'year': annee, 'count':value};
                index++;
                console.log(group);//Débogage
    
            } else { // Pour les année classique
                annee_fin = tab[i]['year'];
                value = value + tab[i]['count'];
            }
    
        }
    
        //Renvoi du tab des décénie
        return group;
    }

    d3.json("data.json").then(function(data) {
        const filteredData = data.filter(d => d.year_ceremony >= 1928 && d.year_ceremony <= 2023);
        const nominationsByYear = d3.nest()
            .key(d => d.year_ceremony)
            .rollup(v => v.length)
            .entries(filteredData);
        const finalData = nominationsByYear.map(d => ({
            year: parseInt(d.key),
            count: d.value
        }));
        const DataDec = groupByDec(finalData);

        const svg = d3.select("#bar-chart");
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const width = +svg.attr("width") - margin.left - margin.right;
        const height = +svg.attr("height") - margin.top - margin.bottom;

        const x = d3.scaleBand()
            .domain(DataDec.map(d => d.year))
            .range([margin.left, width - margin.right])
            .padding(0.1);
        const y = d3.scaleLinear()
            .domain([0, d3.max(DataDec, d => d.count)])
            .nice()
            .range([height - margin.bottom, margin.top]);

        // Définition du dégradé
        const defs = svg.append("defs");
        const gradient = defs.append("linearGradient")
            .attr("id", "bar-gradient")
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", "0")
            .attr("y1", "0")
            .attr("x2", "0")
            .attr("y2", height)
            .selectAll("stop")
            .data([
                {offset: "0%", color: "#753FC7"},
                {offset: "100%", color: "#C294FC"}
            ])
            .enter().append("stop")
            .attr("offset", d => d.offset)
            .attr("stop-color", d => d.color);

        svg.append("g")
            .selectAll("rect")
            .data(DataDec)
            .enter()
            .append("rect")
            .attr("x", d => x(d.year))
            .attr("y", d => y(d.count))
            .attr("width", x.bandwidth())
            .attr("height", d => height - margin.bottom - y(d.count))
            .attr("fill", "url(#bar-gradient)")
            .on("click", handleClick);

        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).tickValues(DataDec.map(d => d.year)))
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");

        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(null, "s"));

        function handleClick(d, i) {
            const filmDetails = document.getElementById("film-details");
            filmDetails.innerHTML = "";

            const selectedFilms = data.filter(film => film.year_ceremony === d.year);
            selectedFilms.forEach(film => {
                const p = document.createElement("p");
                p.textContent = `Nomination: ${film.category} - Film: ${film.film}`;
                filmDetails.appendChild(p);
            });
        }
    });
}
