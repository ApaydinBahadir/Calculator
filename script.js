const numberButtons = document.querySelectorAll(".numberButtons");
const operatorButtons = document.querySelectorAll(".operandNumbers");
const pointButton = document.querySelector(".pointButton");
const equalButton = document.querySelector(".equalButton");
const display = document.getElementById("display");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");

let resetScreen = 0;
let currentValue = display.textContent;
let firstOperand = "";
let secondOperand = "";
let currentOperator = null;

clearButton.addEventListener('click', () => {
    resetScreen = 0;
    currentValue = 0;
    firstOperand = "";
    secondOperand = "";
    currentOperator = null;
    display.textContent = 0;
});

deleteButton.addEventListener('click', () =>{
    currentValue = currentValue.slice(0, currentValue.length - 1);
    display.textContent = display.textContent.slice(0, display.textContent.length - 1);
});

numberButtons.forEach((button) =>{
  button.addEventListener('click', () => appendNumber(button.textContent));
});

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => setOperator(button.textContent));
});

equalButton.addEventListener('click', evaluate);

pointButton.addEventListener('click', addPoint);

function addPoint(){
    display.textContent += ".";
    currentValue = display.textContent;
}

function appendNumber(number){
    if(display.textContent == 0 || resetScreen){
        currentValue = number;
        display.textContent = currentValue;
        resetScreen = 0;
        return;
    }
    currentValue += number;
    display.textContent = currentValue;
    resetScreen = 0;
}

function setOperator(operator){
    currentValue = display.textContent;
    if(firstOperand != null){
        evaluate();
    }
    firstOperand = display.textContent;
    currentOperator = operator;
    resetScreen = 1;
}

function evaluate(){
    if(currentOperator == null){
        return;
    }
    if(currentOperator === '/' && display.textContent == '0'){
        alert("cannot divide 0");
    }
    secondOperand = display.textContent;
    display.textContent = operate(currentOperator,firstOperand,secondOperand).toFixed(2);
    currentOperator = null;
}

function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
      case '+':
        return (a+b);
      case '-':
        return (a-b);
      case 'x':
        return (a*b);
      case '%':
        if (b === 0) return null;
        else return (a/b);
      default:
        return null;
    }
}