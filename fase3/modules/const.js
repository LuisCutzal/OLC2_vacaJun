export function createCode(ope) {
    let op = ope.toUpperCase()
    if (op === 'MOV') return 1
    if (op === 'ADD') return 2
    if (op === 'SUB') return 3
    if (op === 'MUL') return 4
    if (op === 'DIV') return 5
    if (op === 'MOD') return 6

}

export const MOV = 1
export const ADD = 2
export const SUB = 3
export const MUL = 4
export const DIV = 5


