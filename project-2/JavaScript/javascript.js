

 //on load gets pokemon on front page


window.onload = (e) => 
{
    loadPokemon();
    document.querySelector("#search").onclick = searchButtonClicked;
    document.querySelector("#next").onclick = nextButtonClicked;
    document.querySelector("#prev").onclick = prevButtonClicked;   
        
}




 
 
 
 // variables i need
 const POKE_URL = "https://pokeapi.co/api/v2/pokemon/";
 const TYPE_URL = "https://pokeapi.co/api/v2/type/";
 let displayTerm = "";
 let id = "";
 let number = 1;
 let offset = 0;



 //let pokeNumsArray = [];
 //let result;
 //preset types given by ap
//  let pokeTypeOptionsArray = ["0", "1" , "2" , "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14",
// "15", "16", "17", "18", "10001", "10002"];


 //loads pokemon
function loadPokemon()
{
    console.log("loaded poke grid start");
    
    //sets up button to adjust search to limit if its changed
    document.querySelector("#adjustSearch").innerHTML = `<button type='button' onclick='maxResultsChange()' id='mainPage' class='green'>Refresh</button>`

    //loads pokemon onto page
    let limit = document.querySelector("#limit").value;
    let tempURL = POKE_URL + "?offset=" + offset + "&limit=" + limit;
    console.log(tempURL);

    getData(tempURL);


     document.querySelector("#displaying").innerHTML = "Displaying results : " + number + " - " + limit;

}

//checks for search limit
function maxResultsChange()
{
    let newlimit = document.querySelector("#limit").value;
    console.log(limit);
    document.querySelector(".pokemonGrid").innerHTML = "";
    loadPokemon();
}


//gets next amount of pokemon according to index
function nextButtonClicked()
{
    let limit = document.querySelector("#limit").value;
    
    offset += parseInt(limit);
    document.querySelector(".pokemonGrid").innerHTML = "";
    loadPokemon();

    // console.log(" NEXT BUTTON PRESSED");
    // document.querySelector(".pokemonGrid").innerHTML = "";
    // number +=8;
    //  pokeNumsArray = [];
    
    // for(i = 0; i < 8; i++)
    //    {
    //     pokeNumsArray.push(number + i);
    //    }

    //    pokeNumsArray.forEach(element => {
    //     let tempUrl = POKE_URL + element + "/";
    //     getData(tempUrl);
    //     tempUrl = "";
    // });
    document.querySelector("#displaying").innerHTML = "Displaying results : " + (offset + 1) + " - " + (parseInt(offset)+parseInt(limit));

}

//gets previous pokemon displayed
function prevButtonClicked()
{
    let limit = document.querySelector("#limit").value;
    if(offset > 0)
    {
        offset -= parseInt(limit);
        document.querySelector(".pokemonGrid").innerHTML = "";
        loadPokemon();
        document.querySelector("#displaying").innerHTML = "Displaying results : " + (offset + 1) + " - " + (parseInt(offset)+parseInt(limit));
    }  
}


//searches for a specific pokemon
 function searchButtonClicked(){
     console.log("searchButtonClicked() called");
     document.querySelector(".pokemonGrid").innerHTML = "";

    //pokemon api url
     let url = POKE_URL;


     //gets term
     let term = document.querySelector("#searchterm").value;
     displayTerm = term;
     term = term.trim();
     term = encodeURIComponent(term);
     id = term;

    //doesnt work if theres nothing in there
     if(term.length < 1)return;

     //adds id to url so its knows what to search for
     url += term + "/";


     //console.log(url);

    //uses get data based on id
    document.querySelector("#displaying").innerHTML = "Search results for : " + term;
    
     getData2(url);  
     
     

 }


//gets data from limit search
 function getData(url){

     let xhr = new XMLHttpRequest();
     xhr.onload = dataLoaded;
     xhr.onerror = dataError;
     xhr.open("GET", url);
     xhr.send();
 }



 //loads file with pokemon amount according to index
function dataLoaded(e){

     let xhr = e.target;
     let obj = JSON.parse(xhr.responseText);
     console.log(obj);
    
     getSpecificPokemon(obj);
    
}

//gets specific pokemon from results of dataLoaded
function getSpecificPokemon(obj)
{
    
    //console.log("Results!!!!!!");

    for(let i = 0; i < obj.results.length; i++){
        getData2(obj.results[i].url);
    }
}


 //i couldnt figure out a way to do this in a less scuffed way for the life of me
 //the same as get data, but for one specific pokemon!
function getData2(url)
{
    let xhr = new XMLHttpRequest();
    xhr.onload = dataLoaded2;
    xhr.onerror = dataError;
    xhr.open("GET", url);
    xhr.send();
}

 //processes getData2 from single pokemon and displays it
function dataLoaded2(e)
{
    let xhr = e.target;
    //console.log(xhr.responseText);
    let obj = JSON.parse(xhr.responseText);
    console.log(obj);
   
    addToGrid(newDiv(obj));  
}


//loads new page when clicking for more info
function newPage(idPassed)
{
    console.log("more info clicked");
    console.log(idPassed);
    localStorage.setItem('pokemon', idPassed);
    window.location.href="pokemon.html";
    
}

//helper function: creates new div with all pokemon information
function newDiv(obj)
{
    //starts div
    let divCreated = `<div class = 'result'>`
    //displays id
    +`<p> ID:</p> <p id='pokeid`+obj.id+`'>` + obj.id + `</p>` 
    //displays name
    + "<br><br><p> Name: " + obj.name + "</p>"
    //creates image of pokemon
    +`<img src='`+ searchImage(obj) + `' title= '${obj.name}'/ width = 200px height = 200px>`
    //creates button for more info
    +`<button type='button' onclick='newPage(${obj.id})' id='info`+obj.id+` class='green'>Click For More Info!</button></div>`;

    console.log(`#info`+obj.id+``);

    //returns div
    return divCreated;

}

// helper function: adds pokemon card to selected div
function addToGrid(pokemonInfo)
{
    document.querySelector(".pokemonGrid").innerHTML += pokemonInfo;
}

//helper function: returns image based on id
function searchImage(obj)
{
    let imageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/`+obj.id+`.png`;
    
    return imageURL;
}

//if error happens L moment
 function dataError(e){
     console.log("An Error Occurred");
     document.querySelector("#displaying").innerHTML = "Oopsie Woopsie there's been an error :-(";
 }


 // ::::::::::::::::::: code removed for now :::::::::::::::::::::

//THIS GOES INSIDE LOADPOKEMON()
//sets up button for search by type
    // document.querySelector("#searchTypeButton").innerHTML += `<button type='button' onclick='searchByType()' id='mainPage' class='green'>Search By Type.</button>`
    
    // pokeNumsArray = []
    // for(i = 0; i < 8; i++)
    //    {
    //     pokeNumsArray.push(number + i);
    //    }

    //    //from to numbers chosen
    //    pokeNumsArray.forEach(element => 
    //     {
    //         let tempUrl = POKE_URL + element + "/";
    //         getData(tempUrl);
    //         tempUrl = "";
        
    //     });





 // function searchByType()
// {
   
//     let searchTypeCheck;
//     let limit = document.querySelector("#type").value;
//     console.log(limit);

//     //if type is 'all'
//     if(limit == 0){
//         searchType = "default";
//         return;
//     };


//     searchType = "byType";

     
    

    
//     //saves what its searching by, type or default
//     localStorage.setItem('searchType', searchTypeCheck);
//     window.location.reload();


//     // let typeSearchURl = TYPE_URL + limit + "/";
//     // getData(typeSearchURl);


// }


 //if data loaded shows it on page if type search
//  function dataLoadedType(e)
//  {
//     //manages when searching by type
//     let xhr = e.target;
//     //console.log(xhr.responseText);
//     let obj = JSON.parse(xhr.responseText);
//     console.log(obj);
//     let bigString = "";
//     let pokeByTypeArray =[];
    
//     //gets types into array
//     //saves urls of pokemon
//     for(i=0; i < obj.pokemon.length; i++)
//     {
//         pokeByTypeArray.push((obj.pokemon[i].pokemon.url));
           
//     }
    
//     // let pokeNumsArray = [];
    
//     // for(i = 0; i < 8; i++)
//     //    {
//     //     pokeNumsArray.push(number + i);
//     //    }

//     //    pokeNumsArray.forEach(element => {
//     //     let tempUrl = pokeNumsArray;
//     //     getData(tempUrl);
//     //     tempUrl = "";
//     // });
    
//     //gets sprite     
//     let smallURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/`+obj.id+`.png`;
         
        

//     //makes div for pokemon
//     let line = `<div class = 'result'><p> ID:</p> <p id='pokeid`+obj.id+`'>` + obj.id + `</p>`;
//     line += "<br><br><p> Name: " + obj.name + "</p>";
//     line+= `<img src='${smallURL}' title= '${obj.name}'/ width = 200px height = 200px>`;
//     line+= `<button type='button' onclick='newPage(${obj.id})' id='info`+obj.id+` class='green'>Click For More Info!</button></div>`;
    
//     bigString += line;
//     console.log(`#info`+obj.id+``);

        
    

//     addToGrid(bigString);
    
//  }