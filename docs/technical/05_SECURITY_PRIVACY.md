# Security, privacy and responsible product behavior

## Threat model

Karacter reads user-authored text and imported images/files. Untrusted input includes TXT/JSON/ZIP contents, image metadata, pasted prompt text, theme descriptions and character names. Local-first does not eliminate risks from malicious files or browser storage loss.

## Required safeguards

- Treat strings as text by default; escape before DOM insertion. Never execute markup, scripts or URLs from imported character data.
- File uploads are user-initiated; enforce declared and decoded file type, size, image dimensions, ZIP content limits and JSON schema validation.
- Reject path traversal and ZIP bomb entries; do not extract files directly to arbitrary disk paths.
- Avoid remote libraries/fonts/analytics in offline core. No hidden uploads or network telemetry.
- Never store API keys or secrets in exported character sheets.
- Validate schema versions and IDs before persisting changes.
- Warn before destructive replace; ideally export current workspace automatically only with explicit user action.
- Release revoked blob URLs and avoid stale pointers after image replacement.
- Protect undo/recovery for accidental deletes, migration failures or quota errors.

## Privacy

- Core v6 runs locally without a user account or analytics service.
- Browser storage is accessible to anyone who can access the same local browser profile/device; it is not encrypted by Karacter.
- Downloaded TXT/ZIP backups may contain personal creative notes, relationships and portrait data. Tell users to store/sharing them intentionally.
- If optional external image models are used, users deliberately copy a prompt; Karacter itself does not automatically transmit it.
- No biometric inference, identity recognition or diagnosis of real humans from images.

## Educational / psychological safety

- The system is a tool for **fictional characters and narrative possibilities**. It must not claim to clinically evaluate a child or adult.
- Never equate high/low axis positions to virtue, intelligence, danger, mental illness, disability or personal worth.
- Never infer protected characteristics or medical conditions from a user's fictional profile scores.
- Where a scene depicts harmful behavior, describe contextual consequences and leave room for safer alternatives; don't glamorize causing harm.

## Incident handling

If import fails, retain current state and present a non-sensitive error. If storage fails, warn and offer immediate export/repair. Error logs must not leak imported author text or image blobs to external systems.
