import {parse, StartRules, SyntaxError } from './parser/parser.js'
import {openFileDialog} from './views/openFile.js'

let errorTable, symbolTable, Arm64Editor, consoleResult, dotStringCst = "", currentStr = "", Arm64Editors = [], quads = [];

$(document).ready(function () {
    addTab();
    consoleResult = editor('console_log', '', true, true, false);
    btnConsole.click();
});

//open file dialog
const btnOpen = document.getElementById('open');
btnOpen.addEventListener('click', () => {
    openFileDialog().then((content) => {
        Arm64Editor.setValue(content);
    });
});

//clean Editor
const btnClean = document.getElementById('cleanEditor')
btnClean.addEventListener('click', () => {
    Arm64Editor.setValue("");
    consoleResult.setValue("");
    cleanErrorsTable(); // Limpiar la tabla de errores
    cleanQuadsTable(); // Limpiar la tabla de cuadruplos
})

//add tab
const btnAddTab = document.getElementById('addTab')
btnAddTab.addEventListener('click', () => {
    addTab();
})

function addTab() {
    // Obtener el listado de las pestañas actuales
    let btns = document.querySelectorAll(".LEditor .textEditor .buttonTab");
    let id = btns.length;

    // crear nuevo botón de pestaña
    let btn = document.createElement('button');
    btn.textContent = "T" + id;
    btn.className = "buttonTab";

    document.getElementById('buttonContainer').appendChild(btn);

    btn.addEventListener('click', () => showSelectedTab(id));

    // Crear nueva área de texto para la pestaña
    let area = document.createElement('textarea');
    area.className = "textTab";
    area.id = id;
    document.getElementById('tabs').appendChild(area);

    // creando el nuevo code mirror
    Arm64Editors.push(editor(id, 'text/x-rustsrc'));

    showSelectedTab(id);
}


function showSelectedTab(id) {
    //Actualizar el editor del que se extraerá el texto para el análisis
    Arm64Editor = Arm64Editors[id];

    //mostrar todas las pestañas
    let btns = document.querySelectorAll(".LEditor .textEditor .buttonTab");

    btns.forEach(function (node) {
        node.style.backgroundColor = "gray";
        node.style.color = "white";
        node.style.fontFamily = "Helvetica, Sans-serif";
        node.style.borderRadius = "2px 2px 0 0";
        node.style.border = "2px";
        node.style.padding = "2px 4px";

    });

    // resaltar la pestaña seleccionada
    btns[id].style.backgroundColor = "#FF5722";

    //ocultar las todas las áreas de texto
    let codeMirrors = document.querySelectorAll('.CodeMirror');

    for (let i = 0; i < codeMirrors.length - 1; i++) {
        codeMirrors[i].style.display = 'none';
    }

    //mostrar solo el área de texto seleccionado
    codeMirrors[id].style.display = 'block';

}

function showOutputTab(id) {
    //mostrar todas las pestañas
    let btns = document.querySelectorAll(".REditor .textEditor .buttonTab");

    btns.forEach(function (node) {
        node.style.backgroundColor = "gray";
        node.style.color = "white";
        node.style.fontFamily = "Helvetica, Sans-serif";
        node.style.borderRadius = "2px 2px 0 0";
        node.style.border = "2px";
        node.style.padding = "2px 4px";

    });

    // resaltar la pestaña seleccionada
    btns[id].style.backgroundColor = "#FF5722";

    let codeMirrors = document.querySelectorAll('.CodeMirror');
    if (id == 0) {
        codeMirrors[codeMirrors.length - 1].style.display = 'block'; // mostrar la consola de salida
        document.getElementById('quadruples').style.display = 'none'; // ocultar la tabla de cuadruplos
    } else {
        codeMirrors[codeMirrors.length - 1].style.display = 'none'; // ocultar la consola de salida
        document.getElementById('quadruples').style.display = 'block'; // mostrar la tabla de cuadruplos
    }
}

function editor(id, language, lineNumbers = true, readOnly = false, styleActiveLine = true) {
    return CodeMirror.fromTextArea(document.getElementById(id), {
        lineNumbers: lineNumbers,
        readOnly: readOnly,
        styleActiveLine: styleActiveLine,
        matchBrackets: true,
        theme: "moxer",
        mode: language,
        id: id

    });
}

const saveFile = async (fileName, extension, editor) => {
    if (!fileName) {
        const { value: name } = await Swal.fire({
            title: 'Enter File name',
            input: 'text',
            inputLabel: 'File name',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!';
                }
            }
        });
        fileName = name;
    }
    if (fileName) {
        download(`${fileName}.${extension}`, editor.getValue());
    }
};

const download = (name, content) => {
    let blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    let link = document.getElementById('download');
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", name);
    link.click();
};

function isLexicalError(e) {
    const validIdentifier = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
    const validInteger = /^[0-9]+$/;
    const validRegister = /^[a-zA-Z][0-9]+$/;
    const validCharacter = /^[a-zA-Z0-9_$,\[\]#"]$/;
    if (e.found) {
        if (!validIdentifier.test(e.found) &&
            !validInteger.test(e.found) &&
            !validRegister.test(e.found) &&
            !validCharacter.test(e.found)) {
            return true;
        }
    }
    return false;
}

let errorCounter = 0;

const analysis = async () => {
    let startTime = performance.now(); // Guardar tiempo de inicio
    const text = Arm64Editor.getValue();
    //const text = currentStr;
    cleanErrorsTable();
    cleanQuadsTable();
    errorCounter = 0;
    try {
        let resultado = parse(text);
        generateCST(resultado.getDot(resultado));
        generateQuads(resultado);
        addQuadsToTable();



        /*if (resultado.errors.length > 0) {
            consoleResult.setValue("Error, ver tabla de errores");
            resultado.errors.forEach(error => {
                const errorType = error.message.includes("Unrecognized input") ? 'Sintáctico' : 'Lexico';
                console.log(error.message.includes("Unrecognized input"))
                const errorMessage = error.message;
                const errorLocation = `Fila: ${error.location.start.line}, Columna: ${error.location.start.column}`;

                addErrorToTable(errorType, error.location.start.line, error.location.start.column, errorMessage);
            });
        } else {
            consoleResult.setValue("VALIDO");
        }*/
    } catch (e) {
        if (e instanceof SyntaxError) {
            const errorType = 'Sintáctico';
            const errorMessage = e.message;
            const errorLocation = `Fila: ${e.location.start.line}, Columna: ${e.location.start.column}`;

            consoleResult.setValue(`Error, ver tabla de errores`);
            console.log(errorMessage);

            addErrorToTable(errorType, e.location.start.line, e.location.start.column, errorMessage);
        } else {
            console.error('Error desconocido:', e);
        }
    }

    let endTime = performance.now();
    const elapsedTime = (endTime - startTime).toFixed(3);
    // Mostrar el tiempo transcurrido en un elemento del DOM
    const tiempoTranscurridoElement = document.getElementById('tiempoTranscurrido');
    tiempoTranscurridoElement.textContent = `Tardó ${elapsedTime} milisegundos en completar el análisis.`;



    tiempoTranscurridoElement.style.display = 'block'; // mostrar el mensaje
    setTimeout(function () {
        tiempoTranscurridoElement.style.display = 'none'; // ocultar el mensaje después de 3 segundos
    }, 3000);

};

function cleanErrorsTable() {
    const table = document.getElementById('errorsTable');
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
}

function addErrorToTable(type, line, column, message) {
    const table = document.getElementById('errorsTable');
    const row = table.insertRow();
    row.style.backgroundColor = 'white';
    row.style.color = 'black';

    const cellNumber = row.insertCell(0);
    const cellType = row.insertCell(1);
    const cellLine = row.insertCell(2);
    const cellColumn = row.insertCell(3);
    const cellMessage = row.insertCell(4);

    cellNumber.textContent = ++errorCounter;
    cellNumber.style.border = '1px solid black';
    cellNumber.style.padding = '8px';

    cellType.textContent = type;
    cellType.style.border = '1px solid black';
    cellType.style.padding = '8px';

    cellLine.textContent = line;
    cellLine.style.border = '1px solid black';
    cellLine.style.padding = '8px';

    cellColumn.textContent = column;
    cellColumn.style.border = '1px solid black';
    cellColumn.style.padding = '8px';

    cellMessage.textContent = message;
    cellMessage.style.border = '1px solid black';
    cellMessage.style.padding = '8px';
}



const btnAnalysis = document.getElementById('run');
btnAnalysis.addEventListener('click', () => {
    analysis();

    let codeMirrors = document.querySelectorAll('.CodeMirror');

    // obtener el console log y añadirle animación cada que muestre un resultado
    codeMirrors[codeMirrors.length - 1].style.animation = "none";
    codeMirrors[codeMirrors.length - 1].offsetHeight;
    codeMirrors[codeMirrors.length - 1].style.animation = "rainbow 0.5s";


});

const link2 = document.getElementById('download');
link2.addEventListener('click', () => {
    saveFile("file", "s", Arm64Editor);
});
//-----------------------------------------------------------------------------------------
//-----------------------------------fase 2------------------------------------------------
//-----------------------------------------------------------------------------------------

function generateCST(DOTstring) {
    var container = document.getElementById("cst");
    //var DOTstring = PEG.parse(x);
    var parsedData = vis.parseDOTNetwork(DOTstring);
    var data = {
        nodes: parsedData.nodes,
        edges: parsedData.edges
    }
    console.log(data);
    var options = {
        nodes: {
            widthConstraint: 100,
        },
        layout: {
            hierarchical: {
                /*levelSeparation: 60,
                nodeSpacing: 80,
                parentCentralization: true,*/
                direction: 'UD',        // UD, DU, LR, RL
                sortMethod: 'directed',  // hubsize, directed
                //shakeTowards: 'roots'  // roots, leaves                        
            },
        },
        edges: { 
            arrows: "to",
        }
    };
    var network = new vis.Network(container, data, options);
};


function generateQuads(result) {

    if (result.children.length > 0) {
        result.children.forEach(function (element) {
            //console.log(element);
            switch (element.type) {
                case "INSTRUCTION": // crear un nuevo cuadruplo por cada instrucción
                case "SECTION": // crear un nuevo cuadruplo por cada sección
                    let quad = new Quadruple();
                    quad.setOperator(element.value);
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

function cleanQuadsTable() {
    const table = document.getElementById('quadsTable');
    while (table.rows.length > 1) {
        table.deleteRow(1);
        quads.pop();
    }

}

function addQuadsToTable() {
    const table = document.getElementById('quadsBody');

    quads.forEach(function (q) {
        const row = table.insertRow();

        const cellOp = row.insertCell(0);
        const cellArg1 = row.insertCell(1);
        const cellArg2 = row.insertCell(2);
        const cellArg3 = row.insertCell(3);
        const cellArg4 = row.insertCell(4);
        const cellRes = row.insertCell(5);

        cellOp.textContent = q.getOperator();
        cellArg1.textContent = q.getArg1();
        cellArg2.textContent = q.getArg2();
        cellArg3.textContent = q.getArg3();
        cellArg4.textContent = q.getArg4();
        cellRes.textContent = q.getResult();
    });
}

const btnConsole = document.getElementById('console_tab');
btnConsole.addEventListener('click', () => { showOutputTab(0) });

const btnQuad = document.getElementById('quad_tab');
btnQuad.addEventListener('click', () => { showOutputTab(1) });