import {sendMail} from "./sendMail.js";
import {formInscriptionValidity} from "./formInscriptionValidity.js";

const eventInscriptionFormValidation = () => {
    //Send email form inscriptions.
    const inscriptionForm = document.querySelector(".formulaire-inscription");
    if (!inscriptionForm) return;
    inscriptionForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        formInscriptionValidity();
        if (inscriptionForm.checkValidity()) {
            const formData = new FormData(inscriptionForm);
            try {
                await sendMail(formData);
            } catch (error) {
                console.error('Erreur lors de l\'envoi du mail:', error);
            }
        }
    })

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

    function maxLengthErrorManager(target, targetName, errorTarget) {
        if (target.value.length === 800) {
            errorTarget.innerHTML = "Votre " + targetName + " a atteint la limite maximal.";
        } else {
            target.setCustomValidity("");
            errorTarget.innerHTML = "";

        }
    }
}

eventInscriptionFormValidation();