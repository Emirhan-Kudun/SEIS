#!/usr/bin/env bash
# SEIS bare-metal SSH server rollback.
# Removes the SEIS hardening drop-in and (optionally) the login user.
# Does NOT remove openssh-server itself, to avoid locking you out by surprise.
set -euo pipefail

SSH_USER="${SSH_USER:-seis}"
REMOVE_USER="${REMOVE_USER:-0}"

if [ "$(id -u)" -ne 0 ]; then
  echo "Run as root (sudo)." >&2
  exit 1
fi

echo "[seis-ssh] removing hardening drop-in"
rm -f /etc/ssh/sshd_config.d/10-seis-hardening.conf
sshd -t && systemctl reload ssh

if [ "$REMOVE_USER" = "1" ]; then
  echo "[seis-ssh] removing user ${SSH_USER}"
  userdel -r "$SSH_USER" 2>/dev/null || true
fi

echo "[seis-ssh] rollback complete. Default sshd policy restored."
