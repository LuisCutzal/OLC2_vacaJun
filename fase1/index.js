let x;

document.getElementById("x").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        x = document.getElementById("x").value;
        var container = document.getElementById("mynetwork");
        try {
            var result = PEG.parse(x);
            console.log(result);
        } catch (e) {
            console.log(e.message); // Mensaje de error
            console.log(`Error en línea ${e.location.start.line}, columna ${e.location.start.column}, offset ${e.location.start.offset}`);
            console.log(`Carácter no válido: ${e.invalidChar}`);
        }
    }
});
