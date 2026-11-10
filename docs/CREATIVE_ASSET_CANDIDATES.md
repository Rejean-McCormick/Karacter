# Karacter → UCKK creative asset candidates

**Status:** additive `TARGET_DESIGN` proposal, not an adopted UCKK import contract. This feature does **not** modify `UCKK-Assets`, the Kristal semantic canon, Ékole/Kontexte, or Moodle.

Karacter 7.4 offers a separate **Export → UCKK asset candidate (review required)** action from the existing backup/export menu. The existing **Candidate sheet for Ékole** export (`karacter.ekole-character/1`) remains unchanged. The new action packages only the current author's selected fictional character's name, role and bounded motivation, its local character identifier, and an explicit review/rights warning in `koa.creative-asset-candidates/draft-1`.

No images, relationship graph, personal story workspace, other characters, private notes, full backups, canonical Kristal identity grants, license statements or institutional approvals are included. The author must deliberately request the export. The generated file is local and offline; the export action does not upload anything.

The corresponding draft schema and human editorial procedure live in the **UCKK-Assets** owner's `Integrations/creative-assets/` directory. `status=candidate`, `uckk_review=pending` and `rights.status=unverified` are intentional. The receiving owner must separately inspect the material, establish reuse rights, provide attribution, decide content/audience scope, and create an owner-controlled acceptance record. A valid JSON file is never evidence of approved publication.

**Tests:** `npm test` exercises the new exporter with multilingual and adversarial fixtures. The cross-repository schema fixture is validated in the Branch 07 integration report; no Ékole/UCKK runtime importer was supplied or implemented.
