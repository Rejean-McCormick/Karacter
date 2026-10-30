'use strict';
/* Original, non-clinical starting points, not personality diagnoses. */
window.KPresets=(()=>{
 const axes=['caution-boldness','reserve-expression','reflection-spontaneity','familiarity-exploration','objectives-relationships','containment-expression','speed-patience','practicality-imagination'];
 const presets=[
  ['dreamer','The Dreamer','Le rêveur',[3,4,4,1,3,3,4,1],'Wants to imagine new possibilities','Veut imaginer de nouvelles possibilités'],
  ['guardian','The Guardian','Le protecteur',[5,4,5,4,2,4,4,4],'Wants to keep friends safe','Veut protéger ses proches'],
  ['explorer','The Explorer','L’explorateur',[1,2,2,0,3,2,1,2],'Wants to discover what lies beyond','Veut découvrir l’inconnu'],
  ['observer','The Observer','L’observateur',[5,5,5,3,4,4,5,4],'Wants to understand before speaking','Veut comprendre avant de parler'],
  ['mediator','The Mediator','Le médiateur',[3,2,4,3,0,2,4,3],'Wants to restore trust between people','Veut rétablir la confiance entre les gens'],
  ['inventor','The Inventor','L’inventeur',[3,4,4,0,4,3,2,0],'Wants to turn impossible ideas into inventions','Veut transformer des idées improbables en inventions'],
  ['rebel','The Independent','L’indépendant',[1,3,2,1,5,3,2,2],'Wants to choose their own path','Veut suivre son propre chemin'],
  ['jester','The Jester','Le farceur',[1,0,1,2,2,0,1,1],'Wants to lighten difficult moments','Veut alléger les moments difficiles'],
  ['leader','The Organizer','L’organisateur',[2,1,5,3,5,3,2,4],'Wants to unite a group around a plan','Veut rassembler un groupe autour d’un plan'],
  ['artisan','The Artisan','L’artisan',[4,4,5,4,5,3,5,5],'Wants to create something dependable and beautiful','Veut créer quelque chose de beau et de solide'],
  ['perseverer','The Perseverer','Le persévérant',[4,3,4,4,4,4,6,3],'Wants to finish what they started','Veut terminer ce qu’il a commencé'],
  ['connector','The Connector','Le rassembleur',[2,0,2,3,0,1,3,2],'Wants everyone to feel included','Veut que chacun trouve sa place']
 ];
 const list=loc=>presets.map(([id,en,fr])=>({id,label:loc==='fr'?fr:en}));
 function create(id,locale='en'){
  const p=presets.find(x=>x[0]===id);if(!p)throw Error('Unknown character template');const c=KCore.createCharacter(locale==='fr'?'Nouveau personnage':'New character');
  c.identity.role=locale==='fr'?p[2]:p[1];c.innerWorld.motivation=locale==='fr'?p[5]:p[4];c.identity.keywords=[p[0]];
  for(let i=0;i<axes.length;i++){const axis=c.polarities.find(x=>x.id===axes[i]);if(axis)axis.leftScore=p[3][i]}
  return c;
 }
 return {list,create};
})();
