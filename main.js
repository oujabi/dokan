'use strict';
import createNav from "./js/factoryElement/navbar.js";
import eventNav from "./js/eventManager/eventNav.js";

/*HTML Generator*/
document.body.prepend(createNav());

/*Event Manager*/
eventNav();


