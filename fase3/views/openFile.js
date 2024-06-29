export function openFileDialog() {
    var input = document.createElement("input");
    input.type = "file";
    input.click();
    return new Promise((resolve, reject) => {
        input.onchange = (event) => {
            var file = event.target.files[0];
            var reader = new FileReader();
            reader.onload = (event) => {
                resolve(event.target.result);
            };
            reader.readAsText(file);
        };
    });
}