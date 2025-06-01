import { VectorXYFactory } from './vectorXY';
import { GyrovectorXYSpace } from './gyrovectorXY';

export class GyrovectorSpaceFactory {
    static create(dimension: 2, curvature: 0): VectorXYFactory;
    static create(dimension: 2, curvature: number): GyrovectorXYSpace;
}
