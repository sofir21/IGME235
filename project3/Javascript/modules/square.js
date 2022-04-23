class Square {
    constructor() {
        this.isVisible = false;
        this.isBone = false;
        this.element = null;
    }

    show() {
        this.element.classList.add("visible");
        this.isVisible = true;
    }
}

//bones, avoid these blocks
class Bone extends Square {
    constructor() {
        super();

        this.isBone = true;
        this.value = `<img src='./Images/bone.png'/>`;
    }
} 

//just stone block
class Block extends Square {
    constructor() {
        super();

        // count of bones on neighbour squares
        this.value = 0;
    }

    increaseValue() {
        this.value += 1;
    }
}



export {Block, Bone}