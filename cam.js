function updatePieChart(data) {
    // Sélectionner le SVG
    const svg = d3.select("#cam");

    // Supprimer le contenu précédent
    svg.selectAll("*").remove();

    // Sélectionner et créer les tranches du camembert
    const slices = svg.append("g")
        .attr("transform", "translate(250,250)")
        .selectAll(".arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc");

    // Remplir chaque tranche avec une couleur et une forme
    slices.append("path")
        .attr("d", arc)
        .attr("fill", d => color(d.data.key))
        .attr("stroke", "white")
        .attr("stroke-width", "2px");

    // Ajouter des étiquettes de texte pour chaque tranche
    slices.append("text")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(d => d.data.key);
}
