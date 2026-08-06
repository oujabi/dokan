import {toggleMedias} from "./toggleMedias.js";

export const eventToggleMedias = () => {
    const elsArr = [
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

    elsArr.map(el => {
        el.toggle.addEventListener('click', () =>
            toggleMedias(el.block, el.toggleOpen, el.toggleClose)
        );

        el.toggle.addEventListener('touch', () =>
            toggleMedias(el.block, el.toggleOpen, el.toggleClose)
        );
    });
}

eventToggleMedias()