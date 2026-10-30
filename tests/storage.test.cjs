'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto').webcrypto;
// An IndexedDB transaction fixture with snapshot-based commits and injected
// failures. The snapshots ensure an aborted multi-store transaction has NO
// observable partial writes. Native browser coverage is a separate test.
function fakeIndexedDB(){
 const stores=new Map(),control={failNext:false},db={
  objectStoreNames:{contains:n=>stores.has(n)},
  createObjectStore(n){stores.set(n,new Map())},
  close(){},
  transaction(names,mode){
   const txStores=new Map((Array.isArray(names)?names:[names]).map(n=>[n,new Map(stores.get(n))]));
   let remaining=0,closed=false,commitScheduled=false;
   const tx={oncomplete:null,onerror:null,onabort:null,error:null,
    abort(){if(closed)return;closed=true;this.error=Error('Transaction aborted');setTimeout(()=>this.onabort?.(),0)},
    objectStore(n){
     const map=txStores.get(n);if(!map)throw Error('Missing object store '+n);
     const req=(value)=>{remaining++;const q={result:value,error:null,onsuccess:null,onerror:null};setTimeout(()=>{q.onsuccess?.({target:q});remaining--;scheduleCommit()},0);return q};
     return {put:v=>{map.set(v.id,v);return req(v)},delete:k=>{map.delete(k);return req()},clear:()=>{map.clear();return req()},get:k=>req(map.get(k)),getAll:()=>req([...map.values()])};
    }
   };
   function scheduleCommit(){if(closed||remaining||commitScheduled)return;commitScheduled=true;setTimeout(()=>{commitScheduled=false;if(closed||remaining)return;if(control.failNext&&mode==='readwrite'){control.failNext=false;closed=true;tx.error=Error('Simulated quota / transaction failure');tx.onabort?.();return}for(const [n,snapshot] of txStores)stores.set(n,snapshot);closed=true;tx.oncomplete?.()},3)}
   scheduleCommit();return tx;
  }
 };
 return {control,open(){const q={result:db,error:null,onupgradeneeded:null,onsuccess:null,onerror:null,onblocked:null};setTimeout(()=>{q.onupgradeneeded?.({target:q});q.onsuccess?.({target:q})},0);return q},stores};
}
(async()=>{
 const indexedDB=fakeIndexedDB(),localStorage={data:new Map(),getItem(k){return this.data.get(k)??null},setItem(k,v){this.data.set(k,v)},removeItem(k){this.data.delete(k)}};
 const ctx={console,TextEncoder,TextDecoder,Uint8Array,Uint32Array,DataView,ArrayBuffer,BigInt,Blob,crypto,structuredClone,atob,btoa,Map,Set,Date,JSON,Math,Number,String,Promise,Error,setTimeout,localStorage,indexedDB};ctx.window=ctx;vm.createContext(ctx);ctx.KSeed=JSON.parse(fs.readFileSync('docs/examples/example-backup.v6.json')).workspace;
 for(const n of ['core','engine','storage'])vm.runInContext(fs.readFileSync(`src/${n}.js`,'utf8'),ctx,{filename:n+'.js'});
 const {KStorage:S,KCore:C,KEngine:E}=ctx;
 await S.openDB();const seed=structuredClone(ctx.KSeed);
 // 6.1 localStorage migration must not be discarded on first 6.2 launch.
 localStorage.setItem('karacter.v6.workspace',JSON.stringify(seed));
 assert.equal((await S.loadWorkspacePersistent()).workspaceId,seed.workspaceId);
 await S.saveWorkspace(seed);assert.equal((await S.loadWorkspacePersistent()).workspaceId,seed.workspaceId);
 // Load now favors IDB even when stale 6.1 localStorage is present.
 const renamed=structuredClone(seed);renamed.characters[0].identity.name='Stored in IDB';
 await S.saveWorkspace(renamed);assert.equal((await S.loadWorkspacePersistent()).characters[0].identity.name,'Stored in IDB');
 // Add a real binary blob to metadata atomically.
 const bytes=Buffer.from('89504e470d0a1a0a00000000','hex'),blob=new Blob([bytes],{type:'image/png'});
 const meta={id:'test-image',characterId:renamed.characters[0].id,themeId:renamed.visualThemes[0].id,mode:'portrait',mimeType:'image/png',width:1,height:1,byteLength:bytes.length,sha256:await E.sha256(bytes),createdAt:new Date().toISOString()};
 const withPhoto=structuredClone(renamed);withPhoto.imageAssets=[meta];
 await S.commitWorkspace(withPhoto,{upsertAssets:[{id:meta.id,blob}]});assert.equal((await S.listAssets()).length,1);
 const backup=await S.makeBackup(withPhoto),verified=await S.verifyBackup(backup);
 assert.equal(backup.assets.length,1);assert.equal(verified.images.length,1);
 const tampered=structuredClone(backup);tampered.assets[0].dataBase64='AA==';await assert.rejects(S.verifyBackup(tampered),/Corrupted image/);
 // Failed destructive operation must preserve BOTH image and character.
 const deleted=structuredClone(withPhoto);deleted.imageAssets=[];C.deleteCharacter(deleted,withPhoto.characters[0].id);
 indexedDB.control.failNext=true;
 await assert.rejects(S.commitWorkspace(deleted,{deleteAssetIds:[meta.id]}),/Simulated quota/);
 assert.equal((await S.listAssets()).length,1);
 assert.equal((await S.loadWorkspacePersistent()).characters.length,withPhoto.characters.length);
 assert.equal((await S.loadWorkspacePersistent()).imageAssets.length,1);
 // Complete deletion succeeds and leaves neither metadata nor image bytes.
 await S.commitWorkspace(deleted,{deleteAssetIds:[meta.id]});assert.equal((await S.listAssets()).length,0);
 assert.equal((await S.loadWorkspacePersistent()).imageAssets.length,0);
 // Full restore replaces both stores and is atomic on an injected error.
 await S.restore(verified);assert.equal((await S.listAssets()).length,1);
 indexedDB.control.failNext=true;
 await assert.rejects(S.restore({workspace:deleted,images:[]}),/Simulated quota/);
 assert.equal((await S.listAssets()).length,1);
 assert.equal((await S.loadWorkspacePersistent()).imageAssets.length,1);
 await S.restore({workspace:deleted,images:[]});assert.equal((await S.listAssets()).length,0);
 console.log('PASS: IDB migration, persisted workspace, atomic image+character add/delete, rollback, backup hash and restore');
})().catch(e=>{console.error(e);process.exitCode=1});
