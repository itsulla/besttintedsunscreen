#!/bin/bash
# Issue SSL cert for besttintedsunscreen.com + www once DNS resolves.
# Run this after updating Namecheap DNS to point BOTH @ and www to 187.124.236.128.

set -e

EXPECTED_IP="187.124.236.128"
DOMAINS=("besttintedsunscreen.com" "www.besttintedsunscreen.com")

echo "Checking DNS for both domains..."
echo ""

all_good=true
for d in "${DOMAINS[@]}"; do
    actual=$(dig "$d" A +short @8.8.8.8 | head -1)
    if [ "$actual" = "$EXPECTED_IP" ]; then
        printf "  ✓ %-35s → %s\n" "$d" "$actual"
    else
        printf "  ✗ %-35s → %s (expected %s)\n" "$d" "${actual:-no-record}" "$EXPECTED_IP"
        all_good=false
    fi
done
echo ""

if [ "$all_good" = false ]; then
    echo "❌ DNS not ready. Update your Namecheap records:"
    echo ""
    echo "   Type: A Record, Host: @,   Value: $EXPECTED_IP"
    echo "   Type: A Record, Host: www, Value: $EXPECTED_IP"
    echo ""
    echo "Then re-run this script. (Propagation usually takes 5-30 minutes.)"
    exit 1
fi

echo "✓ DNS resolves correctly. Requesting SSL certificate..."
echo ""

sudo certbot --nginx \
    -d besttintedsunscreen.com \
    -d www.besttintedsunscreen.com \
    --non-interactive \
    --agree-tos \
    --email admin@lekker.design \
    --redirect

echo ""
echo "✓ SSL cert issued. Verifying..."
echo ""
for d in "${DOMAINS[@]}"; do
    code=$(curl -s -o /dev/null -w "%{http_code}" "https://$d/")
    printf "  https://%-35s → %s\n" "$d" "$code"
done
echo ""
echo "Done. Visit https://besttintedsunscreen.com/"
