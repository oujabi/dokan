export const sendMail = (formData) => {
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
    }).then(response => {
        if (response.ok) {

            window.location.reload();
        } else {
            return response.json().then(err => {
                throw new Error(err.message || 'Erreur serveur');
            });
        }
        }).catch(error => console.error('Error:', error));
}