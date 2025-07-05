export type SpaceType = 'Hyperbolic' | 'Euclidean' | 'Spherical';
export type Phase = { type: SpaceType; sides: number; sign: 1 | -1 };

export const phases: Phase[] = [
    { type: 'Hyperbolic', sides: 3, sign: 1 },
    { type: 'Hyperbolic', sides: 4, sign: -1 },
    { type: 'Hyperbolic', sides: 5, sign: 1 },
    { type: 'Euclidean', sides: 3, sign: 1 },
    { type: 'Euclidean', sides: 4, sign: -1 },
    { type: 'Euclidean', sides: 5, sign: 1 },
    { type: 'Spherical', sides: 3, sign: 1 },
    { type: 'Spherical', sides: 4, sign: -1 },
    { type: 'Spherical', sides: 5, sign: 1 },
];
