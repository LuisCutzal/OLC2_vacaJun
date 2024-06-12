let errorTable, symbolTable, Arm64Editor, consoleResult, dotStringCst = "";

$(document).ready(function () {
    Arm64Editor = editor('editor', 'text/x-rustsrc');
    consoleResult = editor('console_log', '', true, true, false);
});

function editor(id, language, lineNumbers = true, readOnly = false, styleActiveLine = true) {
    return CodeMirror.fromTextArea(document.getElementById(id), {
        lineNumbers: lineNumbers,
        readOnly: readOnly,
        styleActiveLine: styleActiveLine,
        matchBrackets: true,
        theme: "moxer",
        mode: language
    });
}

function cleanEditors() {
    Arm64Editor.setValue("");
    consoleResult.setValue("");
    cleanErrorsTable(); // Limpiar la tabla de errores
}

function openFileDialog() {
    var input = document.createElement("input");
    input.type = "file";
    input.click();

    input.addEventListener("change", function (event) {
        var file = event.target.files[0];
        var reader = new FileReader();

        reader.onload = function (e) {
            var fileContent = e.target.result;
            Arm64Editor.setValue(fileContent);
        };

        reader.onerror = (e) => {
            let result = "No se pudo leer el archivo: " + " " + e.target.error;
            consoleResult.setValue(result);
        };

        reader.readAsText(file);
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
    const text = Arm64Editor.getValue();
    cleanErrorsTable();
    errorCounter = 0;
    try {
        let resultado = PEG.parse(text);
        console.log(resultado);
        if (resultado.errors.length > 0) {
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
        }
    } catch (e) {
        if (e instanceof PEG.SyntaxError) {
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
};

function isLexicalError(error) {
    return error.location.start.line === 1;
}

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
btnAnalysis.addEventListener('click', () => analysis());

const link2 = document.getElementById('download');
link2.addEventListener('click', () => {
    saveFile("file", "s", Arm64Editor);
});
