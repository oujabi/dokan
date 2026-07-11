function eventNav() {
    document.querySelector('.burger-menu').addEventListener('click',
        () => {
            document.querySelector('.burger-menu').style.display = "none";
            document.querySelector('.burger-menu-close').style.display = "flex";
            document.querySelector('nav').classList.add("mobile-nav");
            document.querySelector('nav ul').classList.add("mobile-nav-list");
        }
    );

    document.querySelector(".burger-menu-close").addEventListener('click', () => {
        document.querySelector('.burger-menu').style.display = "flex";
        document.querySelector('.burger-menu-close').style.display = "none";
        document.querySelector('nav').classList.remove("mobile-nav");
        document.querySelector('nav ul').classList.remove("mobile-nav-list");
    })

}
export default eventNav;