'use strict';
window.KPack = (() => {
  const pack=window.KKristalPack;
  const clone=x=>JSON.parse(JSON.stringify(x));
  const merge=(source,{forSeed=false}={})=>{
    const target=clone(source);let added=0,skipped=0,annotated=0;const remapped=new Map();
    if(!target.collections.some(x=>x.id===pack.collection.id))target.collections.push(clone(pack.collection));
    for(const profile of pack.characters){
      const known=target.characters.find(c=>c.id===profile.id||c.identity?.name?.toLocaleLowerCase()===profile.identity.name.toLocaleLowerCase());
      if(known){
        remapped.set(profile.id,known.id);
        skipped++;
        if(forSeed && known.id===profile.id){
          // The built-in initial character is a sample. Only an untouched seed may be replaced.
          target.characters.splice(target.characters.indexOf(known),1,clone(profile));annotated++;
        }else if(!known.extensions?.kristal){
          // Preserve all user-written fields; annotate provenance non-destructively.
          known.extensions={...(known.extensions||{}),kristal:clone(profile.extensions.kristal)};annotated++;
        }
      }else{target.characters.push(clone(profile));remapped.set(profile.id,profile.id);added++}
    }
    for(const rel of pack.relationships){
      const adjusted={...clone(rel),sourceCharacterId:remapped.get(rel.sourceCharacterId)||rel.sourceCharacterId,targetCharacterId:remapped.get(rel.targetCharacterId)||rel.targetCharacterId};
      if(adjusted.sourceCharacterId===adjusted.targetCharacterId)continue;
      if(!target.relationships.some(x=>x.id===adjusted.id)&&target.characters.some(x=>x.id===adjusted.sourceCharacterId)&&target.characters.some(x=>x.id===adjusted.targetCharacterId))target.relationships.push(adjusted);
    }
    return {workspace:target,added,skipped,annotated};
  };
  const bootstrapSeed=()=>{const result=merge(window.KSeed,{forSeed:true});window.KSeed=result.workspace;return result};
  bootstrapSeed();
  return {merge,pack,bootstrapSeed};
})();
