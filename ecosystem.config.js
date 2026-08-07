module.exports = {
    apps: [
        {
            name: 'dokan',
            script: './server.js',
            instances: 1,
            exec_mode: 'fork',
            node_args: '--max-old-space-size=256',
            env: {
                NODE_ENV: 'production',
                SERVER_PORT: 3000,
                ROOT: 'http://localhost:3000',
                SMTP_HOST: process.env.SMTP_HOST || 'smtp.mailtrap.io',
                SMTP_PORT: process.env.SMTP_PORT || 2525,
                SMTP_USER: process.env.SMTP_USER || '',
                SMTP_PASS: process.env.SMTP_PASS || '',
                SMTP_MAIL_TO: process.env.SMTP_MAIL_TO || ''
            },
            env_production: {
                NODE_ENV: 'production'
            },
            env_development: {
                NODE_ENV: 'development',
                SERVER_PORT: 3001
            },
            cwd: '/Users/bodhi/WebstormProjects/dokan',
            watch: false,
            max_memory_restart: '256M',
            merge_logs: true,
            error_file: './logs/dokan-error.log',
            out_file: './logs/dokan-out.log',
            log_date_format: 'YYYY-MM-DD HH:mm Z'
        }
    ]
};
