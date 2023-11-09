

function test(){
    d3.json("data.json").then(function(data){
        console.log(data.category)
    })
}



document.getElementById("btn_decenie").addEventListener("click",test);

document.getElementById("btn_categorie").addEventListener("click",function categorie(e){
    console.log('test categorie')
});

