{
    const errors = [];

    function buildSyntaxError(message, location, invalidChar) {
        const error = new Error(`${message}: '${invalidChar}'`);
        error.location = location;
        error.invalidChar = invalidChar;
        return error;
    }
}

start
    = _ instructions:instructions newline* { return { instructions, errors }; }

instructions
    = head:instruccion tail:(_ instruccion)*  { return [head].concat(tail.map(t => t[1])); } 

instruccion
    = comment
    / operation
    / directive
    / Label_ref
    / Label_def
    / invalid

invalid
    = !comment !operation !directive !Label_ref !Label_def !newline . {
        errors.push(buildSyntaxError("Invalid token", location(), text()));
        return null; // Continuar con el análisis
    }

comment
    = "//" text:string { return { type: "comment", comment: text }; }
    / ";" text:string { return { type: "comment", comment: text }; }
    //block comment
    / "/*" text:string "*/" { return { type: "comment", comment: text }; }

operation
    = nemonic:nemonic _ destiny:destiny "," _ source1:source "," _ source2:source { return { type: nemonic , destiny: destiny, source1_val: source1, source2_val: source2 }; }
    / nemonic:nemonic _ destiny:destiny "," _ source:source { return { type: nemonic , propositoGeneral: destiny, value: source }; }
    / nemonic:nemonic _ source:source { return { type: nemonic , value: source }; }

directive
    = "." directive_name:directive_name { return { type: "directive", name: directive_name }; }

Label_ref
    = name_ref:label_name ":" { return { type: "Label_ref", name: name_ref }; }
    
Label_def
    = _ name:label_name {return {type: "label_def", name: name}}

directive_name
    = "ascii" / "asciz" / "byte" / "word" / "dword" / "align" / "space" / "global" / "section" / "text" / "data" / "bss" / "equ" / "end"

destiny
    = "x" index:[0-9]+ {
        const value = parseInt(index.join(''), 10);
        if (value >= 0 && value <= 31) {
            return "x" + value;
        } else {
            errors.push(buildSyntaxError("Índice de destiny fuera de rango", location(), text()));
            return null; // Continuar con el análisis
        }
    }
    / register:label_name { return register; }
    / "[" direction:number "]" { return "[" + direction + "]"; }

source
    = "#" value:double { return value; }
    /  "#" value:number { return value; }
    / register:label_name { return register; }
    / "[" register:label_name "]" { return "[" + register + "]"; }
    / direction:number { return direction; }

nemonic
= "ADD" / "SUB" / "MOV" / "LDR" / "STR" / "B" / "BL" / "RET" / "CMP" / "NOP" / "SVC" / "MSR" / "MRS" 
/ "ADC" / "SBC" / "RSB" / "AND" / "ORR" / "EOR" / "BIC" / "ASR" / "LSR" / "LSL" / "ROR" / "RRX" //Aritméticos y Lógicos
/ "MVN" / "LDRB" / "STRB" / "LDRH" / "STRH" / "LDRSH" / "LDRSB"  //Movimiento y Transferencia de Datos
/ "BX" / "BLX" //Control de Flujo
/ "MUL" / "MLA" / "MLS" / "UMULL" / "UMLAL" / "SMULL" / "SMLAL" //Multiplicación
/ "QADD" / "QSUB" / "QDADD" / "QDSUB" //Instrucciones de Saturación
/ "VADD" / "VSUB" / "VMUL" / "VDIV" / "VMLA" / "VMLS" / "VMOV" / "VCVT" //Instrucciones de Punto Flotante (si el procesador tiene FPU)
/ "MCR" / "MRC" / "CDP" / "LDC" / "STC" //Coprocesadores e Instrucciones de Sistema
/ "SWP" / "SWPB" / "LDREX" / "STREX" / "CLREX" //Instrucciones de Sincronización
/ "REV" / "REV16" / "REVSH" / "BKPT" / "CLZ" / "USAD8" / "USADA8" //Instrucciones Misceláneas

label_name "label_name"
    =[a-zA-Z_][a-zA-Z0-9_]* { return text(); }

number "number"
    = "0x" hex:[a-fA-F0-9]+ { return parseInt(hex.join(""), 16) }
    / hex:[0-9a-fA-F]+ "h" { return parseInt(hex.join(""), 16) }
    / dec:[0-9]+ { return parseInt(dec.join(""), 10) }
    / bin:"0b"[01]+ { return parseInt(bin.join(""), 2) }

string "string"
    = [^\n]* { return text().trim(); }
    
double "double"
    = _ [0-9]+ "." [0-9]+ { return parseFloat(text()); }

newline = "'\r\n" / "\n" / "\r"

_ "whitespace"
    = [ \t\n\r]*