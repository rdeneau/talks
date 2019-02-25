// Excerpt https://petstore.swagger.io/#/pet/addPet INPUT
const petSample = {
    "id": 0,
    "name": "doggie",
    "tags": [
        {
            "id": 0,
            "name": "string"
        }
    ],
    "status": "available"
};

// 💡 Type racine
type PetSample = typeof petSample;

// 💡 Type imbriqué
type TagSample = typeof petSample.tags[0];

// ⚠️ ️IntelliSense "structurelle"
const pet1: PetSample = {} as any;
pet1.id;

// 💡 IntelliSense "nominale"
interface PetDto extends PetSample {}
const pet2: PetDto = {} as any;

// ️⚠️ ️Extension de l'interface
interface PetDto { anyThingElse: 'isUnexpected' }
pet2.anyThingElse;

// 💡 IntelliSense "nominale" des sous-types
interface TagDto extends TagSample {}
interface PetDto extends PetSample {
    tags: TagDto[]
}
pet2.tags;

// 💡 Champ optionnel à la main
function nullable<T>(value: T): T | null | undefined { return value; }
const petSampleLite = {
    "id": 0,
    "name": nullable("doggie")
};

// 💡 Tous les champs optionnels
type PetSampleFullOptional = Partial<typeof petSample>;
