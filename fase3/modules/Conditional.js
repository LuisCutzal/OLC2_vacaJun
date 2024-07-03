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
            let rd = parseInt(registers.getRegister(this.instruction.res)); //val
            let rn = parseInt(registers.getRegister(this.instruction.arg1)); //x0
            let rm = parseInt(registers.getRegister(this.instruction.arg2)); //x1
            let conditional = (this.instruction.arg3);
            //console.log(conditional);
            let val = 0;
            val = rn - rm
            if (conditional == "EQ") {//esto es para EQ
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
            if(conditional == "NE"){//esto es para el NE
                if(val == 0){
                    flag.Z = 1;
                }
                if(flag.Z == 1){
                    rd = rm
                }else{
                    rd = rn
                }
            }
            if(conditional == "CS"){//esto es para el CS
                if(val >=0){
                    flag.C = 1; // No hay acarreo
                }
                if(flag.C == 1){
                    rd = rn;
                }else{
                    rd = rm;
                }
            }
            if(conditional == "MI"){ //esto es para MI
                if(val < 0){
                    flag.N = 1
                }
                if(flag.N ==1){
                    rd = rn;
                }else{
                    rd = rm;
                }
            }
            if(conditional == "PL"){//esto es para PL
                if(val < 0){
                    flag.Z = 1;
                }
                if (flag.Z == 0) { 
                    rd = rn; 
                } else { 
                    rd = rm; 
                }
            }
            if(conditional == "VS"){ //esto es para VS
                if(val < 0){
                    flag.V = 1;//no existe desbordamiento
                }
                if (flag.V == 1) {
                    rd = rn;
                } else { 
                    rd = rm; 
                }
            }
            if(conditional == "VC"){//esto es para VC
                if(val < 0){
                    flag.V = 1; // Hay desbordamiento
                }
                if(flag.V == 1){
                    rd = rm;
                }else{
                    rd = rn;
                }
            }
            if(conditional == "HI"){ // HI
                if(val <=0){
                    flag.C = 1 //no hay carry
                }
                if(flag.C == 1){
                    rd = rn;
                }else{
                    rd = rm;
                }
            }
            if(conditional == "LS"){ // LS
                if (val <= 0) {
                    flag.C = 1; //no hay carry
                }
                if (flag.C == 1) {
                    rd = rn; 
                } else { 
                    rd = rm; 
                }
            }
            if(conditional == "GE"){ // GE -> no afecta a las banderas
                if(val >= 0){
                    rd = rn
                }else{
                    rd = rm
                }
            }
            if(conditional == "LT"){ // LT -> no afecta a las banderas
                if(val < 0){
                    rd = rn
                }else{
                    rd = rm
                }
            }
            if(conditional == "GT"){ // GT -> no afecta a las banderas
                if(val > 0){
                    rd = rn
                }else{
                    rd = rm
                }
            }
            if(conditional == "LE"){ // LE
                if(val <= 0){
                    rd = rn;
                }else{
                    rd = rm;
                }
            }
            if(conditional == "AL"){ //AL -> siempre seleccionara el primer argumento 
                rd = rn;
            }
            registers.setRegister(this.instruction.res, parseInt(rd))
        }
    }
}
export { Conditional }