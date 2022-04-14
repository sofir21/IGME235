window.onload = (e) => 
{
    displayInfo();
    
        
}

let id = localStorage.getItem('pokemon');
console.log("id passed is :" + id);
const POKE_URL = "https://pokeapi.co/api/v2/pokemon/";
let displayTerm = "";
url = POKE_URL + id + "/";


function displayInfo()
{
    getData(url);  
}

function getData(url){

    let xhr = new XMLHttpRequest();


    xhr.onload = dataLoaded;


    xhr.onerror = dataError;


    xhr.open("GET", url);
    xhr.send();
}

function dataLoaded(e){

    let xhr = e.target;
    //console.log(xhr.responseText);
    let obj = JSON.parse(xhr.responseText);
    console.log(obj);

   
    let bigString = "";
    //gets sprite     
    let smallURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/`+obj.id+`.png`;
        
    let movesArr =[];   
    let baseStats = [];
    
    
    
    //gets types into array
    for(i=0; i < obj.types.length; i++)
    {
        movesArr.push((obj.types[i].type.name));
        if(i != obj.types.length - 1){movesArr.push(", ");}
        
    }
    let finalMovesArr = movesArr.join("");

    //gets stats into array
    for(i=0; i < obj.stats.length; i++)
    {
        baseStats.push((obj.stats[i].stat.name));
        baseStats.push(": ");
        baseStats.push((obj.stats[i].base_stat));
        baseStats.push("<br>");
        
    }
    let baseStatsFinal = baseStats.join("");

    // let nameUpper = obj.name.atChar(0).toUpperCase()
    
    //displays name at top
    document.querySelector("#displayName").innerHTML += `<p> Your pokemon is:  <b>`+ (obj.name).toUpperCase()+`!</b></p>`;

    //displays image
    document.querySelector("#pokeImage").innerHTML += `<img src='${smallURL}' id= 'pokeIMG' title= '${obj.name}'/ width = 400px height = 400px>`;

    //adds all the stuff to a div for description
    let line = `<div class = 'pokemonStats'><p> <b>ID:</b> `+ obj.id + `</p>`;
    line += "<br><p> <b>Name:</b> " + obj.name + "</p>";
    line += "<br><p> <b>Height:</b> " + obj.height + "</p>";
    line += "<br><p> <b>Weight:</b> " + obj.weight + "</p>";
    line += "<br><p> <b>Types:</b>  ";
    line += finalMovesArr+"</p>";
    line += "<br><p> <b>Base Stats: </b>  ";
    line += "<br>" + baseStatsFinal+"</p></div>";

    //line+= `<button type='button' onclick='returnToMain()' id='mainPage' class='green'>Return to main page.</button></div>`;
   
    bigString += line;
    console.log(`#info`+obj.id+``);
    
    


    

    document.querySelector("#pokeDescription").innerHTML += bigString;
    document.querySelector("#addButton").innerHTML += `<button type='button' onclick='returnToMain()' id='mainPage' class='green'>Return to main page.</button>`;


}

function returnToMain()
{
    console.log("return to main clicked");
    window.location.href="index.html";
    
}

//if error happens
function dataError(e){
    console.log("An Error Occurred");
}

function addToPage(divID, info)
{
    document.querySelector(divID).innerHTML += info;
}