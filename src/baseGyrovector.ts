import { NumberTuple } from './tuples';

export interface BaseGyrovector<Dimension extends number, Gyrovector> {
    asArray(): NumberTuple<Dimension>;
    add(v: Gyrovector): Gyrovector;
    sub(v: Gyrovector): Gyrovector;
    mult(c: number): Gyrovector;
    div(c: number): Gyrovector;
    rotate(radians: number): Gyrovector;
}

export interface GyrovectorSpace<
    Dimension extends number,
    Gyrovector extends BaseGyrovector<Dimension, Gyrovector>,
> {
    createVector: (...vec: NumberTuple<Dimension>) => Gyrovector;
    add: (u: Gyrovector, v: Gyrovector) => Gyrovector;
    sub: (u: Gyrovector, v: Gyrovector) => Gyrovector;
    mult: (c: number, u: Gyrovector) => Gyrovector;
    div: (c: number, u: Gyrovector) => Gyrovector;
    rotate: (u: Gyrovector, radians: number) => Gyrovector;
}
