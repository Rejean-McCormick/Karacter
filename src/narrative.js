'use strict';
/* Local, explainable story engine. No LLM, API, or psychology diagnosis. */
window.KNarrative=(()=>{
 const C=()=>window.KCore,E=()=>window.KEngine;
 const canon=w=>w.extensions?.storyCanon||[];
 const growth=w=>w.extensions?.growthHistory||[];
 const ensure=w=>{w.extensions=w.extensions||{};w.extensions.storyCanon=canon(w);w.extensions.growthHistory=growth(w);return w};
 const charEvents=(w,id)=>canon(w).filter(e=>e.characterId===id||e.otherCharacterId===id).sort((a,b)=>a.createdAt.localeCompare(b.createdAt));
 const memories=(w,id,limit=3)=>charEvents(w,id).slice(-limit);
 const makeCanon=(w,run,index,{outcome='',notes='',otherCharacterId=null,relationshipEffect='unchanged'}={})=>{
  ensure(w);if(!run||!run.candidates?.[index]||!w.characters.some(c=>c.id===run.characterId))throw Error('Invalid chosen reaction');
  if(otherCharacterId&&!w.characters.some(c=>c.id===otherCharacterId&&c.id!==run.characterId))throw Error('Invalid related character');
  const ca=run.candidates[index],event={id:C().uid(),createdAt:C().now(),characterId:run.characterId,otherCharacterId:otherCharacterId||null,scenarioId:run.scenarioId,scenarioTitle:run.scenarioSnapshot?.title||'',runId:run.id,candidatePath:ca.path,action:ca.action,interpretation:ca.interpretation,feelings:C().clone(ca.feelings),outcome:String(outcome||'').slice(0,4000),notes:String(notes||'').slice(0,4000),relationshipEffect:['unchanged','strengthened','strained','transformed'].includes(relationshipEffect)?relationshipEffect:'unchanged'};
  w.extensions.storyCanon.push(event);return event;
 };
 const removeCanon=(w,id)=>{ensure(w);const count=canon(w).length;w.extensions.storyCanon=canon(w).filter(e=>e.id!==id);return w.extensions.storyCanon.length!==count};
 const applyGrowth=(w,characterId,milestoneId,newBelief)=>{
  ensure(w);const ch=w.characters.find(c=>c.id===characterId),m=ch?.milestones.find(x=>x.id===milestoneId);
  if(!m)throw Error('Milestone not found');const to=String(newBelief||m.beliefAfter||'').trim();if(!to)throw Error('Write the new belief before applying growth');
  const change={id:C().uid(),createdAt:C().now(),characterId,milestoneId,field:'limitingBelief',before:ch.narrative.limitingBelief||'',after:to};
  ch.narrative.limitingBelief=to;ch.updatedAt=C().now();w.extensions.growthHistory.push(change);return change;
 };
 const undoGrowth=(w,characterId)=>{
  ensure(w);const h=growth(w);const idx=h.findLastIndex(x=>x.characterId===characterId);if(idx<0)return false;
  const item=h[idx],ch=w.characters.find(c=>c.id===characterId);if(!ch)return false;
  // Never clobber an author's newer edit.
  if(ch.narrative[item.field]!==item.after)throw Error('The belief was edited since this change. Undo manually to avoid overwriting it.');
  ch.narrative[item.field]=item.before;ch.updatedAt=C().now();h.splice(idx,1);return true;
 };
 const scenarioSignals=(s,stakes)=>{
  const words=`${s.title||''} ${s.context||''} ${(s.tags||[]).join(' ')}`.toLowerCase();
  return {urgent:/urgent|immediat|danger|quick|press|crisis|urgence|risqu|panique|panic|minutes?/.test(words)||stakes==='high',social:/ami|friend|group|groupe|family|famill|commun|trah|betray|secret|conflit|relationship|relation/.test(words),unknown:/unknown|inconnu|new|nouveau|incert|change|changement|surprise|découvr|discover/.test(words)};
 };
 const enrich=(run,w,relation=null)=>{
  const c=w.characters.find(x=>x.id===run.characterId)||run.characterSnapshot,record=memories(w,c.id,3),signals=scenarioSignals(run.scenarioSnapshot,run.stakes),traits=c.polarities||[];
  const first=(name)=>traits.find(a=>a.id===name||`${a.left.label} ${a.right.label}`.toLowerCase().includes(name));
  const safety=first('caution'),social=first('reserve'),reflection=first('reflection');
  const interpretations=[
   signals.urgent?'The clock is part of the dilemma; reacting quickly can protect others but hide important details.':'There is room to consider what is most important before reacting.',
   signals.social?'The character could prioritize being understood while leaving room for the other person’s perspective.':'The character could deliberately test an option different from their usual preference.',
   signals.unknown?'The unfamiliar situation may challenge a belief the character thought was settled.':'A surprising response can reveal values that are otherwise kept private.'
  ];
  const actions=[
   signals.urgent?'They take one concrete first step and reassess the risk immediately.':`They begin with their established habit: ${c.innerWorld?.habitualReaction||'observing what matters most'}.`,
   signals.social?'They ask the other person what they need before deciding on a response.':'They deliberately pause and choose a different way of approaching the problem.',
   signals.unknown?'They invite someone to explore a new approach together, while naming what is uncertain.':'They disclose a hidden concern and make a decision that others did not expect.'
  ];
  const tradeoffs=[
   signals.urgent?'Quick action can miss details and overwhelm others.':'A familiar reaction may overlook a new possibility.',
   signals.social?'Their openness can make them vulnerable or delay a necessary decision.':'Deliberating can take time when the moment requires initiative.',
   signals.unknown?'The unknown can bring discovery as well as unintended consequences.':'A surprising choice may challenge trust or established expectations.'
  ];
  run.candidates.forEach((ca,i)=>{
   ca.interpretation=`${ca.interpretation} ${interpretations[i]}`;
   ca.action=`${ca.action} ${actions[i]}`;
   ca.possibleTradeoff=tradeoffs[i];
   const cite=(sourcePath,reason,sourceType='inference')=>ca.evidence.push({sourceType,sourcePath,reason,status:'interpretation'});
   cite('scenario.context',`Context cues: ${Object.keys(signals).filter(x=>signals[x]).join(', ')||'no specialized cues'}.`,'scenario');
   if(safety&&signals.urgent)cite('polarities.caution',`A safety preference of ${safety.leftScore}/6 is relevant under pressure.`,'character');
   if(social&&signals.social)cite('polarities.reserve',`The scene involves others; social preferences may guide attention.`,'character');
   if(reflection&&signals.urgent)cite('polarities.reflection','Urgency may put reflection and spontaneity in tension.','character');
   if(record.length){const ev=record.at(-1);ca.interpretation+=` An earlier experience may matter: ${ev.scenarioTitle||'a past event'} (${ev.outcome||ev.action}).`;
    cite(`storyCanon.${ev.id}`,'A previously chosen event is part of this character’s history.','story');}
   if(relation?.history)cite(`relationships.${relation.id}`,'The authored relationship history can influence this decision.','relationship');
   if(c.narrative?.contradiction&&i===2){ca.tension=`${c.narrative.contradiction} Their choice may expose the gap between intention and behavior.`}
  });
  run.engineVersion='context-2.0';return run;
 };
 const localizeFrench=(run,w,relation)=>{
  const c=w.characters.find(x=>x.id===run.characterId)||run.characterSnapshot,sc=run.scenarioSnapshot,signals=scenarioSignals(sc,run.stakes),events=memories(w,c.id,1);
  const stake=run.stakes==='high'?'Les enjeux semblent importants.':run.stakes==='medium'?'La situation compte pour le personnage.':'Les conséquences immédiates sont limitées.';
  const previous=events.length?` Un souvenir pourrait jouer un rôle : ${events[0].outcome||events[0].action}`:'';
  const context=signals.social?'La relation avec autrui est au premier plan.':signals.urgent?'Le temps impose une pression supplémentaire.':signals.unknown?'L’inconnu peut bousculer les repères habituels.':'Plusieurs choix restent possibles.';
  const n=c.narrative||{},inner=c.innerWorld||{},motivation=inner.motivation||'ses valeurs et les conséquences possibles';
  const phrases=[
    {thought:`${stake} ${context} Sa motivation habituelle est : ${motivation}.${previous}`,act:`Première réaction possible : ${inner.habitualReaction||'observer puis suivre une préférence familière'}. ${signals.urgent?'Une petite action concrète peut permettre de réévaluer le danger.':'Le personnage peut vérifier ce qui compte le plus avant de continuer.'}`,up:'Cette réaction peut offrir un point de départ rassurant.',risk:'Une habitude peut masquer une autre possibilité.',need:inner.values?.[0]||inner.motivation||'comprendre la situation'},
    {thought:`${stake} Une autre voie consisterait à essayer volontairement une approche différente.${previous}`,act:signals.social?'Le personnage demande aux autres ce dont ils ont besoin avant de décider.':'Le personnage prend un court moment pour considérer l’autre pôle d’une préférence.',up:'Le recul peut révéler un besoin négligé.',risk:'Le changement de stratégie peut coûter du temps ou créer un malaise.',need:n.need||'pouvoir choisir autrement'},
    {thought:`${stake} ${n.limitingBelief?`Une croyance familière est remise en question : ${n.limitingBelief}.`:'Le personnage remarque une tension entre plusieurs valeurs.'}${previous}`,act:`Il révèle une préoccupation jusque-là cachée et propose une solution inattendue. ${n.contradiction?`Cela met en lumière sa contradiction : ${n.contradiction}.`:''}`,up:'La surprise peut permettre un dialogue nouveau.',risk:'Cette décision peut être mal comprise ou avoir des effets inattendus.',need:n.possibleGrowth||'tester une nouvelle manière d’agir'}
  ];
  run.candidates.forEach((ca,i)=>{const v=phrases[i];ca.interpretation=v.thought;ca.action=v.act;ca.underlyingNeed=v.need;ca.possibleUpside=v.up;ca.possibleTradeoff=v.risk;ca.tension=n.contradiction||inner.fear||'Des priorités différentes peuvent entrer en tension.';
    ca.evidence=ca.evidence.map(e=>({...e,reason:e.sourceType==='story'?'Ce souvenir a été choisi par l’auteur comme un fait de l’histoire.':e.sourceType==='scenario'?'Cette proposition dépend du contexte de la situation.':e.sourceType==='character'?'Une préférence écrite dans la fiche du personnage peut compter ici.':e.sourceType==='relationship'?'Une relation écrite dans la fiche peut influencer ce choix.':'Hypothèse narrative, non une prédiction.'}));
  });
  return run;
 };
 const simulate=async(w,c,s,stakes='medium',relation=null,locale='en')=>{const run=enrich(await E().simulate(c,s,stakes,relation),w,relation);run.inputsHash=await E().sha256(JSON.stringify({base:run.inputsHash,locale,memories:memories(w,c.id,3).map(x=>({id:x.id,outcome:x.outcome,action:x.action})),relation:relation?.history||''}));return locale==='fr'?localizeFrench(run,w,relation):run;};
 const compare=async(w,a,b,s,stakes='medium',locale='en')=>{
  const findRel=(x,y)=>w.relationships.find(r=>r.sourceCharacterId===x.id&&r.targetCharacterId===y.id)||null;
  const [ra,rb]=await Promise.all([simulate(w,a,s,stakes,findRel(a,b),locale),simulate(w,b,s,stakes,findRel(b,a),locale)]);
  const diff=[];for(let i=0;i<Math.min(3,a.polarities.length,b.polarities.length);i++){
   const ax=a.polarities[i],bx=b.polarities.find(x=>x.id===ax.id);if(bx&&ax.leftScore!==bx.leftScore)diff.push(`${ax.left.label} ↔ ${ax.right.label}: ${a.identity.name} ${ax.leftScore}/${6-ax.leftScore}; ${b.identity.name} ${bx.leftScore}/${6-bx.leftScore}`)
  }
  const comparison={id:C().uid(),createdAt:C().now(),characterAId:a.id,characterBId:b.id,scenarioId:s.id,stakes,runAId:ra.id,runBId:rb.id,summary:locale==='fr'?'Deux réactions plausibles dans les mêmes circonstances. Aucun personnage n’est meilleur.':'Two plausible responses to identical circumstances. Neither character is better.',extensions:{contrasts:diff.slice(0,3)}};
  return {comparison,runs:[ra,rb]};
 };
 const storyText=(w,id,locale='en')=>charEvents(w,id).map((e,i)=>`${i+1}. ${e.scenarioTitle}\n${locale==='fr'?'Action':'Action'}: ${e.action}\n${locale==='fr'?'Conséquence':'Outcome'}: ${e.outcome}\n${locale==='fr'?'Notes':'Notes'}: ${e.notes}`).join('\n\n');
 return {canon,growth,ensure,charEvents,memories,makeCanon,removeCanon,applyGrowth,undoGrowth,simulate,compare,storyText,scenarioSignals};
})();
