export function createMenuButton() {
    let menuBtn = document.createElement("button");
    menuBtn.id = "menu-btn";
    menuBtn.innerHTML = "☰";
    document.body.appendChild(menuBtn);

    menuBtn.addEventListener("click", function () {
        let menu = document.getElementById("municipios-list");
        menu.classList.toggle("active");
    });
}
