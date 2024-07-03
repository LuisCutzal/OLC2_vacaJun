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
        let N = flag.N
        let Z = flag.Z
        let C = flag.C
        let V = flag.V
        if(this.instruction.opCode === cons.BLT){ //elseif
            /*
            usa banderas N y V -> (N != V)
            blt salta si la bandera de negativo no coincide con la bandera de desbordamiento.
            */
            if(N !== V){ //aca se salta a la etiqueta especificada en la instruccion blt
                console.log("n !== v")
            }

        }
        if(this.instruction.opCode === cons.BEQ){//else
            if(Z === 1){ //aca se salta a la etiqueta especificada en la instruccion beq
                console.log("Z === 1")
            }
        }
        if(this.instruction.opCode === cons.B){//de una vez se salta a la etiqueta, no maneja banderas
            console.log("instruccion B")
        }
        if(this.instruction.opCode === cons.BLE){
            /*
            salta a la etiqueta especificada si el resultado de la comparación es menor o igual a cero
            instrucciones que usa N,Z,V
            (N != V)-> Significa que el resultado es negativo. || Z == 1 ->Significa que el resultado es cero.
            */
           if(N != V || Z == 1){ //ble se ejecuta y salta a la etiqueta especificada.
            console.log("ble")
           }
        }
        if(this.instruction.opCode === cons.BNE){// Z = 0
            if(Z === 0){
                console.log("Z=0, entra a BNE")
            }
        }
    }
}
export {Branch}