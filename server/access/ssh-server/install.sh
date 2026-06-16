#!/usr/bin/env bash
# SEIS bare-metal SSH server installer (Debian/Ubuntu).
# Installs and hardens openssh-server for key-only access. Idempotent.
# Run as root on the target VM. Does NOT create or commit any keys to the repo.
set -euo pipefail

SSH_USER="${SSH_USER:-seis}"
AUTHORIZED_KEYS_SRC="${AUTHORIZED_KEYS_SRC:-./authorized_keys}"

if [ "$(id -u)" -ne 0 ]; then
  echo "Run as root (sudo)." >&2
  exit 1
fi

if [ ! -s "$AUTHORIZED_KEYS_SRC" ]; then
  echo "ERROR: $AUTHORIZED_KEYS_SRC missing or empty." >&2
  echo "Create it from authorized_keys.example with your real PUBLIC keys first." >&2
  exit 1
fi

echo "[seis-ssh] installing openssh-server"
apt-get update -y
apt-get install -y --no-install-recommends openssh-server

echo "[seis-ssh] creating user/group ${SSH_USER}"
getent group seis-ssh >/dev/null || groupadd seis-ssh
id "$SSH_USER" >/dev/null 2>&1 || useradd -m -s /bin/bash -G seis-ssh "$SSH_USER"

echo "[seis-ssh] installing authorized_keys"
install -d -m 700 -o "$SSH_USER" -g "$SSH_USER" "/home/${SSH_USER}/.ssh"
install -m 600 -o "$SSH_USER" -g "$SSH_USER" "$AUTHORIZED_KEYS_SRC" "/home/${SSH_USER}/.ssh/authorized_keys"

echo "[seis-ssh] applying hardening drop-in"
install -m 644 ../sshd_hardening.example.conf /etc/ssh/sshd_config.d/10-seis-hardening.conf

echo "[seis-ssh] validating and reloading sshd"
sshd -t
systemctl enable ssh
systemctl reload ssh || systemctl restart ssh

if command -v ufw >/dev/null 2>&1; then
  echo "[seis-ssh] allowing SSH through ufw"
  ufw allow OpenSSH || true
fi

echo "[seis-ssh] done. Verify from a client: ssh ${SSH_USER}@<host> 'echo ok'"
echo "[seis-ssh] confirm: sshd -T | grep -i passwordauthentication  (should be 'no')"
