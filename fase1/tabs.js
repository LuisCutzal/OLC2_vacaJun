var tabButtons = document.querySelectorAll(".tabContainer .tabButton")
var tabPanels = document.querySelectorAll(".tabContainer .tabPanel")

function showPannel(panelIndex, colorCode) {
    tabButtons.forEach(function (node) {
        node.style.backgroundColor = "";
        node.style.color = "";
    });

    tabButtons[panelIndex].style.backgroundColor = colorCode;
    tabButtons[panelIndex].style.color = "white";


    tabPanels.forEach(function (node) {
        node.style.display = "none";
    });

    tabPanels[panelIndex].style.display = "block";
    tabPanels[panelIndex].style.backgroundColor = colorCode;
}

const btn1 = document.getElementById('1');
const btn2 = document.getElementById('2');
const btn3 = document.getElementById('3');
const btn4 = document.getElementById('4');

btn1.addEventListener('click', () => showPannel(0, "green"));
btn2.addEventListener('click', () => showPannel(1, "blue"));
btn3.addEventListener('click', () => showPannel(2, "red"));
btn4.addEventListener('click', () => showPannel(3, "purple"));

showPannel(0, "violet");