let display = document.getElementById('display');
let currentInput = '';
let operator = '';
let firstOperand = null;

function appendNumber(number) {
    currentInput += number;
    updateDisplay();
}

function setOperator(op) {
    if (currentInput !== '') {
        operator = op;
        if (firstOperand === null) {
            firstOperand = parseFloat(currentInput);
            currentInput = '';
        } else {
            calculateResult();
        }
    }
}

function calculateResult() {
    if (currentInput !== '' && firstOperand !== null) {
        let secondOperand = parseFloat(currentInput);
        switch (operator) {
            case '+':
                currentInput = firstOperand + secondOperand;
                break;
            case '-':
                currentInput = firstOperand - secondOperand;
                break;
            case '*':
                currentInput = firstOperand * secondOperand;
                break;
            case '/':
                if (secondOperand !== 0) {
                    currentInput = firstOperand / secondOperand;
                } else {
                    currentInput = 'Error';
                }
                break;
        }
        updateDisplay();
        firstOperand = null;
        operator = '';
    }
}

function clearDisplay() {
    currentInput = '';
    operator = '';
    firstOperand = null;
    updateDisplay();
}

function updateDisplay() {
    display.value = currentInput;
}
