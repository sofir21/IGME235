

//this is going to switch between the two gamemodes, aka the preset levels and the random version

 window.onload = (e) => 
 {
    
     document.querySelector("#gameModeButton1").onclick = loadGameRandom;
    document.querySelector("#gameModeButton2").onclick = loadGameLevels;
    //gets level from local storage, if none, defaults to 1
    if(localStorage.getItem('level')){
        level = parseInt(localStorage.getItem('level'));
    }
    else 
    {
        level = 1;
    }
     
 }

let level;



function loadGameRandom()
{
    localStorage.setItem('gameState', 1);
    window.location.href="game.html";
}

 function loadGameLevels()
 {
     localStorage.setItem('gameState', 2);
   

      if(level == 1)
      {
        window.location.href="gamelvl.html";
      }
      else if(level == 2)
      {
        window.location.href="gamelvl2.html";
      }
      else
      {
      }
     
 }