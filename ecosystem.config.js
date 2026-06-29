// PM2 process config for running the Birdhouse Next.js app on the server.
// Usage on the server (from the site root):
//   pm2 start ecosystem.config.js
//   pm2 save
// Adjust `cwd` to your CloudPanel site path if different.
module.exports = {
  apps: [
    {
      name: "birdhouse",
      cwd: "/home/birdhouse/htdocs/birdhouse.co.in",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
    },
  ],
};
