import { D_NUM, NUM, REG, ISLABEL, ERRORTYPE } from './const.js';


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

export { typeOfArg, parseNum, parseBinaryNum }