#!/usr/bin/env bash
set -euo pipefail
set -m

release() {
  kill -KILL -- "-${stub_pid}" >/dev/null 2>&1 || true
  free_matching '^qemu-system'
  free_matching '^crashpad_hand'
}

free_matching() {
  local pid
  for pid in $(ps -eo pid,comm | awk -v name="$1" '$2 ~ name { print $1 }'); do
    kill -KILL "$pid" >/dev/null 2>&1 || true
  done
}

export STUB_PORT=4011
cd "$GITHUB_WORKSPACE"
npx tsx apps/web/e2e/stub-bff.ts &
stub_pid=$!
trap release EXIT

ready=0
for _ in $(seq 1 30); do
  if node -e "fetch('http://127.0.0.1:4011/api/health').then((r)=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"; then
    ready=1
    break
  fi
  sleep 1
done
test "$ready" = 1

cd apps/mobile
flutter test \
  integration_test/catalog_test.dart \
  integration_test/order_test.dart \
  integration_test/detail_test.dart \
  integration_test/neighbors_test.dart \
  integration_test/filter_test.dart \
  integration_test/index_test.dart \
  integration_test/paging_test.dart \
  --dart-define=BFF_ORIGIN=http://10.0.2.2:4011
