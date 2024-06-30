class Memory {
    //default size is 64MB
    constructor(size = 64 * 1024 * 1024) {
        this.memory = new Array(size).fill(0n)
    }
    get(address) {
        if (address < 0 || address >= this.memory.length) {
            throw new Error("Invalid memory address")
        }
        return this.memory[address]
    }
    set(address, value) {
        if (address < 0 || address >= this.memory.length) {
            throw new Error("Invalid memory address")
        }
        this.memory[address] = value
    }
    dump() {
        return this.memory
    }
    //optional: return value at address to hex value
    toHex() {
        return this.memory.map(value => value.toString(16).padStart(2, '0'))
    }
}

class Stack {
    constructor() {
        this.memory = []
        this.sp = 0
    }
    push(value) {
        this.memory[this.sp] = value
        this.sp += 1
    }
    pop() {
        if (this.sp <= 0) {
            throw new Error("Stack underflow")
        }
        this.sp -= 1
        const value = this.memory[this.sp]
        this.memory[this.sp] = 0n
        return value
    }
    peek() {
        if (this.sp <= 0) {
            throw new Error("Stack underflow")
        }
        return this.memory[this.sp - 1]
    }
    //optional: return value at address to hex value
    toHex() {
        return this.memory.map(value => value.toString(16).padStart(2, '0'))
    }
}


export { Memory, Stack }