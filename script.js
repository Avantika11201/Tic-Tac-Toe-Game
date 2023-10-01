let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newGameBtn = document.getElementById("newGame");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

//winning pattern Array: 

let winningPattern = [ 
    [0, 1, 2], 
    [0, 3, 6], 
    [2, 5, 8], 
    [6, 7, 8], 
    [3, 4, 5], 
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6]
];

//player 'x' plays first 
let xturn = true;
let count = 0;

//Disable all buttons
const disabledButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    //enable popup
    popupRef.classList.remove("hide");
} 

//enable all buttons for new game and restart

const enableButtons = () => {
    btnRef.forEach(element => {
        element.innerText = "";
        element.disabled = false;
    });
    // disable popup 
    popupRef.classList.add("hide");
};


// New Game
newGameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});



//This Function is executed when a player wins 
const winFunction = (letter) =>{
    disabledButtons();
    if(letter == "X"){
        msgRef.innerHTML= "&#x1F389; <br> 'X' Wins";
    }
    else {
        msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
    }
};

// Function for Draw

const drawFunction = () => {
    disabledButtons();
    msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
}

//Win logic 
const winChecker = () => {
    //Loop through all win patterns 
    for (let i of winningPattern){
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText, 
            btnRef[i[1]].innerText, 
            btnRef[i[2]].innerText
        ];
        // check if elements are filled 
        // 3 empty element are same and would give win as would
        if(element1 != "" && element2 != "" && element3 != ""){
            if(element1 == element2 && element2== element3){
                // if all 3 buttons have same values the pass the value to winfunction
                winFunction(element1);
            }
        }
    }
};

//Display x/0 on click
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if(xturn){
            xturn= false;
            //Display x
            element.innerText = 'X';
            element.disabled = true;
        }
        else{
            xturn = true;
            // display y
            element.innerText = 'O'
            element.disabled = true;
        }
        //Increament count on each click 
        count += 1;
        if(count == 9){
            // It's a Draw since there are a total of 9 boxed
            drawFunction();
        }
        //Check for win on every click 
        winChecker();
    });
});

// ENable Buttons and disable popup on page load
window.onload = enableButtons ;