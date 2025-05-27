import { CoordsXY } from './coordsXY';
import { VectorXY } from './vectorXY';

export class VectorHyperbolic2 implements CoordsXY {
    type: Readonly<string> = 'VectorHyperbolic2';

    constructor(
        public x: number,
        public y: number,
    ) {}

    static add(u: VectorHyperbolic2, v: VectorHyperbolic2): VectorHyperbolic2 {
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
        return new VectorHyperbolic2(result.x, result.y);
    }

    static mult(c: number, u: VectorHyperbolic2): VectorHyperbolic2 {
        const _u = new VectorXY(u.x, u.y);
        if (c === 0 || (u.x === 0 && u.y === 0)) {
            return new VectorHyperbolic2(0, 0);
        }
        let lenu = _u.mag();
        let normu = VectorXY.mult(1 / lenu, _u);
        const result = VectorXY.mult(Math.tanh(c * Math.atanh(lenu)), normu);
        return new VectorHyperbolic2(result.x, result.y);
    }
}
