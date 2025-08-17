const binaryFn = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    power: (a, b) => a ** b,
    divide: (a, b) => {
        // divide round to 5 decimal places
        if (b == 0) return NaN;
        return Math.round((a / b) * (10 ** 5)) / 10 ** 5;
    },
};

const unaryFn = {
    percentage: (a) => a / 100,
    roundTwo: (a) => Math.round(a * (10 ** 2)) / 10 ** 2,
    roundZero: (a) => Math.round(a),
    flipSign: (a) => -a,
    // sqrt round to 5 decimal places
    sqrt: (a) => Math.round(Math.sqrt(a) * (10 ** 5)) / 10 ** 5,
};

const number = '0123456789';
const unaryFnId = ['percentage', 'sqrt', 'round-two', 'round-zero', 'flip-sign'];
const elem = new Array(3).fill("");
const operandA = 0;
const operator = 1;
const operandB = 2;
let currPos = 0;

function getId(e) {
    const input = e.target.id;
    if (input === 'clear') {
        clearEverything(elem);
        refreshDisplay(elem);
        return;
    };
    updateElem(input, elem);
};

function clearEverything(elem) {
    for (let i = 0; i < elem.length; i++) {
        elem[i] = '';
    };
};

function refreshDisplay(currPos) {
    const display = document.querySelector("#display");
    display.textContent = (elem[operandB] === '') ? elem[operandA] : elem[operandB];
    if (elem[operandA] === '') display.textContent = '0';
}

function camelize(text) {
    if (!text.includes("-")) return text;
    return text.split("-").reduce((str, word) =>
        str + (word.charAt(0).toUpperCase() + word.slice(1)));
};

function updateElem(input) {
    function updateOperand(input, operand) {
        if (unaryFnId.includes(input)) {
            elem[operand] = unaryFn[`${camelize(input)}`](+elem[operand]);
        } else if (input === 'pi') {
            elem[operand] = Math.PI;
        } else if (number.includes(input)) {
            elem[operand] += input;
        } else {
            if (operand === operandB) {
                executeCalc;
            } else {
            updateOperator(input, ++currPos);
            }
        };
    };

    function updateOperator(input, operator) {
        if (number.includes(input)) {
            updateOperand(input, ++currPos)
        } else {
            elem[operator] = input;
        }
    };

    function executeCalc(input) {
        elem[operandA] = binaryFn[`${elem[operator]}`](+elem[operandA], +elem[operandB]);
        elem[operator] = '';
        elem[operandB] = '';
        currPos = 0;
    }

    switch (currPos) {
        case operator:
            updateOperator(input, currPos);
            break;
        case operandA:
        case operandB:
            updateOperand(input, currPos);
            break;
        default:
            executeCalc(input);
    };
    refreshDisplay();
};


function buttonInit() {
    const idText = [...document.querySelectorAll(".get-id > *")];
    for (const element of idText) {
        element.addEventListener("click", (e) => getId(e));
    }
}

buttonInit()