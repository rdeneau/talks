const petSample = {
    "id": 0,
    "category": {
        "id": 0,
        "name": "string"
    },
    // [...]
};

// -- Types --
// Erreur `An interface can only extend an identifier/qualified-name...`
interface CategorySampleKo extends (typeof petSample.category) {}

type CategorySample = typeof petSample.category;
interface CategoryDto extends Partial<CategorySample> {}

// Alternatives
interface CategoryDto2 extends Partial<typeof petSample.category> { }
type CategoryDto3 = Partial<typeof petSample.category>;

// -- Tests --
// a: { id: number; name: string; }
declare var a: CategorySample;

// b: CategoryDto
declare var b: CategoryDto;
b.id; // (property) id?: number;

// -- NE PAS METTRE DANS LE PLAYGROUND --
// export qcq pour avoir un module et cloisonner les types pour vscode
export const name = 'demo-1';
