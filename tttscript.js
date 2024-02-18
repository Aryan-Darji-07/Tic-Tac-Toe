function getQueryParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

let player1Name = getQueryParameter("player1");
let player2Name = getQueryParameter("player2");

if (player1Name.trim() === "") {
  player1Name = "Player 1";
}
if (player2Name.trim() === "") {
  player2Name = "Player 2";
}
if (player1Name.trim() === player2Name.trim()) {
  player1Name = "Player 1";
  player2Name = "Player 2";
}
if (player1Name.trim().length > 10) {
  player1Name = "Player 1";
}
if (player2Name.trim().length > 10) {
  player2Name = "Player 2";
}

const buttons = document.querySelectorAll(".btn"); // Select all buttons with class 'btn'
const textTurn = document.getElementById("turn");
const newgame = document.getElementById("new");

textTurn.innerText = "Turn O " + player1Name;

let turn = true;
const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const reset = () => {
  turn = true;
  enableBtn();
  newgame.innerText = "New Game";
  textTurn.innerText = "Turn O " + player1Name;
};

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (turn) {
      btn.innerText = "O";
      textTurn.innerText = "Turn X " + player2Name;
    } else {
      btn.innerText = "X";
      textTurn.innerText = "Turn O " + player1Name;
    }
    newgame.innerText = "Reset Game";
    turn = !turn;
    btn.disabled = true;
    checkWinner();
  });
});

const disableBtn = () => {
  for (let btn of buttons) {
    btn.disabled = true;
  }
};

const enableBtn = () => {
  for (let btn of buttons) {
    btn.disabled = false;
    btn.innerText = "";
  }
};

const checkWinner = () => {
  // Check for winning combinations
  for (let ptrn of win) {
    let pos1Val = buttons[ptrn[0]].innerText;
    let pos2Val = buttons[ptrn[1]].innerText;
    let pos3Val = buttons[ptrn[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        if (turn) {
          textTurn.innerText = "Winner : " + player2Name;
        } else {
          textTurn.innerText = "Winner : " + player1Name;
        }
        disableBtn();
        newgame.innerText = "New Game";
        return;
      }
    }
  }

  let cellsFilled = 0;
  for (let btn of buttons) {
    if (btn.innerText !== "") {
      cellsFilled++;
    }
  }
  if (cellsFilled === 9) {
    textTurn.innerText = "Tie Game";
    newgame.innerText = "New Game";
  }
};

newgame.addEventListener("click", reset);
