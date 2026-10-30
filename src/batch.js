'use strict';
/* Filename-based batch association. Never guess a destination or silently overwrite. */
window.KBatch=(()=>{
 const modes=['portrait','expressions','action'];
 function plan(files,workspace,slug){
  const mapping=new Map(),ambiguous=new Set();
  for(const c of workspace.characters)for(const t of workspace.visualThemes)for(const mode of modes){
   const name=`karacter_${slug(c.identity.name)}_${slug(t.id)}_${mode}`;
   if(mapping.has(name))ambiguous.add(name);else mapping.set(name,{characterId:c.id,themeId:t.id,mode});
  }
  return Array.from(files).map(file=>{
   const type=(file.type||'').toLowerCase(),extension=file.name.toLowerCase().match(/\.(png|jpg|jpeg|webp|avif)$/)?.[1];
   if(!extension||!['image/png','image/jpeg','image/webp','image/avif'].includes(type)||file.size>30*1024*1024)return {file,error:'unsupported image or size'};
   const basename=file.name.replace(/\.[^.]+$/,'').toLowerCase(),target=mapping.get(basename);
   if(ambiguous.has(basename))return {file,error:'ambiguous character names'};
   if(!target)return {file,error:'filename does not match a known character, theme and image mode'};
   return {file,...target};
  });
 }
 return {plan};
})();
