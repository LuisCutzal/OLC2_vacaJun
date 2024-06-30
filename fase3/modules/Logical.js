import *  as cons from './const.js';

class Logical{
    constructor(instruction){
        this.instruction = instruction;
    }

    run(registers, specialRegisters, memory, stack, flag){
        if(this.instruction === null){
            console.log("Instruction is null");
            return;
        }
        if(this.instruction === undefined){
            console.log("Instruction is undefined");
            return;
        }
        if(this.instruction.opCode === cons.MOV){            
            let value = parseInt(this.instruction.arg1);
            registers.setRegister(this.instruction.res, parseInt(value));
        }
    }
}

export {Logical}