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
            return true; // Error léxico
        }
    }
    return false; // Error sintáctico
}

const analysis = async () => {
    const text = Arm64Editor.getValue();
    cleanErrorsTable(); // Limpiar la tabla de errores antes de empezar
    try {
        let resultado = PEG.parse(text);
        console.log(resultado);
        consoleResult.setValue("VALIDO");
    } catch (e) {
        console.log(PEG);
        if (e instanceof PEG.SyntaxError) {
            const errorType = isLexicalError(e) ? 'Léxico' : 'Sintáctico';
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

const addErrorToTable = (type, line, column, message) => {
    const errorTableContainer = document.getElementById('errors-table-container');
    if (!errorTableContainer.innerHTML) {
        createErrorsTable();
    }
    const tableBody = document.getElementById('errors-table-body');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td style="background-color: white;">${tableBody.rows.length + 1}</td>
        <td style="background-color: white;">${type}</td>
        <td style="background-color: white;">${line}</td>
        <td style="background-color: white;">${column}</td>
        <td style="background-color: white;">${message}</td>
    `;
    tableBody.appendChild(row);
};

const createErrorsTable = () => {
    const errorTableContainer = document.getElementById('errors-table-container');
    const table = document.createElement('table');
    table.id = 'errors-table';
    table.className = 'highlight centered';
    table.innerHTML = `
        <thead>
            <tr style="background-color: green; color: white;">
                <th>No.</th>
                <th>Tipo de error</th>
                <th>Fila</th>
                <th>Columna</th>
                <th>Mensaje</th>
            </tr>
        </thead>
        <tbody id="errors-table-body"></tbody>
    `;
    errorTableContainer.appendChild(table);
};

const cleanErrorsTable = () => {
    const errorTableContainer = document.getElementById('errors-table-container');
    errorTableContainer.innerHTML = '';
};

const btnAnalysis = document.getElementById('run');
btnAnalysis.addEventListener('click', () => analysis());

const link2 = document.getElementById('download');
link2.addEventListener('click', () => {
    saveFile("file", "s", Arm64Editor);
});
