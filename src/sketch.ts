import p5 from 'p5';
import { createGyrovectorFactory } from './createGyrovectorFactory';
import { Gyrovector } from './gyrovector';

const factory = createGyrovectorFactory(2, -1);

new p5((p) => {
    const lineMap = (
        value: number,
        start1: number,
        end1: number,
        start2: Gyrovector<2>,
        end2: Gyrovector<2>,
    ): Gyrovector<2> => {
        return start2.add(end2.mult(p.map(value, start1, end1, 0, 1)));
    };

    const mapPoint = (u: Gyrovector<2>, fn: (x: number, y: number) => void) => {
        const max = 0.4;
        const [x, y] = u.asArray();
        fn(p.map(x, -max, max, 0, p.width), p.map(y, -max, max, 0, p.width));
    };

    const drawLine = (start: Gyrovector<2>, line: Gyrovector<2>) => {
        const segments = 100;
        p.beginShape();
        for (let n = 0; n <= segments; ++n) {
            mapPoint(lineMap(n, 0, segments, start, line), (x, y) =>
                p.vertex(x, y),
            );
        }
        p.endShape();
    };

    const drawPolygon = (u: Gyrovector<2>, sides: number) => {
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
        p.colorMode(p.HSB);
    };

    const animationLength = 1000;
    const animationPhases = 3;
    const animationPhaseLength = animationLength / animationPhases;

    p.draw = () => {
        p.background(0, 0, 95);
        p.noFill();
        p.strokeWeight(10);

        const phase = Math.floor(
            (p.frameCount % animationLength) / animationPhaseLength,
        );

        const absolutePhase = Math.floor(p.frameCount / animationPhaseLength);

        const frame = p.frameCount % animationPhaseLength;
        const alpha = p.map(frame, 0, animationPhaseLength, 4, 0);

        switch (phase) {
            case 0:
                p.stroke(0, 255, 255, alpha);
                break;
            case 1:
                p.stroke(30, 255, 255, alpha);
                break;
            case 2:
                p.stroke(220, 255, 255, alpha);
                break;
        }

        // const o = new VectorHyperbolicXY(0, 0);
        // mapPoint(o, (x, y) => p.point(x, y));

        const size = p.map(frame, 0, animationPhaseLength, 0, 0.7);

        const sign = absolutePhase % 2 ? 1 : -1;

        const u = factory.createVector(size, 0).rotate((sign * frame) / 100);

        drawPolygon(u, phase + 3);
    };
});
