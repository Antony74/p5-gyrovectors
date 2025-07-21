import { VectorLike } from 'gyrovector';
import p5 from 'p5';

type VectorLikeXY<T> = VectorLike<2, T> & {
    x: number;
    y: number;
};

export const drawLine = <GyrovectorType extends VectorLikeXY<GyrovectorType>>(
    p: p5,
    start: GyrovectorType,
    line: GyrovectorType,
) => {
    const segments = 100;
    p.beginShape();
    for (let n = 0; n <= segments; ++n) {
        const v = start.add(line.mult(p.map(n, 0, segments, 0, 1)));
        p.vertex(v.x, v.y);
    }
    p.endShape();
};
