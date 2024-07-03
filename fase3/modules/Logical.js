import *  as cons from './const.js';
import { typeOfArg, parseNum, parseBinaryNum, binaryToInt, intToBinary, or, xor, getBitLength, and } from './utilitis.js';

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
                value = parseNum(registers.getRegister(this.instruction.arg1));
            }
            if (typeOfArg(this.instruction.arg1) === cons.NUM || typeOfArg(this.instruction.arg1) === cons.D_NUM) {
                value = parseNum(this.instruction.arg1);
            }
            registers.setRegister(this.instruction.res, value);
        }

        if (this.instruction.opCode === cons.MVN) {
            let value = 0;
            if (typeOfArg(this.instruction.arg1) === cons.REG) {
                value = parseNum(registers.getRegister(this.instruction.arg1));
            }

            else if (typeOfArg(this.instruction.arg1) === cons.NUM || typeOfArg(this.instruction.arg1) === cons.D_NUM) {
                value = parseNum(this.instruction.arg1);
            }


            value = ~value;

            return registers.setRegister(this.instruction.res, value);
        }

        if (this.instruction.opCode === cons.AND) {

            let arg1 = 0, arg2 = 0, value = 0;
            if (typeOfArg(this.instruction.arg1) === cons.REG) {
                arg1 = parseNum(registers.getRegister(this.instruction.arg1));

                if (typeOfArg(this.instruction.arg2) === cons.NUM || typeOfArg(this.instruction.arg2) === cons.D_NUM) {
                    arg2 = parseNum(this.instruction.arg2);

                } else if (typeOfArg(this.instruction.arg2) === cons.REG) {
                    arg2 = parseNum(registers.getRegister(this.instruction.arg2));
                }

                value = and(intToBinary(arg1, getBitLength(this.instruction.res)), intToBinary(arg2, getBitLength(this.instruction.res)), getBitLength(this.instruction.res));
                value = binaryToInt(value, getBitLength(this.instruction.res));


                return registers.setRegister(this.instruction.res, value);
            }

            return { type: "Semántico", line: "", column: "", message: "El primer argumento debe debe ser un registro de 32-bits" }

        }

        if (this.instruction.opCode === cons.ANDS) {

            let arg1 = 0, arg2 = 0, value = 0;
            if (typeOfArg(this.instruction.arg1) === cons.REG) {
                arg1 = parseNum(registers.getRegister(this.instruction.arg1));

                if (typeOfArg(this.instruction.arg2) === cons.NUM || typeOfArg(this.instruction.arg2) === cons.D_NUM) {

                    arg2 = parseNum(this.instruction.arg2);
                }
                else if (typeOfArg(this.instruction.arg2) === cons.REG) {
                    arg2 = parseNum(registers.getRegister(this.instruction.arg2));
                }

                value = and(intToBinary(arg1, getBitLength(this.instruction.res)), intToBinary(arg2, getBitLength(this.instruction.res)), getBitLength(this.instruction.res));
                value = binaryToInt(value, getBitLength(this.instruction.res));

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

                    if (value.toString(2).length > getBitLength(this.instruction.res) || arg2 > arg1) {
                        flag.C = 1;
                    } else {
                        flag.C = 0;
                    }

                    return registers.setRegister(this.instruction.res, value);
                }

                return { type: "Semántico", line: "", column: "", message: "El valor de Rd no puede ser 1111" }

            }

            return { type: "Semántico", line: "", column: "", message: "El primer argumento debe debe ser un registro de 32-bits" }

        }

        if (this.instruction.opCode === cons.ASR) {
            let arg1 = 0, arg2 = 0, value = 0;
            if (typeOfArg(this.instruction.arg1) === cons.REG) {
                arg1 = parseNum(registers.getRegister(this.instruction.arg1));

                if (typeOfArg(this.instruction.arg2) === cons.NUM || typeOfArg(this.instruction.arg2) === cons.D_NUM) {
                    arg2 = parseNum(this.instruction.arg2);
                } else if (typeOfArg(this.instruction.arg2) === cons.REG) {
                    arg2 = parseNum(registers.getRegister(this.instruction.arg2));
                }


                value = intToBinary(arg1, getBitLength(this.instruction.res)); // convertir a binario
                value = value.slice(0, value.length - Number(arg2)); // corrimiento a la derecha
                if (arg1 < 0) {
                    value = value.padStart(getBitLength(this.instruction.res), '1'); // rellenar el corrimiento con 1's
                } else {
                    value = value.padStart(getBitLength(this.instruction.res), '0'); // rellenar el corrimiento con 0's
                }

                value = binaryToInt(value, getBitLength(this.instruction.res));

                return registers.setRegister(this.instruction.res, value);
            }

            return { type: "Semántico", line: "", column: "", message: "El primer argumento debe debe ser un registro de propósito general" }

        }

        if (this.instruction.opCode === cons.LSL) {
            let arg1 = 0, arg2 = 0, value = 0;
            if (typeOfArg(this.instruction.arg1) === cons.REG) {
                arg1 = parseNum(registers.getRegister(this.instruction.arg1));

                if (typeOfArg(this.instruction.arg2) === cons.NUM || typeOfArg(this.instruction.arg2) === cons.D_NUM) {
                    arg2 = parseNum(parseBinaryNum(this.instruction.arg2));
                } else if (typeOfArg(this.instruction.arg2) === cons.REG) {
                    arg2 = parseNum(registers.getRegister(this.instruction.arg2));
                }

                value = intToBinary(Math.abs(Number(arg1)), getBitLength(this.instruction.res)); // obtengo el número en binario 

                //aplicar corrimiento insertando 0's de derecha a izquierda
                let fillingVals = new Array(Number(arg2)).fill('0');

                value = [...value.slice(Number(arg2)), ...fillingVals.join('')].join('');
                value = binaryToInt(value, getBitLength(this.instruction.res));

                return registers.setRegister(this.instruction.res, value);
            }

            return { type: "Semántico", line: "", column: "", message: "El primer argumento debe debe ser un registro de propósito general" }


        }

        if (this.instruction.opCode === cons.LSR) {
            let arg1 = 0, arg2 = 0, value = 0;
            if (typeOfArg(this.instruction.arg1) === cons.REG) {
                arg1 = parseNum(registers.getRegister(this.instruction.arg1));

                if (typeOfArg(this.instruction.arg2) === cons.NUM || typeOfArg(this.instruction.arg2) === cons.D_NUM) {
                    arg2 = parseNum(parseBinaryNum(this.instruction.arg2));
                } else if (typeOfArg(this.instruction.arg2) === cons.REG) {
                    arg2 = parseNum(registers.getRegister(this.instruction.arg2));
                }

                value = intToBinary(Math.abs(Number(arg1)), getBitLength(this.instruction.res)); // obtengo el número en binario 

                //aplicar corrimiento insertando 0's de  izquierda a derecha 
                let fillingVals = new Array(Number(arg2)).fill('0');

                value = [...fillingVals.join(''), ...value.slice(0, value.length - Number(arg2))].join('');
                value = binaryToInt(value, getBitLength(this.instruction.res));

                return registers.setRegister(this.instruction.res, value);

            }

            return { type: "Semántico", line: "", column: "", message: "El primer argumento debe debe ser un registro de propósito general" }

        }

        if (this.instruction.opCode === cons.ROR) {
            let arg1 = 0, arg2 = 0, value = 0;
            if (typeOfArg(this.instruction.arg1) === cons.REG) {
                arg1 = parseNum(registers.getRegister(this.instruction.arg1));

                if (typeOfArg(this.instruction.arg2) === cons.NUM || typeOfArg(this.instruction.arg2) === cons.D_NUM) {
                    arg2 = parseNum(parseBinaryNum(this.instruction.arg2));
                } else if (typeOfArg(this.instruction.arg2) === cons.REG) {
                    arg2 = parseNum(registers.getRegister(this.instruction.arg2));
                }

                value = intToBinary(arg1, getBitLength(this.instruction.res)); // obtengo el número en binario 
                //aplicar corrimiento circular 
                value = [...value.slice(value.length - Number(arg2)), ...value.slice(0, value.length - Number(arg2))].join('');

                value = binaryToInt(value, getBitLength(this.instruction.res));

                return registers.setRegister(this.instruction.res, value);
            }

            return { type: "Semántico", line: "", column: "", message: "El primer argumento debe debe ser un registro de propósito general" }

        }

        if (this.instruction.opCode === cons.EOR) {
            let arg1 = 0, arg2 = 0, value = 0;
            if (typeOfArg(this.instruction.arg1) === cons.REG) {
                arg1 = parseNum(registers.getRegister(this.instruction.arg1));

                if (typeOfArg(this.instruction.arg2) === cons.NUM || typeOfArg(this.instruction.arg2) === cons.D_NUM) {
                    arg2 = parseNum(parseBinaryNum(this.instruction.arg2));
                } else if (typeOfArg(this.instruction.arg2) === cons.REG) {
                    arg2 = parseNum(registers.getRegister(this.instruction.arg2));
                }

                arg1 = intToBinary(arg1, getBitLength(this.instruction.res)); // obteniendo el binario de arg1 (rn)
                arg2 = intToBinary(arg2, getBitLength(this.instruction.res)); // obteniendo el binario de arg2 (op2)

                value = xor(arg1, arg2, getBitLength(this.instruction.res)); // rd = rn xor op2
                value = binaryToInt(value, getBitLength(this.instruction.res));

                return registers.setRegister(this.instruction.res, value);
            }

            return { type: "Semántico", line: "", column: "", message: "El primer argumento debe debe ser un registro de propósito general" }

        }

        if (this.instruction.opCode === cons.ORR) {
            let arg1 = 0, arg2 = 0, value = 0;
            if (typeOfArg(this.instruction.arg1) === cons.REG) {
                arg1 = parseNum(registers.getRegister(this.instruction.arg1));

                if (typeOfArg(this.instruction.arg2) === cons.NUM || typeOfArg(this.instruction.arg2) === cons.D_NUM) {
                    arg2 = parseNum(parseBinaryNum(this.instruction.arg2));
                } else if (typeOfArg(this.instruction.arg2) === cons.REG) {
                    arg2 = parseNum(registers.getRegister(this.instruction.arg2));
                }

                arg1 = intToBinary(arg1, getBitLength(this.instruction.res)).split(''); // obteniendo el binario de arg1 (rn)
                arg2 = intToBinary(arg2, getBitLength(this.instruction.res)).split(''); // obteniendo el binario de arg2 (op2)

                value = or(arg1, arg2, getBitLength(this.instruction.res)); // rd = rn or op2

                value = binaryToInt(value, getBitLength(this.instruction.res));

                return registers.setRegister(this.instruction.res, value);
            }

            return { type: "Semántico", line: "", column: "", message: "El primer argumento debe debe ser un registro de propósito general" }

        }



    }
}

export { Logical }