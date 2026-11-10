'use strict';
const assert = require('node:assert/strict');
const {karacterCreativeCandidate} = require('../src/creative-handoff.js');

const fixture = {id:'author-123', identity:{name:'Mira',role:'Mentor'}, innerWorld:{motivation:'Protect the classroom'},
    privateJournal:'This field must not be exported', images:[{secret:'portrait'}]};
const doc = karacterCreativeCandidate(fixture, 'fr');
assert.equal(doc.format, 'koa.creative-asset-candidates/draft-1');
assert.equal(doc.producer, 'Karacter');
assert.equal(doc.target, 'UCKK-Assets');
assert.equal(doc.status, 'candidate');
assert.equal(doc.items.length, 1);
assert.equal(doc.items[0].locale, 'fr-CA');
assert.equal(doc.items[0].source_id, 'karacter:author-123');
assert.equal(doc.items[0].uckk_review, 'pending');
assert.equal(doc.items[0].rights.status, 'unverified');
assert.equal(doc.items[0].rights.license, null);
assert.deepEqual(doc.items[0].files, []);
assert.deepEqual(doc.items[0].content, {name:'Mira', role:'Mentor', intention:'Protect the classroom'});
assert.ok(!JSON.stringify(doc).includes('privateJournal'));
assert.ok(!JSON.stringify(doc).includes('portrait'));
assert.equal(karacterCreativeCandidate(fixture, 'en').items[0].locale, 'en');
assert.throws(() => karacterCreativeCandidate({...fixture,id:'../other'}, 'fr'), /valid local character ID/);
assert.throws(() => karacterCreativeCandidate({...fixture,id:''}, 'fr'), /valid local character ID/);
assert.throws(() => karacterCreativeCandidate({...fixture,identity:{name:'   '}}, 'en'), /Character name required/);
assert.equal(fixture.identity.name, 'Mira');
console.log('PASS: bounded, offline, noncanonical Karacter UCKK creative candidate');
