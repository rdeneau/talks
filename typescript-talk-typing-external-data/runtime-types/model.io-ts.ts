import * as t from 'io-ts';
import { PathReporter } from 'io-ts/lib/PathReporter'

export const Category = t.partial({
  id: t.number,
  name: t.string,
});

export const Tag = Category;

export const Status = t.keyof({
  available: null,
  pending: null,
  sold: null,
});

export const Pet = t.intersection([
  t.type({
    name: t.string,
    photoUrls: t.array(t.string),
  }),
  t.partial({
    id: t.number,
    category: Category,
    tags: t.array(Tag),
    status: Status,
  })
]);

export interface Category extends t.TypeOf<typeof Category> {}
export interface Tag extends t.TypeOf<typeof Tag> {}
export interface Pet extends t.TypeOf<typeof Pet> {}

export function validatePet(putativePet: unknown): string[] {
  const result = Pet.decode(putativePet);
  return PathReporter.report(result);
}
