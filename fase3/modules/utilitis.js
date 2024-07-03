import { D_NUM, NUM, REG, ISLABEL, ERRORTYPE, AL } from './const.js';


function typeOfArg(arg) {
    if (arg[0].toLowerCase() === 'x' || arg[0].toLowerCase() === 'w' || arg[0].toLowerCase() === 's' || arg[0].toLowerCase() === 'd' || arg[0].toLowerCase() === 'h' || arg[0].toLowerCase() === 'q' || arg[0].toLowerCase() === 'v') {
        return REG;
    }
    if (arg[0] === '#') {
        return NUM;
    }
    if (arg[arg.length - 1] === ':') {
        return ISLABEL;
    }
    if (!isNaN(arg)) {
        return D_NUM;
    }
    /*if(arg.length >= 2 && (arg[0] + arg[1]).toLowerCase() === 'al'){
        return AL;
    }*/
    return ERRORTYPE;
}

function parseNum(num) {
    if (num[0] === '#') {
        return BigInt(num.slice(1));
    }
    return BigInt(num);
}

function parseBinaryNum(num) {
    if (num[0] === '#') {
        return num.slice(1);
    }
    return num;
}

function binaryToInt(binaryNum, bitLength) {
    let num = 0, cont = 0, mult = 1;

    if (binaryNum.length < bitLength) {
        binaryNum = binaryNum.padStart(bitLength, '0');


    }

    if (binaryNum[0] === '1') {
        binaryNum = binaryNum.split('').map(bit => (bit === '0' ? '1' : '0'))
        mult = -1;


    } else {
        binaryNum = binaryNum.split('');

    }

    for (let i = binaryNum.length - 1; i > 0; i--) {
        num += binaryNum[i] * (2 ** cont);
        cont++;
    }

    return num * mult;
}

function intToBinary(decimal, bitLength) {
    let absoluteBinary = Math.abs(Number(decimal)).toString(2);
    let signedBinary;

    if (decimal >= 0) {
        // Es positivo, rellenar al inicio con 0's para completar los bits de longitud del registro
        signedBinary = absoluteBinary.padStart(bitLength, '0');

    } else {
        // Es negativo, calcular el complemento 
        let complement = absoluteBinary.split('').map(bit => bit === '0' ? '1' : '0').join('');
        // rellenar con 1's al inicio para completar los bits de longitu del registro
        let filledComplement = complement.padStart(bitLength, '1');
        signedBinary = filledComplement;

    }

    return signedBinary;
}

function or(arg1, arg2, bitLength) {
    let value = new Array(bitLength);

    for (let i = 0; i < bitLength; i++) {
        (arg1[i] === '1' || arg2[i] === '1') ? value[i] = '1' : value[i] = '0';
    }

    return value.join('');
}

function xor(arg1, arg2, bitLength) {
    let value = new Array(bitLength);

    for (let i = 0; i < bitLength; i++) {
        (arg1[i] === arg2[i]) ? value[i] = '0' : value[i] = '1';
    }

    return value.join('');
}

function and(arg1, arg2, bitLength) {
    let value = new Array(bitLength);

    for (let i = 0; i < bitLength; i++) {
        (arg1[i] === '1' && arg2[i] === '1') ? value[i] = '1' : value[i] = '0';
    }

    return value.join('');
}

function getBitLength(register) {
    let reg = register.toLowerCase();

    if (reg[0] === 'q' || reg[0] === 'v') {
        return 128;
    }

    if (reg[0] === 'x' || reg[0] === 'd') {
        return 64;
    }

    if (reg[0] === 'w' || reg[0] === 's') {
        return 32;
    }

    if (reg[0] === 'h') {
        return 16;
    }

    return 64;



}

export { typeOfArg, parseNum, parseBinaryNum, binaryToInt, intToBinary, or, xor, getBitLength, and }