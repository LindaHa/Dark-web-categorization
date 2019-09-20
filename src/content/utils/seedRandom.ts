import * as seedrandom from 'seedrandom';

export const seedRandom = (seed: string) => seedrandom(seed)();
