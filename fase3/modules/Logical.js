import *  as cons from './const.js';
import { typeOfArg, parseNum, parseBinaryNum, binaryToInt, intToBinary, or, xor, getBitLength } from './utilitis.js';

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


                value = intToBinary(arg1, getBitLength(this.instruction.res)); // convertir a binario
                value = value.slice(0, value.length - arg2); // corrimiento a la derecha
                if (arg1 < 0) {
                    value = value.padStart(getBitLength(this.instruction.res), '1'); // rellenar el corrimiento con 1's
                } else {
                    value = value.padStart(getBitLength(this.instruction.res), '0'); // rellenar el corrimiento con 0's
                }

                value = binaryToInt(value, getBitLength(this.instruction.res));

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

                value = intToBinary(Math.abs(arg1), getBitLength(this.instruction.res)); // obtengo el número en binario 

                //aplicar corrimiento insertando 0's de derecha a izquierda
                let fillingVals = new Array(arg2).fill('0');

                value = [...value.slice(arg2), ...fillingVals.join('')].join('');
                value = binaryToInt(value, getBitLength(this.instruction.res));
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

                value = intToBinary(Math.abs(arg1), getBitLength(this.instruction.res)); // obtengo el número en binario 

                //aplicar corrimiento insertando 0's de  izquierda a derecha 
                let fillingVals = new Array(arg2).fill('0');

                value = [...fillingVals.join(''), ...value.slice(0, value.length - arg2)].join('');
                value = binaryToInt(value, getBitLength(this.instruction.res));
            }

            registers.setRegister(this.instruction.res, value);

            return;
        }

        if (this.instruction.opCode === cons.ROR) {
            let arg1 = 0, arg2 = 0, value = 0;
            if (typeOfArg(this.instruction.arg1) === cons.REG) {
                arg1 = parseInt(registers.getRegister(this.instruction.arg1));

                if (typeOfArg(this.instruction.arg2) === cons.NUM || typeOfArg(this.instruction.arg2) === cons.D_NUM) {
                    arg2 = parseInt(parseBinaryNum(this.instruction.arg2));
                } else if (typeOfArg(this.instruction.arg2) === cons.REG) {
                    arg2 = parseInt(registers.getRegister(this.instruction.arg2));
                }

                value = intToBinary(arg1, getBitLength(this.instruction.res)); // obtengo el número en binario 
                //aplicar corrimiento circular 
                value = [...value.slice(value.length - arg2), ...value.slice(0, value.length - arg2)].join('');
                value = binaryToInt(value, getBitLength(this.instruction.res));
            }

            registers.setRegister(this.instruction.res, value);

            return;
        }

        if (this.instruction.opCode === cons.BIC) {
            let arg1 = 0, arg2 = 0, value = 0;
            if (typeOfArg(this.instruction.arg1) === cons.REG) {
                arg1 = parseInt(registers.getRegister(this.instruction.arg1));

                if (typeOfArg(this.instruction.arg2) === cons.NUM || typeOfArg(this.instruction.arg2) === cons.D_NUM) {
                    arg2 = parseInt(parseBinaryNum(this.instruction.arg2));
                } else if (typeOfArg(this.instruction.arg2) === cons.REG) {
                    arg2 = parseInt(registers.getRegister(this.instruction.arg2));
                }

                arg1 = intToBinary(arg1, getBitLength(this.instruction.res)); // obteniendo el binario de arg1 (rn)
                arg2 = intToBinary((arg2 * -1), getBitLength(this.instruction.res)); // obteniendo el binario de la negación de arg2 (~op2)

                value = arg1 & arg2; // rd = rn & ~op2

            }

            registers.setRegister(this.instruction.res, value);

            return;
        }

        if (this.instruction.opCode === cons.EOR) {
            let arg1 = 0, arg2 = 0, value = 0;
            if (typeOfArg(this.instruction.arg1) === cons.REG) {
                arg1 = parseInt(registers.getRegister(this.instruction.arg1));

                if (typeOfArg(this.instruction.arg2) === cons.NUM || typeOfArg(this.instruction.arg2) === cons.D_NUM) {
                    arg2 = parseInt(parseBinaryNum(this.instruction.arg2));
                } else if (typeOfArg(this.instruction.arg2) === cons.REG) {
                    arg2 = parseInt(registers.getRegister(this.instruction.arg2));
                }

                arg1 = intToBinary(arg1, getBitLength(this.instruction.res)); // obteniendo el binario de arg1 (rn)
                arg2 = intToBinary(arg2, getBitLength(this.instruction.res)); // obteniendo el binario de arg2 (op2)

                value = xor(arg1, arg2, getBitLength(this.instruction.res)); // rd = rn xor op2
                value = binaryToInt(value, getBitLength(this.instruction.res));
            }

            registers.setRegister(this.instruction.res, value);

            return;
        }

        if (this.instruction.opCode === cons.ORR) {
            let arg1 = 0, arg2 = 0, value = 0;
            if (typeOfArg(this.instruction.arg1) === cons.REG) {
                arg1 = parseInt(registers.getRegister(this.instruction.arg1));

                if (typeOfArg(this.instruction.arg2) === cons.NUM || typeOfArg(this.instruction.arg2) === cons.D_NUM) {
                    arg2 = parseInt(parseBinaryNum(this.instruction.arg2));
                } else if (typeOfArg(this.instruction.arg2) === cons.REG) {
                    arg2 = parseInt(registers.getRegister(this.instruction.arg2));
                }

                arg1 = intToBinary(arg1, getBitLength(this.instruction.res)).split(''); // obteniendo el binario de arg1 (rn)
                arg2 = intToBinary(arg2, getBitLength(this.instruction.res)).split(''); // obteniendo el binario de arg2 (op2)

                value = or(arg1, arg2, getBitLength(this.instruction.res)); // rd = rn or op2

                value = binaryToInt(value, getBitLength(this.instruction.res));

            }

            registers.setRegister(this.instruction.res, value);

            return;
        }



    }
}

export { Logical }