
class SymbolTable{
    constructor(){
        this.table = {}
    }

    setSymbol(symbol, address, length){
        this.table[symbol] = {address, length}
    }

    getSymbol(symbol){
        if(!(symbol in this.table)){
            return {type:`Error Semantico`,line:"0",column:"0",message:`Symbol ${symbol} not found`}
        }
        return this.table[symbol]
    }
}

export { SymbolTable }