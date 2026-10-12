# Proposed observation handoff for conservation builders

Status: scoped implementation proposal; no five-project integration implemented or published.

## A small first contribution

Build a local, offline draft converter: one explicitly reviewed observation envelope → a VergeCommon field draft plus a farmOS Activity CSV. DFM assessment references remain attached context; no soil values are fed into DFM as unsupported ecological parameters.

`fixtures/observation.json` is a packet-specific proposed envelope, not a GSIP schema or response. Use GSIP's verified current output contract before implementing a real GSIP adapter. Reconcile its private/public projections and licensing independently.

| Handoff | Present state | Implementation requirement |
| --- | --- | --- |
| GSIP → proposed envelope | Not implemented; authored synthetic note only | Pin actual output format. Preserve submission ID, basis, units, interval/uncertainty, source version and consent. Keep missing estimate null. Exclude images and precise locations by default. |
| Envelope → Verge field draft | A synthetic output fixture passes the upstream parser; converter not implemented | Emit `format: verge-field-draft`, `version: 1`, and `draft.place/date/method/finding/reference`. Respect lengths and valid calendar dates. Only credential-free HTTPS references; an empty reference is allowed. Save/review remain explicit user actions. |
| Envelope → farmOS Activity | Synthetic `name,timestamp` CSV prepared | Compare the target installation's downloaded template. Use UTC timestamp; escape CSV and spreadsheet formula prefixes in untrusted labels. Preserve a stable external observation ID in the name/context; repeated conversion must not cause duplicate imports. No numerical measurement encoded as an Activity. |
| VergeCommon ↔ DFM | Public Landscape Package v1 contract and upstream compatibility fixture exist | Preserve EPSG:4326, meter/m² units, parameters, provenance, engine version and input checksum. Reconcile 0.2.0 in Verge's vendor with current dfm-core 0.3.0 before claiming deployed parity. Do not infer current consent from an old fixture's `consent: covered`. |
| OpenTEAM vocabulary → records | Independent worksheet offered for review | Confirm terminology with the community. Separate collect/access/export/publish permissions, effective times, pending erasure and prior-recipient handling. Do not implement this teaching fixture as production authorization. |

## Acceptance checks for the proposed converter

- One missing-estimate observation stays unknown in both outputs. No lab result or successful GSIP ingestion is invented.
- The output field draft is accepted by the pinned Verge parser; invalid dates, oversize fields and credential-bearing references fail.
- The Activity CSV round-trips into one log in an isolated, supported farmOS instance; duplicate conversion/import is handled explicitly.
- Withdrawal blocks future publication, while separate authorized own-record portability remains available.
- Public projection contains no precise coordinates, raw image, EXIF, member identity, private URI or access credential.
- DFM assessment reference preserves exact input and result identities; import creates a draft, not an approved decision.
- A human reviews source terms and permissions before any data crosses installations.

Do not add production credentials, public uploads, subscriptions, automatic outreach or a shared database to this first contribution.

## Collaboration questions

farmOS: Is Activity plus an external observation reference the right minimal representation? Which existing measurement/data-stream pattern should a later structured soil result use?

OpenTEAM: Does the consent/withdrawal example use the right distinctions for your shared resources? Where should benefit disclosure and correction routes be recorded?

GSIP: Which reviewed, privacy-safe submission/result projection can a local adapter consume without bypassing launch and publication gates?

VergeCommon/DFM: How should a reviewed observation and immutable assessment reference appear together without implying ecological certification?

These questions are offered for community review; no partnership or accepted integration is implied.
