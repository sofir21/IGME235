

//this is going to switch between the two gamemodes, aka the preset levels and the random version

 window.onload = (e) => 
 {
    
     document.querySelector("#gameModeButton1").onclick = loadGameRandom;
    //  document.querySelector("#gameModeButton2").onclick = loadGameLevels;
     
 }





function loadGameRandom()
{
    localStorage.setItem('gameState', 1);
    window.location.href="game.html";
}

// function loadGameLevels()
// {
//     localStorage.setItem('gameState', 2);
//     window.location.href="game.html";
// }