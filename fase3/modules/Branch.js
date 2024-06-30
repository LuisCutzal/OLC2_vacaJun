import * as cons from './const.js';

class Branch{
    constructor(instruction){
        this.instruction = instruction
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
    }
}
export {Branch}