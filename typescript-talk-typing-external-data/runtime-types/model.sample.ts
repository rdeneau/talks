// -- Utility types ---
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>; // A supprimer dès TS 3.5
type Extends<T, U> = Omit<T, keyof T & keyof U> & U;
type PartialExcept<T, K extends keyof T> = Required<Pick<T, K>> & Partial<Omit<T, K>>;

// -- Typage grâce à un sample, par extension des types sous-jacents ---
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

// Pattern 1 : types imbriqués
interface CategoryDto extends Partial<typeof petSample.category> {}
interface TagDto      extends Partial<typeof petSample.tags[0]> {}

enum PetStatus {
    Available = 'available',
    Pending   = 'pending',
    Sold      = 'sold',
}

// Pattern 2 : redéfinition des types imbriqués
type PetDtoBase = Extends<typeof petSample, {
    category: CategoryDto,
    tags    : TagDto[],
    status  : PetStatus,
}>;

// Pattern 3 : 
interface PetDto extends PartialExcept<PetDtoBase, 'name' | 'photoUrls'> { }

// Vérification (avec --strictNullChecks)
declare var pet: PetDto;
pet.name;   // (property) name   : string    → Requis : OK
pet.status; // (property) status?: PetStatus → Optionnel : OK
pet.tags;   // (property) tags?  : TagDto[]  → Optionnel : OK

// -- Erreurs ---

// Erreur `An interface can only extend an identifier/qualified-name with optional type arguments.`
interface Err1 extends (typeof petSample) {}

// Solution 1: type alias intermédiaire
// Permet de voir la différence d'intellisense entre type alias (structure) et interface (nom)
type PetSample = typeof petSample;
interface OK1 extends PetSample {}

// Solution 2: utility type sans effet (ici, `Required` convient)
interface OK2 extends Required<typeof petSample> {}

//--

// Erreur: ...Property 'id' is optional in type 'CategoryDto' but required in type '{ id: number... }'
interface Err2 extends PetSample { category: CategoryDto }

// Pas d'erreur de compilation mais 2x `category` !?
type Ko = PetSample & { category: CategoryDto };
declare var ko: Ko; ko.category;

// -- HACK --
// export qcq pour avoir un module, cloisonner les types pour en avoir plusieurs versions
export const name = 'demo-3';
