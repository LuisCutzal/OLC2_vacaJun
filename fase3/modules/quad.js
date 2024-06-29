class Quadruple {
    constructor() {
        this.op = '-';
        this.arg1 = '-';
        this.arg2 = '-';
        this.arg3 = '-';
        this.arg4 = '-';
        this.res = '-';
    }

    getQuadruple() {
        return {
            Op: this.op,
            Arg1: this.arg1,
            Arg2: this.arg2,
            Arg3: this.arg3,
            Arg4: this.arg4,
            Result: this.res,
        };
    }

    setOperator(op) {
        if (op) this.op = op;
    }

    getOperator() {
        return this.op;
    }

    setArg1(arg1) {
        if (arg1) this.arg1 = arg1;
    }

    getArg1() {
        return this.arg1;
    }

    setArg2(arg2) {
        if (arg2) this.arg2 = arg2;
    }

    getArg2() {
        return this.arg2;
    }

    setArg3(arg3) {
        if (arg3) this.arg3 = arg3;
    }

    getArg3() {
        return this.arg3;
    }

    setArg4(arg4) {
        if (arg4) this.arg4 = arg4;
    }

    getArg4() {
        return this.arg4;
    }

    setResult(res) {
        if (res) this.res = res;
    }

    getResult() {
        return this.res;
    }

}

import { createCode } from "./const.js";

export let quads = [];
export function generateQuads(result) {

    if (result.children.length > 0) {
        result.children.forEach(function (element) {
            //console.log(element);
            switch (element.type) {
                case "INSTRUCTION": // crear un nuevo cuadruplo por cada instrucción
                case "SECTION": // crear un nuevo cuadruplo por cada sección
                    let quad = new Quadruple();
                    quad.setOperator(element.value);
                    quad.setArg4(createCode(element.value));
                    quads.push(quad);

                    switch (element.value) {
                        case 'SVC':
                            quads[quads.length - 1].setArg1(element.children[0].value);
                            break;
                        case 'Section':
                            quads[quads.length - 1].setResult(element.children[0].value);
                            break;
                    }

                    break;

                case "DESTINATION": // Asignar el valor del resultado del cuadruplo
                    quads[quads.length - 1].setResult(element.children[0].value);
                    break;
                case "SOURCE1": // Asignar el valor del ARG1 del cuadruplo
                    quads[quads.length - 1].setArg1(element.children[0].value);
                    break;
                case "SOURCE2": // Asignar el valor del ARG2 del cuadruplo
                    quads[quads.length - 1].setArg2(element.children[0].value);
                    break;
                case "SOURCE3": // Asignar el valor del ARG3 del cuadruplo
                    quads[quads.length - 1].setArg3(element.children[0].value);
                    break;
                case "SOURCE4": // Asignar el valor del ARG4 del cuadruplo
                    quads[quads.length - 1].setArg4(element.children[0].value);
                    break;
                case "LABEL":
                    // Verificar si el label corresponde a una etiqueta de salto y asignarla al resultado
                    if (element.value === 'LABEL') quads[quads.length - 1].setResult(element.children[0].value);
                    break;
                /*case "DIRECTIVE":
                    console.log(quads)
                    quads[quads.length - 1].setOperator(element.value);
                    quads[quads.length - 1].setArg1(element.children[0].value);
                    break;*/

            }

            generateQuads(element); // llamada recursiva para ir a evaluar todos los hijos del nodo actual

        });
    }

}