
/*---------------------------- Variables (state) ----------------------------*/
let firstOperand = null;
let operator = null
let resetDisplay;


/*------------------------ Cached Element References ------------------------*/
const numberButtons = document.querySelectorAll('.button.number');
const operatorButtons = document.querySelectorAll(".button.operator")
const display = document.querySelector(".display");
const clearContent = document.querySelector(".operator:nth-child(1)")
const equalsButton = document.querySelector(".equals")

/*-------------------------------- Functions --------------------------------*/
function init() {
    display.textContent = "0"
}

function updateDisplay(event) {
    const clickedNumber = event.target.textContent;

    if (resetDisplay) {
        display.textContent = clickedNumber;
        resetDisplay = false;
    } else {
        if (display.textContent === "0") {
            display.textContent = clickedNumber;
        } else {
            display.textContent += clickedNumber;
        }


    }

}

function handleOperator(event) {
    const clickedOperator = event.target.textContent;

    if (firstOperand === null) {
        firstOperand = Number(display.textContent)
    } else if (operator) {
        firstOperand = calculateResult(firstOperand, Number(display.textContent), operator)
        display.textContent = firstOperand;
    }

operator = clickedOperator;
resetDisplay = true;
}

function calculateResult(a, b, op) {
switch(op) {
    case "+":
        return a + b;
    case "-":
        return a - b;
    case "*":
        return a * b;
    case "/":
        return b !== 0 ? a / b : "undefined";
    default:
        return b;
}
}

function handleEquals() {
    if (firstOperand != null && operator){
        const result = calculateResult(firstOperand, Number(display.textContent), operator)
        display.textContent = result;
        firstOperand = null;
        operator = null;
        resetDisplay = true;
    }
}

function clearInput() {
    display.textContent = "0";
    firstOperand = null;
    operator = null;
    resetDisplay = false;
}





/*----------------------------- Event Listeners -----------------------------*/
numberButtons.forEach((button) => {
    button.addEventListener('click', updateDisplay);
});



operatorButtons.forEach ((button) => {
    if (button.textContent === "C") {
        button.addEventListener("click", clearInput)
    } else {
        button.addEventListener("click", handleOperator)
    }
});

equalsButton.addEventListener('click', handleEquals)


init()
