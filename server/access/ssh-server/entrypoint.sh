#!/usr/bin/env bash
# SEIS SSH server entrypoint.
# - Generates host keys on first start into the mounted /keys volume (never committed).
# - Creates the login user/group and installs its authorized_keys (mounted, read-only).
# - Refuses to start without at least one authorized public key.
set -euo pipefail

SSH_USER="${SSH_USER:-seis}"
SSH_UID="${SSH_UID:-2000}"

# 1. Host keys (persist via the /keys volume so client trust survives restarts)
if [ ! -f /keys/ssh_host_ed25519_key ]; then
  echo "[seis-ssh] generating host keys in /keys"
  ssh-keygen -t ed25519 -f /keys/ssh_host_ed25519_key -N "" -q
  ssh-keygen -t rsa -b 4096 -f /keys/ssh_host_rsa_key -N "" -q
fi
chmod 600 /keys/ssh_host_*_key

# 2. Login user + group
if ! getent group seis-ssh >/dev/null; then groupadd seis-ssh; fi
if ! id "$SSH_USER" >/dev/null 2>&1; then
  useradd -m -u "$SSH_UID" -s /bin/bash -G seis-ssh "$SSH_USER"
fi

# 3. authorized_keys (mounted read-only at /authorized_keys)
mkdir -p /etc/ssh/authorized_keys
if [ -s /authorized_keys ]; then
  install -m 600 /authorized_keys "/etc/ssh/authorized_keys/${SSH_USER}"
  chown "$SSH_USER" "/etc/ssh/authorized_keys/${SSH_USER}"
else
  echo "[seis-ssh] ERROR: /authorized_keys is empty. Mount a real authorized_keys file." >&2
  echo "[seis-ssh] Refusing to start an SSH server with no authorized keys." >&2
  exit 1
fi

# 4. Validate config and run in foreground
/usr/sbin/sshd -t -f /etc/ssh/sshd_config
echo "[seis-ssh] starting sshd on :2222 (key-only, user=${SSH_USER})"
exec /usr/sbin/sshd -D -e -f /etc/ssh/sshd_config
