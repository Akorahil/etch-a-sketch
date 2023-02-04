const gridSize = document.getElementById("gridSlider");
const sliderText = document.getElementById("grid-size-counter");

gridSize.addEventListener('input', updateGrid);

genBoard(gridSize.value);
updateGridText();

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
        gridSquares[i].style.backgroundColor = "white";
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


