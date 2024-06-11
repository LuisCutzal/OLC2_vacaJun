let errorTable, symbolTable, Arm64Editor, consoleResult, dotStringCst = "";

$(document).ready(function () {
    Arm64Editor = editor('editor', 'text/x-rustsrc');
    consoleResult = editor('console_log', '', true, true, false);
});

function editor(id, language, lineNumbers = true, readOnly = false, styleActiveLine = true) {
    return CodeMirror.fromTextArea(document.getElementById(id), {
        lineNumbers: true,
        styleActivateLine: true,
        matchBrackets: true,
        theme: "moxer",
        mode: "text/x-rustsrc"
    });
}

function cleanEditors() {
    Arm64Editor.setValue("");
    consoleResult.setValue("");
}

function openFileDialog() {
    // Crear el objeto de tipo input para elegir el archivo a cargar
    var input = document.createElement("input");
    input.type = "file";

    // Trigger al objeto input para abrir la ventana
    input.click();

    // Manejando el archivo elegido
    input.addEventListener("change", function (event) {
        var file = event.target.files[0];
        var reader = new FileReader();

        reader.onload = function (e) {
            var fileContent = e.target.result;
            // pasar el contenido al editor
            Arm64Editor.setValue(fileContent)
        };

        reader.onerror = (e) => {
            let result = "No se pudo leer el archivo: " + " " + e.target.error;
            consoleResult.setValue(result);
        }

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
                    return 'You need to write something!'
                }
            }
        })
        fileName = name;
    }
    if (fileName) {
        download(`${fileName}.${extension}`, editor.getValue())
    }
}

const download = (name, content) => {
    let blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    let link = document.getElementById('download');
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", name)
    link.click()
}

const analysis = async () => {
    const text = Arm64Editor.getValue();
    try {
        let resultado = PEG.parse(text);
        consoleResult.setValue("VALIDO");
    } catch (error) {
        consoleResult.setValue(error.message);

        if (e instanceof FASE1.SyntaxError) {
            if (isLexicalError(e)) {
                consoleResult.setValue("Error Léxico" + e.message);

            } else {
                consoleResult.setValue("Error Sintáctico" + e.message);
            }
        } else {
            consoleResult.setValue("Error desconocido", e);
        }
    }
}


const btnAnalysis = document.getElementById('run');
btnAnalysis.addEventListener('click', () => analysis());

const link2 = document.getElementById('download');
link2.addEventListener('click', () => {
    saveFile("file", "s", Arm64Editor);
});





