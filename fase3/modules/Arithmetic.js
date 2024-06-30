import * as cons from './const.js';
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

        if (this.instruction.opCode === cons.ADD) {
            console.log("ADD");
            console.log(this.instruction);
            let value = parseInt(registers.getRegister(this.instruction.arg1)) + parseInt(this.instruction.arg2);
            registers.setRegister(this.instruction.res, parseInt(value));
            flag.C = 1;
        }
        if (this.instruction.opCode === cons.ADCS) {
            flag.C = 1;
            console.log("ADCS");
        }
    }   
}

export {Arithmetic}
