const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto').webcrypto;
const ctx={console,crypto,structuredClone,Date,Math,JSON,Number,String,Array,Map,Set,Promise,Uint8Array,Uint32Array,TextEncoder,TextDecoder,ArrayBuffer,DataView,Blob,BigInt,atob,btoa,Error};ctx.window=ctx;
vm.createContext(ctx);ctx.KSeed=JSON.parse(fs.readFileSync('docs/examples/example-backup.v6.json')).workspace;
for(const x of ['core','engine','narrative','batch'])vm.runInContext(fs.readFileSync(`src/${x}.js`,'utf8'),ctx,{filename:x});
(async()=>{
 const {KCore:C,KNarrative:N,KBatch:B}=ctx,w=structuredClone(ctx.KSeed);N.ensure(w);
 assert.equal(C.validate(w).length,0);
 const [king,mira]=w.characters,sc=w.scenarios[0];
 const before=king.polarities.map(x=>x.leftScore);
 const run=await N.simulate(w,king,sc,'high');assert.equal(run.candidates.length,3);
 assert.equal(run.engineVersion,'context-2.0');assert.ok(run.candidates.every(c=>c.evidence.some(e=>e.sourcePath==='scenario.context')));
 const event=N.makeCanon(w,run,1,{outcome:'King Klown decided to tell Mira the truth.',otherCharacterId:mira.id,relationshipEffect:'strengthened'});
 w.simulationRuns.push(run);assert.equal(N.memories(w,king.id).length,1);assert.equal(N.memories(w,mira.id).length,1);
 assert.deepEqual(before,king.polarities.map(x=>x.leftScore));
 const next=await N.simulate(w,king,sc,'high');assert.notEqual(next.inputsHash,run.inputsHash);assert.ok(next.candidates.every(c=>c.evidence.some(x=>x.sourceType==='story')));assert.match(next.candidates[0].interpretation,/earlier experience/i);
 const comparison=await N.compare(w,king,mira,sc,'high');assert.equal(comparison.runs.length,2);assert.ok(Array.isArray(comparison.comparison.extensions.contrasts));
 assert.equal(C.validate(w).length,0); // Current format remains a valid v6 workspace with extensions.
 const m=king.milestones[0];if(m){const old=king.narrative.limitingBelief;N.applyGrowth(w,king.id,m.id,'I can guide without controlling.');assert.equal(king.narrative.limitingBelief,'I can guide without controlling.');assert.equal(N.undoGrowth(w,king.id),true);assert.equal(king.narrative.limitingBelief,old)}
 assert.equal(N.removeCanon(w,event.id),true);assert.equal(N.memories(w,king.id).length,0);
 const plan=B.plan([{name:`karacter_${C.filename(king.identity.name)}_${C.filename(w.visualThemes[0].id)}_portrait.png`,type:'image/png',size:100},{name:'unknown.png',type:'image/png',size:100}],w,C.filename);
 assert.equal(plan.length,2);assert.equal(plan[0].characterId,king.id);assert.ok(plan[1].error);
 console.log('PASS: narrative memory, accepted choice, future context, undo, no score changes, batch mapping');
})().catch(e=>{console.error(e);process.exitCode=1});
