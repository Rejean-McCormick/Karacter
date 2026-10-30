'use strict';
window.KCanonIntegration = (() => {
  const pack=window.KCanonCharacterPack;
  const clone=x=>JSON.parse(JSON.stringify(x));
  const normalize=s=>String(s||'').normalize('NFC').trim().toLocaleLowerCase();
  const merge=(source)=>{
    const target=clone(source);let added=0,skipped=0;const mapping=new Map();
    if(!target.collections.some(c=>c.id===pack.collection.id))target.collections.push(clone(pack.collection));
    for(const profile of pack.characters){
      const found=target.characters.find(c=>c.id===profile.id||normalize(c.identity?.name)===normalize(profile.identity.name));
      if(found){mapping.set(profile.id,found.id);skipped++;continue}
      target.characters.push(clone(profile));mapping.set(profile.id,profile.id);added++;
    }
    for(const rel of pack.relationships){
      const r=clone(rel);r.sourceCharacterId=mapping.get(r.sourceCharacterId)||r.sourceCharacterId;
      const targetExisting=target.characters.find(c=>c.id===r.targetCharacterId||normalize(c.identity?.name)==='king klown'&&r.targetCharacterId==='11111111-1111-4111-8111-111111111111'||normalize(c.identity?.name)==='colin row'&&r.targetCharacterId==='49b7e491-814c-58dc-883c-7d755538bbf8');
      if(targetExisting)r.targetCharacterId=targetExisting.id;
      if(r.sourceCharacterId!==r.targetCharacterId && target.characters.some(c=>c.id===r.sourceCharacterId) && target.characters.some(c=>c.id===r.targetCharacterId) && !target.relationships.some(x=>x.id===r.id || (x.sourceCharacterId===r.sourceCharacterId&&x.targetCharacterId===r.targetCharacterId&&x.label===r.label)))target.relationships.push(r);
    }
    return {workspace:target,added,skipped};
  };
  const seeded=merge(window.KSeed);window.KSeed=seeded.workspace;
  return {pack,merge};
})();
