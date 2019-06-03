import './style.css';

import * as ModelIoTs from './model.io-ts';
import * as ModelRuntypes from './model.runtypes';

testPet('When name is missing', {
    "photoUrls": [],
});

testPet('When name is a number instead of a string', {
    "name": 123,
    "photoUrls": [],
});

testPet('When id is a string instead of a number', {
    "id": 'not-a-number',
    "name": 'any-name',
    "photoUrls": [],
});

testPet('When id is negative', {
    "id": -1,
    "name": 'any-name',
    "photoUrls": [],
});

testPet('Given 2 errors (name, id), validation stops at the first one', {
    "id": 'not-a-number',
    "name": 'any-name',
    "photoUrls": [],
});

testPet('Given the sample, it should be valid', {
    "id": 0,
    "category": {
        "id": 0,
        "name": "string"
    },
    "name": "doggie",
    "photoUrls": [
        "string"
    ],
    "tags": [
        {
            "id": 0,
            "name": "string"
        }
    ],
    "status": "available"
});

function testPet(description: string, putativePet: unknown) {
  log(`
<pre>
  Description: ${description}
  InputObject: ${JSON.stringify(putativePet)}
  io-ts      : ${ModelIoTs.validatePet(putativePet)}
  runtypes   : ${ModelRuntypes.validatePet(putativePet)}
</pre><hr>`);
}

// -- Display ---
function appDiv() {
  return document.getElementById('app');
}

function log(content: string) {
    appDiv().innerHTML += content;
}
