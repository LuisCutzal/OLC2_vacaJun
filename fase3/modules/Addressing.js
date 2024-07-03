import * as cons from './const.js';
import { typeOfArg, parseNum } from './utilitis.js';

class Addressing{
    constructor(instruction){
        this.instruction = instruction
    }
    run(registers, specialRegisters, memory, stack, flag){
        if (this.instruction === null) {
            console.log("Instruction is null");
            return;
        }
        if (this.instruction === undefined) {
            console.log("Instruction is undefined");
            return;
        }
        if(this.instruction.opCode === cons.LDR){
            console.log("LDR")
        }
        if(this.instruction.opCode === cons.SVC){
            console.log("svc")
        }
        if(this.instruction.opCode === cons.LDRB){
            console.log("ldrb")
        }
        if(this.instruction.opCode === cons.STRB){
            console.log("strb")
        }
    }

}
export {Addressing}