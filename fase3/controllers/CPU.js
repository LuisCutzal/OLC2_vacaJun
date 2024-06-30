import * as c from '../modules/const.js'

//flags for ARMv8-A
const flag = {
    N: 0, Z: 0, Z: 0, V: 0,
    init() {
        Object.assign(this, { N: 0, Z: 0, C: 0, V: 0 });
    }
}

export default class CPU{
    constructor(){
        this.registers = new Array(32).fill(0);
        this.instructions = [];
        this.pc = 0;
        this.debug = false;
        this.flag = flag;
        this.output = "";
        this.entrySymbol = false;
    }

    init(){
        this.registers.fill(0);
        this.pc=0;
        this.flag.init();
        this.output="";
        this.entrySymbol= false;
    }
    run(){//initialization
        this.init();
        let lenInstructions = this.instructions.length;
        if(lenInstructions != 0){
            while(this.pc < lenInstructions){
                let op = this.instructions[this.pc]
                //console.log(op);
                this.pc++;
                //execute
                if(op.opCode == c.ADD){
                    console.log(this.registers)
                    let arg1 = this.registers[op.arg1]
                    this.registers[op.res] = arg1 + op.arg2;
                    console.log(this.registers[op.res])
                }else if(op.opCode == c.LDR){
                    //console.log(op.Result);
                    if(op.res == 'x0'){ //-> colocar los registros
                        //console.log(op.arg1)
                        console.log(op.arg1) //-> valor del registro
                    }
                }
            }
        }

    }
}