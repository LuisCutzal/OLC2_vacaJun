
class SymbolTable{
    constructor(){
        this.table = {}
    }

    setSymbol(symbol, address, length){
        this.table[symbol] = {address, length}
    }

    getSymbol(symbol){
        if(!(symbol in this.table)){
            throw new Error(`Symbol ${symbol} not found`)
        }
        return this.table[symbol]
    }
}

export { SymbolTable }