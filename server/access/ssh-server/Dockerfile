# SEIS self-contained SSH server (key-only, hardened)
# Build context is this directory. Host keys and authorized_keys are mounted at
# runtime from gitignored volumes — never baked into the image.
FROM debian:bookworm-slim

RUN apt-get update \
 && apt-get install -y --no-install-recommends openssh-server ca-certificates \
 && rm -rf /var/lib/apt/lists/* \
 && mkdir -p /run/sshd /keys

COPY sshd_config /etc/ssh/sshd_config
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Non-privileged listen port inside the container; map it on the host in compose.
EXPOSE 2222

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
