export const mobileNav = () => {
    //Toggle mobile menu.
    const burgerMenu = document.querySelector('.burger-menu');
    if (!burgerMenu) return;
    burgerMenu.addEventListener('click', openNav);
    burgerMenu.addEventListener('touch', openNav);

    const burgerMenuClose = document.querySelector('.burger-menu-close');
    if (!burgerMenuClose) return;
    burgerMenuClose.addEventListener('click', closeNav);
    burgerMenuClose.addEventListener('touch', closeNav);

    const burgerMenuArea = document.querySelector('.burger-menu-close-area');
    if (!burgerMenuArea) return;
    burgerMenuArea.addEventListener('click', closeNav);
    burgerMenuArea.addEventListener('touch', closeNav);

    function closeNav() {
        if (document.querySelector('nav').className !== 'mobile-nav') return;

        document.querySelector('.burger-menu').style.display = "flex";
        document.querySelector('.burger-menu-close').style.display = "none";
        document.querySelector('.burger-menu-close-area').style.display = "none";
        document.querySelector('nav').classList.remove("mobile-nav");
        document.querySelector('nav ul').classList.remove("mobile-nav-list");
        document.querySelector('body').style.overflow = "visible";
        document.querySelector('.illustrations-logo').style.display = "block";
    }
    function openNav() {
        document.querySelector('.burger-menu').style.display = "none";
        document.querySelector('.burger-menu-close').style.display = "flex";
        document.querySelector('.burger-menu-close-area').style.display = "block";
        document.querySelector('nav').classList.add("mobile-nav");
        document.querySelector('nav ul').classList.add("mobile-nav-list");
        document.querySelector('body').style.overflow = "hidden";
        document.querySelector('.illustrations-logo').style.display = "none";
    }
}