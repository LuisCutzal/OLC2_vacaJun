export function createCode(ope) {
    let op = ope.toUpperCase()
    /*****************Arithmetic Instructions***********************/
    if (op === 'ADC') return 1
    if (op === 'ADCS') return 2
    if (op === 'ADD') return 3
    if (op === 'ADDS') return 4
    if (op === 'ADR') return 5
    if (op === 'ADRP') return 6
    if (op === 'CMN') return 7
    if (op === 'CMP') return 8
    if (op === 'MADD') return 9
    if (op === 'MNEG') return 10
    if (op === 'MSUB') return 11
    if (op === 'MUL') return 12
    if (op === 'NEG') return 13
    if (op === 'NEGS') return 14
    if (op === 'NGC') return 15
    if (op === 'NGCS') return 16
    if (op === 'SBC') return 17
    if (op === 'SBCS') return 18
    if (op === 'SDIV') return 19
    if (op === 'DIV') return 20
    if (op === 'SMADDL') return 21
    if (op === 'SMNEGL') return 22
    if (op === 'SMSUBL') return 23
    if (op === 'SMULH') return 24
    if (op === 'SMULL') return 25
    if (op === 'SUB') return 26
    if (op === 'SUBS') return 27
    if (op === 'UDIV') return 28
    if (op === 'UMADDL') return 29
    if (op === 'UMNEGL') return 30
    if (op === 'UMSUBL') return 31
    if (op === 'UMULH') return 32
    if (op === 'UMULL') return 33
    /*****************Bit Manipulation Instructions***********************/
    if (op === 'BFI') return 34
    if (op === 'BFXIL') return 35
    if (op === 'CLS') return 36
    if (op === 'CLZ') return 37
    if (op === 'EXTR') return 38
    if (op === 'SBFIZ') return 39
    if (op === 'UBFIZ') return 40
    if (op === 'SBFX') return 41
    if (op === 'UBFX') return 42
    if (op === 'SXTB') return 43
    if (op === 'SXTH') return 44
    if (op === 'UXTB') return 45
    if (op === 'UXTH') return 46
    /*****************Logical y Move Instructions***********************/
    if (op === 'ANDS') return 47
    if (op === 'AND') return 48
    if (op === 'ASR') return 49
    if (op === 'EOR') return 50
    if (op === 'LSL') return 51
    if (op === 'LSR') return 52
    if (op === 'MOV') return 53
    if (op === 'MVN') return 54
    if (op === 'ORR') return 55
    if (op === 'ROR') return 56
    /*****************Branch Instructions***********************/
    if (op === 'BEQ') return 57
    if (op === 'BNE') return 58
    if (op === 'BCS') return 59
    if (op === 'BCC') return 60
    if (op === 'BMI') return 61
    if (op === 'BPL') return 62
    if (op === 'BVS') return 63
    if (op === 'BVC') return 64
    if (op === 'BHI') return 65
    if (op === 'BLS') return 66
    if (op === 'BGE') return 67
    if (op === 'BLT') return 68
    if (op === 'BGT') return 69
    if (op === 'BLE') return 70
    if (op === 'BAL') return 71
    if (op === 'BL') return 72
    if (op === 'BLR') return 73
    if (op === 'BR') return 74
    if (op === 'B') return 75
    if (op === 'CBNZ') return 76 
    if (op === 'CBZ') return 77
    if (op === 'RET') return 78
    if (op === 'TBNZ') return 79
    if (op === 'TBZ') return 80
    /*****************Load y Store Instructions***********************/
    if (op === 'LDP') return 81
    if (op === 'STP') return 82
    /*****************Load y Store Instructions***********************/
    //if (op === 'EOR') return 83
    if (op === 'LABEL') return 83
    /*****************Directive name***********************/
    if (op === 'ALIGN') return 84
    if (op === 'ASCII') return 85
    if (op === 'ASCIZ') return 86
    if (op === 'BYTE') return 87
    if (op === 'HWORD') return 88
    if (op === 'WORD') return 89
    if (op === 'QUAD') return 90
    if (op === 'DATA') return 91
    if (op === 'TEXT') return 92
    if (op === 'GLOBAL') return 93
    if (op === 'SECTION') return 94
    if (op === 'SPACE') return 95
    if (op === 'ZERO') return 96
    if (op === 'INCBIN') return 97
    if (op === 'SET') return 98
    if (op === 'EQU') return 99
    if (op === 'BSS') return 100
    if (op === 'SKIP') return 101
    if (op === 'DIRECTIVE') return 102 
    /*****************Conditional Instructions***********************/
    if (op === 'CSEL') return 103 
    if (op === 'CSET') return 104 
    /*****************Addressing Modes***********************/
    if (op === 'LDR') return 105
    if (op === 'LDRB') return 106
    if (op === 'LABEL:') return 107
    if (op === 'STR') return 108
    if (op === 'STRB') return 109
    if (op === 'SVC') return 110
    if (op === 'SP') return 111
    if (op === 'LR') return 112
    if (op === 'XZR') return 113
    if (op === 'ZR') return 114
    if (op === 'PC') return 115
    if (op === 'W') return 116
    if (op === 'WZR') return 117
    if (op === 'D_NUM') return 118
    if (op === 'NUM') return 119
    if (op === 'REG') return 120
    if (op === 'ISLABEL') return 121
    if (op === 'ERRORTYPE') return 122
    if (op === 'EQ') return 123
    if (op === 'NE') return 124
    if (op === 'CS') return 125
    if (op === 'CC') return 126
    if (op === 'MI') return 127
    if (op === 'PL') return 128
    if (op === 'VS') return 129
    if (op === 'VC') return 130
    if (op === 'HI') return 131
    if (op === 'LS') return 132
    if (op === 'GE') return 133
    if (op === 'LT') return 134
    if (op === 'GT') return 135
    if (op === 'LE') return 136
    if (op === 'AL') return 137

}

export const ADC = 1
export const ADCS = 2
export const ADD = 3
export const ADDS = 4
export const ADR = 5
export const ADRP = 6
export const CMN = 7
export const CMP = 8
export const MADD = 9
export const MNEG = 10
export const MSUB = 11
export const MUL = 12
export const NEG = 13
export const NEGS = 14
export const NGC = 15
export const NGCS = 16
export const SBC = 17
export const SBCS = 18
export const SDIV = 19
export const DIV = 20
export const SMADDL = 21
export const SMNEGL = 22
export const SMSUBL = 23
export const SMULH = 24
export const SMULL = 25
export const SUB = 26
export const SUBS = 27
export const UDIV = 28
export const UMADDL = 29
export const UMNEGL = 30
export const UMSUBL = 31
export const UMULH = 32
export const UMULL = 33
    /*****************Bit Manipulation Instructions***********************/
export const BFI = 34
export const BFXIL = 35
export const CLS = 36
export const CLZ = 37
export const EXTR = 38
export const SBFIZ = 39
export const UBFIZ = 40
export const SBFX = 41
export const UBFX = 42
export const SXTB = 43
export const SXTH = 44
export const UXTB = 45
export const UXTH = 46
    /*****************Logical y Move Instructions***********************/
export const ANDS = 47
export const AND =48
export const ASR = 49
export const EOR = 50
export const LSL = 51
export const LSR = 52 
export const MOV = 53
export const MVN = 54
export const ORR = 55
export const ROR = 56
    /*****************Branch Instructions***********************/
export const BEQ = 57
export const BNE = 58
export const BCS = 59
export const BCC = 60
export const BMI = 61
export const BPL = 62
export const BVS = 63
export const BVC = 64
export const BHI = 65
export const BLS = 66
export const BGE = 67
export const BLT = 68
export const BGT = 69
export const BLE = 70
export const BAL = 71
export const BL = 72
export const BLR = 73
export const BR = 74
export const B = 75
export const CBNZ = 76
export const CBZ = 77
export const RET =78
export const TBNZ = 79
export const TBZ = 80
    /*****************Load y Store Instructions***********************/
export const LDP = 81
export const STP = 82
    /*****************Load y Store Instructions***********************/
//export const EOR = 83
export const LABEL = 83
    /*****************Directive name***********************/
export const ALIGN = 84
export const ASCII = 85
export const ASCIZ = 86
export const BYTE = 87
export const HWORD = 88
export const WORD = 89
export const QUAD = 90
export const DATA = 91
export const TEXT = 92
export const GLOBAL = 93
export const SECTION = 94
export const SPACE = 95
export const ZERO = 96
export const INCBIN = 97
export const SET = 98
export const EQU = 99
export const BSS = 100
export const SKIP = 101
export const DIRECTIVE = 102
    /*****************Conditional Instructions***********************/
export const CSEL = 103
export const CSET = 104
    /*****************Addressing Modes***********************/
export const LDR = 105
export const LDRB = 106
export const LABEL_ = 107 //es esto -> LABEL:
export const STR = 108
export const STRB = 109
export const SVC = 110
export const SP = 111
export const LR = 112
export const XZR = 113
export const ZR = 114
export const PC = 115
export const W = 116
export const WZR = 117
//-------------------
export const D_NUM = 118 //numero
export const NUM = 119 //#numero
export const REG = 120 //registro
export const ISLABEL = 121 //es esto -> LABEL:
export const ERRORTYPE = 122 
    /*****************CONDITION CODES***********************/
export const EQ = 123
export const NE = 124 
export const CS = 125 
export const CC = 126 
export const MI = 127 
export const PL = 128 
export const VS = 129 
export const VC = 130 
export const HI = 131 
export const LS = 132 
export const GE = 133
export const LT = 134
export const GT = 135
export const LE = 136
export const AL = 137