import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
import { checkConnectivitySync, fromLandscapePackage } from './vendor/packages/dfm-core/src/index.mjs';
import { parseFieldDraft } from './vendor/verge-field-draft.mjs';
const root = path.dirname(fileURLToPath(import.meta.url));
const read = n => JSON.parse(fs.readFileSync(path.join(root, 'fixtures', n), 'utf8'));
const baseline = checkConnectivitySync(fromLandscapePackage(read('dfm-baseline.landscape.json')));
const deferral = checkConnectivitySync(fromLandscapePackage(read('dfm-deferral.landscape.json')));
assert.equal(baseline.status, 'fail');
assert(baseline.lostLinks.some(x => x.causes.includes('harvest-3')));
assert.equal(deferral.status, 'pass');
assert.equal(deferral.lostLinks.length, 0);
const replay = checkConnectivitySync(fromLandscapePackage(read('dfm-baseline.landscape.json')));
assert.equal(replay.inputChecksum, baseline.inputChecksum);
const draft = parseFieldDraft(read('verge-field-draft.json'));
assert.equal(draft.date, '2026-10-12');
assert(!Object.hasOwn(draft, 'reviewed'));
const consent = read('consent.json');
const permits = (action, grantee, at) => consent.grants.some(g => g.action === action && g.grantee === grantee && at >= g.granted_at && (!g.revoked_at || at < g.revoked_at));
for (const c of consent.review_cases) assert.equal(permits(c.action,c.grantee,c.at), c.expected === 'allow');
const observation = read('observation.json');
assert.equal(observation.measurement, null);
assert.equal(observation.soil_prior.estimate, null);
assert.equal(observation.precise_location, null);
const result = { checked_at: new Date().toISOString(), synthetic: true,
  validation: { baseline_break_detected:true, deferral_preserves_modeled_link:true, deterministic_replay:true, verge_parser_accepted:true, consent_cases_passed:consent.review_cases.length },
  baseline, deferral, draft,
  boundaries: ['GSIP ingest and estimates not executed','farmOS browser import not executed in this packet','VergeCommon save/review not executed','OpenTEAM example not accepted or scored','Modeled geometry is not ecological outcome or real consent','No production, network, accounts, photos, or payments used by this run'] };
fs.writeFileSync(path.join(root,'results.json'), JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({baseline:baseline.status, deferral:deferral.status, checks:result.validation, results:'results.json'},null,2));
