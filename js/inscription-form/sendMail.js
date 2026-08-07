// let config = null;
//
// // Chargez la configuration dès que possible
// fetch('/config')
//     .then(r => r.json())
//     .then(c => { config = c; });

export const sendMail = (formData) => {
    // if (!config) throw new Error("Configuration non chargée");

    // Frontend Script: Sending email data to backend
    const message = formData.get('message')
        + "\r\n\r\n"
        + "\r\nContact: \r\n"
        + formData.get('prenom') + " " + formData.get('nom') + "\r\n"
        + "mail: " + formData.get('email') + "\r\n"
        + "tel: " + formData.get('telephone');

    const emailData = {
        from: formData.get('prenom') +" "+ formData.get('nom') + " " + "<"+formData.get('email')+">",
        to: "test@test.com",
        subject: formData.get('object'),
        text: message
    };

    const infoValidSubmit = document.querySelector('.info-valid');
    const infoInvalidSubmit = document.querySelector('.info-invalid');

    fetch('http://localhost:3000' + '/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(emailData)
    }).then(response => {
        if (response.ok) {
            infoValidSubmit.style.display = 'block';
            setTimeout(() => {window.location.reload();}, 2500)
        } else {
            infoInvalidSubmit.style.display = 'block';
            return response.json().then(err => {
                throw new Error(err.message || 'Erreur serveur');
            });
        }
    }).catch(error => console.error('Error:', error));
};

