import {toggleMedias} from "./toggleMedias.js";

export const eventToggleMedias = () => {
    const elmsArr = [
        {
            block : document.querySelector('.block-illustrations'),
            toggle : document.querySelector('.toggle-illustrations'),
            toggleOpen : document.querySelector('.toggle-illustrations .open-toggle'),
            toggleClose : document.querySelector('.toggle-illustrations .close-toggle'),

        },
        {
            block : document.querySelector('.block-pictures'),
            toggle : document.querySelector('.toggle-pictures'),
            toggleOpen : document.querySelector('.toggle-pictures .open-toggle'),
            toggleClose : document.querySelector('.toggle-pictures .close-toggle'),

        },
        {
            block : document.querySelector('.block-videos'),
            toggle : document.querySelector('.toggle-videos'),
            toggleOpen : document.querySelector('.toggle-videos .open-toggle'),
            toggleClose : document.querySelector('.toggle-videos .close-toggle'),

        },
    ];

    elmsArr.map(elm => {
        elm.toggle.addEventListener('click', () =>
            toggleMedias(elm.block, elm.toggleOpen, elm.toggleClose)
        );

        elm.toggle.addEventListener('touch', () =>
            toggleMedias(elm.block, elm.toggleOpen, elm.toggleClose)
        );
    });
}