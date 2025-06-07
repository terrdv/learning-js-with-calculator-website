const display = document.querySelector("#result");
let currentInput = [];
let currentnumber = "";
let operation = null;
const buttons = document.querySelectorAll(".button");
const numbuttons = document.querySelectorAll("button.number");
const clearButton = document.querySelector("#clear");
const operationButtons = document.querySelectorAll("button.operator");
const equalsButton = document.querySelector("#equals");
const decimalButton = document.querySelector("#decimal");

function formatDisplayValue(value) {
    const str = String(value);
    if (str.length > 15) {
        const num = Number(value);
        if (!isNaN(num)) {
            return num.toExponential(6); // Use 6-digit precision
        }
    }
    return value;

}

function clear() {
    currentInput = [];
    display.textContent = "";
    currentnumber = "";
    operation = "";
}

function addDecimal() {
    if (!currentnumber.includes(".") && currentnumber !== "") {
        currentnumber += ".";
        display.textContent = currentnumber;
    }
}


function calculate() {
    if (currentInput.length !== 1) {    
        console.log("test")
        return;
    } else if (operation === null) {
        console.log("test2")
        return;
    } 
    currentInput.push(currentnumber);
    if (operation === "+") {
        ans = parseFloat(currentInput[0]) + parseFloat(currentInput[1]);
    } else if (operation === "-") {
        ans = parseFloat(currentInput[0]) - parseFloat(currentInput[1]);
    } else if (operation === "*") {
        ans = parseFloat(currentInput[0]) * parseFloat(currentInput[1])
    } else if (operation === "/") {
        if (parseFloat(currentInput[1]) === 0) {
            alert("Error: Division by zero");
            ans = null;
            clear();
            return;
            
        } else {
            ans = parseFloat(currentInput[0]) / parseFloat(currentInput[1]);
        }
    }
    display.textContent = formatDisplayValue(ans);
    currentInput = [ans];
    currentnumber = "";
    operation = null;
    console.log(currentInput);
    console.log(currentnumber);
    console.log(operation);
}

numbuttons.forEach(button => {
    button.addEventListener("click", () => {
        if (display.textContent === "Error: Division by zero") {
            clear();
        }
        currentnumber += button.textContent;
        display.textContent = formatDisplayValue(currentnumber);
    });
});

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        
        if (currentnumber !== "" || (currentInput.length !== 2 && currentInput.length !== 0)) {
            if (currentInput.length === 0) {
                currentInput.push(currentnumber);
            }
            operation = button.textContent;
            currentnumber = "";
            console.log(operation);
            display.textContent = "";
        }
        
    });
});

clearButton.addEventListener("click", clear);
equalsButton.addEventListener("click", calculate);
decimalButton.addEventListener("click", addDecimal);