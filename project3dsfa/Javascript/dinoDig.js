
 window.onload = (e) => 
 {
    
     document.querySelector("#returnPage").onclick = returnMain; //return button
 }

 //returns to main page
function returnMain()
{
    window.location.href="index.html"; 
}
//gives full random number from 0 to max
function getRandomInt(max)
{
    return Math.floor(Math.random() * max);
}

//IMPORT OTHER JS FILES
import gameManager from "./modules/gameManager.js";
import {Block, Bone} from "./modules/square.js";

const boneDigger = (function() {

    //might make these adjustable??? not sure yet, depends on the time i have after workign on the levels
    const collumns = 8;
    const rows = 8;
    const minBone = 3; //MINIMUM amounts of bones
    const boneCount = (getRandomInt(3) + minBone); //gets rando bomb number ayo

    let visibleBlockCount = 0; //how many blocks are visible

    const grid = [];
    const blockElements = []; 

    const wrapper = document.querySelector("#dinoDig");
    const gridElement = wrapper.getElementsByClassName("grid")[0] //couldnt get queryselector to work here

    // add proper grid dimension to CSS/grid's style
    gridElement.style.gridTemplateColumns = "1fr ".repeat(collumns);

    // plants bones in random positions on grid
    const boneIndexes = gameManager.randomIntegers(boneCount, 0, collumns*rows - 1);
    boneIndexes.forEach(boneIndex => {
        grid[boneIndex] = new Bone(); //creates bone at index
    });





    // mark surrounding squares with bone count
    boneIndexes.forEach(boneIndex => {
        const neighbours = gameManager.neighbours(boneIndex, collumns, rows);

        neighbours.forEach(neighbour => {
            // fill square with block if it is empty
            if(typeof grid[neighbour] === "undefined") {
                grid[neighbour] = new Block();
            }

            if(!grid[neighbour].isBone) {
                grid[neighbour].increaseValue();
            }
        })
    });

    
    for (let i = 0; i < (collumns*rows); i++) {
        if(typeof grid[i] === "undefined") {
            grid[i] = new Block();
        }
        //creates block div and adds it in
        const blockElement = document.createElement("div");
        blockElement.classList.add("block");

        //if theres no bones in the vicinity, then dont display a number
        if(grid[i].value == 0)
        {
            blockElement.innerHTML = `<div class="center"> </div>`;
        }
        //if theres bone in vicinity it displays a number!
        else{
            blockElement.innerHTML = `<div class="center">${grid[i].value}</div>`;
        }
        
        //event listener for clicking on blocks
        blockElement.addEventListener("click", function(evt) {
            grid[i].show();
            visibleBlockCount++;

                //IF CLICKED BONE
                if(grid[i].isBone) {
                //reveals all tiles 
                    for(let i = 0; i < (collumns*rows); i++)
                    {
                        grid[i].show();
                    }
                //alert for losing
                        alert("You lost :(");

                }
                //IF NO BONE IS CLICKED AND THERES NONE NEARBY
                else if(grid[i].value === 0) {
                    noBoneShow(i); //shows all blocks whos value is 0
                }
                
                //IF USER WINS
                if(check() == true)
                {
                    for(let i = 0; i < (collumns*rows); i++)
                    {
                        grid[i].show();
                    }
                    alert("Congrats! You cleared the stage!");
                }


        });

        gridElement.appendChild(blockElement);
        grid[i].element = blockElement;
    }


    //shows all blocks that have no bones nearby
    function noBoneShow(i) {
        const neighbours = gameManager.neighbours(i, collumns, rows);

        neighbours.forEach(neighbour => {
            // show block if it is not a bone and is not visible
            if(grid[neighbour].isBone === false && grid[neighbour].isVisible === false) {
                grid[neighbour].show();
                visibleBlockCount++;

                // call recursively only for non-surrounding blocks / value=0
                if(grid[neighbour].value === 0) {
                    noBoneShow(neighbour);
                }
            }
        });
    }

    //checks if all blocks that are not bones have been clicked, 
    function check() {
        if(visibleBlockCount + boneCount === collumns * rows) {
            // all blocks are visible and all bone blocks are hidden
            console.log("true");
            return true;
            
        }
        console.log("false");
    }


    
})();