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
    = _ instructions:instructions _ newline* { return { instructions, errors }; }

instructions
    = head:instruction tail:(_ instruction)*  { return [head].concat(tail.map(t => t[1])); } 

instruction
    = comment
    / directive
    / label_ref
    / operation
    / label_def
    / invalid

invalid
    =  !directive_name !nemonic  !number !string !double !newline !_ . {
        errors.push(buildSyntaxError("Invalid token", location(), text(), "Léxico"));
        return null; // Continuar con el análisis
    	}
    / !comment !block_comment !operation !directive !label_ref !label_def !destiny !source. {
        errors.push(buildSyntaxError("Invalid Sintax", location(), text(), "Sintáctico"));
        return null; // Continuar con el análisis
    }

comment
    = "//" text:string { return { type: "comment", comment: text }; }
    / ";" text:string { return { type: "comment", comment: text }; }
    //block comment
    / "/*" text:block_comment "*/" { return { type: "comment", comment: text }; }

block_comment
  = (!"*/" .)* { return text(); }

operation
    = nemonic:nemonic _ destiny:destiny "," _ source1:source "," _ source2:source { return { nemonic: nemonic , destiny: destiny, source1_val: source1, source2_val: source2 }; }
    / nemonic:nemonic _ destiny:destiny "," _ source:source { return { nemonic: nemonic , destiny: destiny, value: source }; }
    / nemonic:nemonic _ source:source _ { return { nemonic: nemonic , value: source }; }

directive
    = "." directive_name:directive_name _ value:(number / string / char / double) { return { type: "directive", name: directive_name, value: value || null }}


label_ref
    = _ name:identifier ":" _ { return { type: "label_ref", name: name }; }
    
label_def
    = _ name:identifier _ {return {type: "label_def", name: name}}

directive_name
    = "ascii" / "asciz" / "byte" / "word" / "dword" / "align" / "space" / "global" / "section" / "text" / "data" / "bss" / "equ" / "end" / "rodata"

destiny
    = register:register { return register; }
    / identifier:identifier { return register; }
    / "[" direction:number "]" { return "[" + direction + "]"; }

source
    = "#" value:double { return value; }
    /  "#" value:number { return value; }
    / "#" char:char { return char; }
    / identifier:identifier { return identifier; }
    / register:register { return register; }
    / "=" identifier:identifier { return identifier; }
    / "[" register:register "]" { return "[" + register + "]"; }
    / direction:number { return direction; }

nemonic
    = [a-zA-Z]+ {
        const textValue = text().toUpperCase();
        const validNemonics = [
            "ADD", "SUB", "MOV", "LDR", "STR", "B", "BL", "RET", "BLT" , "BGT" , "CMP", "NOP", "SVC", "MSR", "MRS",
            "ADC", "SBC", "RSB", "AND", "ORR", "EOR", "BIC", "ASR", "LSR", "LSL", "ROR", "RRX", 
            "MVN", "LDRB", "STRB", "LDRH", "STRH", "LDRSH", "LDRSB", "BX", "BLX", "MUL", "MLA", 
            "MLS", "UMULL", "UMLAL", "SMULL", "SMLAL", "QADD", "QSUB", "QDADD", "QDSUB", "VADD", 
            "VSUB", "VMUL", "VDIV", "VMLA", "VMLS", "VMOV", "VCVT", "MCR", "MRC", "CDP", "LDC", 
            "STC", "SWP", "SWPB", "LDREX", "STREX", "CLREX", "REV", "REV16", "REVSH", "BKPT", 
            "CLZ", "USAD8", "USADA8", "BNE", "BEQ", "BPL", "BMI", "BVC", "BVS", "BCC", "BCS",
        ];

        if (validNemonics.includes(textValue)) {
            return textValue.toLowerCase();
        }
    }

register "register" 
    = "x" reg:[0-9]+ {
        const value = parseInt(reg.join(''), 10);
        if (value >= 0 && value <= 31) {
            return "x" + value;
        } else {
            errors.push(buildSyntaxError("Índice de registro fuera de rango", location(), text()));
            return null; // Continuar con el análisis
        }
    }
    / "w" reg:[0-9]+ {
        const value = parseInt(reg.join(''), 10);
        if (value >= 0 && value <= 31) {
            return "w" + value;
        } else {
            errors.push(buildSyntaxError("Índice de registro fuera de rango", location(), text()));
            return null; // Continuar con el análisis
        }
    }
    / "v" reg:[0-9]+ {
        const value = parseInt(reg.join(''), 10);
        if (value >= 0 && value <= 31) {
            return "v" + value;
        } else {
            errors.push(buildSyntaxError("Índice de registro fuera de rango", location(), text()));
            return null; // Continuar con el análisis
        }
    }
    / "sp" { return "sp" }
    / "lr" { return "lr" }
    / "pc" { return "pc" }
    / identifier:identifier { return identifier; }

identifier "identifier"
    =[a-zA-Z_][a-zA-Z0-9_]* { return text(); }

number "number"
    = "0x" hex:[a-fA-F0-9]+ { return parseInt(hex.join(""), 16) }
    / hex:[0-9a-fA-F]+ "h" { return parseInt(hex.join(""), 16) }
    / dec:[0-9]+ { return parseInt(dec.join(""), 10) }
    / bin:"0b"[01]+ { return parseInt(bin.join(""), 2) }

char 'char'
    = "'"[^']"'" { return text().trim(); }

string "string"
    = [^\n]* { return text().trim(); }
    
double "double"
    = _ [0-9]+ "." [0-9]+ { return parseFloat(text()); }

newline = "\r\n" / "\n" / "\r"

_ "whitespace"
    = [ \t\n\r]*