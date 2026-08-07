let config = null;
let configPromise = null;

// Fonction pour charger la configuration
const loadConfig = () => {
    if (configPromise === null) {
        configPromise = fetch('/config')
            .then(r => {
                if (!r.ok) {
                    return r.json().then(err => {
                        throw new Error(`Failed to load config: ${r.status} ${r.statusText} - ${err.error || JSON.stringify(err)}`);
                    }).catch(() => {
                        throw new Error(`Failed to load config: ${r.status} ${r.statusText}`);
                    });
                }
                return r.json();
            })
            .then(c => { 
                console.log('Configuration chargée:', c);
                config = c; 
                return c; 
            });
    }
    return configPromise;
};

// Chargez la configuration dès que possible (préchargement)
loadConfig().catch(error => {
    console.error('Erreur de chargement de la configuration:', error);
});

export const sendMail = async (formData) => {
    const infoValidSubmit = document.querySelector('.info-valid');
    const infoInvalidSubmit = document.querySelector('.info-invalid');

    try {
        // Attendre que la config soit chargée
        if (!config) {
            await loadConfig();
        }

        if (!config) {
            throw new Error("Configuration non chargée: la requête /config a échoué");
        }

        if (!config.root || !config.smtpMailTo) {
            console.error('Configuration reçue du serveur:', config);
            throw new Error(`Configuration incomplète: root="${config.root}", smtpMailTo="${config.smtpMailTo}"`);
        }

        // Frontend Script: Sending email data to backend
        const message = formData.get('message')
            + "\r\n\r\n"
            + "\r\nContact: \r\n"
            + formData.get('prenom') + " " + formData.get('nom') + "\r\n"
            + "mail: " + formData.get('email') + "\r\n"
            + "tel: " + formData.get('telephone');

        const emailData = {
            from: formData.get('prenom') +" "+ formData.get('nom') + " " + "<"+formData.get('email')+">",
            to: config.smtpMailTo,
            subject: formData.get('object'),
            text: message
        };

        const response = await fetch(config.root + '/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailData)
        });

        if (response.ok) {
            infoValidSubmit.style.display = 'block';
            setTimeout(() => {window.location.reload();}, 2500);
        } else {
            infoInvalidSubmit.style.display = 'block';
            const err = await response.json().catch(() => ({ message: 'Erreur serveur' }));
            throw new Error(err.message || 'Erreur serveur');
        }
    } catch (error) {
        console.error('Error:', error);
        infoInvalidSubmit.style.display = 'block';
        throw error;
    }
};

