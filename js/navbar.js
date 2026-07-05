import navData from './../json/datasOfNav.json' with { type: 'json' };

function createNav() {
    const headerElement = document.createElement('header');
    const logoElement = document.createElement('img');
    const navElement = document.createElement('nav');

    const ulElement = createListOfLinks();

    headerElement.append(logoElement, navElement.appendChild(ulElement), );

    return navElement.appendChild(ulElement);
}

export default createNav;

function createListOfLinks() {
    const ulElement = document.createElement('ul');

    for (const key in navData) {
        const item = navData[key];
        const liElement = document.createElement('li');
        const aElement = document.createElement('a');

        aElement.href = item.href;
        aElement.textContent = item.name;

        liElement.appendChild(aElement);
        ulElement.appendChild(liElement);
    }

    return ulElement;
}

function createLogo() {}

