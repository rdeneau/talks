// -- Utility types ---
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type Extends<T, U> = Omit<T, keyof T & keyof U> & U;
type PartialExcept<T, K extends keyof T> = Required<Pick<T, K>> & Partial<Omit<T, K>>;

// -- Pet types ---
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

enum PetStatus {
    Available = 'available',
    Pending   = 'pending',
    Sold      = 'sold',
}

interface CategoryDto extends Partial<typeof petSample.category> {}
interface TagDto      extends Partial<typeof petSample.tags[0]> {}

type PetDtoBase = Extends<typeof petSample, {
    category: CategoryDto,
    tags    : TagDto[],
    status  : PetStatus,
}>;

interface PetDto extends PartialExcept<PetDtoBase, 'name' | 'photoUrls'> { }

// Vérification (avec --strictNullChecks)
declare var pet: PetDto;
pet.name;   // (property) name   : string    → Requis : OK
pet.status; // (property) status?: PetStatus → Optionnel : OK

// -- Erreurs

// Erreur `An interface can only extend an identifier/qualified-name...`
interface Err1 extends (typeof petSample) {}

// Solution 1: type alias intermédiaire
// Permet de voir la diff d'intellisense entre type alias et interface
type PetSample = typeof petSample;
interface OK1 extends PetSample {}

// Solution 2: utility type
interface OK2 extends Required<typeof petSample> {}

// Erreur: ...Property '"id"' is optional in type 'CategoryDto' but required in type '{ "id": number... }'
interface Err2 extends PetSample { category: CategoryDto }

// Pas d'erreur de compilation mais 2x `category` !?
type Ko = PetSample & { category: CategoryDto };

// -- NE PAS METTRE DANS LE PLAYGROUND --
// export qcq pour avoir un module et cloisonner les types pour vscode
export const name = 'demo-3';
