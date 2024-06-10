let x;

document.getElementById("x").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        x = document.getElementById("x").value;
        var container = document.getElementById("mynetwork");
        var result = PEG.parse(x);
        console.log(result);
        
    }
});