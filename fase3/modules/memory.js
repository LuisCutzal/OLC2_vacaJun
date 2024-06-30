let memory = []

//init memory with size
function initMemory(size) {
    if (size <= 0) {
        throw new Error('Memory size must be greater than 0')
    }
    memory = new Array(size).fill(0)
}

//get memory
function getMemory() {
    return memory
}

//set memory at address
function setMemory(address, value) {
    if (address < 0 || address >= memory.length) {
        throw new Error('Invalid memory address')
    }
    memory[address] = value
}

export { initMemory, getMemory, setMemory }


