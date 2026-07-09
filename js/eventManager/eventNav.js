function eventNav() {
    document.querySelector('.burger-menu').addEventListener('click',
        () => {
        document.querySelector('.burger-menu-list').classList.toggle('enabled');
        document.querySelector('.burger-menu').classList.toggle('disabled');
        }
    )
}
export default eventNav;