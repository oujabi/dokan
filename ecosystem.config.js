module.exports = {
    apps: [{
        name: 'dokan',
        script: 'server.js',
        cwd: '/var/wwww/html/dokan',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'production',
            APP_ROOT: '/var/wwww/html/dokan'
        }
    }]
};