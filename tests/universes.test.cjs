const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.join(__dirname,'..'),window={};
const ctx=vm.createContext({window,structuredClone,console});
for(const file of ['seed.js','kristal-pack.js','kristal-integration.js','canon-pack.js','canon-integration.js','universes.js'])vm.runInContext(fs.readFileSync(path.join(root,'src',file),'utf8'),ctx,{filename:file});
const U=window.KUniverses,seed=window.KSeed;
assert.equal(seed.characters.length,40);
assert.deepEqual(Array.from(seed.collections,c=>c.name),['King Klown','Blank Universe']);
assert.equal(seed.characters.filter(c=>c.identity.collectionId===U.KING_ID).length,39);
assert.equal(seed.characters.filter(c=>c.identity.collectionId===U.BLANK_ID).length,1);
const john=seed.characters.find(c=>c.id===U.JOHN_ID);
assert.equal(john.identity.name,'John Doe');
assert.equal(john.polarities.length,0);
assert.equal(john.narrative.contradiction,'');
assert(!seed.characters.some(c=>c.identity.name==='Mira'),'new installs should not include demo Mira in King Klown');
assert(seed.characters.some(c=>c.identity.name==='Thot'));
assert.equal(U.ensureInstalled(seed).changed,false);
// Recreate a 7.3 workspace with split King Klown collections and a user-edited character.
const previous=JSON.parse(JSON.stringify(seed));
previous.characters=previous.characters.filter(c=>c.id!==U.JOHN_ID);
previous.collections=[
 {id:U.KING_ID,name:'kOA',description:'legacy'},
 {id:U.LEGACY_KING_IDS[1],name:'King Klown · Kristal MEDIA',description:'source'},
 {id:U.LEGACY_KING_IDS[2],name:'King Klown · Canon narratives',description:'source'},
 {id:'user-collection',name:'My own universe',description:''}
];
previous.characters.find(c=>c.identity.name==='King Klown').identity.role='My own revised character';
previous.characters.find(c=>c.identity.name==='Thot').identity.collectionId=U.LEGACY_KING_IDS[2];
previous.characters.find(c=>c.identity.name==='Koali').identity.collectionId=U.LEGACY_KING_IDS[1];
const custom=JSON.parse(JSON.stringify(previous.characters.find(c=>c.identity.name==='Koali')));
custom.id='user-custom-id';custom.identity.name='My custom hero';custom.identity.collectionId='user-collection';previous.characters.push(custom);
previous.extensions={installedUniversePacks:U.BUNDLED_PACK_IDS.slice()};
const migrated=U.ensureInstalled(previous);
assert.equal(migrated.changed,true);assert.equal(migrated.added,1);
const w=migrated.workspace;
assert.deepEqual(Array.from(w.collections,c=>c.name),['King Klown','Blank Universe','My own universe']);
assert.equal(w.characters.length,41); // 39 King + user character + John Doe
assert.equal(w.characters.find(c=>c.identity.name==='King Klown').identity.role,'My own revised character');
assert.equal(w.characters.find(c=>c.identity.name==='Thot').identity.collectionId,U.KING_ID);
assert.equal(w.characters.find(c=>c.identity.name==='Koali').identity.collectionId,U.KING_ID);
assert.equal(w.characters.find(c=>c.id==='user-custom-id').identity.collectionId,'user-collection');
assert.equal(w.characters.filter(c=>c.id===U.JOHN_ID).length,1);
assert.equal(U.ensureInstalled(w).changed,false);
// Do not silently recreate characters deliberately deleted after upgrade.
const deleted=JSON.parse(JSON.stringify(w));deleted.characters=deleted.characters.filter(c=>c.id!==U.JOHN_ID&&c.identity.name!=='Thot');
assert.equal(U.ensureInstalled(deleted).workspace.characters.length,39);
// Existing Mira (possibly edited or illustrated) must not be deleted during upgrade.
const oldDemo=JSON.parse(JSON.stringify(seed.characters[0]));oldDemo.id='22222222-2222-4222-8222-222222222222';oldDemo.identity.name='Mira';oldDemo.identity.role='My own custom biography';oldDemo.identity.collectionId=U.KING_ID;
const withDemo=JSON.parse(JSON.stringify(previous));withDemo.characters.push(oldDemo);
const upgradedDemo=U.ensureInstalled(withDemo).workspace;
assert.equal(upgradedDemo.characters.find(c=>c.id===oldDemo.id).identity.role,'My own custom biography');
assert.equal(upgradedDemo.characters.find(c=>c.id===oldDemo.id).identity.collectionId,U.KING_ID);
// Universe chips remain multi-select and change display only.
const selected=U.toggle(null,U.KING_ID);assert(U.visible(w.characters.find(c=>c.identity.collectionId===U.KING_ID),selected));
assert(!U.visible(john,selected));
const together=U.toggle(selected,U.BLANK_ID);assert.equal(together.size,2);assert.equal(U.toggle(together,'all'),null);
assert.equal(U.preferredCollection(new Set([U.BLANK_ID]),w.characters[0]),U.BLANK_ID);
console.log('PASS: King Klown unification, Blank Universe John Doe, migration, preserved user data, linked filters.');
