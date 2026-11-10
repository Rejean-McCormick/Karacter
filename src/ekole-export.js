'use strict';

function karacterEkoleExcerpt(character, language) {
 const bounded = (value, length) => typeof value === 'string' ? value.trim().slice(0, length) : '';
 const name = bounded(character?.identity?.name, 100);
 if (!name) throw new Error(language === 'fr' ? 'Nom du personnage requis.' : 'Character name required.');
 return {
  format: 'karacter.ekole-character/1',
  status: 'candidate',
  locale: language === 'fr' ? 'fr-CA' : 'en',
  character: {
   name,
   role: bounded(character.identity.role, 160),
   intention: bounded(character.innerWorld?.motivation, 450)
  }
 };
}

if (typeof module === 'object') module.exports = {karacterEkoleExcerpt};
