import navData from '../../data/nav.js';
import assetsData from '../../data/assets.js';

function createNav() {
    const headerElement = document.createElement('header');
    let navElement = document.createElement('nav');
    let ulElement = createListOfLinks();

    headerElement.classList.add('banner');

    if (screen.width < 1024) {
        navElement = createBurgerMenu(navElement, ulElement)
    } else {
        navElement = createClassicMenu(navElement, ulElement);
    }

    headerElement.append(createLogo(), navElement);
    return headerElement;
}
export default createNav;

function createListOfLinks() {
    const ulElement = document.createElement('ul');

    ulElement.classList.add('nav-list');

    for (const key in navData) {
        const item = navData[key];
        const liElement = document.createElement('li');
        const aElement = document.createElement('a');

        liElement.classList.add('not-active');
        aElement.href = item.href;
        aElement.textContent = item.name;

        liElement.appendChild(aElement);
        ulElement.appendChild(liElement);
    }

    return ulElement;
}

function createBurgerMenu(nav, ul) {
    let divBurgerStroke = document.createElement('div');

    ul.classList.add('burger-menu-list', 'disabled');
    divBurgerStroke.classList.add('burger-menu');

    for (let i=0; i<3; i++) {
        let divBurgerLine = document.createElement('div')

        divBurgerLine.classList.add('burger-menu-line');

        divBurgerStroke.appendChild(divBurgerLine);
    }

    nav.append(divBurgerStroke, ul);

    return nav;
}

function createClassicMenu(nav, ul) {
    nav.classList.add();
    ul.classList.add();

    return nav.appendChild(ul);
}

function createLogo() {
    const logoElement = document.createElement('div');
    const spanElement = document.createElement('span');
    const aElement = document.createElement('a');

    logoElement.classList.add('dokan-logo');
    aElement.textContent = assetsData.logo.name;
    aElement.href = assetsData.logo.href;
    aElement.alt = assetsData.logo.alt;

    spanElement.appendChild(aElement);
    logoElement.appendChild(spanElement);

    return logoElement;
}

