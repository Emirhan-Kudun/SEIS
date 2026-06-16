# Remote Access: SSH Cloud + VPN

This workspace separates remote access into two lanes and keeps both
provider-neutral until a target is confirmed, the same way deployment targets
work in [`server-target-selection.md`](./server-target-selection.md).

| Lane | Audience | Purpose |
|---|---|---|
| SSH cloud | global / everyone | Cloud VM SSH, browser web SSH terminal, and cloud dev environments |
| VPN | team and companies | Private, identity-scoped network access |

## Contract

- Access manifest: `deploy/access-targets.json`
- Connection matrix: `deploy/access-matrix.json`
- Local value shape: `deploy/access-targets.local.example.json`
- Validator: `npm run check:access-targets`
- Setup steps: [`remote-access-runbook.md`](./remote-access-runbook.md)
- Example configs: `server/access/`

Both lanes start with `activeTarget: null`. Access stays blocked until the
confirmation questions for that lane are answered. No keys, certificates, real
hostnames, or credentials belong in Git — only public access metadata.

## Lane 1 — SSH cloud (global / everyone)

Three building blocks, layered from raw shell to managed workspace:

1. **`cloud-vm-ssh`** — a hardened cloud VM as the SSH origin.
   Key-only auth, no password login, no root login, firewall allowlist.
   Required input: `host`, `ssh_port`, `admin_key_source`.
2. **`bastion-jump-host`** (optional) — a single secure entry point.
   Internal hosts are reached with `ssh -J <bastion>` so only the bastion is
   exposed. Required input: `bastion_host`, `allowed_cidr`, `admin_key_source`.
3. **`web-ssh-terminal`** — the "global, everyone" surface: a browser SSH
   terminal (e.g. ttyd / Wetty / sshwifty) behind TLS and an auth proxy
   (SSO/OAuth), rate-limited and audit-logged. This is what makes SSH reachable
   "as cloud" from any browser without a local client.
   Required input: `public_url`, `auth_provider`, `backend_host`.
4. **`cloud-dev-environment`** — cloud development workspaces for developers
   (e.g. Coder / code-server / Gitpod / devcontainers). Ephemeral workspaces,
   scoped Git credentials, no persistent secrets baked into the image.
   Required input: `workspace_provider`, `workspace_image`, `git_source`.

> "Global / everyone" means reachable from anywhere, not unauthenticated. The
> web terminal and dev environments must always sit behind an identity gate.

## Lane 2 — VPN (team and companies)

Private access for team members and partner companies. Membership is
identity-scoped through SSO and ACLs, never public.

### Comparison

| Solution | Model | Self-host | SSO + ACL | Best for |
|---|---|---|---|---|
| **NetBird** | WireGuard mesh + control plane | Yes | Built-in | Teams + multiple companies, low ops |
| WireGuard | Raw WireGuard | Yes | Manual | Full protocol control, small scale |
| Tailscale | Managed WireGuard mesh | No (SaaS) | Built-in | Fastest setup, managed |
| OpenVPN | TLS/PKI VPN | Yes | Cert + plugins | Legacy / strict PKI requirements |

### Recommendation

**Primary: NetBird.** It is WireGuard under the hood (fast, modern), but adds a
self-hostable control plane with SSO login and per-group ACLs. That maps
directly onto "team and companies": each team or partner company becomes an ACL
group, and you keep ownership of the control plane — which fits the closed-code
posture of this repository.

- Choose **WireGuard (raw)** if you want to own the protocol layer fully and the
  peer count stays small enough to manage by hand or script.
- Choose **Tailscale** if you want zero operations and accept a SaaS control
  plane.
- Choose **OpenVPN** only if an existing PKI or compliance rule requires it.

## Activation Flow

1. Pick a candidate for the lane you are enabling.
2. Answer that lane's confirmation questions in `deploy/access-targets.json`.
3. Set `activeTarget` for the lane and fill the candidate's `requiredInput`.
4. Run `npm run check:access-targets` — it reports `blockedBy` and
   `activeTargetReady` per lane.
5. Verify with the `verify` steps in `deploy/access-matrix.json` before opening
   access to anyone.

## Rollback

Every candidate declares a `rollback` action in `deploy/access-matrix.json`
(revoke keys, disable a gateway route, remove a peer/ACL group, publish a CRL).
The lane's `rollback_contact` owns that action and must be set before access is
opened.

## Activation State

Both lanes now record a selected `activeTarget` — `web-ssh-terminal` for SSH
cloud and `netbird` for VPN. Recording the selection does **not** open access:
the real host/url/auth/control-plane values live in the gitignored
`deploy/access-targets.local.json` (shape in `access-targets.local.example.json`)
and are applied at deploy time.

- `npm run check:access-targets` reports each lane's `selected`,
  `pendingLocalValues`, and `readyToOpen`.
- On the deploy machine, after filling local values, run
  `npm run check:access-targets -- --strict` — it fails if any selected lane is
  still missing its required input.
- Access opens only after local values are in place **and** the
  `deploy/access-matrix.json` `verify` steps pass.

To stand down a lane, set its `activeTarget` back to `null`.
