import * as cons from './const.js';
import { typeOfArg, parseNum } from './utilitis.js';

class Addressing{
    constructor(instruction){
        this.instruction = instruction
        this.errors = []
    }
    run(registers, specialRegisters, memory, stack, flag, symbolTable, instructions){
        if (this.instruction === null) {
            console.log("Instruction is null");
            return;
        }
        if (this.instruction === undefined) {
            console.log("Instruction is undefined");
            return;
        }
        if(this.instruction.opCode === cons.LDR){
            if(typeOfArg(this.instruction.res) !== cons.REG){
                this.errors.push({type: "Error semantico ",line:this.specialRegisters.PC,column:"0",message:`Error, debe utilizar un registro : ${this.instruction.res} `})
            }
            let val = symbolTable.getSymbol(this.instruction.arg1.slice(1))
            let quad = instructions[val.address]
            if(quad.opCode === cons.DIRECTIVE){
                let memoriAdress = symbolTable.getSymbol(quad.arg1).address
                registers.setRegister(this.instruction.res, memoriAdress)
            }
        }
        if(this.instruction.opCode === cons.SVC){ //Llamada al sistema
            /*
            los registros x0 a x7 (o w0 a w7 para 32 bits) se utilizan para pasar argumentos a las llamadas del sistema y para recibir valores de retorno.
            x8 (o w8 para 32 bits) normalmente contiene el número de la syscall.
            El valor de retorno de la syscall suele ser almacenado en x0 (o w0)
            */
            if (this.instruction.arg1 === 0){
                memory.free(0) //libera la memoria
            }
        }
        if(this.instruction.opCode === cons.LDRB){
            console.log("ldrb")
        }
        if(this.instruction.opCode === cons.STRB){
            //console.log("strb")
            if(typeOfArg(this.instruction.res) !== cons.REG){
                this.errors.push({type: "Error semantico ",line:this.specialRegisters.PC,column:"0",message:`Error, debe utilizar un registro : ${this.instruction.res} `})
            }
            if(typeOfArg(this.instruction.arg1) === cons.REG){ //cuaddo solo hay un registro base
                let val = registers.getRegister(this.instruction.res)
                let destino = registers.getRegister(this.instruction.arg1)
                memory.set(destino,val)
            }
        }
    }

}
export {Addressing}