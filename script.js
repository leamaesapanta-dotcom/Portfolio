const menuIcon = document.getElementById('menu-icon');
const navLinks = document.getElementById('nav-links');
menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuIcon.classList.toggle('active');
});
document.querySelectorAll('.nav-links a]').forEach(Link => {
    Link.addEventListener('click', () => {
        if(window.innerWidth < 768) {
            navLinks.classList.remove('active');
        }
    });
});