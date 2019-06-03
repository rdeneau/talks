// JSON stocké dans une variable "sample"
// → IntelliSense `petSample`
const petSample = {
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
};

// Types inférés (global et imbriqués) "aliasés" 
type PetSample      = typeof petSample;
type CategorySample = typeof petSample.category;
type TagSample      = typeof petSample.tags[0];

// -- NE PAS METTRE DANS LE PLAYGROUND --
// export qcq pour avoir un module et cloisonner les types pour vscode
export const name = 'demo-0';
