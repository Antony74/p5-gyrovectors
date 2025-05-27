import { CoordsXY } from './coordsXY';

export class VectorXY implements CoordsXY {
    type: Readonly<string> = 'CoordsXY';

    constructor(
        public readonly x: number,
        public readonly y: number,
    ) {}

    static dot(u: CoordsXY, v: CoordsXY): number {
        return u.x * v.x + u.y * v.y;
    }

    static add(u: CoordsXY, v: CoordsXY): VectorXY {
        return new VectorXY(u.x + v.x, u.y + v.y);
    }

    static mult(c: number, u: CoordsXY): VectorXY {
        return new VectorXY(c * u.x, c * u.y);
    }

    magSq(): number {
        return VectorXY.dot(this, this);
    }

    mag(): number {
        return this.magSq();
    }
}
