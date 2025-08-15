const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const power = (a, b) => a ** b;
const divide = (a, b) => {
    if (b == 0) return NaN;
    return Math.floor((a / b) * (10 ** 5)) / 10 ** 5;
} // default to rounding 5 decimal places
const percentage = (a) => a / 100;
const sqrt = (a) => Math.sqrt(a);
const roundTwo = (a) => Math.round(a * (10 ** 2)) / 10 ** 2;
const roundZero = (a) => Math.round(a);

const PI = Math.PI;
const elem = {
    operandA: '',
    operandB: '',
    operator: '',
};
const value = {
    current: 0,
    memory: 1,
}

function clearEverything(elem, value) {
    for (const key in elem) {
        elem[key] = '';
    };
    for (const key in value) {
        value[key] = 0;
    };
};

function checkAllClear(elem, value) {
    return Object.values(elem).every(item => item === '') 
    && Object.values(value).every(item => item === 0);
}
