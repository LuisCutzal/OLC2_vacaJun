import * as c from './const.js'

class DataAndDeclaration {
    constructor(listInstruction, specialRgisters) {
        this.instructions = listInstruction
        this.specialRegisters = specialRgisters
    }

    run(memory, symbolTable) {
        let count = 0;
        console.log(this.instructions)
        while (count < this.instructions.length) {
            let op = this.instructions[count];
            if (op.opCode === c.DIRECTIVE && op.arg1 !== '-' && op.res === '.ascii' ) {
                let address = memory.allocate(op.arg1.length)
                memory.setString(address, op.arg1)
                
                console.log(address)  
            }
            if (op.opCode == c.SECTION) {
                symbolTable.setSymbol()
            }
            count += 1
        }
        console.log(memory)
        console.log(memory.getString(0))
    }
}

export { DataAndDeclaration }