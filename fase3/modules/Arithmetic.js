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
            console.log(reg1)
            /*let arg1 = parseInt(registers.getRegister(this.instruction.res))
            let arg2 = parseInt(registers.getRegister(this.instruction.res))
            if(arg1 === arg2){//cuando sean iguales entonces flag Z=1
                console.log("funciona")
            }else{//flag Z=0
                console.log("no son iguales")
            }*/

        }
    }
}

export { Arithmetic }
