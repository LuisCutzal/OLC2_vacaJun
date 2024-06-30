import * as c from '../modules/const.js'
import {Registers, specialRegisters} from '../modules/registers.js'
import {Memory, Stack} from '../modules/memory.js'
import {Arithmetic} from '../modules/Arithmetic.js'
import {Logical} from '../modules/Logical.js'


//flags for ARMv8-A
const flag = {
    N: 0, Z: 0, C: 0, V: 0,
    init() {
        Object.assign(this, { N: 0, Z: 0, C: 0, V: 0 });
    }
}

class CPU{
    constructor(){
        this.registers = new Registers();
        this.specialRegisters = new specialRegisters();
        this.memory = new Memory(4*1024);
        this.stack = new Stack();    
        this.instructions = [];
        this.specialRegisters.PC = 0;
        this.debug = false;
        this.flag = flag;
        this.output = "";
        this.entrySymbol = false;
    }

    init(){
        this.registers = new Registers();
        this.stack = new Stack();
        this.memory = new Memory();
        this.specialRegisters.PC = 0;
        this.flag.init();
        this.output="";
        this.entrySymbol= false;
        this.arithmetic = new Arithmetic(null);
        this.logical = new Logical(null);
    }
    run(){//initialization
        this.init();
        let lenInstructions = this.instructions.length;
        if(lenInstructions != 0){
            while(this.specialRegisters.PC < lenInstructions){
                let op = this.instructions[this.specialRegisters.PC]
                //console.log(op);
                this.specialRegisters.PC += 1;
                //execute
                if(op.opCode == c.ADD){
                    console.log(this.registers)
                    this.arithmetic.instruction = op;
                    this.arithmetic.run(this.registers, this.specialRegisters, this.memory, this.stack, this.flag);
                    console.log(this.registers.toHex())
                    console.log("value flag C: "+this.flag.C) 
                    let arg1 = this.registers[op.arg1]
                    this.registers[op.res] = arg1 + op.arg2;
                    // console.log(this.registers[op.res])
                }
                if(op.opCode == c.MOV){
                    this.logical.instruction = op;
                    this.logical.run(this.registers, this.specialRegisters, this.memory, this.stack, this.flag);
                }
            }
        }

    }
}

export {CPU}