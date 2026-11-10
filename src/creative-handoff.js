'use strict';

// Optional, manually initiated creative candidate export. This is not a UCKK
// acceptance receipt, a license grant or a canonical Kristal assertion.
function karacterCreativeCandidate(character, language) {
  const extract = typeof karacterEkoleExcerpt === 'function'
    ? karacterEkoleExcerpt
    : require('./ekole-export.js').karacterEkoleExcerpt;
  const excerpt = extract(character, language);
  const id = character && character.id;
  if (typeof id !== 'string' || !/^[A-Za-z0-9._:-]{1,119}$/.test(id)) {
    throw new Error('A valid local character ID is required for a traceable candidate.');
  }
  return {
    format: 'koa.creative-asset-candidates/draft-1',
    producer: 'Karacter',
    target: 'UCKK-Assets',
    status: 'candidate',
    items: [{
      source_id: 'karacter:' + id,
      kind: 'fictional-character',
      title: excerpt.character.name,
      locale: excerpt.locale,
      source_format: excerpt.format,
      studio_review: 'not_reviewed',
      uckk_review: 'pending',
      rights: {status: 'unverified', license: null, attribution: null},
      files: [],
      content: {...excerpt.character}
    }]
  };
}

if (typeof module === 'object') module.exports = {karacterCreativeCandidate};
