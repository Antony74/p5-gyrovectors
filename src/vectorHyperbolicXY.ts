import { CoordsXY } from './coordsXY';
import { VectorXY } from './vectorXY';

export class VectorHyperbolicXY implements CoordsXY {
    type: Readonly<string> = 'VectorHyperbolicXY';

    constructor(
        public x: number,
        public y: number,
    ) {}

    static add(
        u: VectorHyperbolicXY,
        v: VectorHyperbolicXY,
    ): VectorHyperbolicXY {
        const lhs = VectorXY.mult(
            1 + 2 * VectorXY.dot(u, v) + VectorXY.dot(v, v),
            u,
        );
        const rhs = VectorXY.mult(1 - VectorXY.dot(u, u), v);
        const top = VectorXY.add(lhs, rhs);
        const bottom =
            1 +
            2 * VectorXY.dot(u, v) +
            VectorXY.dot(u, u) * VectorXY.dot(v, v);
        const result = VectorXY.mult(1 / bottom, top);
        return new VectorHyperbolicXY(result.x, result.y);
    }

    add(v: VectorHyperbolicXY) {
        return VectorHyperbolicXY.add(this, v);
    }

    static sub(
        u: VectorHyperbolicXY,
        v: VectorHyperbolicXY,
    ): VectorHyperbolicXY {
        return VectorHyperbolicXY.add(u, new VectorHyperbolicXY(-v.x, -v.y));
    }

    sub(v: VectorHyperbolicXY) {
        return VectorHyperbolicXY.sub(this, v);
    }

    static mult(c: number, u: VectorHyperbolicXY): VectorHyperbolicXY {
        const _u = new VectorXY(u.x, u.y);
        if (c === 0 || (u.x === 0 && u.y === 0)) {
            return new VectorHyperbolicXY(0, 0);
        }
        const lenu = _u.mag();
        const normu = VectorXY.mult(1 / lenu, _u);
        const result = VectorXY.mult(Math.tanh(c * Math.atanh(lenu)), normu);
        return new VectorHyperbolicXY(result.x, result.y);
    }

    mult(c: number) {
        return VectorHyperbolicXY.mult(c, this);
    }

    rotate(radians: number): VectorHyperbolicXY {
        const result = VectorXY.rotate(this, radians);
        return new VectorHyperbolicXY(result.x, result.y);
    }
}
