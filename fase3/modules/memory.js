class Memory {
    //default 4MB memory size (4 * 1024 * 1024)
    constructor(size = 4 * 1024 * 1024){
        this.memory = new Uint8Array(size).fill(0)
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
    //return value at address to hex value with blockSize (default 8)
    toHex(blockSize = 8){
        const result = [];
        for (let i = 0; i < this.memory.length; i += blockSize) {
            const block = this.memory.slice(i, i + blockSize);
            const hex = Array.from(block).map(value => value.toString(16).padStart(2, '0')).join(' ')
            const ascii = Array.from(block).map(value => (value >= 32 && value <= 126 ? String.fromCharCode(value) : '.')).join('')
            // const binary = Array.from(block).map(value => value.toString(2).padStart(8, '0')).join(' ')
            result.push({
                address: '0x' + i.toString(16).padStart(8, '0'),
                hex: hex,
                ascii: ascii
                // binary: binary
            });
        }
        return result;
    }
}

class Stack {
    constructor(){
        this.memory = []
        this.sp = 0
    }
    push(value){
        this.memory[this.sp] = value
        this.sp += 1
    }
    pop(){
        if (this.sp <= 0){
            throw new Error("Stack underflow")
        }
        this.sp -= 1
        const value = this.memory[this.sp]
        this.memory[this.sp] = 0n
        return value
    }
    peek(){
        if (this.sp <= 0){
            throw new Error("Stack underflow")
        }
        return this.memory[this.sp - 1]
    }
    //optional: return value at address to hex value
    toHex(){
        return this.memory.map(value => value.toString(16).padStart(2, '0'))
    }
}


export { Memory, Stack }