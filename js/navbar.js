import navData from '../data/nav.js';
import assetsData from '../data/assets.js';

function createNav() {
    const headerElement = document.createElement('header');
    const navElement = document.createElement('nav');
    const ulElement = createListOfLinks();

    headerElement.classList.add('banner');

    headerElement.append(createLogo(), navElement.appendChild(ulElement));

    return headerElement;
}
export default createNav;

function createListOfLinks() {
    const ulElement = document.createElement('ul');

    ulElement.classList.add('menu-top');

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

