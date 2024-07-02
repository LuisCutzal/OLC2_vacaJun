import * as cons from './const.js';
import { typeOfArg, parseNum } from './utilitis.js';

class Conditional {
    constructor(instruction) {
        this.instruction = instruction
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
        if (this.instruction.opCode === cons.CSEL) {
            /*
            CSEL rd, rn, rm, cc
            rd: Es el registro de destino
            rn: Es el registro de origen para el caso verdadero (if true).
            rm: Es el registro de origen para el caso falso (if false).
            condition codes: Es el código de condición que determina si se selecciona rn o rm.
            */
            console.log(this.instruction)//verificar el argumento 3
            let rd = parseInt(registers.getRegister(this.instruction.res));
            let rn = parseInt(registers.getRegister(this.instruction.arg1));
            let rm = parseInt(registers.getRegister(this.instruction.arg2));
            let conditional = this.instruction.arg3;
            let val = 0;
            val = rn - rm
            /*if (conditional == "-") {//esto es para EQ
                //val = rn - rm
                if (val == 0) {
                    flag.Z = 1;
                }
                if (flag.Z == 1) {
                    rd = rn
                } else {
                    rd = rm
                }
            }
            if(conditional == "-"){//esto es para el NE
                if(val == 0){
                    flag.Z = 1;
                }
                if(flag.Z == 1){
                    rd = rm
                }else{
                    rd = rn
                }
            }
            if(conditional == "-"){//esto es para el CS
                if(val >=0){
                    flag.C = 1; // No hay acarreo
                }
                if(flag.C == 1){
                    rd = rn;
                }else{
                    rd = rm;
                }
            }
            if(conditional == "-"){ //esto es para MI
                if(val <0){
                    flag.N = 1
                }
                if(flag.N ==1){
                    rd = rn;
                }else{
                    rd = rm;
                }
            }
            if(conditional == "-"){//esto es para PL
                if(val >=0){
                    flag.Z = 0;
                }
                if (flag.Z == 0) { 
                    rd = rn; 
                } else { 
                    rd = rm; 
                }
            }*/
            if(conditional == "-"){ //esto es para VS
                
            }
            registers.setRegister(this.instruction.res, parseInt(rd))
        }
    }
}
export { Conditional }