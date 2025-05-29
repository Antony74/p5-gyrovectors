import { CoordsXY } from './coordsXY';
import { Gyrovector, GyrovectorFactory } from './gyrovector';

export type Measure = {
    magSq: () => number;
    mag: () => number;
};

export type VectorXY = Gyrovector<2, CoordsXY, Measure>;

export const createVectorXYFactory = () => {
    const factory: GyrovectorFactory<2, CoordsXY, Measure> & {
        dot: (u: CoordsXY, v: CoordsXY) => number;
    } = {
        createVector: (x: number, y: number) => {
            const vector: VectorXY = {
                magSq: () => {
                    return factory.dot(vector, vector);
                },

                mag: () => {
                    return vector.magSq();
                },

                add: (v: VectorXY): VectorXY => {
                    return factory.add(vector, v);
                },

                mult: (c: number): VectorXY => {
                    return factory.mult(c, vector);
                },

                rotate: (radians: number): VectorXY => {
                    return factory.rotate(vector, radians);
                },

                asArray: () => [x, y],
                x,
                y,
            };

            return vector;
        },
        dot: (u: CoordsXY, v: CoordsXY): number => {
            return u.x * v.x + u.y * v.y;
        },
        add: (u: VectorXY, v: VectorXY): VectorXY => {
            return factory.createVector(u.x + v.x, u.y + v.y);
        },
        mult: (c: number, u: VectorXY): VectorXY => {
            return factory.createVector(c * u.x, c * u.y);
        },
        rotate(u: CoordsXY, radians: number): VectorXY {
            return factory.createVector(
                u.x * Math.cos(radians) - u.y * Math.sin(radians),
                u.x * Math.sin(radians) + u.y * Math.cos(radians),
            );
        },
    };

    return factory;
};
