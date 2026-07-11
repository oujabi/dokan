function eventNav() {
    document.querySelector('.burger-menu').addEventListener('click',
        () => {
            document.querySelector('nav').classList.add("mobile-nav");
            document.querySelector('nav ul').classList.add("mobile-nav-list");
        }
    )
}
export default eventNav;