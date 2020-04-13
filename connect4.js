/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  //create HEIGHT# of arrays with length of WIDTH (push HEIGHT times)
  let row = Array.from({ length: WIDTH });
  for (let i = 0; i < HEIGHT; i++) {
    board.push(row);
  }
  return board;
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector("#board");
  // TODO: add comment for this code
  const top = document.createElement("tr"); //creates a table row element
  top.setAttribute("id", "column-top"); // sets the ID of created row as column-top
  top.addEventListener("click", handleClick); //adds event listener to created row

  for (let x = 0; x < WIDTH; x++) {
    //
    const headCell = document.createElement("td"); //create a cell for the row, this will fill out the width
    headCell.setAttribute("id", x); // the id will be nums 0-WIDTH (6)
    top.append(headCell); //attach the cell
  }
  htmlBoard.append(top); //attaches the column-top row to the board

  //make rest of the board
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr"); //create table rows for the height
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td"); //create a cell for the width
      cell.setAttribute("id", `${y}-${x}`); // the id will be "y-x" (Height index - width index)
      row.append(cell); //cell is appended to created row
    }
    htmlBoard.append(row); //row is appended to htmlBoard
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  for (let i = HEIGHT - 1; i >= 0; i--) {
    console.log("for loop", i);
    if (!board[i][x]) {
      console.log("if", i, x);
      return i;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

// function placeInTable(y, x) {
//   const marker = document.createElement("div");
//   marker.classList.add("piece"); // may want to remove p1..
//   piece.classList.add(`p${currPlayer}`);
//   const position = document.getElementById(`${y}-${x}`);
//   position.append(marker);
// }
/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  const piece = document.createElement("div");
  piece.classList.add("piece");
  piece.classList.add(`p${currPlayer}`);
  // piece.style.top = -50 * (y + 2);

  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  alert(`${msg}`);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  console.log("y", y);
  if (y === null) {
    return;
  }

  board[y][x] = currPlayer;
  // place piece in board and add to HTML table
  placeInTable(y, x);
  // board[y][x] = currPlayer;

  // check for win
  // if (checkForWin()) {
  //   return endGame(`Player ${currPlayer} won!`);
  // }

  // if (
  //   board
  //     .join()
  //     .split(",")
  //     .every((val) => val == 1 || val == 2)
  // ) {
  //   return endGame("It's a tie!");
  // }

  // switch players:
  currPlayer === 1 ? (currPlayer = 2) : (currPlayer = 1);
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // creates array of 4 cells to check in each direction for every y and x value
    //then runs those values to see if those are all the same as currPlayer.

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      const vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      const diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      const diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
