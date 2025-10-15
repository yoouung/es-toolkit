import { uniqBy } from './uniqBy.ts';
import { identity, uniq } from '../index.ts';

/**
 * Creates an array of unique values, in order, from all given arrays using a provided mapping function to determine equality.
 *
 * @template T - The type of elements in the array.
 * @template U - The type of mapped elements.
 * @param {T[]} arr1 - The first array.
 * @param {T[]} arr2 - The second array.
 * @param {(item: T) => U} mapper - The function to map array elements to comparison values.
 * @returns {T[]} A new array containing the union of unique elements from `arr1` and `arr2`, based on the values returned by the mapping function.
 *
 * @example
 * // Custom mapping function for numbers (modulo comparison)
 * const moduloMapper = (x) => x % 3;
 * unionBy([1, 2, 3], [4, 5, 6], moduloMapper);
 * // Returns [1, 2, 3]
 *
 * @example
 * // Custom mapping function for objects with an 'id' property
 * const idMapper = (obj) => obj.id;
 * unionBy([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], idMapper);
 * // Returns [{ id: 1 }, { id: 2 }, { id: 3 }]
 */
export function unionBy<T, U>(arr1: readonly T[], arr2: readonly T[], mapper: (item: T) => U): T[] {
  // return uniqBy(arr1.concat(arr2), mapper);

  // arr1 또는 arr2가 배열 형식이지만 배열이 아닐 경우 early return
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    return uniq([...arr1, ...arr2]);
  }

  const flattened: T[] = [];

  for (let i = 0; i < arr1.length; i++) {
    flattened[i] = arr1[i];
  }

  for (let i = 0; i < arr2.length; i++) {
    flattened[i + arr1.length] = arr2[i];
  }

  return uniqBy(flattened, mapper);
}
