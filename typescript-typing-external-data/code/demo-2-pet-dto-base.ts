// -- Utility types ---
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type Extends<T, U> = Omit<T, keyof T & keyof U> & U;

// -- Pet types ---
const petSample = {
    "id": 0,
    "category": {
        "id": 0,
        "name": "string"
    },
    "name": "doggie",
    "status": "available",
    // [...]
};

enum PetStatus {
    Available = 'available',
    Pending   = 'pending',
    Sold      = 'sold',
}

type PetSample      = typeof petSample;
type CategorySample = typeof petSample.category;

interface CategoryDto extends Partial<CategorySample> {}

// Erreur: ...Property '"id"' is optional in type 'CategoryDto' but required in type '{ "id": number... }'
interface PetDtoErr extends PetSample { category: CategoryDto }

type PetDtoBase = Extends<PetSample, {
    category: CategoryDto,
    status  : PetStatus,
}>;

// Vérification
declare var pet: PetDtoBase;
pet.category; // (property) category: CategoryDto
pet.status;   // (property) status: PetStatus

// -- NE PAS METTRE DANS LE PLAYGROUND --
// export qcq pour avoir un module et cloisonner les types pour vscode
export const name = 'demo-2';
