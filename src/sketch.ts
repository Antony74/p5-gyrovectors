import p5 from 'p5';
import { VectorHyperbolicXY } from './vectorHyperbolicXY';

new p5((p) => {
    const lineMap = (
        value: number,
        start1: number,
        end1: number,
        start2: VectorHyperbolicXY,
        end2: VectorHyperbolicXY,
    ): VectorHyperbolicXY => {
        return start2.add(end2.mult(p.map(value, start1, end1, 0, 1)));
    };

    const drawPoint = (u: VectorHyperbolicXY) => {
        const x = p.map(u.x, -1, 1, 0, p.width);
        const y = p.map(u.y, -1, 1, 0, p.width);
        p.point(x, y);
    };

    const drawLine = (start: VectorHyperbolicXY, line: VectorHyperbolicXY) => {
        const segments = 100;
        for (let n = 0; n <= segments; ++n) {
            drawPoint(lineMap(n, 0, segments, start, line));
        }
    };

    const drawPolygon = (u: VectorHyperbolicXY, sides: number) => {
        const turn = (2 * Math.PI) / sides;
        const interiorAngle = ((sides - 2) * Math.PI) / sides;
        const firstTurn = Math.PI - 0.5 * interiorAngle;
        let currentPoint = u.mult(0.5);
        u = u.rotate(firstTurn);
        let nextPoint = currentPoint.add(u);
        for (let side = 1; side <= sides; ++side) {
            drawLine(currentPoint, u);
            currentPoint = nextPoint;
            u = u.rotate(turn);
            nextPoint = currentPoint.add(u);
        }
    };

    p.setup = () => {
        p.createCanvas(500, 500);
    };

    const animationLength = 1000;
    const animationPhases = 3;
    const animationPhaseLength = animationLength / animationPhases;

    p.draw = () => {
        p.background(230);

        const phase = Math.floor(
            (p.frameCount % animationLength) / animationPhaseLength,
        );
        const frame = p.frameCount % animationPhaseLength;

        // const o = new VectorHyperbolicXY(0, 0);
        // drawPoint(o);

        const u = new VectorHyperbolicXY(
            p.map(frame, 0, animationPhaseLength, 0, 0.7),
            0,
        ).rotate(frame / 100);

        drawPolygon(u, phase + 3);
    };
});
