const gridSize = document.getElementById("gridSlider");
const sliderText = document.getElementById("grid-size-counter");
const penInput = document.getElementById("color-picker-pen");
const bgInput = document.getElementById("color-picker-bg");
const boardButtons = document.getElementsByClassName("board-coloring")

let currentColor = "red";
let penColor = "black";
let bgColor = "white";

let random = false;
let eraser = false;
let eyeDropper = false;
let ice = false;
let fire = false;

gridSize.addEventListener('input', updateGrid);

genBoard(gridSize.value);
updateGridText();

//Document event listeners

document.addEventListener('click', function(event) {
    const target = event.target.closest("button");
    if(!target.classList.contains("clear")) {
        if(target.classList.contains("active")) {
            target.classList.remove("active");
        } else {
            if(target.classList.contains("board-coloring")) {
                for(let i = 0; i < boardButtons.length; i++) {
                    boardButtons[i].classList.remove("active");
                }
            }
            target.classList.add("active");    
        }
    }
})

document.addEventListener('mouseover', function(event) {
    if(!eyeDropper) {
        const target = event.target.closest(".gridSquare");
        if(random) {
            rotateColor();
        } else if(eraser) {
            currentColor = "white";
        } else if(ice) {
            iceColor();
        } else if(fire) {
            fireColor();
        }else {
            currentColor = penColor;
        }
        target.style.backgroundColor = currentColor;
    }
});

document.addEventListener('click', function(event) {
    if(eyeDropper) {
        const target = event.target.closest(".gridSquare");
        penColor = target.style.backgroundColor;
        penInput.parentNode.style.backgroundColor = penColor;
    }
});

penInput.addEventListener('change', function() {
    penColor = penInput.value;
    penInput.parentNode.style.backgroundColor = penInput.value;
});

bgInput.addEventListener('change', function() {
    bgColor = bgInput.value;
    bgInput.parentNode.style.backgroundColor = bgInput.value;
});

//Grid functions

function updateGrid() {
    let newSize = gridSize.value;
    let gridSquares = document.getElementsByClassName("gridSquare");
    while(gridSquares.length > 0) {
        gridSquares[0].parentNode.removeChild(gridSquares[0]);
    }

    let gridRows = document.getElementsByClassName("gridRow");
    while(gridRows.length > 0) {
        gridRows[0].parentNode.removeChild(gridRows[0]);
    }

    updateGridText();

    genBoard(gridSize.value);
}

function updateGridText() {
    let newText = "Grid Size: " + gridSize.value + "x" + gridSize.value;
    sliderText.textContent = newText;
}

function genBoard(numRows) {
    const game_board = document.querySelector('.game-board');
    for(let i = 0; i < numRows; i++) {
        let curRow = document.createElement('div');
        curRow.className = "gridRow";

        for(let j = 0; j < numRows; j++) {
            let rowCell = document.createElement('div');
            rowCell.className = "gridSquare";
            curRow.appendChild(rowCell);
        }
        game_board.appendChild(curRow)
    }
};

function clearBoard() {
    let gridSquares = document.getElementsByClassName("gridSquare");
    for(let i = 0; i < gridSquares.length; i++) {
        gridSquares[i].style.backgroundColor = bgColor;
    }
};

function clearGridLines() {
    let gridSquares = document.getElementsByClassName("gridSquare");

    for(let i = 0; i < gridSquares.length; i++) {
        if(gridSquares[i].style.border == "none") {
            gridSquares[i].style.border = "1px solid black";
        } else {
            gridSquares[i].style.border = "none";
        }       
    }    
}

//Color functions

function rotateColor() {
    let r = Math.random()*255;
    let g = Math.random()*255;
    let b = Math.random()*255;
    currentColor = "rgb(" + r +"," + g +"," + b + ")";
}

function iceColor() {
    let r = 0;
    let g = Math.random()*255;
    let b = 255;
    currentColor = "rgb(" + r +"," + g +"," + b + ")";    
}

function fireColor() {
    let r = 255;
    let g = Math.random()*255;
    let b = 0;
    currentColor = "rgb(" + r +"," + g +"," + b + ")"; 
}

//Toggle functions

function randomToggle() {
    eraser = false;
    ice = false;
    fire = false;
    random = !random;
}

function eraserToggle() {
    random = false;
    ice = false;
    fire = false;    
    eraser = !eraser;
}

function eyeDrop() {
    eyeDropper = !eyeDropper;
}

function iceToggle() {
    random = false;
    eraser = false;
    fire = false;     
    ice = !ice;
}

function fireToggle() {
    random = false;
    ice = false;
    eraser = false;     
    fire = !fire;
}

