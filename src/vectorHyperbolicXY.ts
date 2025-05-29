import { BaseVector, GyrovectorFactory } from './gyrovector';
import { VectorXYFactory } from './vectorXY';

export class VectorHyperbolicXY implements BaseVector<2, VectorHyperbolicXY> {
    factory = new VectorHyperbolicXYFactory();

    constructor(
        public x: number,
        public y: number,
    ) {}

    add(u: VectorHyperbolicXY) {
        return this.factory.add(this, u);
    }
    asArray(): [number, number] {
        return [this.x, this.y];
    }
    mult(c: number): VectorHyperbolicXY {
        return this.factory.mult(c, this);
    }
    rotate(radians: number): VectorHyperbolicXY {
        return this.factory.rotate(this, radians);
    }
}

export class VectorHyperbolicXYFactory
    implements GyrovectorFactory<2, VectorHyperbolicXY>
{
    vectorXYFactory = new VectorXYFactory();

    createVector(x: number, y: number): VectorHyperbolicXY {
        return new VectorHyperbolicXY(x, y);
    }

    add(u: VectorHyperbolicXY, v: VectorHyperbolicXY): VectorHyperbolicXY {
        const _u = this.vectorXYFactory.createVector(u.x, u.y);
        const _v = this.vectorXYFactory.createVector(v.x, v.y);
        const lhs = this.vectorXYFactory.mult(
            1 +
                2 * this.vectorXYFactory.dot(_u, _v) +
                this.vectorXYFactory.dot(_v, _v),
            _u,
        );
        const rhs = this.vectorXYFactory.mult(
            1 - this.vectorXYFactory.dot(_u, _u),
            _v,
        );
        const top = this.vectorXYFactory.add(lhs, rhs);
        const bottom =
            1 +
            2 * this.vectorXYFactory.dot(_u, _v) +
            this.vectorXYFactory.dot(_u, _u) * this.vectorXYFactory.dot(_v, _v);
        const result = this.vectorXYFactory.mult(1 / bottom, top);
        return this.createVector(result.x, result.y);
    }

    mult(c: number, u: VectorHyperbolicXY): VectorHyperbolicXY {
        const _u = this.vectorXYFactory.createVector(u.x, u.y);
        if (c === 0 || (u.x === 0 && u.y === 0)) {
            return this.createVector(0, 0);
        }
        const lenu = _u.mag();
        const normu = this.vectorXYFactory.mult(1 / lenu, _u);
        const result = this.vectorXYFactory.mult(
            Math.tanh(c * Math.atanh(lenu)),
            normu,
        );
        return this.createVector(result.x, result.y);
    }

    rotate(u: VectorHyperbolicXY, radians: number): VectorHyperbolicXY {
        const result = this.vectorXYFactory
            .createVector(u.x, u.y)
            .rotate(radians);
        return this.createVector(result.x, result.y);
    }
}
