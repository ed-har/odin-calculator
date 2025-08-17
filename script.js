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

const memoryFn = {
    mc: (elem) => elem.memory = '',
    mr: (elem) => elem.operandA = (elem.memory === '') ? '' : +elem.memory,
    "m-": (elem) => elem.memory = +elem.memory - +elem.operandA,
    "m+": (elem) => elem.memory = +elem.memory + +elem.operandA,
};

function clearEverything(elem) {
    for (const key in elem) {
        elem[key] = '';
    };
};

function refreshClearButton() {
    const clearButton = document.querySelector("#clear");
    clearButton.textContent = "AC";
};

const number = '0123456789';
const unaryFnId = ['percentage', 'sqrt', 'round-two', 'round-zero', 'flip-sign'];
const memoryFnId = ['mc', 'mr', 'm-', 'm+'];
const elem = {
    operandA: '',
    operandB: '',
    operator: '',
    memory: '',
};

function getId(e) {
    const input = e.target.id;
    if (input === 'clear') {
        clearEverything(elem);
        refreshDisplay(elem);
        refreshClearButton();
        return;
    };
    if (memoryFnId.includes(input)) {
        memoryFn[input](elem);
        refreshDisplay(elem);
        return;
    }
    updateElem(input, elem);
}

function camelize(text) {
    if (!text.includes("-")) return text;
    return text.split("-").reduce((str, word) =>
        str + (word.charAt(0).toUpperCase() + word.slice(1)));
}

function updateElem(input) {
    function updateOperand(input, operand) {
        if (unaryFnId.includes(input)) {
            elem[operand] = unaryFn[`${camelize(input)}`](elem[operand]);
        } else if (input === 'pi') {
            elem[operand] = Math.PI;
        } else if (input === '.') {
            if (!elem[operand].includes(input)) elem[operand] += input;
        } else {
            elem.operator = input;
        }
    }

    if (number.includes(input)) {
        (elem.operator === '') ?
            elem.operandA += input : elem.operandB += input;
    } else {
        switch (true) {
            case (elem.operandA === ''):
                break;
            case (elem.operator === ''):
                updateOperand(input, 'operandA');
                break;
            case (elem.operandB === ''):
                elem.operator = input;
                break;
            default:
                if (input !== 'execute') updateOperand(input, 'operandB');
                else {
                    elem.operandA = binaryFn[elem.operator](+elem.operandA, +elem.operandB);
                    elem.operandB = '';
                    elem.operator = '';
                };
        };
    };
    refreshDisplay();
};

function refreshDisplay() {
    const display = document.querySelector("#display");
    display.textContent = (elem.operandB === '') ? elem.operandA : elem.operandB;
    if (elem.operandA === '') display.textContent = '0';

    const clearButton = document.querySelector("#clear");
    clearButton.textContent = "CE";
};

function buttonInit() {
    const idText = [...document.querySelectorAll(".get-id > *")];
    for (const element of idText) {
        element.addEventListener("click", (e) => getId(e));
    };
};

buttonInit();