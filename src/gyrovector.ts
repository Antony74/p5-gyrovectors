import { NumberTuple } from './tuples';

export type Gyrovector<
    Dimension extends number,
    Coords,
    Measure extends object = object,
> = {
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
    GyrovectorType extends Gyrovector<Dimension, Coords, Measure>,
    Dimension extends number,
    Coords,
    Measure extends object = object,
> = {
    createVector: (...vec: NumberTuple<Dimension>) => GyrovectorType;
    add: (u: GyrovectorType, v: GyrovectorType) => GyrovectorType;
    mult: (c: number, u: GyrovectorType) => GyrovectorType;
    rotate: (u: Coords, radians: number) => GyrovectorType;
};
