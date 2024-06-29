//registers for ARMv8-A
class Registers {
    constructor() {
        this.registers = {
            x: new Array(32).fill(0n), // 64 bits integer
            w: new Array(32).fill(0), // 32 bits integer
            s: new Array(32).fill(0), // 32 bits single precision floating point
            d: new Array(32).fill(0n), // 64 bits double precision floating point
            h: new Array(32).fill(0), // 16 bits integer
            q: new Array(32).fill(0n), // 128 bits integer
            v: new Array(32).fill(0n), // 128 bits single precision floating point  
        }
    }

    // return register of typeRegister
    getRegister(typeRegister) {
        if (this.registers[typeRegister] !== undefined) {
            return this.registers[typeRegister]
        } else {
            throw new Error('Invalido Tipo de Registro')
        }
    }

    // set register of typeRegister
    setRegister(typeRegister, index, value) {
        if (this.registers[typeRegister] !== undefined) {
            this.registers[typeRegister][index] = typeRegister === 'x' || typeRegister === 'd' || typeRegister === 'q' || typeRegister === 'v' ? BigInt(value) : value
        } else {
            throw new Error('Invalido Tipo de Registro')
        }
    }
    //Optional: Method to get hex respresentation all of registers
    toHex(){
        const hexRegisters = {}
        for (const [key, regArray] of Object.entries(this.rgisters)){
            hexRegisters[key] = regArray.map(value =>(typeof value === 'bigint' ? '0x' + value.toString(16) : value.toString(16)))
        }
        return hexRegisters
    }
}

class specialRegisters {
    constructor() {
        this.SP = 0n // Stack Pointer
        this.PC = 0n // Program Counter
    }
    
    getSP(){
        return this.SP
    }

    setSP(value){
        this.SP = BigInt(value)
    }

    getPC(){
        return this.PC
    }

    setPC(value){
        this.PC = BigInt(value)
    }

    incrementPC(offest){
        this.PC += BigInt(offest)
    }

    decrementPC(offest){
        this.PC -= BigInt(offest)
    }

    decrementSP(offest){
        this.SP -= BigInt(offest)
    }

    incrementSP(offest){
        this.SP += BigInt(offest)
    }

    //Optional: Method to get hex respresentation all of special registers
    toHex(){
        return {
            SP: this.SP.toString(16),
            PC: this.PC.toString(16)
        }
    }
}

export {Registers, specialRegisters}  // Export the class Registers and specialRegisters