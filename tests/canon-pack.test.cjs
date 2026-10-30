const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.join(__dirname,'..');const window={};const env=vm.createContext({window,structuredClone,console});
for(const part of ['seed.js','kristal-pack.js','kristal-integration.js','canon-pack.js','canon-integration.js','txt.js']){
  vm.runInContext(fs.readFileSync(path.join(root,'src',part),'utf8'),env,{filename:part});
}
const pack=JSON.parse(fs.readFileSync(path.join(root,'data/king-klown-canon-character-pack.json'),'utf8'));
assert.equal(pack.characters.length,20);assert.equal(pack.relationships.length,19);
assert.equal(window.KSeed.characters.filter(c=>pack.characters.some(x=>x.id===c.id)).length,20);
assert.equal(new Set(window.KSeed.characters.map(c=>c.id)).size,window.KSeed.characters.length);
for(const c of pack.characters){
  assert.equal(c.polarities.length,8);
  for(const p of c.polarities){assert.ok(Number.isInteger(p.leftScore)&&p.leftScore>=0&&p.leftScore<=6);assert.equal(p.source,'imported')}
  assert.equal(window.KTxt.parse(window.KTxt.sheet(c)).id,c.id);
  assert.ok(c.extensions.canon.sourceRefs.length>0);
}
const old=JSON.parse(JSON.stringify(window.KSeed));
const twice=window.KCanonIntegration.merge(old);
assert.equal(twice.added,0);assert.equal(twice.workspace.characters.length,old.characters.length);
const pre=JSON.parse(JSON.stringify(window.KSeed));pre.characters=pre.characters.filter(c=>c.identity.name!=='Thot');pre.characters.find(c=>c.identity.name==='King Klown').identity.role='MY OWN CUSTOM ROLE';
const out=window.KCanonIntegration.merge(pre);
assert.equal(out.added,1);assert.equal(out.workspace.characters.find(c=>c.identity.name==='King Klown').identity.role,'MY OWN CUSTOM ROLE');
assert.equal(window.KCanonIntegration.merge(out.workspace).added,0);
for(const r of out.workspace.relationships){assert.ok(out.workspace.characters.some(c=>c.id===r.sourceCharacterId));assert.ok(out.workspace.characters.some(c=>c.id===r.targetCharacterId));}
console.log('PASS: Canon pack 20 profiles / 19 ties, idempotent and non-destructive import, TXT and linked axes.');
