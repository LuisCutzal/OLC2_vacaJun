import * as cons from './const.js';
import { typeOfArg, parseNum } from './utilitis.js';

class Arithmetic {
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
        if (this.instruction.opCode === cons.ADC) { //Add with Carry
            console.log("ADC");
        }
        if (this.instruction.opCode === cons.ADCS) { //Add with Carry and Set
            console.log("ADCS")
        }
        if (this.instruction.opCode === cons.ADD) {
            let value = 0
            if (typeOfArg(this.instruction.arg1) === cons.REG && typeOfArg(this.instruction.arg2) === cons.REG) {
                value = parseInt(registers.getRegister(this.instruction.arg1)) + parseInt(registers.getRegister(this.instruction.arg2));
            }
            if (typeOfArg(this.instruction.arg1) === cons.REG && typeOfArg(this.instruction.arg2) === cons.NUM) {
                value = parseInt(registers.getRegister(this.instruction.arg1)) + parseNum(this.instruction.arg2);
            }
            if (typeOfArg(this.instruction.arg1) === cons.REG && typeOfArg(this.instruction.arg2) === cons.D_NUM) {
                value = parseInt(registers.getRegister(this.instruction.arg1)) + parseNum(this.instruction.arg2);
            }
            if (value == 0) {
                flag.Z = 1
            }
            //tambien modifica la bandera C y N
            registers.setRegister(this.instruction.res, parseInt(value));
        }
        if (this.instruction.opCode === cons.ADDS) {
            console.log("ADDS");
        }
        if (this.instruction.opCode === cons.ADR) {
            console.log("ADR");
        }
        if (this.instruction.opCode === cons.ADRP) {
            console.log("ADRP");
        }
        if (this.instruction.opCode === cons.CMN) {
            console.log("CMN");
        }
        if (this.instruction.opCode === cons.CMP) { //comparacion entre 2 valores de registros
            let reg1 = 0
            let res = 0
            let valR1 = 0
            let valR2 = 0
            let valor = 0
            if (typeOfArg(this.instruction.arg1) === cons.REG && typeOfArg(this.instruction.res) === cons.REG) {
                reg1 = this.instruction.arg1
                res = this.instruction.res
                valR1 = registers.getRegister(reg1)
                valR2 = registers.getRegister(res)
                valor = valR2 - valR1
                if (valor < 0) {
                    flag.N = 1
                }
                if (valor == 0) {
                    flag.Z = 1
                }
                if (valR2 >= valR1) {
                    flag.C = 1;
                }
                if ((valR1 >= 0 && valR2 < 0 && valor < 0) || (valR1 < 0 && valR2 >= 0 && valor >= 0)) {
                    flag.V = 1;
                } else {
                    flag.V = 0;
                }

            }
            if (typeOfArg(this.instruction.arg1) === cons.REG && typeOfArg(this.instruction.arg2) === cons.NUM) {
                reg1 = this.instruction.arg1;
                res = parseNum(this.instruction.arg2)
                valR1 = parseInt(registers.getRegister(this.instruction.arg1))
                valor = res - valR1
                if (valor < 0) {
                    flag.N = 1
                }
                if (valor == 0) {
                    flag.Z = 1
                }
                if (valR2 >= valR1) {
                    flag.C = 1;
                }
                if ((valR1 >= 0 && res < 0 && valor < 0) || (valR1 < 0 && res >= 0 && valor >= 0)) {
                    flag.V = 1;
                } else {
                    flag.V = 0;
                }
            }
            if (typeOfArg(this.instruction.arg1) === cons.REG && typeOfArg(this.instruction.arg2) === cons.D_NUM) {
                reg1 = this.instruction.arg1;
                res = parseNum(this.instruction.arg2)
                valR1 = parseInt(registers.getRegister(this.instruction.arg1))
                valor = res - valR1
                if (valor < 0) {
                    flag.N = 1
                }
                if (valor == 0) {
                    flag.Z = 1
                }
                if (valR2 >= valR1) {
                    flag.C = 1;
                }
                if ((valR1 >= 0 && res < 0 && valor < 0) || (valR1 < 0 && res >= 0 && valor >= 0)) {
                    flag.V = 1;
                } else {
                    flag.V = 0;
                }
            }
        }
        if (this.instruction.opCode === cons.MSUB) {
            let valMul = 0;
            let value = 0;
            if (typeOfArg(this.instruction.arg1) != cons.REG || typeOfArg(this.instruction.arg2) != cons.REG || typeOfArg(this.instruction.arg3) != cons.REG || typeOfArg(this.instruction.res) != cons.REG) {
                console.log("Invalid instruction"); //error sintactico
                return;
            }
            valMul = parseInt(registers.getRegister(this.instruction.arg1)) * parseInt(registers.getRegister(this.instruction.arg2));
            value = parseInt(registers.getRegister(this.instruction.arg3)) - valMul;
            if (value == 0) {
                flag.Z = 1;
            }
            //tambien modifica la bandera N -> N = 1 si el bit más significativo del resultado es 1.
            if (value < 0) {
                flag.N = 1;
            }
            registers.setRegister(this.instruction.res, parseInt(value));
        }
        if (this.instruction.opCode === cons.MUL) {
            let value = 0;
            let reg1=0;
            let reg2=0;
            /*if (typeOfArg(this.instruction.res) != cons.REG) {
                console.log("Invalid instruction"); //error sintactico
                return;
            }*/
            if(typeOfArg(this.instruction.arg1) != cons.REG){
                reg1 = this.instruction.arg1
            }else{
                reg1 = parseInt(registers.getRegister(this.instruction.arg1))
            }
            if(typeOfArg(this.instruction.arg2) != cons.REG){
                reg2 = this.instruction.arg2
            }else{
                reg2 = parseInt(registers.getRegister(this.instruction.arg2))
            }
            value = reg1 * reg2;
            if (value == 0) {
                flag.Z = 1
            }
            //tambien modifica la bandera N -> N = 1 si el bit más significativo del resultado es 1.
            if (value < 0) {
                flag.N = 1;
            }
            registers.setRegister(this.instruction.res, parseInt(value));
        }
        if (this.instruction.opCode === cons.SDIV) {
            let value = 0;
            if (typeOfArg(this.instruction.arg1) != cons.REG || typeOfArg(this.instruction.arg2) != cons.REG) {
                console.log("Invalid instruction");
                return;
            }
            value = parseInt(registers.getRegister(this.instruction.arg1)) / parseInt(registers.getRegister(this.instruction.arg2));
            registers.setRegister(this.instruction.res, parseInt(value));

            if (parseInt(value) < 0) {
                flag.N = 1;
            }
            if (parseInt(value) >= 0) {
                flag.N = 0;
            }
            if (parseInt(value) != 0) {
                flag.Z = 0
            } else {
                flag.Z = 1
            }
        }
        if (this.instruction.opCode === cons.SUB) {
            let value = 0;
            let reg1 = 0;
            let reg2 = 0;

            if(typeOfArg(this.instruction.arg1) != cons.REG){
                reg1 = this.instruction.arg1
            }else{
                reg1 = parseInt(registers.getRegister(this.instruction.arg1));
            }
            if(typeOfArg(this.instruction.arg2) != cons.REG){
                reg2 = this.instruction.arg2
            }else{
                reg2 = parseInt(registers.getRegister(this.instruction.arg2));
            }
            value = reg1 - reg2;
            if (value == 0) {
                flag.Z = 1;
            }
            if (value < 0) {
                flag.N = 1;
            }
            if (reg2 > reg1) {
                flag.C = 0; // No se produce un préstamo
            } else {
                flag.C = 1; // Se produce un préstamo
            }
            let overflowCondition = (reg1 >= 0 && reg2 < 0 && value < 0) || (reg1 < 0 && reg2 >= 0 && value >= 0);
            if (overflowCondition) {
                flag.V = 1; // Hay desbordamiento
            } else {
                flag.V = 0; // No hay desbordamiento
            }
            registers.setRegister(this.instruction.res, parseInt(value));
        }
        if (this.instruction.opCode === cons.UDIV) {
            let value = 0;
            let arg1 = 0;
            let arg2 = 0;
            if (typeOfArg(this.instruction.arg1) != cons.REG || typeOfArg(this.instruction.arg2) != cons.REG) {
                console.log("Invalid instruction");
                return;
            } else {
                arg1 = parseInt(registers.getRegister(this.instruction.arg1));
                arg2 = parseInt(registers.getRegister(this.instruction.arg2));
            }
            if (parseInt(registers.getRegister(this.instruction.arg1)) < 0) {
                arg1 = -arg1;
            }
            if (parseInt(registers.getRegister(this.instruction.arg2)) < 0) {
                arg2 = -arg2;
            }
            value = arg1 / arg2;
            if (parseInt(value) != 0) {
                flag.Z = 0
            } else {
                flag.Z = 1
            }
            registers.setRegister(this.instruction.res, parseInt(value));
        }
    }
}

export { Arithmetic }
