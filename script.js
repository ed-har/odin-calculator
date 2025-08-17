const binaryFn = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    power: (a, b) => a ** b,
    divide: (a, b) => {
        // round to 5 decimal places
        if (b == 0) return NaN;
        return Math.floor((a / b) * (10 ** 5)) / 10 ** 5;
    },
};

const unaryFn = {
    percentage: (a) => a / 100,
    sqrt: (a) => Math.sqrt(a),
    roundTwo: (a) => Math.round(a * (10 ** 2)) / 10 ** 2,
    roundZero: (a) => Math.round(a),
    flipSign: (a) => -a,
}

function clearEverything(elem) {
    for (const key in elem) {
        elem[key] = '';
    };
};

const PI = Math.PI;
const number = '0123456789';
const elem = {
    operandA: '',
    operandB: '',
    operator: '',
    memory: '',
};

function getId(e) {
    console.log(e.target.id);
}

function updateElem(input) {
    function choose(elem) {

    }

}

function buttonInit() {
    const idText = [...document.querySelectorAll(".get-id > *")];
    for (const element of idText) {
        element.addEventListener("click", (e) => getId(e));
    }
}

buttonInit()