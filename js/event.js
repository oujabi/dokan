function event() {
    document.addEventListener('DOMContentLoaded', () => {
        //Toggle mobile menu.
        const burgerMenu = document.querySelector('.burger-menu');
        if (!burgerMenu) return;
        burgerMenu.addEventListener('click', openNav);
        burgerMenu.addEventListener('touch', openNav);

        const burgerMenuClose = document.querySelector('.burger-menu-close');
        if (!burgerMenuClose) return;
        burgerMenuClose.addEventListener('click', closeNav);
        burgerMenuClose.addEventListener('touch', closeNav);

        const burgerMenuArea = document.querySelector('.burger-menu-close-area');
        if (!burgerMenuArea) return;
        burgerMenuArea.addEventListener('click', closeNav);
        burgerMenuArea.addEventListener('touch', closeNav);

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

        //Toggle medias.
        const headerIllustration = document.querySelector('.header-block-medias-illustrations');
        if (!headerIllustration) return;
        headerIllustration.addEventListener('click', () => {
           toggleIllustration()
        });
        headerIllustration.addEventListener('touch', () => {
            toggleIllustration();
        });
        function toggleIllustration() {
            const bodyIllustration = document.querySelector('.body-block-medias-illustrations');
            if(bodyIllustration.style.display === "block") {
                bodyIllustration.style.display = "none";
                document.querySelector('.open-toggle-illustrations').style.display = "none";
                document.querySelector('.close-toggle-illustrations').style.display = "flex";
            } else {
                bodyIllustration.style.display = "block";
                document.querySelector('.open-toggle-illustrations').style.display = "flex";
                document.querySelector('.close-toggle-illustrations').style.display = "none";
            }
        }

        const headerPictures = document.querySelector('.header-block-medias-pictures');
        if (!headerPictures) return;
        headerPictures.addEventListener('click', () => {
            togglePictures();
        });
        headerPictures.addEventListener('touch', () => {
            togglePictures();
        });
        function togglePictures() {
            const bodyPictures = document.querySelector('.body-block-medias-pictures');
            if (bodyPictures.style.display === "block") {
                bodyPictures.style.display = "none";
                document.querySelector('.open-toggle-pictures').style.display = "none";
                document.querySelector('.close-toggle-pictures').style.display = "flex";
            } else {
                bodyPictures.style.display = "block";
                document.querySelector('.open-toggle-pictures').style.display = "flex";
                document.querySelector('.close-toggle-pictures').style.display = "none";
            }
        }

        const headerVideo = document.querySelector('.header-block-medias-videos');
        if (!headerVideo) return;
        headerVideo.addEventListener('click', () => {
            toggleVideos()
        });
        headerVideo.addEventListener('touch', () => {
          toggleVideos()
        });
        function toggleVideos() {
            const bodyVideos = document.querySelector('.body-block-medias-videos');
            if (bodyVideos.style.display === "block") {
                bodyVideos.style.display = "none";
                document.querySelector('.open-toggle-videos').style.display = "none";
                document.querySelector('.close-toggle-videos').style.display = "flex";
            } else {
                bodyVideos.style.display = "block";
                document.querySelector('.open-toggle-videos').style.display = "flex";
                document.querySelector('.close-toggle-videos').style.display = "none";
            }
        }

        //Send email form inscriptions.
        const inscriptionValidation = document.querySelector('.formulaire-inscription-validation');
        if (!inscriptionValidation) return;
        inscriptionValidation.addEventListener('click', () => {
            console.log('Formulaire d\'inscription validé');
        });
    });
}

export default event;