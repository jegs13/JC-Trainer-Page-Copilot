// ------------------------------
// 🌙 Toggle Modo Oscuro
// ------------------------------
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    });
}

// Cargar modo desde localStorage
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
}

// ------------------------------
// 📌 Menú Responsive
// ------------------------------
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
});

// ------------------------------
// ⬆️ Botón volver arriba
// ------------------------------
const returnToTop = document.getElementById("returnToTop");

window.addEventListener("scroll", () => {
    if (window.scrollYOffset > 300) {
        returnToTop.classList.add("visible");
    } else {
        returnToTop.classList.remove("visible");
    }
});

return
