import { readFileSync } from 'node:fs';

const minimum = 0.96;
const fields = { LF: 'lf', LH: 'lh', FNF: 'fnf', FNH: 'fnh' };

const text = readFileSync(process.argv[2] ?? 'apps/mobile/coverage/lcov.info', 'utf8').replace(/^\uFEFF/, '');
const totals = summarize(text);
assertGate(totals);
printTotals(totals);

function summarize(lcov) {
  const totals = emptyTotals();
  let count = false;
  for (const line of lcov.split(/\r?\n/)) {
    if (line.startsWith('SF:')) count = countsTowardGate(line.slice(3));
    else if (count) addRecord(totals, line);
  }
  return totals;
}

function emptyTotals() {
  return { lf: 0, lh: 0, brf: 0, brh: 0, fnf: 0, fnh: 0 };
}

function countsTowardGate(file) {
  const path = file.replaceAll('\\', '/');
  if (isTestPath(path) || isGenerated(path)) return false;
  return true;
}

function isTestPath(path) {
  return path.startsWith('test/') || path.includes('/test/')
    || path.startsWith('integration_test/') || path.includes('/integration_test/');
}

function isGenerated(path) {
  return path.endsWith('.g.dart') || path.endsWith('.freezed.dart') || path.endsWith('.mocks.dart');
}

function addRecord(totals, line) {
  if (line.startsWith('BRDA:')) {
    addBranch(totals, line);
    return;
  }
  const marker = line.indexOf(':');
  if (marker < 1) return;
  const field = fields[line.slice(0, marker)];
  const value = Number(line.slice(marker + 1));
  if (!field || !Number.isFinite(value)) return;
  totals[field] += value;
}

function addBranch(totals, line) {
  totals.brf += 1;
  const taken = Number(line.slice(line.lastIndexOf(',') + 1));
  if (taken > 0) totals.brh += 1;
}

function assertGate(totals) {
  assertRatio('linhas', totals.lh, totals.lf);
  assertRatio('ramos', totals.brh, totals.brf);
  if (totals.fnf > 0) assertRatio('funções', totals.fnh, totals.fnf);
}

function assertRatio(label, hit, found) {
  if (found === 0) fail(`lcov sem ${label} de produção`);
  if (below(hit, found)) fail(`${label} ${pct(hit, found)} abaixo de 96%`);
}

function below(hit, found) {
  return hit / found < minimum;
}

function pct(hit, found) {
  return `${((hit / found) * 100).toFixed(2)}%`;
}

function printTotals(totals) {
  const functions = totals.fnf === 0 ? 'sem FN/FNH' : pct(totals.fnh, totals.fnf);
  console.log(`linhas ${pct(totals.lh, totals.lf)} ramos ${pct(totals.brh, totals.brf)} funções ${functions}`);
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
