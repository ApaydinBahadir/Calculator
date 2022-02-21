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
let floatChecker = 0;

clearButton.addEventListener('click', deleteAll);

deleteButton.addEventListener('click', deleteOne);

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
    floatChecker = 1;
}

function errorControl(){
    if(display.textContent.length>20){
        display.textContent = "error";
    }
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
    errorControl();
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

function deleteAll(){
    resetScreen = 0;
    currentValue = 0;
    firstOperand = "";
    secondOperand = "";
    currentOperator = null;
    floatChecker = 0;
    display.textContent = 0;
}

function deleteOne(){
    currentValue = currentValue.slice(0, currentValue.length - 1);
    display.textContent = display.textContent.slice(0, display.textContent.length - 1);
    if(display.textContent === ''){
        display.textContent = "0";
    }
}

function evaluate(){
    if(currentOperator == null){
        return;
    }
    if(currentOperator === '/' && display.textContent == '0'){
        alert("cannot divide 0");
    }
    secondOperand = display.textContent;
    if(floatChecker){
        display.textContent = operate(currentOperator,firstOperand,secondOperand).toFixed(2);
    }
    else{
        display.textContent = operate(currentOperator,firstOperand,secondOperand);
    }
    errorControl();
    currentOperator = null;
}

function operate(operator, a, b) {
    if(floatChecker){
        a = parseFloat(a);
        b = parseFloat(b);
    }
    else{
        a = parseInt(a);
        b = parseInt(b);
    }
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

document.addEventListener('keydown', function (event) {
    event.preventDefault();
    if (event.key > 0  || event.key < 9) appendNumber(event.key);
    if (event.key == '+' || event.key == '/' || event.key == '*' || event.key == '-') setOperator(event.key);
    if (event.key = event.return) appendNumber(event.key);
    if (event.key === "Backspace") deleteOne();
    if (event.key === "Delete") deleteAll();
    if (event.key === ".") addPoint();
    if (event.key === "=" || event.key === "Enter") evaluate();
  });