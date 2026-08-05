function event() {
    document.addEventListener('DOMContentLoaded', () => {
        //Reset empty value textarea.
        const textarea = document.querySelector('textarea');
        if (!textarea) return
        textarea.value = '';

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


    });

    //Send email form inscriptions.
    const inscriptionForm = document.querySelector(".formulaire-inscription");
    if (!inscriptionForm) return;
    inscriptionForm.addEventListener('submit', (event) => {
        event.preventDefault();
        formInscriptionValidity();
        if (inscriptionForm.checkValidity()) {
            const formData = new FormData(inscriptionForm);
            sendEmail(formData);
        }
    })

    function formInscriptionValidity() {
        //input Prenom
        const inputPrenom = document.querySelector('input[name="prenom"]');
        const errorPrenom = document.querySelector('.error-prenom');
        emptyErrorManager(inputPrenom, "Prénom", errorPrenom);

        //input Nom
        const inputNom = document.querySelector('input[name="nom"]');
        const errorNom = document.querySelector('.error-nom');
        emptyErrorManager(inputNom, "Nom", errorNom);

        //input Email
        const inputEmail = document.querySelector('input[name="email"]');
        const errorEmail = document.querySelector('.error-mail')
        emptyErrorManager(inputEmail, "email", errorEmail);
        typeErrorManager(inputEmail, "email", errorEmail);

        //input Tel
        const inputTel = document.querySelector('input[name="telephone"]');
        const errorTel = document.querySelector('.error-tel');
        patternErrorManager(inputTel, "numéro de téléphone", errorTel);

        //textarea Message
        const textareaMessage = document.querySelector('textarea[name="message"]');
        const errorMessage = document.querySelector('.error-message');
        emptyErrorManager(textareaMessage, "message", errorMessage);
    }

    //Input Validation
    const inputPrenom = document.querySelector('input[name="prenom"]');
    const errorPrenom = document.querySelector('.error-prenom');
    inputPrenom.addEventListener('input', () => {
        errorPrenom.innerHTML = "";
    })

    const inputNom = document.querySelector('input[name="nom"]');
    const errorNom = document.querySelector('.error-nom');
    inputNom.addEventListener('input', () => {
        errorNom.innerHTML = "";
    })

    const inputEmail = document.querySelector('input[name="email"]');
    const errorEmail = document.querySelector('.error-mail')
    inputEmail.addEventListener('input', () => {
        errorEmail.innerHTML = "";
    })

    const inputTel = document.querySelector('input[name="telephone"]');
    const errorTel = document.querySelector('.error-tel');
    inputTel.addEventListener('input', () => {
        errorTel.innerHTML = "";
    })

    const textareaMessage = document.querySelector('textarea[name="message"]');
    const errorMessage = document.querySelector('.error-message');
    textareaMessage.addEventListener('input', () => {
        errorMessage.innerHTML = "";
        maxLengthErrorManager(textareaMessage, "message", errorMessage);
    })


    function emptyErrorManager(target, targetName, errorTarget) {
        if (target.validity.valueMissing) {
            errorTarget.innerHTML = "Veuillez entrer votre " + targetName + ".";
        } else {
            target.setCustomValidity("");
        }
    }

    function typeErrorManager(target, targetName, errorTarget) {
        if (target.validity.typeMismatch) {
            errorTarget.innerHTML = "Veuillez entrer un " + targetName + " valide.";
        } else {
            target.setCustomValidity("");
        }
    }

    function patternErrorManager(target, targetName, errorTarget) {
        if (target.validity.patternMismatch) {
            errorTarget.innerHTML = "Veuillez entrer un " + targetName + " valide.";
        } else {
            target.setCustomValidity("");
        }
    }

    function maxLengthErrorManager(target, targetName, errorTarget) {
        if (target.value.length === 800) {
            errorTarget.innerHTML = "Votre " + targetName + " a atteint la limite maximal.";
        } else {
            target.setCustomValidity("");
            errorTarget.innerHTML = "";

        }
    }

    function sendEmail(formData) {
        // Frontend Script: Sending email data to backend
        const message = formData.get('message')
            + "\r\n\r\n"
            + "\r\nContact: \r\n"
            + formData.get('prenom') + " " + formData.get('nom') + "\r\n"
            + "mail: " + formData.get('email') + "\r\n"
            + "tel: " + formData.get('telephone');

        const emailData = {
            from: formData.get('prenom') +" "+ formData.get('nom') + " " + "<"+formData.get('email')+">",
            subject: formData.get('object'),
            text: message
        };

        const rootSendMailTest = 'http://localhost:3000';

        fetch(rootSendMailTest+'/send-email', {
            method: 'POST',
            headers: {  'Content-Type': 'application/json',
                        // 'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(emailData)
        }).then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    }
}

export default event;