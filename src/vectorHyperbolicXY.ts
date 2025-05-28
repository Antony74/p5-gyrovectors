import { CoordsXY } from './coordsXY';
import { GyrovectorFactory } from './gyrovector';
import { GyrovectorXY } from './gyrovectorXY';
import { createVectorXYFactory } from './vectorXY';

export const createVectorHyperbolicXYFactory = (): GyrovectorFactory<
    GyrovectorXY, 2, CoordsXY
> => {
    const vectorXY = createVectorXYFactory();
    const factory: GyrovectorFactory<GyrovectorXY, 2, CoordsXY> = {
        createVector: (x: number, y: number): GyrovectorXY => {
            const vector: GyrovectorXY = {
                add: (u: GyrovectorXY) => factory.add(vector, u),
                asArray: () => [x, y],
                mult: (c: number): GyrovectorXY => factory.mult(c, vector),
                rotate: (radians: number): GyrovectorXY =>
                    factory.rotate(vector, radians),
                x,
                y,
            };
            return vector;
        },
        add: (uu: GyrovectorXY, vv: GyrovectorXY): GyrovectorXY => {
            const _u = vectorXY.createVector(uu.x, uu.y);
            const _v = vectorXY.createVector(vv.x, vv.y);
            const lhs = vectorXY.mult(
                1 + 2 * vectorXY.dot(_u, _v) + vectorXY.dot(_v, _v),
                _u,
            );
            const rhs = vectorXY.mult(1 - vectorXY.dot(_u, _u), _v);
            const top = vectorXY.add(lhs, rhs);
            const bottom =
                1 +
                2 * vectorXY.dot(_u, _v) +
                vectorXY.dot(_u, _u) * vectorXY.dot(_v, _v);
            const result = vectorXY.mult(1 / bottom, top);
            return factory.createVector(result.x, result.y);
        },
        mult: (c: number, u: GyrovectorXY): GyrovectorXY => {
            const _u = vectorXY.createVector(u.x, u.y);
            if (c === 0 || (u.x === 0 && u.y === 0)) {
                return factory.createVector(0, 0);
            }
            const lenu = _u.mag();
            const normu = vectorXY.mult(1 / lenu, _u);
            const result = vectorXY.mult(
                Math.tanh(c * Math.atanh(lenu)),
                normu,
            );
            return factory.createVector(result.x, result.y);
        },

        rotate(u: CoordsXY, radians: number): GyrovectorXY {
            const result = vectorXY.rotate(u, radians);
            return factory.createVector(result.x, result.y);
        },
    };
    return factory;
};
