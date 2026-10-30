'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto').webcrypto;
const c={console,crypto,structuredClone,Map,Set,Math,Date,JSON,Number,String,Promise,Error,TextEncoder,TextDecoder,Uint8Array};c.window=c;vm.createContext(c);
for(const n of ['seed','kristal-pack','kristal-integration','core','txt'])vm.runInContext(fs.readFileSync(`src/${n}.js`,'utf8'),c,{filename:n+'.js'});
const pack=c.KKristalPack,seed=c.KSeed,api=c.KPack,C=c.KCore;
assert.equal(pack.characters.length,19);assert.equal(pack.relationships.length,18);
assert.equal(C.validate(seed).length,0,JSON.stringify(C.validate(seed)));
assert.equal(seed.characters.length,20); // 19 imported, one older unrelated example (Mira)
assert.equal(seed.relationships.length,19); // 18 imported + 1 existing Mira relation
const again=api.merge(seed);assert.equal(again.added,0);assert.equal(again.workspace.characters.length,20);assert.equal(again.workspace.relationships.length,19);
assert.equal(C.validate(again.workspace).length,0);
const king=seed.characters.find(x=>x.identity.name==='King Klown');assert(king.extensions.kristal.sourceRefs.length>0);
for(const p of pack.characters){assert.equal(p.polarities.length,8);assert(p.polarities.every(a=>Number.isInteger(a.leftScore)&&a.leftScore>=0&&a.leftScore<=6));assert(p.extensions.kristal.evidenceSummary);assert(p.extensions.kristal.creativeNote);assert(p.extensions.kristal.polaritiesStatus.includes('CREATIVE_PROPOSAL'));assert.equal(c.KTxt.parse(c.KTxt.sheet(p)).id,p.id)}
const aida=pack.characters.filter(x=>x.identity.name.startsWith('Aïda'));assert.equal(aida.length,2);assert.notEqual(aida[0].id,aida[1].id);
assert.notEqual(pack.characters.find(x=>x.identity.name==='L’Auteur (Hello World)').extensions.kristal.identityContinuity,'KK_CONTINUITY');
const user=structuredClone(seed);user.characters[0].narrative.contradiction='MY OWN USER TEXT';user.characters=user.characters.filter(x=>x.identity.name==='King Klown'||x.identity.name==='Mira');user.relationships=[];const restore=api.merge(user);assert.equal(restore.added,18);assert.equal(restore.workspace.characters.find(x=>x.identity.name==='King Klown').narrative.contradiction,'MY OWN USER TEXT');assert.equal(C.validate(restore.workspace).length,0);
const alternate=structuredClone(user);alternate.characters.find(x=>x.identity.name==='King Klown').id='manually-created-king';alternate.preferences.activeCharacterId='manually-created-king';const r=api.merge(alternate);assert.equal(r.workspace.characters.filter(x=>x.identity.name==='King Klown').length,1);assert.equal(C.validate(r.workspace).length,0);
const evidence=JSON.parse(fs.readFileSync('data/kristal-source-evidence.json','utf8'));const refs=new Set(evidence.records.map(x=>x.ref));for(const p of pack.characters)for(const ref of p.extensions.kristal.sourceRefs)assert(refs.has(ref),'missing evidence '+ref);
console.log('PASS: Kristal 19 profiles, 18 links, TXT export, source references, 0–6 polarities, non-destructive and idempotent import');
