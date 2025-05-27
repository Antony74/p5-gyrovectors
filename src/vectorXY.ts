import { CoordsXY } from './coordsXY';
import { Gyrovector } from './gyrovector';

export type GyrovectorXY = Gyrovector<2> & CoordsXY;
export type VectorXY = GyrovectorXY & {
    magSq: () => number;
    mag: () => number;
};

export const createVectorXYFactory = () => {
    const factory = {
        createVector: (x: number, y: number) => {
            const vector: VectorXY = {
                magSq: () => {
                    return factory.dot(vector, vector);
                },

                mag: () => {
                    return vector.magSq();
                },

                add: (v: GyrovectorXY): GyrovectorXY => {
                    return factory.add(vector, v);
                },

                mult: (c: number): GyrovectorXY => {
                    return factory.mult(c, vector);
                },

                rotate: (radians: number): GyrovectorXY => {
                    return factory.rotate(vector, radians);
                },

                asArray: () => [x, y],
                x,
                y,
            };

            return vector;
        },
        dot: (u: GyrovectorXY, v: GyrovectorXY): number => {
            return u.x * v.x + u.y * v.y;
        },
        add: (u: GyrovectorXY, v: GyrovectorXY): GyrovectorXY => {
            return factory.createVector(u.x + v.x, u.y + v.y);
        },
        mult: (c: number, u: GyrovectorXY): GyrovectorXY => {
            return factory.createVector(c * u.x, c * u.y);
        },
        rotate(u: GyrovectorXY, radians: number): GyrovectorXY {
            return factory.createVector(
                u.x * Math.cos(radians) - u.y * Math.sin(radians),
                u.x * Math.sin(radians) + u.y * Math.cos(radians),
            );
        },
    };

    return factory;
};
