class Memory {
    //default memory size 16KB (16 * 1024 bytes)
    constructor(size =16 * 1024) {
        this.memory = new Uint8Array(size).fill(0)
        this.dataView = new DataView(this.memory.buffer)
        this.ocuppied = []
    }
    //allocate memory for a given size
    allocate(size){
        let start = 0
        for (let {start: s, end: e} of this.ocuppied){
           if( start + size <= s) break
              start = e + 1
        }
        if (start + size > this.memory.length) throw new Error("No suficiente memoria")
        this.ocuppied.push({start, end: start + size - 1})
        this.ocuppied.sort((a, b) => a.start - b.start) 
        return start 
    }

    //free memory at a given address
    free(address){
        this.ocuppied = this.ocuppied.filter(({start})=> start !== address)
    }

    //get last position of memory free
    getLastPosition(){
        return this.ocuppied[this.ocuppied.length - 1].end
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

    //save a string in memory starting at address
    setString(address, string) {
        for (let i = 0; i < string.length; i++) {
            this.set(address + i, string.charCodeAt(i))
        }
        //null-terminate the string
        this.set(address + string.length, 0)
    }

    //get a string from memory starting at address
    getString(address) {
        let result = ''
        let byte = this.get(address)
        while (byte !== 0) {
            result += String.fromCharCode(byte)
            address += 1
            byte = this.get(address)
        }
        return result
    }

    //save Uint8 numbers
    setUint8(address, value) {
        this.dataView.setUint8(address, value)
    }
    //get Uint8 numbers
    getUint8(address) {
        return this.dataView.getUint8(address)
    }

    //set Uint16 numbers
    setUint16(address, value) {
        this.dataView.setUint16(address, value)
    }
    
    //get Uint16 numbers
    getUint16(address) {
        return this.dataView.getUint16(address)
    }

    //set Uint32 numbers
    setUint32(address, value) {
        this.dataView.setUint32(address, value)
    }

    //get Uint32 numbers
    getUint32(address) {
        return this.dataView.getUint32(address)
    }

    //set Int64
    setInt64(address, value) {
        const high = Number(value >> 32n)
        const low = Number(value & 0xffffffffn)
        this.dataView.setInt32(address, low, true)
        this.dataView.setInt32(address + 4, high, true)
    }

    //get Int64
    getInt64(address) {
        const low = BigInt(this.dataView.getInt32(address, true))
        const high = BigInt(this.dataView.getInt32(address + 4, true))
        return (high << 32n) | (low & 0xffffffffn)
    }

    setFloat64(address, value) {
        this.dataView.setFloat64(address, value, true)
    }

    getFloat64(address) {
        return this.dataView.getFloat64(address, true)
    }

    //return value at address to hex value with blockSize (default 8)
    toHex(blockSize = 8) {
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