import *  as cons from './const.js';
import  {parseNum, typeOfArg } from './utilitis.js';

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
            let value = 0;    
            if(typeOfArg(this.instruction.arg1) === cons.REG){
                value = parseInt(registers.getRegister(this.instruction.arg1));
            }if (typeOfArg(this.instruction.arg1) === cons.NUM || typeOfArg(this.instruction.arg1) === cons.D_NUM){
                value = parseNum(this.instruction.arg1);
            }
            registers.setRegister(this.instruction.res, parseInt(value));
        }
    }
}

export {Logical}