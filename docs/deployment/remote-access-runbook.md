# Remote Access Runbook (selected candidates)

Concrete setup steps for the candidates chosen for SEIS. Plan and contract live
in [`remote-access.md`](./remote-access.md). Fill real values into a git-ignored
local file shaped like [`deploy/access-targets.local.example.json`](../../deploy/access-targets.local.example.json)
— never commit hosts, keys, or identity secrets.

Selected:

- **SSH cloud (global):** `cloud-vm-ssh` + `web-ssh-terminal` + `cloud-dev-environment`
- **VPN (team + companies):** `netbird` (fallback: raw `wireguard`)

## 1. SSH cloud

### 1a. Hardened cloud VM (`cloud-vm-ssh`)

1. Provision a small cloud VM. Add operator public keys to `~/.ssh/authorized_keys`.
2. Create the login group and install the hardening drop-in:
   ```bash
   sudo groupadd seis-ssh && sudo usermod -aG seis-ssh <operator>
   sudo cp server/access/sshd_hardening.example.conf /etc/ssh/sshd_config.d/10-seis-hardening.conf
   sudo sshd -t && sudo systemctl reload ssh
   ```
3. Restrict inbound to the SSH port at the firewall / security group.
4. Verify: `ssh -p 22 <operator>@<host> 'echo ok'` and confirm
   `sshd -T | grep -i passwordauthentication` returns `no`.

### 1b. Browser web SSH terminal (`web-ssh-terminal`)

This is the "cloud, everyone" surface — reachable from any browser, always
behind an identity gate.

1. Run ttyd bound to localhost only:
   `ttyd --interface 127.0.0.1 --port 7681 --writable login`
2. Put Caddy in front for TLS + auth using
   [`server/access/web-ssh.example.Caddyfile`](../../server/access/web-ssh.example.Caddyfile).
   Prefer `forward_auth` to your SSO/OAuth (GitHub/Google); basic auth is a stopgap only.
3. Verify: `GET https://<public_url>/` requires login, then opens an interactive shell.
4. Rollback: disable the Caddy site route and rotate the session secret.

### 1c. Cloud dev environment (`cloud-dev-environment`)

1. Pick a workspace provider (Coder / code-server / Gitpod / devcontainers).
2. Build from a devcontainer image; inject Git credentials at runtime, never bake them in.
3. Verify a workspace boots, `git clone <git_source>` works, toolchain is present.
4. Rollback: stop and delete the workspace, revoke its token.

## 2. VPN — NetBird (team + companies)

1. Self-host the NetBird management plane (or use the managed plane) and wire it
   to your identity provider (`identity_source`, e.g. Google Workspace OIDC).
2. Model teams and partner companies as groups and apply
   [`server/access/netbird-acl.example.json`](../../server/access/netbird-acl.example.json)
   — default action `deny`, each company isolated to its own group.
3. Issue scoped setup keys per group; enroll peers with the NetBird client.
4. Verify: peer shows connected, `ping` works inside an allowed group, and an
   out-of-group destination is denied by the ACL.
5. Rollback: disable the setup key and remove the peer/group from the policy.

### Fallback — raw WireGuard

If NetBird is not adopted, use
[`server/access/wireguard.example.conf`](../../server/access/wireguard.example.conf):
per-peer keypairs, least-privilege `AllowedIPs`, keys loaded from the secret
store at deploy time. Verify with `wg show` (handshake present) and a subnet ping.

## Activation

After real values are in place, set `activeTarget` for the lane in
`deploy/access-targets.json`, then run:

```bash
npm run check:access-targets
```

It reports `blockedBy` and `activeTargetReady` per lane. Only open access once
the matrix `verify` steps pass and the lane's `rollback_contact` is set.
