    start
        = _ instructions:instructions { return instructions; }

    instructions
        = head:instruccion tail:(_ instruccion)* { return [head].concat(tail.map(t => t[1])); }

    instruccion
        = comment
        / operation
        / directive
        / Label_ref
        / Label_def

    comment
        = "//" text:string { return { type: "comment", comment: text }; }
        / ";" text:string { return { type: "comment", comment: text }; }

    operation
        = nemonic:nemonic _ destiny:destiny "," _ source:source { return { type: nemonic , propositoGeneral: destiny, value: source }; }
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
                throw new Error("Índice de destiny fuera de rango");
            }
        }
        / register:label_name { return register; }
        / "[" direction:Hexadecimal "]" { return "[" + direction + "]"; }

    source
        = "#" value:Double { return value; }
        /  "#" value:Integer { return value; }
        / register:label_name { return register; }
        / "[" register:label_name "]" { return "[" + register + "]"; }
        / direction:Hexadecimal { return direction; }

    nemonic
    = "ADD" / "SUB" / "MOV" / "LDR" / "STR" / "B" / "BL" / "RET" / "CMP" / "NOP" / "SVC" / "MSR" / "MRS" { return text();}


    label_name "label_name"
        =[a-zA-Z_][a-zA-Z0-9_]* { return text(); }

    Hexadecimal "hexadecimal"
        = "0x" hex:[a-fA-F0-9]+ { return parseInt(hex.join(""), 16) }
        / hex:[0-9a-fA-F]+ "h" { return parseInt(hex.join(""), 16) }
        / dec:[0-9]+ { return parseInt(dec.join(""), 10) }
        / bin:"0b"[01]+ { return parseInt(bin.join(""), 2) }

    string "string"
        = [^\n]* { return text().trim(); }
        
    Double "double"
        = _ [0-9]+ "." [0-9]+ { return parseFloat(text()); }
        
    Integer "integer"
    = _ [0-9]+ { return parseInt(text(), 10); }

    _ "whitespace"
        = [ \t\n\r]*


