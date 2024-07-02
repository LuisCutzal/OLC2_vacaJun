import { D_NUM, NUM, REG, ISLABEL, ERRORTYPE, AL} from './const.js';


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
        return parseInt(num.slice(1));
    }
    return parseInt(num);
}

function parseBinaryNum(num) {
    if (num[0] === '#') {
        return num.slice(1);
    }
    return num;
}


function binaryToSignedDecimal(binary) {
    if (binary[0] === '0') {
        // Positivo, se retorna el valor convertido
        return parseInt(binary, 2);

    } else {
        // Negativo, calcular el complemento a 1
        let complement = binary.split('').map(bit => (bit === '0' ? '1' : '0')).join('');
        let decimalValue = parseInt(complement, 2);
        return -decimalValue;
    }
}


function decimalToSignedBinary(decimal, bitLength) {
    let absoluteBinary = Math.abs(decimal).toString(2);
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

function decimalToUnsignedBinary(decimal, bitLength) {
    let absoluteBinary = Math.abs(decimal).toString(2);
    let unsignedBinary;


    unsignedBinary = absoluteBinary.padStart(bitLength, '0');


    return unsignedBinary;
}


export { typeOfArg, parseNum, parseBinaryNum, binaryToSignedDecimal, decimalToSignedBinary, decimalToUnsignedBinary }