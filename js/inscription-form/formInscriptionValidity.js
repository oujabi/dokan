export const formInscriptionValidity = () => {
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