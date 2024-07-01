import * as c from './const.js'

class DataAndDeclaration {
    constructor(listInstruction, specialRgisters) {
        this.instructions = listInstruction
        this.specialRegisters = specialRgisters
    }

    run(memory, symbolTable) {
        let count = 0
        let currentSection = ''
        this.instructions.forEach(({ opCode, op, arg1, arg2, arg3, res }) => {
            count++
            if (opCode === c.DIRECTIVE) {
                switch (res.toLowerCase()) {
                    case '.global':
                        break
                    case '.data':
                        currentSection = 'data'
                        break
                    case '.bss':
                        currentSection = 'bss'
                        break
                    case '.text':
                        currentSection = 'text'
                        break
                    case '.asciz':
                        const adrressAsciz = memory.allocate(arg1.length + 1)
                        memory.setString(adrressAsciz, arg1)
                        symbolTable.setSymbol(arg1, adrressAsciz, arg1.length + 1)
                        break
                    case '.ascii':
                        const adrressAscii = memory.allocate(arg1.length + 1)
                        memory.setString(adrressAscii, arg1)
                        symbolTable.setSymbol(arg1, adrressAscii, arg1.length + 1)
                        break
                    case '.space':
                        const spaceSize = parseInt(arg1, 10)
                        const addressSpace = memory.allocate(spaceSize)
                        memory.set(addressSpace, spaceSize)
                        symbolTable.setSymbol(arg1, addressSpace, spaceSize)
                        break
                    default:
                        console.warn(`Unknown directive: ${res}`)
                        break    

                }
            }else if (opCode === c.SECTION){
                symbolTable.setSymbol(res, count, 0)
            }
        })
        // console.log(memory.toHex())
        console.log(symbolTable.table)
    }
    
}

export { DataAndDeclaration }