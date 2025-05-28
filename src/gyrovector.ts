/* eslint-disable @typescript-eslint/no-explicit-any */
import { NumberTuple } from './tuples';

export type Gyrovector<Dimension extends number> = {
    asArray: () => NumberTuple<Dimension>;
    add: (v: any) => any;
    mult: (c: number) => any;
    rotate: (radians: number) => any;
};

export type Gyrovector2 = Gyrovector<2>;

export type GyrovectorFactory<
    Dimension extends number,
    GyrovectorType extends Gyrovector<Dimension>,
> = {
    createVector: (...vec: NumberTuple<Dimension>) => GyrovectorType;
    add: (u: GyrovectorType, v: GyrovectorType) => GyrovectorType;
    mult: (c: number, u: GyrovectorType) => GyrovectorType;
    rotate: (u: GyrovectorType, radians: number) => GyrovectorType;
};
