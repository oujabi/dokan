function event() {
    document.querySelector('.burger-menu').addEventListener('click', openNav);

    document.querySelector(".burger-menu-close").addEventListener('click', closeNav)
    document.querySelector(".burger-menu-close-area").addEventListener('click', closeNav)
    document.querySelector("main").addEventListener('click', closeNav)

    function closeNav() {

        if (document.querySelector('nav').className !== 'mobile-nav') return;

        document.querySelector('.burger-menu').style.display = "flex";
        document.querySelector('.burger-menu-close').style.display = "none";
        document.querySelector('.burger-menu-close-area').style.display = "none";
        document.querySelector('nav').classList.remove("mobile-nav");
        document.querySelector('nav ul').classList.remove("mobile-nav-list");
        document.querySelector('body').style.overflow = "visible";
        document.querySelector('.dokan-logo').style.display = "block";
    }

    function openNav() {
        document.querySelector('.burger-menu').style.display = "none";
        document.querySelector('.burger-menu-close').style.display = "flex";
        document.querySelector('.burger-menu-close-area').style.display = "block";
        document.querySelector('nav').classList.add("mobile-nav");
        document.querySelector('nav ul').classList.add("mobile-nav-list");
        document.querySelector('body').style.overflow = "hidden";
        document.querySelector('.dokan-logo').style.display = "none";
    }

    document.querySelector('.header-block-medias-illustrations').addEventListener('click', () => {
       if(document.querySelector('.body-block-medias-illustrations').style.display === "block") {
           document.querySelector('.body-block-medias-illustrations').style.display = "none";
           document.querySelector('.open-toggle-illustrations').style.display = "none";
           document.querySelector('.close-toggle-illustrations').style.display = "flex";
       } else {
           document.querySelector('.body-block-medias-illustrations').style.display = "block";
           document.querySelector('.open-toggle-illustrations').style.display = "flex";
           document.querySelector('.close-toggle-illustrations').style.display = "none";
       }
    });
git
    document.querySelector('.header-block-medias-pictures').addEventListener('click', () => {
        if(document.querySelector('.body-block-medias-pictures').style.display === "block") {
            document.querySelector('.body-block-medias-pictures').style.display = "none";
            document.querySelector('.open-toggle-pictures').style.display = "none";
            document.querySelector('.close-toggle-pictures').style.display = "flex";
        } else {
            document.querySelector('.body-block-medias-pictures').style.display = "block";
            document.querySelector('.open-toggle-pictures').style.display = "flex";
            document.querySelector('.close-toggle-pictures').style.display = "none";
        }
    });

    document.querySelector('.header-block-medias-videos').addEventListener('click', () => {
        if(document.querySelector('.body-block-medias-videos').style.display === "block") {
            document.querySelector('.body-block-medias-videos').style.display = "none";
            document.querySelector('.open-toggle-videos').style.display = "none";
            document.querySelector('.close-toggle-videos').style.display = "flex";
        } else {
            document.querySelector('.body-block-medias-videos').style.display = "block";
            document.querySelector('.open-toggle-videos').style.display = "flex";
            document.querySelector('.close-toggle-videos').style.display = "none";
        }
    });
}

export default event;