let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
];
const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.classList.add("o"); // add O class
            turnO = false;
        } else {
            box.innerText = "X";
            box.classList.add("x"); // add X class
            turnO = true;
        }
        box.disabled = true;

        count++;
        checkWinner();
    });
});



const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}


const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("x");
        box.classList.remove("o");
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const showDraw = () => {
    msg.innerText = "🤝 It's a Draw!";
    msgContainer.classList.remove("hide");
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let ps1Val = boxes[pattern[0]].innerText;
        let ps2Val = boxes[pattern[1]].innerText;
        let ps3Val = boxes[pattern[2]].innerText;


        if (ps1Val != "" && ps2Val != "" && ps3Val != "") {
            if (ps1Val === ps2Val && ps2Val === ps3Val) {
                showWinner(ps1Val);
            }
        }
    }
    if (count === 9) {
        showDraw();
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);