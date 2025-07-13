import p5 from 'p5';
import { GyrovectorSpaceFactory } from 'gyrovector';
import { phases } from './phases';
import { VectorLike } from 'gyrovector';

type Vec2<GyrovectorType> = VectorLike<2, GyrovectorType> & {
    x: number;
    y: number;
};

new p5((p) => {
    p.setup = () => {
        p.createCanvas(500, 500);
        p.colorMode(p.HSB);
        p.textAlign(p.CENTER);
    };

    const lineMap = <GyrovectorType extends Vec2<GyrovectorType>>(
        value: number,
        start1: number,
        end1: number,
        start2: GyrovectorType,
        end2: GyrovectorType,
    ): GyrovectorType => {
        return start2.add(end2.mult(p.map(value, start1, end1, 0, 1)));
    };

    const drawLine = <GyrovectorType extends Vec2<GyrovectorType>>(
        start: GyrovectorType,
        line: GyrovectorType,
    ) => {
        const segments = 100;
        p.beginShape();
        for (let n = 0; n <= segments; ++n) {
            const v = lineMap(n, 0, segments, start, line);
            p.vertex(v.x, v.y);
        }
        p.endShape();
    };

    const drawPolygon = <GyrovectorType extends Vec2<GyrovectorType>>(
        u: GyrovectorType,
        sides: number,
    ) => {
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

    const animationPhaseLength = 330;

    p.draw = () => {
        p.background(0, 0, 95);

        const phaseIndex =
            Math.floor(p.frameCount / animationPhaseLength) % phases.length;
        const phase = phases[phaseIndex];

        p.textSize(50);
        p.noStroke();
        p.fill(0);
        p.text(phase.type, 0.5 * p.width, p.height - 50);

        p.translate(0.5 * p.width, 0.5 * p.height);

        p.noFill();
        p.strokeWeight(10);

        const frame = p.frameCount % animationPhaseLength;
        const alpha = p.map(frame, 0, animationPhaseLength, 4, 0);

        switch (phase.sides) {
            case 3:
                p.stroke(0, 255, 255, alpha);
                break;
            case 4:
                p.stroke(30, 255, 255, alpha);
                break;
            case 5:
                p.stroke(220, 255, 255, alpha);
                break;
        }

        let curvature;
        switch (phase.type) {
            case 'Hyperbolic':
                curvature = -1 / (p.width * p.height);
                break;
            case 'Euclidean':
                curvature = 0;
                break;
            case 'Spherical':
                curvature = 1 / (p.width * p.height);
                break;
        }

        const space = GyrovectorSpaceFactory.create(2, curvature);

        const size = p.map(frame, 0, animationPhaseLength, 0, 300);

        const u = space
            .createVector(size, 0)
            .rotate((phase.sign * frame) / 100);

        drawPolygon(u, phase.sides);
    };
});
