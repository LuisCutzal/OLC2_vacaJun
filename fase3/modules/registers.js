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
        this.errors = [] //{type, line, column, message}
        this.PC = 0;
    }

    //parse register name to typeRegister and index
    parseRegister(regString) {
        const match = regString.match(/^([a-z]+)(\d+)$/)
        if (!match) {
            this.errors.push("Error semantico ",this.PC,"0",`Invalid register string: ${regString}`)
            return;
            //throw new Error(`Invalid register string: ${regString}`)
        }
        return {
            type: match[1],
            index: parseInt(match[2])
        }
    }

    // return register of typeRegister
    getRegister(typeRegister) {
        const { type, index } = this.parseRegister(typeRegister);
        if (this.registers[type] !== undefined && index < this.registers[type].length) {
            return this.registers[type][index];
        } else {
            throw new Error('Invalid typeRegister or index out of range');
        }
    }

    // set register of typeRegister
    setRegister(register, value) {
        const { type, index } = this.parseRegister(register);

        if (this.registers[type] !== undefined && index < this.registers[type].length) {
            switch (type) {
                case 'x': // 64 bits integer
                case 'd': // 64 bits double precision floating point
                    value = BigInt(value);

                    if (value < -0x8000000000000000n || value > 0x7FFFFFFFFFFFFFFFn) {
                        this.errors.push({type: "Error semantico ",line:this.PC,column:"0",message:`Value out of range for 64-bit register ${type+index}: ${value} `})
                        //throw new Error(`Value out of range for 64-bit register: ${value}`);
                        return
                    }
                    if (value < 0n || value > 0xFFFFFFFFFFFFFFFFn) {
                        this.errors.push({type: "Error semantico ",line:this.PC,column:"0",message:`Value out of range for 64-bit register ${type+index}: ${value} `})
                        return
                        //throw new Error(`Value out of range for 64-bit register: ${value}`);

                    }
                    this.registers[type][index] = value;
                    break;
                case 'w': // 32 bits integer
                case 's': // 32 bits single precision floating point

                    value = Number(value);
                    if (value < -0x80000000 || value > 0x7FFFFFFF) {
                        this.errors.push({type:"Error semantico ",line:this.PC,column:"0",message:`Value out of range for 32-bit register ${type+index}: ${value}`})
                        return
                    }
                    if (value < 0 || value > 0xFFFFFFFF) {
                        this.errors.push({type:"Error semantico ",line:this.PC,column:"0",message:`Value out of range for 32-bit register ${type+index}: ${value}`})
                        return
                        //throw new Error(`Value out of range for 32-bit register: ${value}`);

                    }
                    this.registers[type][index] = value;
                    break;
                case 'h': // 16 bits integer

                    value = Number(value);
                    if (value < -0x8000 || value > 0x7FFF) {
                        this.errors.push({type:"Error semantico ",line:this.PC,column:"0",message:`Value out of range for 16-bit register: ${value}`})
                        return
                    }
                    if (value < 0 || value > 0xFFFF) {
                        this.errors.push({type:"Error semantico ",line:this.PC,column:"0",message:`Value out of range for 16-bit register: ${value}`})
                        return
                        //throw new Error(`Value out of range for 16-bit register: ${value}`);

                    }
                    this.registers[type][index] = value;
                    break;
                case 'q': // 128 bits integer
                case 'v': // 128 bits single precision floating point
                    value = BigInt(value);

                    if (value < -0x80000000000000000000000000000000n || value > 0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFn) {
                        this.errors.push({type:"Error semantico ",line:this.PC,column:"0",message:`Value out of range for 128-bit register: ${value}`})
                        return
                    }
                    if (value < 0n || value > 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFn) {
                        this.errors.push({type:"Error semantico ",line:this.PC,column:"0",message:`Value out of range for 128-bit register: ${value}`})
                        return
                        //throw new Error(`Value out of range for 128-bit register: ${value}`);

                    }
                    this.registers[type][index] = value;
                    break;
                default:
                    this.errors.push({type:"Error semantico ",line:this.PC,column:"0",message:`Unknown register type: ${type}`})
                    return
                    //throw new Error(`Unknown register type: ${type}`);
            }
        } else {
            this.errors.push({type:"Error semantico ",line:this.PC,column:"0",message:'Invalid typeRegister or index out of range'})
            return
            //throw new Error('Invalid typeRegister or index out of range');
        }
    }
    //Optional: Method to get hex respresentation all of registers
    toHex() {
        const hexRegisters = {}
        for (const [key, regArray] of Object.entries(this.registers)) {
            hexRegisters[key] = regArray.map(value => (typeof value === 'bigint' ? '0x' + value.toString(16) : value.toString(16)))
        }
        return hexRegisters
    }
}

class specialRegisters {
    constructor() {
        this.SP = 0n // Stack Pointer
        this.PC = 0n // Program Counter
    }

    getSP() {
        return this.SP
    }

    setSP(value) {
        this.SP = BigInt(value)
    }

    getPC() {
        return this.PC
    }

    setPC(value) {
        this.PC = BigInt(value)
    }

    incrementPC(offest) {
        this.PC += BigInt(offest)
    }

    decrementPC(offest) {
        this.PC -= BigInt(offest)
    }

    decrementSP(offest) {
        this.SP -= BigInt(offest)
    }

    incrementSP(offest) {
        this.SP += BigInt(offest)
    }

    //Optional: Method to get hex respresentation all of special registers
    toHex() {
        return {
            SP: this.SP.toString(16),
            PC: this.PC.toString(16)
        }
    }
}

export { Registers, specialRegisters }  // Export the class Registers and specialRegisters