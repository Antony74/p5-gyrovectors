import { BaseVector, GyrovectorFactory } from './gyrovector';

export class VectorXY implements BaseVector<2, VectorXY> {
    factory = new VectorXYFactory();

    constructor(
        public x: number,
        public y: number,
    ) {}

    magSq() {
        return this.factory.dot(this, this);
    }

    mag() {
        return this.magSq();
    }

    add(v: VectorXY): VectorXY {
        return this.factory.add(this, v);
    }

    sub(v: VectorXY): VectorXY {
        return this.factory.sub(this, v);
    }

    mult(c: number): VectorXY {
        return this.factory.mult(c, this);
    }

    div(c: number): VectorXY {
        return this.factory.div(c, this);
    }

    rotate(radians: number): VectorXY {
        return this.factory.rotate(this, radians);
    }

    asArray(): [number, number] {
        return [this.x, this.y];
    }
}

export class VectorXYFactory implements GyrovectorFactory<2, VectorXY> {
    createVector(x: number, y: number): VectorXY {
        return new VectorXY(x, y);
    }

    dot(u: VectorXY, v: VectorXY): number {
        return u.x * v.x + u.y * v.y;
    }

    add(u: VectorXY, v: VectorXY): VectorXY {
        return this.createVector(u.x + v.x, u.y + v.y);
    }

    sub(u: VectorXY, v: VectorXY): VectorXY {
        return this.createVector(u.x - v.x, u.y - v.y);
    }

    mult(c: number, u: VectorXY): VectorXY {
        return this.createVector(c * u.x, c * u.y);
    }

    div(c: number, u: VectorXY): VectorXY {
        return this.createVector(u.x / c, u.y / c);
    }

    rotate(u: VectorXY, radians: number): VectorXY {
        return this.createVector(
            u.x * Math.cos(radians) - u.y * Math.sin(radians),
            u.x * Math.sin(radians) + u.y * Math.cos(radians),
        );
    }
}
