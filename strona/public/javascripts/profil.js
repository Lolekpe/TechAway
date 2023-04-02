function ui(element) {
    var x = document.getElementsByClassName('container');
    for(let i = 0; i<x.length; i++) {
        x[i].style.display = "none";
    }

    document.getElementById(element).style.display = "flex";
}
function edytuj(element) {
    document.getElementById(element).style.display = "flex";
    console.log("xd?")
}
