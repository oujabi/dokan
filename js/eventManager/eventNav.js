function eventNav() {
    if (document.querySelector('.burger-menu-list') === null)  return;

    document.querySelector('.burger-menu').addEventListener('click',
        () => {
            let burgerMenuList;
            let dokanLogo;

            document.querySelector('.burger-menu-list').classList.toggle('enabled');
            document.querySelector('.burger-menu').classList.toggle('disabled');
            document.querySelector('.citation-landing-page').classList.toggle('disabled');
            document.querySelector('button').classList.toggle('disabled');
            document.querySelector('.banner').classList.toggle('banner-vanish');

            burgerMenuList = document.querySelector('.burger-menu-list');
            dokanLogo = document.querySelector('.dokan-logo');
            burgerMenuList.prepend(dokanLogo);
        }
    )
}
export default eventNav;