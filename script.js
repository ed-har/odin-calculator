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

function clearEverything(elem) {
    for (const key in elem) {
        elem[key] = '';
    };
};

const number = '0123456789';
const unaryFnId = ['percentage', 'sqrt', 'round-two', 'round-zero', 'flip-sign'];
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
        return;
    };
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
            elem.operandA = unaryFn[`${camelize(input)}`](+`elem.${operand}`);
        } else if (input === 'pi') {
            elem.operandB = Math.PI;
        } else {
            elem.operator = input;
        }
    }

    const isAEmpty = elem.operandA === '';
    const isBEmpty = elem.operandB === '';
    let isOperatorEmpty = elem.operator === '';

    if (number.includes(input)) {
        (isOperatorEmpty) ? elem.operandA += input : elem.operandB += input;
    } else {
        switch (true) {
            case isAEmpty:
                break;
            case isOperatorEmpty:
                updateOperand(input, 'operandA');
                break;
            case isBEmpty:
                elem.operator = input;
                break;
            default:
                if (input !== 'execute') updateOperand(input, 'operandB');
                else {
                    elem.operandA = binaryFn[elem.operator](+elem.operandA, +elem.operandB);
                    elem.operandB = '';
                    elem.operator = '';
                    isOperatorEmpty = true;
                }
        }
    }
    refreshDisplay(isOperatorEmpty);
}

function refreshDisplay(isOperatorEmpty) {
    const display = document.querySelector("#display");
    display.textContent = (isOperatorEmpty) ? elem.operandA : elem.operandB;
    if (elem.operandA === '') display.textContent = '0';
}

function buttonInit() {
    const idText = [...document.querySelectorAll(".get-id > *")];
    for (const element of idText) {
        element.addEventListener("click", (e) => getId(e));
    }
}

buttonInit()