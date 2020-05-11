const hamburger_menu = document.querySelector(".hamburger i");
const nav_bar = document.querySelector(".nav-bar");
const links = document.querySelectorAll(".nav-bar li");

$(hamburger_menu).click(function () {
    nav_bar.classList.toggle("open");
    links.forEach((link) => {
        link.classList.toggle("fade");
    });
});