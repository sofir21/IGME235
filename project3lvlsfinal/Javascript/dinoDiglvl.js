
 window.onload = (e) =>
 {

     document.querySelector("#returnPage").onclick = returnMain; //return button

     //gets level from local storage, if none, defaults to 0
    // if(localStorage.getItem('level')){
    //     level = parseInt(localStorage.getItem('level'));
    // }
    // else
    // {
    //     level = 1;
    // }

 }


 //holds level num
let level;

 //returns to main page
function returnMain()
{
    window.location.href="index.html";
}


//IMPORT OTHER JS FILES
import gameManager from "./modules/gameManager.js";
import {Block, Bone, FootPrint} from "./modules/square.js";






const boneDigger = (function() {

    //might make these adjustable??? not sure yet, depends on the time i have after workign on the levels
    const collumns = 8;
    const rows = 8;
    // const minBone = 3; //MINIMUM amounts of bones
    const boneCount = 19; //set number bc level

    let visibleBlockCount = 0; //how many blocks are visible


    const grid = [];
    const blockElements = [];

    const wrapper = document.querySelector("#dinoDig");
    const gridElement = wrapper.getElementsByClassName("grid")[0] //couldnt get queryselector to work here

    // add proper grid dimension to CSS/grid's style
    gridElement.style.gridTemplateColumns = "1fr ".repeat(collumns);


    const lvl1grid = [
        [0,0, "footprint", 0, 0, 0, 0, 0],
        [0,0,"bone", 0, 0 , 0, 0, 0],
        ["bone", 0, 0, 0, 0, 1, 2, 0],
        [0, "bone", 0,0, 0, 3,4, "bone"],
        [0,0,0,5,6,7,8],
        [0,0,0,0,9,0,0,0],
        [0,0,0,0,10,0,"footprint",0],
        [0,0,0,"footprint",0,"bone",0,"bone"]

    ];





    //plants bones in bone indexes and creates bone
    let boneIndex;
    const boneIndexes = [];

    for(let i = 0; i < lvl1grid.length; i++)
    {

        for(let j = 0; j < lvl1grid[i].length; j++)
        {
            //inserts normal bones
            if(lvl1grid[i][j] == "bone")
            {
                //boneIndexes.push([i, j]); //puts it in bone indexes
                boneIndex = ((i * 8) + j );
                grid[boneIndex] = new Bone();
                boneIndexes.push(boneIndex);
            }
            //insetrs footprints
            else if(lvl1grid[i][j] == "footprint")
            {
                //boneIndexes.push([i, j]); //puts it in bone indexes
                boneIndex = ((i * 8) + j );
                grid[boneIndex] = new FootPrint();
                boneIndexes.push(boneIndex);
            }
            //inserts level bones
            else if(lvl1grid[i][j] != 0 && lvl1grid[i][j] != "bone" && lvl1grid[i][j] != "footprint" )
            {
                //boneIndexes.push([i, j]); //puts it in bone indexes
                boneIndex = ((i * 8) + j );
                grid[boneIndex] = new Bone();
                grid[boneIndex].value = `<img src='./Images/lvl1/`+ lvl1grid[i][j] +`.png' height= 48px width = 48px/>`;
                boneIndexes.push(boneIndex);
            }

            //inserts blocks if its none of the above

        }
    }

    console.log(boneIndexes);

      // mark surrounding squares with bone count
      boneIndexes.forEach(bIndex => {

        const neighbours = gameManager.neighbours(bIndex, collumns, rows);
        console.log("wtf");
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



    // console.log("printing grid");
    // for (let i = 0; i < (collumns*rows); i++) {
    //     console.log("grid index "+ i);
    //     console.log(grid[i]);
    // }



    //  console.log("printing grid isbone");
    //  for (let i = 0; i < (collumns*rows); i++) {
    //      console.log("grid index "+ i);
    //      console.log(grid[i].isBone);
    //  }


    for (let i = 0; i < (collumns*rows); i++) {
        //if its not bone
        if(typeof grid[i] === "undefined") {
            grid[i] = new Block();
        }
        //creates block div and adds it in
        const blockElement = document.createElement("div");
        blockElement.classList.add("block");

        //if theres no bones in the vicinity, then dont display a number
        if(grid[i].value === 0)
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
                    localStorage.setItem('level', 2);
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