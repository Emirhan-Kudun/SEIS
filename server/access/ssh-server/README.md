# SEIS SSH Server Kit

Self-contained, key-only SSH server for the SEIS `cloud-vm-ssh` candidate.
Operator-internal infrastructure — part of the remote access plan in
[`docs/deployment/remote-access.md`](../../../docs/deployment/remote-access.md).

## Security boundary (read first)

- **No private keys, host keys, or real `authorized_keys` are committed.** They
  are generated at first start (host keys → `keys/`, gitignored) or supplied by
  you (`authorized_keys`, gitignored). `.env` is gitignored too.
- The server is **key-only**: password and root login are disabled, logins are
  restricted to the `seis-ssh` group.
- The server refuses to start with an empty `authorized_keys`.

## Option A — Docker (self-contained, recommended)

```bash
cd server/access/ssh-server
cp .env.example .env                         # set SSH_USER and host port
cp authorized_keys.example authorized_keys   # add your real PUBLIC keys
docker compose up -d --build
# connect (host port defaults to 2222):
ssh -p 2222 "$(grep ^SSH_USER .env | cut -d= -f2)"@<docker-host>
```

Host keys persist in `keys/` across restarts. To rotate, delete `keys/*` and
recreate the container.

## Option B — Bare metal (Debian/Ubuntu VM)

```bash
cd server/access/ssh-server
cp authorized_keys.example authorized_keys   # add your real PUBLIC keys
sudo SSH_USER=seis AUTHORIZED_KEYS_SRC=./authorized_keys ./install.sh
```

Rollback: `sudo ./uninstall.sh` (add `REMOVE_USER=1` to also drop the user).

## Web SSH terminal (optional)

For the browser "everyone" surface, run ttyd via
[`systemd/seis-web-ssh.service`](./systemd/seis-web-ssh.service) and front it with
TLS + SSO using [`../web-ssh.example.Caddyfile`](../web-ssh.example.Caddyfile).
ttyd must stay bound to localhost; only Caddy is exposed.

## Verify

```bash
ssh -p <port> <user>@<host> 'echo ok'
sshd -T | grep -i passwordauthentication   # -> no   (bare metal)
```

## Files

| File | Purpose |
|---|---|
| `Dockerfile`, `compose.yaml`, `entrypoint.sh` | containerized sshd |
| `sshd_config` | hardened config used inside the container |
| `install.sh`, `uninstall.sh` | bare-metal provisioning + rollback |
| `systemd/seis-web-ssh.service` | localhost ttyd unit for web SSH |
| `.env.example`, `authorized_keys.example` | non-secret templates to copy |
| `keys/` | generated host keys (gitignored) |
