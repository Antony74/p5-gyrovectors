import p5 from 'p5';
import { GyrovectorSpaceFactory } from 'gyrovector/src/gyrovectorSpaceFactory';

const width = 500;
const height = 500;

const space = GyrovectorSpaceFactory.create(2, -1 / (width * height)); // Hyperbolic
//const space = GyrovectorSpaceFactory.create(2, 0); // Euclidean
//const space = GyrovectorSpaceFactory.create(2, 1 / (width * height)); // Spherical

type GyrovectorType = ReturnType<typeof space.createVector>;

new p5((p) => {
    p.setup = () => {
        p.createCanvas(width, height);
        p.colorMode(p.HSB);
    };

    const lineMap = (
        value: number,
        start1: number,
        end1: number,
        start2: GyrovectorType,
        end2: GyrovectorType,
    ): GyrovectorType => {
        return start2.add(end2.mult(p.map(value, start1, end1, 0, 1)));
    };

    const drawLine = (start: GyrovectorType, line: GyrovectorType) => {
        const segments = 100;
        p.beginShape();
        for (let n = 0; n <= segments; ++n) {
            const v = lineMap(n, 0, segments, start, line);
            p.vertex(v.x, v.y);
        }
        p.endShape();
    };

    const drawPolygon = (u: GyrovectorType, sides: number) => {
        const turn = (2 * Math.PI) / sides;
        const interiorAngle = ((sides - 2) * Math.PI) / sides;
        const firstTurn = Math.PI - (0.5 * interiorAngle);
        let currentPoint = u.div(2);
        u = u.rotate(firstTurn);
        let nextPoint = currentPoint.add(u);
        for (let side = 1; side <= sides; ++side) {
            drawLine(currentPoint, u);
            currentPoint = nextPoint;
            u = u.rotate(turn);
            nextPoint = currentPoint.add(u);
        }
    };

    const animationLength = 1000;
    const animationPhases = 3;
    const animationPhaseLength = animationLength / animationPhases;

    p.draw = () => {
        p.translate(0.5 * p.width, 0.5 * p.height);
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

        const size = p.map(frame, 0, animationPhaseLength, 0, 300);

        const sign = absolutePhase % 2 ? 1 : -1;

        const u = space.createVector(size, 0).rotate((sign * frame) / 100);

        drawPolygon(u, phase + 3);
    };
});
