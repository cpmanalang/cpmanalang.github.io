// Add active link highlighting on scroll
document.addEventListener("scroll", () => {
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");


let current = "";


sections.forEach(section => {
const top = section.offsetTop - 120;
if (scrollY >= top) current = section.getAttribute("id");
});


navLinks.forEach(link => {
link.classList.remove("active");
if (link.getAttribute("href") === `#${current}`) link.classList.add("active");
});
});
