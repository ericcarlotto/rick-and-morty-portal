#!/usr/bin/env bash
set -euo pipefail

config="${ANDROID_AVD_HOME}/test.avd/config.ini"
test -f "$config"
tmp=$(mktemp)
grep -v -E '^(hw\.lcd\.(width|height|density)|skin\.name|skin\.path|showDeviceFrame)=' "$config" > "$tmp"
cat >> "$tmp" <<'EOF'
hw.lcd.width=900
hw.lcd.height=2400
hw.lcd.density=160
skin.name=900x2400
showDeviceFrame=no
EOF
mv "$tmp" "$config"
