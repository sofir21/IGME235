

 //on load gets pokemon on front page


 window.onload = (e) => 
 {
    document.querySelector(".prevNextButtons").innerHTML = `<button type='button' id='prev' class='green'>Previous</button>
    <button type='button' id='next' class='green'>Next</button>`
     document.querySelector("#search").onclick = searchButtonClicked;
     document.querySelector("#next").onclick = nextButtonClicked;
     document.querySelector("#prev").onclick = prevButtonClicked;
     document.querySelector("#limit").onchange = limitChange;   
     //gets offset if theres a preexisting one
    if(localStorage.getItem('offset')){
        offset = parseInt(localStorage.getItem('offset'));
    }
    else 
    {
        offset = 0;
    }
    //gets limit if theres a preexisting one
    if(localStorage.getItem('limit')){
        limit = parseInt(localStorage.getItem('limit'));
    }
    else 
    {
        limit = 5;
    }
    loadPokemon();
 }
 
 
 
 
  
  
  
  // variables i need
  const POKE_URL = "https://pokeapi.co/api/v2/pokemon/";
  const TYPE_URL = "https://pokeapi.co/api/v2/type/";
  let displayTerm = "";
  let id = "";
  let number = 1;
  let offset;
  let limit;
  
  
  

 
 
  //loads pokemon
 function loadPokemon()
 {
     console.log("loaded poke grid start");
     
     let tempURL = POKE_URL + "?offset=" + offset + "&limit=" + limit;
     console.log(tempURL);
 
     getData(tempURL);
 
 
      document.querySelector("#displaying").innerHTML = "Displaying results : " + (offset + 1) + " - " + (offset + parseInt(limit));
 
 }
 
 //checks for search limit
 function reloadPage()
 {
     console.log(limit);
     document.querySelector(".pokemonGrid").innerHTML = "";
     loadPokemon();
 }

 //back button in case search doesnt produce results or theres an error
function backButton(){
    document.querySelector(".prevNextButtons").innerHTML = `<button type='button' id='prev' class='green'>Previous</button>
      <button type='button' id='next' class='green'>Next</button>`;
    document.querySelector("#next").onclick = nextButtonClicked;
    document.querySelector("#prev").onclick = prevButtonClicked;
    loadPokemon();

}



  //handles change in limit search
 function limitChange(){
    let limitObject = document.querySelector("#limit");
    let limitIndex = parseInt(limitObject.options[limitObject.selectedIndex].value);
    localStorage.setItem('limit',limitIndex);
    limit = limitObject.value;
    reloadPage();
 }
 
  //changes offset by limit if next button is clicked
 function nextButtonClicked()
 {
     offset += parseInt(limit);
     localStorage.setItem('offset', offset);
     document.querySelector(".pokemonGrid").innerHTML = "";
     loadPokemon();
 
   
     document.querySelector("#displaying").innerHTML = "Displaying results : " + (offset + 1) + " - " + (parseInt(offset)+parseInt(limit));
 
 }
 
 //changes offset by limit if previous button is clicked
 function prevButtonClicked()
 {
     if((offset - parseInt(limit))> 0)
     {
         offset -= parseInt(limit);
         localStorage.setItem('offset', offset);
         document.querySelector(".pokemonGrid").innerHTML = "";
         loadPokemon();
         document.querySelector("#displaying").innerHTML = "Displaying results : " + (offset + 1) + " - " + (parseInt(offset)+parseInt(limit));
     }  
    else if(offset == 0)
    {
        return;
    }
     else
     { 
         offset = 0;
         document.querySelector(".pokemonGrid").innerHTML = "";
         loadPokemon();
         document.querySelector("#displaying").innerHTML = "Displaying results : " + (offset + 1) + " - " + (parseInt(offset)+parseInt(limit));
    }

 }
 
 
 //searches pokemon by name or id
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
 
 
 //if data loaded shows it on page if default search
  
 function dataLoaded(e){
 
      let xhr = e.target;
      let obj = JSON.parse(xhr.responseText);
    //   console.log(obj);
     
      getSpecificPokemon(obj);
     
 }
 
 //gets specific pokemon from results
 function getSpecificPokemon(obj)
 {
     
 
     for(let i = 0; i < obj.results.length; i++){
         getData2(obj.results[i].url);
     }
     console.log("asdgfaf");
 }
 
 
  //i couldnt figure out a way to do this for the life of me
  //the same, but more specific!
 function getData2(url)
 {
     let xhr = new XMLHttpRequest();
     xhr.onload = dataLoaded2;
     xhr.onerror = dataError;
     xhr.open("GET", url);
     xhr.send();
 }
 
  //processes data and adds it to page for specific pokemon
 function dataLoaded2(e)
 {
     let xhr = e.target;
     console.log(xhr.status);

    if(xhr.status == 404)
    {
        dataError();
        return;
    }

     let obj = JSON.parse(xhr.responseText);
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
 
 function newDiv(obj)
 {
     //starts div
     let divCreated = `<div class = 'result'>`
     //displays id
     + `<p id='pokeid`+obj.id+`'> ID: ` + obj.id + `</p>` 
     //displays name
     + "<br><p> Name: " + obj.name + "</p>"
     //creates image of pokemon
     +`<img src='`+ searchImage(obj) + `' title= '${obj.name}'/ width = 200px height = 200px>`
     //creates button for more info
     +`<button type='button' onclick='newPage(${obj.id})' class= 'cardButton' id='info`+obj.id+` class='green'>Click For More Info!</button></div>`;
 
     console.log(`#info`+obj.id+``);
 
     //returns div
     return divCreated;
 
 }
 
 // helper function: adds to pokemon grid
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
 
 //if error happens
  function dataError(e){
      console.log("An Error Occurred");
      document.querySelector("#displaying").innerHTML = "Oopsie Woopsie there's been an error :-(";
      document.querySelector("#displaying").innerHTML += `<p><br></p> <button type='button' onclick='backButton()'  class='green'>Go back</button>`;
      document.querySelector(".prevNextButtons").innerHTML = "";
  }
 
 