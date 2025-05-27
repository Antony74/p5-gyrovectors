import { createVectorHyperbolicXYFactory } from './vectorHyperbolicXY';
import { createVectorXYFactory } from './vectorXY';

export const createGyrovectorFactory = <Dimension extends number>(
    dimension: Dimension,
    curvature: number,
) => {
    if (dimension !== 2) {
        throw new Error(
            `createGyrovectorFactory currently only supports 2 dimensions`,
        );
    }

    switch (curvature) {
        case 0:
            return createVectorXYFactory();
        case -1:
            return createVectorHyperbolicXYFactory();
        default:
            throw new Error(
                `createGyrovectorFactory currently only supports curvatures of 0 (Euclidean) and -1 (Hyperbolic)`,
            );
    }
};
