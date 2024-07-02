import * as c from '../modules/const.js'
import { Registers, specialRegisters } from '../modules/registers.js'
import { Memory, Stack } from '../modules/memory.js'
import { Arithmetic } from '../modules/Arithmetic.js'
import { Logical } from '../modules/Logical.js'
import { Branch } from '../modules/Branch.js'
import { Conditional } from '../modules/Conditional.js'
import { SymbolTable } from '../modules/SymbolTable.js'
import { DataAndDeclaration } from '../modules/DataAndDeclaration.js'

let errors = []

//flags for ARMv8-A
const flag = {
    N: 0, Z: 0, C: 0, V: 0,
    init() {
        Object.assign(this, { N: 0, Z: 0, C: 0, V: 0 });
    }
}

class CPU {
    constructor() {
        this.registers = new Registers();
        this.specialRegisters = new specialRegisters();
        this.memory = new Memory(32 * 1024);
        this.stack = new Stack();
        this.symbolTable = new SymbolTable();
        this.instructions = [];
        this.specialRegisters.PC = 0;
        this.debug = false;
        this.flag = flag;
        this.output = "";
        this.entrySymbol = false;
    }

    init() {
        this.registers = new Registers();
        this.stack = new Stack();
        this.memory = new Memory(32 * 1024);
        this.specialRegisters.PC = 0;
        this.flag.init();
        this.symbolTable = new SymbolTable();
        this.output = "";
        this.entrySymbol = false;
        this.arithmetic = new Arithmetic(null);
        this.logical = new Logical(null);
        this.branch = new Branch(null);
        this.conditional = new Conditional(null);
    }
    run() {//initialization
        this.init();
        let lenInstructions = this.instructions.length;
        //label and const data in memory processing in memory
        let dataAndDeclaration = new DataAndDeclaration(this.instructions, this.specialRegisters);
        dataAndDeclaration.run(this.memory, this.symbolTable);


        if (lenInstructions != 0) {
            while (this.specialRegisters.PC < lenInstructions) {
                let op = this.instructions[this.specialRegisters.PC]
                //console.log(op);
                this.specialRegisters.PC += 1;
                //execute
                /*-----------------Arithmetic Instructions---------------*/
                if (op.opCode == c.ADD) {
                    //console.log(this.registers)
                    this.arithmetic.instruction = op;
                    this.arithmetic.run(this.registers, this.specialRegisters, this.memory, this.stack, this.flag);
                }
                if (op.opCode == c.CMP) {
                    this.arithmetic.instruction = op;
                    this.arithmetic.run(this.registers, this.specialRegisters, this.memory, this.stack, this.flag)
                }
                if (op.opCode == c.MSUB) {//multiplicacion y substraccion
                    this.arithmetic.instruction = op;
                    this.arithmetic.run(this.registers, this.specialRegisters, this.memory, this.stack, this.flag)
                }
                if (op.opCode == c.MUL) {//multiplicacion
                    this.arithmetic.instruction = op;
                    this.arithmetic.run(this.registers, this.specialRegisters, this.memory, this.stack, this.flag)
                }
                if (op.opCode == c.SDIV) {//division SI tomando en cuenta los signos
                    this.arithmetic.instruction = op;
                    this.arithmetic.run(this.registers, this.specialRegisters, this.memory, this.stack, this.flag)
                }
                if (op.opCode == c.SUB) {//resta
                    this.arithmetic.instruction = op;
                    this.arithmetic.run(this.registers, this.specialRegisters, this.memory, this.stack, this.flag)
                }
                if (op.opCode == c.UDIV) {//division NO toma en cuenta los signos
                    this.arithmetic.instruction = op;
                    this.arithmetic.run(this.registers, this.specialRegisters, this.memory, this.stack, this.flag)
                }
                /*-----------------Logical y Move Instructions-----------*/
                if (op.opCode == c.AND) {
                    this.logical.instruction = op;
                    this.logical.run(this.registers, this.specialRegisters, this.memory, this.stack, this.flag);
                }

                if (op.opCode == c.ANDS) {
                    this.logical.instruction = op;
                    this.logical.run(this.registers, this.specialRegisters, this.memory, this.stack, this.flag);
                }

                if (op.opCode == c.ASR) {
                    this.logical.instruction = op;
                    this.logical.run(this.registers, this.specialRegisters, this.memory, this.stack, this.flag);
                }
                if (op.opCode == c.LSL) {
                    this.logical.instruction = op;
                    this.logical.run(this.registers, this.specialRegisters, this.memory, this.stack, this.flag);
                }
                if (op.opCode == c.LSR) {
                    this.logical.instruction = op;
                    this.logical.run(this.registers, this.specialRegisters, this.memory, this.stack, this.flag);

                }
                if (op.opCode == c.MOV) {
                    this.logical.instruction = op;
                    this.logical.run(this.registers, this.specialRegisters, this.memory, this.stack, this.flag);
                }
                if (op.opCode == c.ROR) {
                    this.logical.instruction = op;
                    this.logical.run(this.registers, this.specialRegisters, this.memory, this.stack, this.flag);
                }
                if (op.opCode == c.EOR) {

                    this.logical.instruction = op;
                    this.logical.run(this.registers, this.specialRegisters, this.memory, this.stack, this.flag);
                }
                if (op.opCode == c.ORR) {

                    this.logical.instruction = op;
                    this.logical.run(this.registers, this.specialRegisters, this.memory, this.stack, this.flag);
                }



                /*****************Branch Instructions***********************/
                if (op.opCode == c.BEQ) {
                    this.branch.instruction = op;
                    this.branch.run(this.registers, this.specialRegisters, this.memory, this.stack, this.flag);
                }
                if (op.opCode == c.BNE) {
                    this.branch.instruction = op;
                    this.branch.run(this.registers, this.specialRegisters, this.memory, this.stack, this.flag);
                }
                if (op.opCode == c.BLE) {
                    this.branch.instruction = op;
                    this.branch.run(this.registers, this.specialRegisters, this.memory, this.stack, this.flag);
                }
                if (op.opCode == c.B) {
                    this.branch.instruction = op;
                    this.branch.run(this.registers, this.specialRegisters, this.memory, this.stack, this.flag);
                }
                /*****************Conditional Instructions***********************/
                if (op.opCode == c.CSEL) {
                    this.conditional.instruction = op;
                    this.conditional.run(this.registers, this.specialRegisters, this.memory, this.stack, this.flag)
                }
                /*****************Addressing Modes***********************/

            }
        }

    }
}

export { CPU }

/*
-----
ldr
svc
ldrb
beq
b
bne
strb

*/