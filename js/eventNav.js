function eventNav() {
    document.querySelector('.burger-menu').addEventListener('click',
        () => {
            document.querySelector('.burger-menu').style.display = "none";
            document.querySelector('.burger-menu-close').style.display = "flex";
            document.querySelector('nav').classList.add("mobile-nav");
            document.querySelector('nav ul').classList.add("mobile-nav-list");
            document.querySelector('body').style.overflow = "hidden";
            document.querySelector('.dokan-logo').style.display = "none";
        }
    );

    document.querySelector(".burger-menu-close").addEventListener('click', closeNav)

    document.querySelector("main").addEventListener('click', closeNav)

    function closeNav() {
        document.querySelector('.burger-menu').style.display = "flex";
        document.querySelector('.burger-menu-close').style.display = "none";
        document.querySelector('nav').classList.remove("mobile-nav");
        document.querySelector('nav ul').classList.remove("mobile-nav-list");
        document.querySelector('body').style.overflow = "visible";
        document.querySelector('.dokan-logo').style.display = "block";
    }

}
export default eventNav;