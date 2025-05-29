/* eslint-disable @typescript-eslint/no-explicit-any */
import {VectorXYFactory} from './vectorXY';
import {VectorHyperbolicXYFactory} from './vectorHyperbolicXY'

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
            return new VectorXYFactory() as any;
        case -1:
            return new VectorHyperbolicXYFactory() as any;
        default:
            throw new Error(
                `createGyrovectorFactory currently only supports curvatures of 0 (Euclidean) and -1 (Hyperbolic)`,
            );
    }
};
