export class GyrovectorFactoryFactory {
    static create(dimension: 2, curvature: 0): VectorXYFactory;
    static create(dimension: 2, curvature: -1): VectorHyperbolicXYFactory;
}
