import { readFileSync } from 'node:fs';

const lockPath = process.argv[2] ?? 'apps/mobile/pubspec.lock';
const packages = hostedPackages(readFileSync(lockPath, 'utf8'));
if (packages.length === 0) fail('lockfile sem pacotes hosted');

const response = await fetch('https://api.osv.dev/v1/querybatch', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ queries: packages.map(osvQuery) }),
});
if (!response.ok) fail(`OSV respondeu ${response.status}`);

const body = await response.json();
const results = Array.isArray(body.results) ? body.results : [];
const highs = highAdvisories(packages, results);
if (highs.length > 0) fail(highs.join('\n'));
console.log(`auditoria Pub: ${packages.length} pacotes, sem falha alta`);

function hostedPackages(text) {
  const found = [];
  let current = null;
  for (const line of text.split(/\r?\n/)) {
    current = readLockLine(found, current, line);
  }
  if (current) pushHosted(found, current);
  return found;
}

function readLockLine(found, current, line) {
  if (!line.startsWith('  ') || line.startsWith('   ')) return fillPackage(current, line);
  if (current) pushHosted(found, current);
  return { key: line.trim().replace(/:$/, ''), source: '', version: '', described: '' };
}

function fillPackage(current, line) {
  if (!current) return current;
  const source = line.match(/^    source: (\S+)/);
  const version = line.match(/^    version: "([^"]+)"/);
  const described = line.match(/^      name: (\S+)/);
  if (source) current.source = source[1];
  if (version) current.version = version[1];
  if (described) current.described = described[1];
  return current;
}

function pushHosted(found, current) {
  if (current.source !== 'hosted' || !current.version) return;
  found.push({ name: current.described || current.key, version: current.version });
}

function osvQuery(pkg) {
  return { package: { name: pkg.name, ecosystem: 'Pub' }, version: pkg.version };
}

function highAdvisories(pkgs, results) {
  const lines = [];
  pkgs.forEach((pkg, index) => {
    const vulns = results[index]?.vulns ?? [];
    for (const vuln of vulns) {
      if (isHigh(vuln)) lines.push(`${pkg.name}@${pkg.version} ${vuln.id ?? 'advisory'}`);
    }
  });
  return lines;
}

function isHigh(vuln) {
  const labeled = labeledHigh(vuln);
  if (labeled !== null) return labeled;
  return scoreIsHigh(vuln);
}

function labeledHigh(vuln) {
  const label = String(vuln.database_specific?.severity ?? '').toUpperCase();
  if (label === 'HIGH' || label === 'CRITICAL') return true;
  if (label === 'MODERATE' || label === 'LOW') return false;
  return null;
}

function scoreIsHigh(vuln) {
  const scores = (vuln.severity ?? []).map(baseScore).filter((score) => score !== null);
  if (scores.length === 0) return true;
  return scores.some((score) => score >= 7);
}

function baseScore(entry) {
  if (typeof entry?.score === 'number') return entry.score;
  if (typeof entry?.score !== 'string' || !entry.score.startsWith('CVSS:3')) return null;
  return cvss3Base(entry.score);
}

function cvss3Base(vector) {
  const metric = Object.fromEntries(vector.split('/').slice(1).map((part) => part.split(':')));
  const exploitability = 8.22 * av(metric) * ac(metric) * pr(metric) * ui(metric);
  const impact = impactScore(metric);
  if (impact <= 0) return 0;
  const raw = (metric.S === 'U' ? 1 : 1.08) * (impact + exploitability);
  return roundup(Math.min(raw, 10));
}

function av(metric) {
  return { N: 0.85, A: 0.62, L: 0.55, P: 0.2 }[metric.AV] ?? 0;
}

function ac(metric) {
  return { L: 0.77, H: 0.44 }[metric.AC] ?? 0;
}

function pr(metric) {
  if (metric.S === 'C') return { N: 0.85, L: 0.68, H: 0.5 }[metric.PR] ?? 0;
  return { N: 0.85, L: 0.62, H: 0.27 }[metric.PR] ?? 0;
}

function ui(metric) {
  return { N: 0.85, R: 0.62 }[metric.UI] ?? 0;
}

function impactScore(metric) {
  const iss = 1 - (1 - cia(metric.C)) * (1 - cia(metric.I)) * (1 - cia(metric.A));
  if (metric.S === 'U') return 6.42 * iss;
  return 7.52 * (iss - 0.029) - 3.25 * (iss - 0.02) ** 15;
}

function cia(value) {
  return { H: 0.56, L: 0.22, N: 0 }[value] ?? 0;
}

function roundup(input) {
  const scaled = Math.round(input * 100000);
  if (scaled % 10000 === 0) return scaled / 100000;
  return (Math.floor(scaled / 10000) + 1) / 10;
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
