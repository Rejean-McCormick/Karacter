'use strict';
window.KUniverses = (() => {
 const BUNDLED_PACK_IDS = Object.freeze(['kristal-kk-media-v4.2','king-klown-canon-narrative-pack-v1']);
 const KING_ID = '33333333-3333-4333-8333-333333333333';
 const BLANK_ID = '77777777-7777-4777-8777-777777777777';
 const JOHN_ID = '99999999-9999-4999-8999-999999999999';
 const LEGACY_KING_IDS = Object.freeze([KING_ID,'263c4ed4-06d6-5e03-954d-f48f7011808d','097ea81e-6f3c-5274-9942-ca075db93202']);
 const LAYOUT_MARKER = 'king-klown-blank-v1';
 const copy = x => JSON.parse(JSON.stringify(x));
 const norm = s => String(s||'').trim().normalize('NFC').toLocaleLowerCase();
 function johnDoe(){
  const timestamp='2026-10-30T00:00:00.000Z';
  return {
   id:JOHN_ID,
   identity:{name:'John Doe',collectionId:BLANK_ID,role:'',archetypeId:null,keywords:[]},
   polarities:[],emotionalPalette:[],
   innerWorld:{motivation:'',values:[],fear:'',habitualReaction:''},
   narrative:{desire:'',need:'',limitingBelief:'',contradiction:'',turningPoint:'',possibleGrowth:''},
   visualSignature:{description:'',identityAnchors:[],exclusions:[]},
   milestones:[],createdAt:timestamp,updatedAt:timestamp,
   extensions:{template:'blank-universe-starter',provenance:'Karacter built-in minimal character'}
  };
 }
 // Return a new workspace; never mutate characters already in a user's local database.
 // Changing a collection is only a change of navigation: IDs, narratives, portraits,
 // story events, relationships, and source provenance remain exactly as authored.
 function align(source){
  const workspace=copy(source);
  workspace.extensions=workspace.extensions||{};
  if(workspace.extensions.universeLayout===LAYOUT_MARKER) return {workspace,changed:false,added:0};
  const previousCollections=copy(workspace.collections||[]);
  const knownLegacy=new Set(LEGACY_KING_IDS);
  for(const c of workspace.characters||[]){
   if(knownLegacy.has(c.identity?.collectionId))c.identity.collectionId=KING_ID;
   else if(c.id===JOHN_ID)c.identity.collectionId=BLANK_ID;
  }
  // Keep custom universes intact rather than silently moving user creations.
  const custom=previousCollections.filter(c=>!knownLegacy.has(c.id)&&c.id!==BLANK_ID);
  workspace.collections=[
   {id:KING_ID,name:'King Klown',description:'King Klown continuity: Kristal MEDIA, narrative canon and legacy kOA profiles. Source provenance remains on each character.'},
   {id:BLANK_ID,name:'Blank Universe',description:'A minimal, open-ended universe. John Doe is the built-in starting character.'},
   ...custom
  ];
  const johnExists=workspace.characters.some(c=>c.id===JOHN_ID || (norm(c.identity?.name)==='john doe'&&c.identity?.collectionId===BLANK_ID));
  if(!johnExists)workspace.characters.push(johnDoe());
  // If the collection was renamed by the user, preserve the original mapping in metadata.
  workspace.extensions.previousUniverseCollections=previousCollections;
  workspace.extensions.universeLayout=LAYOUT_MARKER;
  return {workspace,changed:true,added:johnExists?0:1};
 }
 function ensureInstalled(source){
   const installed=new Set(Array.isArray(source.extensions?.installedUniversePacks)?source.extensions.installedUniversePacks:[]);
   const missingKristal=!installed.has(BUNDLED_PACK_IDS[0]);
   const missingCanon=!installed.has(BUNDLED_PACK_IDS[1]);
   const alreadyAligned=source.extensions?.universeLayout===LAYOUT_MARKER;
   if(!missingKristal&&!missingCanon&&alreadyAligned)return {workspace:source,changed:false,added:0};
   let result=copy(source),added=0;
   if(missingKristal){const r=window.KPack.merge(result);result=r.workspace;added+=r.added;}
   if(missingCanon){const r=window.KCanonIntegration.merge(result);result=r.workspace;added+=r.added;}
   const aligned=align(result);
   result=aligned.workspace;
   if(aligned.changed)added+=aligned.added;
   result.extensions={...result.extensions,installedUniversePacks:BUNDLED_PACK_IDS.slice()};
   return {workspace:result,changed:true,added};
 }
 function visible(character,selected){return selected===null||selected.has(character.identity.collectionId||'unassigned');}
 function toggle(selected,id){
   if(id==='all')return null;
   const next=new Set(selected===null?[]:selected);
   if(next.has(id))next.delete(id);else next.add(id);
   return next.size?next:null;
 }
 function normalizedSelection(selected,collections){
   if(selected===null)return null;
   const valid=new Set(collections),filtered=new Set([...selected].filter(id=>valid.has(id)));
   return filtered.size?filtered:null;
 }
 function preferredCollection(selected,activeCharacter){
   if(selected?.size===1){const id=[...selected][0];if(id!=='unassigned')return id;}
   return activeCharacter?.identity?.collectionId||KING_ID;
 }
 // The in-memory initial catalogue is normalized too; no import buttons needed.
 // Mira is the original tutorial example, not part of the supplied King Klown
 // canonical character packs. Exclude her from *new* installations only.
 // Previously saved Mira profiles, portraits and story events are untouched.
 const firstLaunch=copy(window.KSeed);
 const demoId='22222222-2222-4222-8222-222222222222';
 firstLaunch.characters=firstLaunch.characters.filter(c=>c.id!==demoId);
 firstLaunch.relationships=firstLaunch.relationships.filter(r=>r.sourceCharacterId!==demoId&&r.targetCharacterId!==demoId);
 const initial=align(firstLaunch).workspace;
 initial.extensions.installedUniversePacks=BUNDLED_PACK_IDS.slice();
 window.KSeed=initial;
 return {BUNDLED_PACK_IDS,KING_ID,BLANK_ID,JOHN_ID,LEGACY_KING_IDS,LAYOUT_MARKER,johnDoe,align,ensureInstalled,visible,toggle,normalizedSelection,preferredCollection};
})();
