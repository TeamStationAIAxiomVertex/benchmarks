#!/usr/bin/env bash
set -euo pipefail

: "${FTP_HOST:?Set FTP_HOST}"
: "${FTP_USER:?Set FTP_USER}"
: "${FTP_PASS:?Set FTP_PASS}"

LOCAL_DIR="${LOCAL_DIR:-build}"
REMOTE_DIR="${FTP_REMOTE_DIR:-/var/www/benchmarks.teamstation.dev}"
FTP_PORT="${FTP_PORT:-21}"
FTP_PROTOCOL="${FTP_PROTOCOL:-ftp}"

if [[ ! -d "$LOCAL_DIR" ]]; then
  echo "Local directory '$LOCAL_DIR' does not exist. Build first."
  exit 1
fi

if ! command -v lftp >/dev/null 2>&1; then
  echo "lftp is required. Install it first (example: brew install lftp)."
  exit 1
fi

case "$FTP_PROTOCOL" in
  ftp)
    LFTP_SETTINGS="set ftp:ssl-allow no;"
    ;;
  ftps)
    LFTP_SETTINGS="set ftp:ssl-allow yes; set ssl:verify-certificate no;"
    ;;
  sftp)
    LFTP_SETTINGS="set sftp:auto-confirm yes;"
    if [[ "$FTP_PORT" == "21" ]]; then
      FTP_PORT="22"
    fi
    ;;
  *)
    echo "Invalid FTP_PROTOCOL '$FTP_PROTOCOL'. Use ftp, ftps, or sftp."
    exit 1
    ;;
esac

lftp -u "$FTP_USER","$FTP_PASS" -p "$FTP_PORT" "${FTP_PROTOCOL}://${FTP_HOST}" <<EOF
set cmd:fail-exit yes;
$LFTP_SETTINGS
mirror -R --delete --verbose "$LOCAL_DIR" "$REMOTE_DIR";
bye;
EOF

echo "Deploy complete (${FTP_PROTOCOL}): ${LOCAL_DIR} -> ${FTP_HOST}:${REMOTE_DIR}"
