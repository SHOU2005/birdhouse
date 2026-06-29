# Deploying Birdhouse to CloudPanel (standalone bundle, zip upload)

This site is a **Next.js Node.js app**. Your CloudPanel site for
`birdhouse.co.in` is currently a **PHP site**, which cannot run Next.js — so we
create a **Node.js site** and upload a prebuilt, self-contained bundle.

- **Domain:** birdhouse.co.in   **IP:** 62.72.57.144   **User:** birdhouse
- **Upload file:** `/tmp/birdhouse-standalone.zip` (≈15 MB, already built —
  no `npm install` or build needed on the server)
- **Site root (after creating the site):** `/home/birdhouse/htdocs/birdhouse.co.in`

---

## ⚠️ 0. Back up the current live site first

Recreating the site replaces the existing PHP `birdhouse.co.in`.
- CloudPanel → **Databases** → export (download) any database you need.
- CloudPanel → **File Manager** → download anything you want to keep.
  (Your new site already bundles the logo + all images, so nothing from the old
  site is required to run it.)

---

## 1. Create a Node.js site

CloudPanel → **Sites**:
1. Delete the existing **PHP** site for `birdhouse.co.in` (after backup).
2. **+ Add Site → Create a Node.js Site**
   - Domain: `birdhouse.co.in`
   - Node.js version: **20** (or 22)
   - App Port: **3000**
   - Site User: `birdhouse`

The DNS A record already points to 62.72.57.144, so no DNS change is needed.

---

## 2. Upload the bundle (File Manager)

1. CloudPanel → **File Manager** → open `/home/birdhouse/htdocs/birdhouse.co.in`.
2. Delete the default placeholder files in that folder.
3. **Upload** `birdhouse-standalone.zip`.
4. **Extract** it there. You should now see at the site root:
   `server.js`, `node_modules/`, `.next/`, `public/`, `package.json`.
   (If everything extracted into a subfolder, move the contents up so
   `server.js` sits directly in the site root.)

---

## 3. Start the app (SSH) with PM2

CloudPanel → **SSH/FTP** shows the SSH login. Then:

```bash
ssh birdhouse@62.72.57.144
cd /home/birdhouse/htdocs/birdhouse.co.in

# pm2 keeps the app running + restarts it on reboot
npm install -g pm2

# start the standalone server on port 3000
# (add your Resend key here to send real form emails; optional)
RESEND_API_KEY="" LEAD_TO_EMAIL="hello@birdhouse.co.in" PORT=3000 \
  pm2 start server.js --name birdhouse

pm2 save
pm2 startup     # then run the exact command it prints
```

Verify it's serving locally:

```bash
pm2 status
curl -I http://127.0.0.1:3000      # expect: HTTP/1.1 200 OK
```

---

## 4. Vhost — make the domain serve the app

A **Node.js site** auto-generates a reverse proxy to your app port. Confirm in
CloudPanel → **Vhost Editor** that requests proxy to `127.0.0.1:3000`. If you
need to set it, the `location` block is:

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
```

Save — CloudPanel reloads Nginx.

---

## 5. SSL

CloudPanel → **SSL/TLS → Actions → New Let's Encrypt Certificate** for
`birdhouse.co.in` (add `www.birdhouse.co.in`). It auto-renews and forces HTTPS.

---

## 6. Done — verify

Open **https://birdhouse.co.in**. Submit the contact form (expect success). Once
you add a real `RESEND_API_KEY` it will email `hello@birdhouse.co.in`.

---

## Updating later

Rebuild locally and re-make the bundle (a helper is in the repo notes), upload &
extract over File Manager, then:

```bash
pm2 restart birdhouse
```

To change the lead-email key without redeploying:

```bash
cd /home/birdhouse/htdocs/birdhouse.co.in
RESEND_API_KEY="re_xxx" PORT=3000 pm2 restart birdhouse --update-env
```

## Troubleshooting

- **502 Bad Gateway** → app isn't running on 3000. `pm2 status`, `pm2 logs birdhouse`.
- **Port mismatch** → app port (PM2 `PORT`) must equal the Vhost `proxy_pass` port.
- **`node: command not found`** → the site must be a **Node.js** site (that's
  what provides Node for the `birdhouse` user).
- Logs: `pm2 logs birdhouse` (app) and CloudPanel → **Logs** (Nginx).
