import { VectorXYFactory } from './vectorXY';
import { VectorHyperbolicXYFactory } from './vectorHyperbolicXY';

export class GyrovectorFactoryFactory {
    static create(dimension, curvature) {
        if (dimension !== 2) {
            throw new Error(
                `createGyrovectorFactory currently only supports 2 dimensions`,
            );
        }

        switch (curvature) {
            case 0:
                return new VectorXYFactory();
            case -1:
                return new VectorHyperbolicXYFactory();
            default:
                throw new Error(
                    `createGyrovectorFactory currently only supports curvatures of 0 (Euclidean) and -1 (Hyperbolic)`,
                );
        }
    }
}
