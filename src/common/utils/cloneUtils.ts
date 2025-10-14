// Clones an array - Used in Mappers
export const cloneArray = <T>(arr?: T[]): T[] | undefined =>
  arr ? arr.map((item) => ({ ...item })) : undefined;

// Clones an object - Used in Mappers
export const cloneObject = <T>(obj?: T): T | undefined =>
  obj ? { ...obj } : undefined;
