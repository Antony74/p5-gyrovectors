import { NumberTuple } from './tuples';

export type Gyrovector<Dimension extends number, Coords, Measure = object> = {
    asArray: () => NumberTuple<Dimension>;
    add: (
        v: Gyrovector<Dimension, Coords, Measure>,
    ) => Gyrovector<Dimension, Coords, Measure>;
    mult: (c: number) => Gyrovector<Dimension, Coords, Measure>;
    rotate: (radians: number) => Gyrovector<Dimension, Coords, Measure>;
} & Coords &
    Measure;

export type Gyrovector2 = Gyrovector<2, unknown>;

export type GyrovectorFactory<
    Dimension extends number,
    Coords,
    Measure = object,
> = {
    createVector: (
        ...vec: NumberTuple<Dimension>
    ) => Gyrovector<Dimension, Coords, Measure>;
    add: (
        u: Gyrovector<Dimension, Coords, Measure>,
        v: Gyrovector<Dimension, Coords, Measure>,
    ) => Gyrovector<Dimension, Coords, Measure>;
    mult: (
        c: number,
        u: Gyrovector<Dimension, Coords, Measure>,
    ) => Gyrovector<Dimension, Coords, Measure>;
    rotate: (
        u: Coords,
        radians: number,
    ) => Gyrovector<Dimension, Coords, Measure>;
};
