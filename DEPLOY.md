# Deploying Birdhouse to CloudPanel

This is a **Next.js (Node.js) app** — it must run as a Node process behind
CloudPanel's Nginx (reverse proxy). It is **not** static hosting, because it
uses API routes (`/api/lead`) and image optimization.

- **Domain:** birdhouse.co.in
- **Server IP:** 62.72.57.144
- **Site user:** birdhouse
- **Assumed site root:** `/home/birdhouse/htdocs/birdhouse.co.in`

---

## 1. Create a Node.js site in CloudPanel

In CloudPanel → **Sites → + Add Site → Create a Node.js Site**:

- Domain name: `birdhouse.co.in`
- Node.js version: **20 LTS** (or 22)
- App Port: **3000**
- Site User: `birdhouse`

(If the site already exists as a different type, delete and recreate it as a
**Node.js** site — that auto-generates the correct reverse-proxy Vhost.)

Make sure DNS for `birdhouse.co.in` points an **A record → 62.72.57.144**.

---

## 2. Get the code onto the server

SSH in (CloudPanel → SSH/FTP shows the credentials):

```bash
ssh birdhouse@62.72.57.144
cd /home/birdhouse/htdocs/birdhouse.co.in
```

**Option A — Git (recommended).** Push this project to GitHub, then on the server:

```bash
# remove the default placeholder files first if the folder isn't empty
git clone https://github.com/<you>/birdhouse.git .
```

**Option B — Upload.** Zip the project locally **excluding** `node_modules` and
`.next`, upload via CloudPanel File Manager / SFTP, and extract into the site root.

---

## 3. Install, configure env, and build (on the server)

```bash
cd /home/birdhouse/htdocs/birdhouse.co.in

# install Node deps
npm ci   # (or: npm install)

# create the production env file (lead-form email). See .env.example
cat > .env <<'EOF'
RESEND_API_KEY=your_real_resend_key_here
LEAD_FROM_EMAIL="Birdhouse <noreply@birdhouse.co.in>"
LEAD_TO_EMAIL="hello@birdhouse.co.in"
EOF

# build for production
npm run build
```

> The form works without `RESEND_API_KEY` (it just logs submissions). Add a real
> key from https://resend.com and verify your domain there to send live email.

---

## 4. Run the app with PM2 (keeps it alive + auto-starts on reboot)

```bash
# install pm2 once (globally)
npm install -g pm2

# start using the included config
pm2 start ecosystem.config.js
pm2 save
pm2 startup   # run the command it prints, to enable boot startup
```

Check it's up:

```bash
pm2 status
curl -I http://127.0.0.1:3000      # should return HTTP/1.1 200 OK
```

---

## 5. Vhost (reverse proxy) — CloudPanel → Vhost Editor

A **Node.js site** generates this automatically. If you need to set/verify it,
the proxy block should look like this (CloudPanel wraps it with the SSL +
server_name parts):

```nginx
location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}

# Long-cache Next.js immutable static assets
location /_next/static/ {
    proxy_pass http://127.0.0.1:3000;
    proxy_cache_valid 200 60m;
    add_header Cache-Control "public, max-age=31536000, immutable";
}
```

Save → CloudPanel reloads Nginx automatically.

---

## 6. SSL — CloudPanel → SSL/TLS

Click **Actions → New Let's Encrypt Certificate** for `birdhouse.co.in`
(add `www.birdhouse.co.in` too). CloudPanel installs and auto-renews it and
forces HTTPS.

---

## 7. Verify

Open https://birdhouse.co.in — you should see the site. Submit the contact form
and confirm a 200 (and an email once the Resend key is set).

---

## Updating the site later

```bash
cd /home/birdhouse/htdocs/birdhouse.co.in
git pull            # or re-upload changed files
npm ci
npm run build
pm2 restart birdhouse
```

---

## Notes / gotchas

- **Node 20+ required** (Next.js 16). Set this in the CloudPanel Node.js site.
- The **AITOPIA browser-extension hydration warning** you saw is a local dev
  thing only — it never appears on the production build.
- If port 3000 is taken, change it in **both** `ecosystem.config.js` and the
  Vhost `proxy_pass`, then `pm2 restart birdhouse`.
- Logs: `pm2 logs birdhouse` (app) and CloudPanel → Logs (Nginx).
