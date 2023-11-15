function groupByCat(tab){

    let catval = 0;
    let CurrentCat = tab[0]["category"];
    let index = 0;
    let group = [];
    let listN = [];

    console.log("-------------")
    console.log(tab);

    console.log(tab.length);
    console.log("-------------")

    for (let i = 0; i < tab.length; i++) {

        if (tab[i]["category"] == CurrentCat){

            listN[catval] = tab[i];
            catval++;

        } else {

            console.log(CurrentCat);

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


d3.json("../src/data.json").then(function (data) {

    console.log(data);

    let DataByYear = groupByAnn(data);

    console.log(DataByYear);

    let DataDec = groupByDec(DataByYear)

    const fianlData = JSON.stringify(DataDec, null, 4);

    console.log(fianlData);
});

/*

if (tab[i]["category"] == catname) {
      // Même catégorie
      nomine[catvalue] = tab[i];
      annvalue++;
      catvalue++;

      // console.log("cat");

    } else {
      // Changement catégorie
      // console.log(nomine);

      cat[catname] = {category: catname, count: catvalue, listN: nomine};
      countcat++;

      nomine = {};

      catname = tab[i]["category"];
      catvalue = 0;

      nomine[catvalue] = tab[i];
      annvalue++;
      catvalue++;

      // console.log(catname); //Débogage

      let annee = tab[0]["year_ceremony"];
    let annvalue = 0;
    let indexann = 0;
    let countcat = 0;
    let catvalue = 0;
    let catname = tab[0]["category"];
    let nomine = {};
    let cat = {};
    let group = {};

    for (let i = 0; i < tab.length; i++) {
      if (tab[i]["year_ceremony"] == annee) {
        // Même année

        

        }


      // } else if (annee == 0) {

      //   annee = tab[i]["year_ceremony"];
      //   console.log(annee); //Débogage
      //   catname = tab[i]["category"];
      //   catvalue = 0;

      //   nomine[catvalue] = tab[i];
      //   annvalue++;
      //   catvalue++;

      } else {
        // Changement annee
        
        console.log(annee); //Débogage

        cat[catname] = {category: catname, count: catvalue, listN: nomine};
        countcat = 0;
        nomine = {};
        cat = {};

        group[indexann] = {year: annee, count: annvalue, category: cat};
        indexann++;
        annvalue = 0;

        annee = tab[i]["year_ceremony"];
        console.log(annee); //Débogage
        catname = tab[i]["category"];
        catvalue = 0;

        nomine[catvalue] = tab[i];
        annvalue++;
        catvalue++;

        console.log(group);
        console.log("-----------------")

      }
    } */