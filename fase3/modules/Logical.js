import *  as cons from './const.js';
import { parseBinaryNum, parseNum, typeOfArg } from './utilitis.js';

class Logical {
    constructor(instruction) {
        this.instruction = instruction;
    }

    run(registers, specialRegisters, memory, stack, flag) {

        if (this.instruction === null) {
            console.log("Instruction is null");
            return;
        }
        if (this.instruction === undefined) {
            console.log("Instruction is undefined");
            return;
        }
        if (this.instruction.opCode === cons.MOV) {
            let value = 0;
            if (typeOfArg(this.instruction.arg1) === cons.REG) {
                value = parseInt(registers.getRegister(this.instruction.arg1))
            }
            if (typeOfArg(this.instruction.arg1) === cons.NUM || typeOfArg(this.instruction.arg1) === cons.D_NUM) {
                value = parseInt(parseNum(this.instruction.arg1));
            }
            registers.setRegister(this.instruction.res, parseInt(value));
        }

        if (this.instruction.opCode === cons.AND) {

            let arg1 = 0, arg2 = 0, value = 0;
            if (typeOfArg(this.instruction.arg1) === cons.REG &&
                (typeOfArg(this.instruction.arg2) === cons.NUM || typeOfArg(this.instruction.arg2) === cons.D_NUM)) {
                arg1 = registers.getRegister(this.instruction.arg1);
                arg2 = parseBinaryNum(this.instruction.arg2);
                value = arg1.toString(2) & arg2.toString(2);
            }

            registers.setRegister(this.instruction.res, value);

            return;

        }

        if (this.instruction.opCode === cons.ANDS) {

            let arg1 = 0, arg2 = 0, value = 0;
            if (typeOfArg(this.instruction.arg1) === cons.REG &&
                (typeOfArg(this.instruction.arg2) === cons.NUM || typeOfArg(this.instruction.arg2) === cons.D_NUM)) {
                arg1 = registers.getRegister(this.instruction.arg1);
                arg2 = parseBinaryNum(this.instruction.arg2);
                value = arg1.toString(2) & arg2.toString(2);

                if (this.instruction.res.substring(1) != 15) {
                    if (value < 0) {
                        flag.N = 1;
                        flag.Z = 0;
                    } else if (value == 0) {
                        flag.Z = 1;
                        flag.N = 0;
                    } else {
                        flag.Z = 0;
                        flag.N = 0;
                    }

                    if (arg2 > arg1) {
                        flag.C = 1;
                    } else {
                        flag.C = 0;
                    }
                }
            }

            registers.setRegister(this.instruction.res, value);

            return;

        }

        if (this.instruction.opCode === cons.ASR) {
            let arg1 = 0, arg2 = 0, value = 0;
            if (typeOfArg(this.instruction.arg1) === cons.REG) {
                arg1 = parseInt(registers.getRegister(this.instruction.arg1));

                if (typeOfArg(this.instruction.arg2) === cons.NUM || typeOfArg(this.instruction.arg2) === cons.D_NUM) {
                    arg2 = parseInt(parseBinaryNum(this.instruction.arg2));
                } else if (typeOfArg(this.instruction.arg2) === cons.REG) {
                    arg2 = parseInt(registers.getRegister(this.instruction.arg2));
                }

                // El corrimiento aritmético  a la derecha es equivalente al valor del registro dividido por (2 ** corrimiento)
                value = Math.round(arg1 / (2 ** arg2));
                value = decimalToSignedBinary(value, 32);
            }

            registers.setRegister(this.instruction.res, value);

            return;
        }

        if (this.instruction.opCode === cons.LSL) {
            let arg1 = 0, arg2 = 0, value = 0;
            if (typeOfArg(this.instruction.arg1) === cons.REG) {
                arg1 = parseInt(registers.getRegister(this.instruction.arg1));

                if (typeOfArg(this.instruction.arg2) === cons.NUM || typeOfArg(this.instruction.arg2) === cons.D_NUM) {
                    arg2 = parseInt(parseBinaryNum(this.instruction.arg2));
                } else if (typeOfArg(this.instruction.arg2) === cons.REG) {
                    arg2 = parseInt(registers.getRegister(this.instruction.arg2));
                }

                value = decimalToSignedBinary(arg1, 32); // obtengo el número en binario 

                //aplicar corrimiento insertando 0's de derecha a izquierda
                let fillingVals = new Array(arg2).fill('0');

                value = [...value.slice(arg2), ...fillingVals.join('')].join('');
            }

            registers.setRegister(this.instruction.res, value);

            return;
        }

        if (this.instruction.opCode === cons.LSR) {
            let arg1 = 0, arg2 = 0, value = 0;
            if (typeOfArg(this.instruction.arg1) === cons.REG) {
                arg1 = parseInt(registers.getRegister(this.instruction.arg1));

                if (typeOfArg(this.instruction.arg2) === cons.NUM || typeOfArg(this.instruction.arg2) === cons.D_NUM) {
                    arg2 = parseInt(parseBinaryNum(this.instruction.arg2));
                } else if (typeOfArg(this.instruction.arg2) === cons.REG) {
                    arg2 = parseInt(registers.getRegister(this.instruction.arg2));
                }

                value = decimalToSignedBinary(arg1, 32); // obtengo el número en binario 

                //aplicar corrimiento insertando 0's de  izquierda a derecha 
                let fillingVals = new Array(arg2).fill('0');

                value = [...fillingVals.join(''), ...value.slice(0, value.length - arg2)].join('');

            }

            registers.setRegister(this.instruction.res, value);

            return;
        }


    }
}

export { Logical }