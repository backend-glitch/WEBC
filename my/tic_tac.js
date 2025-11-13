let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO
let count = 0; //To Track Draw , will increase on clicking once.

// all winning pattern
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// to reset the game
const resetGame = () => {
  turnO = true; 
  count = 0;
  enableBoxes(); /// to respong again on clicking.
  msgContainer.classList.add("hide"); // to hide msg winner container.
};

// check for input .
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
     
      box.innerText = "O";

    box.classList.add("blue");
    box.classList.remove("red");

      turnO = false;
    } else {
      //playerX
 
      box.innerText = "X";

        box.classList.add("red");
      box.classList.remove("blue");

      turnO = true;
    }
    // so that button would not work after being click once .
    box.disabled = true;
    count++;

    // to check the winner.
    let isWinner = checkWinner();

    // draw condition.
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});
  // draw syntax
const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// disable syntax
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
// enable syntax
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;// can change box content.
    box.innerText = "";
  }
};

   // to display winner after winning.
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// to syntax condn for winner code
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame); 
resetBtn.addEventListener("click", resetGame);