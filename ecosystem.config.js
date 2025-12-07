module.exports = {
  apps: [
    {
      name: 'asontop-frontend',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      instances: 1,
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
    {
      name: 'asontop-api',
      script: 'dist/server.js',
      env: {
        NODE_ENV: 'production',
        API_PORT: 4001,
      },
      instances: 1,
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
    },
  ],
};
