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
            if (typeOfArg(this.instruction.arg1) === cons.REG && typeOfArg(this.instruction.res) === cons.REG) {
                reg1 = this.instruction.arg1
                res = this.instruction.res
                valR1 = registers.getRegister(reg1)
                valR2 = registers.getRegister(res)
                if (valR1 === valR2) {
                    flag.Z = 0;
                } else {
                    flag.Z = 1;
                }
            }
            if (typeOfArg(this.instruction.arg1) === cons.REG && typeOfArg(this.instruction.arg2) === cons.NUM) {
                reg1 = this.instruction.arg1;
                res = parseNum(this.instruction.arg2)
                valR1 = parseInt(registers.getRegister(this.instruction.arg1))
                if (valR1 === res) {
                    flag.Z = 0
                } else {
                    flag.Z = 1
                }
            }
            if (typeOfArg(this.instruction.arg1) === cons.REG && typeOfArg(this.instruction.arg2) === cons.D_NUM) {
                reg1 = this.instruction.arg1;
                res = parseNum(this.instruction.arg2)
                valR1 = parseInt(registers.getRegister(this.instruction.arg1))
                if (valR1 === res) {
                    flag.Z = 0
                } else {
                    flag.Z = 1
                }
            }
        }
        if(this.instruction.opCode === cons.MSUB){
            let valMul = 0;
            let value = 0;
            if(typeOfArg(this.instruction.arg1) != cons.REG || typeOfArg(this.instruction.arg2) != cons.REG || typeOfArg(this.instruction.arg3) != cons.REG || typeOfArg(this.instruction.res) != cons.REG){
                console.log("Invalid instruction"); //error sintactico
                return;
            }
            valMul = parseInt(registers.getRegister(this.instruction.arg2)) * parseInt(registers.getRegister(this.instruction.arg3));
            value = parseInt(registers.getRegister(this.instruction.arg1)) - valMul;
            registers.setRegister(this.instruction.res, parseInt(value));
        }
        if(this.instruction.opCode === cons.MUL){
            let value = 0;
            if(typeOfArg(this.instruction.arg1) != cons.REG || typeOfArg(this.instruction.arg2) != cons.REG || typeOfArg(this.instruction.res) != cons.REG){
                console.log("Invalid instruction"); //error sintactico
                return;
            }
            value = parseInt(registers.getRegister(this.instruction.arg1)) * parseInt(registers.getRegister(this.instruction.arg2));
            registers.setRegister(this.instruction.res, parseInt(value));
        }
    }
}

export { Arithmetic }
