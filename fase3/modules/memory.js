class Memory {
    //default size is 64MB
    constructor(size = 64 * 1024 * 1024){
        this.memory = new Array(size).fill(0n)
    }
    get(address){
        if (address < 0 || address >= this.memory.length){
            throw new Error("Invalid memory address")
        }
        return this.memory[address]
    }
    set(address, value){
        if (address < 0 || address >= this.memory.length){
            throw new Error("Invalid memory address")
        }
        this.memory[address] = value
    }
    dump(){
        return this.memory
    }
    //optional: return value at address to hex value
    toHex(){
        return this.memory.map(value => value.toString(16).padStart(2, '0'))
    }
}

