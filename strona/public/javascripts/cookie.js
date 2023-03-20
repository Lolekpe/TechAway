document.addEventListener("load", () => {
    const div = document.createElement("div");
    const parent = document.getElementById("conteiner")

    div.classList.add("ciastka");


    div.innerHTML = "Nasza strona wykorzystuje ciastka do uproszenia logowania, jak i polepszenia odczuć użytkownika. Dziękujemy za zrozumiemie!";

    div.appendChild(parent);
})