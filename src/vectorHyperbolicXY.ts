import { GyrovectorFactory } from './gyrovector';
import { createVectorXYFactory, GyrovectorXY } from './vectorXY';

export const createVectorHyperbolicXYFactory = (): GyrovectorFactory<
    2,
    GyrovectorXY
> => {
    const vectorXY = createVectorXYFactory();
    const factory: GyrovectorFactory<2, GyrovectorXY> = {
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
        add: (u: GyrovectorXY, v: GyrovectorXY): GyrovectorXY => {
            const lhs = factory.mult(
                1 + 2 * vectorXY.dot(u, v) + vectorXY.dot(v, v),
                u,
            );
            const rhs = vectorXY.mult(1 - vectorXY.dot(u, u), v);
            const top = vectorXY.add(lhs, rhs);
            const bottom =
                1 +
                2 * vectorXY.dot(u, v) +
                vectorXY.dot(u, u) * vectorXY.dot(v, v);
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

        rotate(u: GyrovectorXY, radians: number): GyrovectorXY {
            const result = vectorXY.rotate(u, radians);
            return factory.createVector(result.x, result.y);
        },
    };
    return factory;
};
