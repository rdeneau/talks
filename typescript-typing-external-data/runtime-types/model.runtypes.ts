import { Array, Literal, Number, Partial, String, Record, Static, Union, ValidationError } from 'runtypes';

import { StatusEnum } from './model.common';

export const Id = Number.withConstraint(n => n >= 0 || `${n} is negative`);

export const Category = Partial({
  id: Id,
  name: String,
});

export const Tag = Category;

export const Status = Union(
  Literal(StatusEnum.Available),
  Literal(StatusEnum.Pending),
  Literal(StatusEnum.Sold),
);

export const Pet = Record({
  name: String,
  photoUrls: Array(String),
}).And(Partial({
  id: Id,
  category: Category,
  tags: Array(Tag),
  status: Status,
}));

export interface Category extends Static<typeof Category> {}
export interface Tag extends Static<typeof Tag> {}
export interface Pet extends Static<typeof Pet> {}

export function validatePet(putativePet: unknown): string {
  try {
    const pet = Pet.check(putativePet);
    return `OK - name=${pet.name}`;
  } catch (error) {
    return error instanceof ValidationError
      ? `${error}. Field: '${error.key}'`
      : `KO! ${JSON.stringify(error)}`;
  }
}
