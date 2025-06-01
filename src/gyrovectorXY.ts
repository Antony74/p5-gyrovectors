import { BaseGyrovector, GyrovectorSpace } from './baseGyrovector';
import { VectorXYFactory } from './vectorXY';
import * as trig from './curvatureDependentTrigonometricFunctions';

export class GyrovectorXY implements BaseGyrovector<2, GyrovectorXY> {
    space: GyrovectorXYSpace;

    constructor(
        public readonly x: number,
        public readonly y: number,
        public readonly curvature: number,
    ) {
        this.space = new GyrovectorXYSpace(curvature);
    }

    asArray(): [number, number] {
        return [this.x, this.y];
    }

    add(u: GyrovectorXY) {
        return this.space.add(this, u);
    }

    sub(u: GyrovectorXY) {
        return this.space.sub(this, u);
    }

    mult(c: number): GyrovectorXY {
        return this.space.mult(c, this);
    }

    div(c: number): GyrovectorXY {
        return this.space.div(c, this);
    }

    rotate(radians: number): GyrovectorXY {
        return this.space.rotate(this, radians);
    }
}

export class GyrovectorXYSpace implements GyrovectorSpace<2, GyrovectorXY> {
    vectorXYFactory = new VectorXYFactory();
    tan;
    atan;

    constructor(public readonly curvature: number) {
        this.tan = trig.tan(curvature);
        this.atan = trig.atan(curvature);
    }

    createVector(x: number, y: number): GyrovectorXY {
        return new GyrovectorXY(x, y, this.curvature);
    }

    add(u: GyrovectorXY, v: GyrovectorXY): GyrovectorXY {
        const _u = this.vectorXYFactory.createVector(u.x, u.y);
        const _v = this.vectorXYFactory.createVector(v.x, v.y);
        const lhs = this.vectorXYFactory.mult(
            1 -
                (2 * this.curvature * this.vectorXYFactory.dot(_u, _v)) +
                this.vectorXYFactory.dot(_v, _v),
            _u,
        );
        const rhs = this.vectorXYFactory.mult(
            1 + (this.curvature * this.vectorXYFactory.dot(_u, _u)),
            _v,
        );
        const top = this.vectorXYFactory.add(lhs, rhs);
        const bottom =
            1 -
            (2 * this.curvature * this.vectorXYFactory.dot(_u, _v)) +
            (this.curvature *
                this.curvature *
                this.vectorXYFactory.dot(_u, _u) *
                this.vectorXYFactory.dot(_v, _v));
        const result = this.vectorXYFactory.mult(1 / bottom, top);
        return this.createVector(result.x, result.y);
    }

    sub(u: GyrovectorXY, v: GyrovectorXY): GyrovectorXY {
        return this.add(u, this.createVector(-v.x, -v.y));
    }

    mult(c: number, u: GyrovectorXY): GyrovectorXY {
        const _u = this.vectorXYFactory.createVector(u.x, u.y);
        if (c === 0 || (u.x === 0 && u.y === 0)) {
            return this.createVector(0, 0);
        }
        const lenu = _u.mag();
        const normu = this.vectorXYFactory.mult(1 / lenu, _u);
        const result = this.vectorXYFactory.mult(
            this.tan(c * this.atan(lenu)),
            normu,
        );
        return this.createVector(result.x, result.y);
    }

    div(c: number, u: GyrovectorXY): GyrovectorXY {
        return this.mult(1 / c, u);
    }

    rotate(u: GyrovectorXY, radians: number): GyrovectorXY {
        const result = this.vectorXYFactory
            .createVector(u.x, u.y)
            .rotate(radians);
        return this.createVector(result.x, result.y);
    }
}
