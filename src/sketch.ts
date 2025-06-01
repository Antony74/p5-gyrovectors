import p5 from 'p5';
import { GyrovectorSpaceFactory } from './gyrovectorSpaceFactory';

new p5((p) => {
    const createDrawPolygonFunction = (curvature: number) => {
        const space = GyrovectorSpaceFactory.create(2, curvature);

        type GyrovectorType = ReturnType<typeof space.createVector>;

        const mapPoint = (
            u: GyrovectorType,
            fn: (x: number, y: number) => void,
        ) => {
            const max = 0.5;
            const [x, y] = u.asArray();
            fn(
                p.map(x, -max, max, 0, p.width),
                p.map(y, -max, max, 0, p.width),
            );
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
                mapPoint(lineMap(n, 0, segments, start, line), (x, y) =>
                    p.vertex(x, y),
                );
            }
            p.endShape();
        };

        const drawPolygon = (
            offset: GyrovectorType,
            u: GyrovectorType,
            sides: number,
        ) => {
            // mapPoint(offset, (x, y) => p.point(x, y));

            const turn = (2 * Math.PI) / sides;
            const interiorAngle = ((sides - 2) * Math.PI) / sides;
            const firstTurn = Math.PI - 0.5 * interiorAngle;
            let currentPoint = offset.add(u.div(2));
            u = u.rotate(firstTurn);
            let nextPoint = currentPoint.add(u);
            for (let side = 1; side <= sides; ++side) {
                drawLine(currentPoint, u);
                currentPoint = nextPoint;
                u = u.rotate(turn);
                nextPoint = currentPoint.add(u);
            }
        };

        const drawPolygons = () => {
            const u = space.createVector(0, -0.2);

            p.stroke(0, 255, 255);
            drawPolygon(u, u, 3);
            // p.stroke(30, 255, 255);
            // drawPolygon(u.mult(0), u, 4);
            p.stroke(220, 255, 255);
            drawPolygon(u.mult(-1.6), u.mult(0.7), 5);
        };

        return drawPolygons;
    };

    const drawText = (line1: string, line2: string) => {
        const x = 200;
        const y = 300;

        p.push();
        p.fill(0);
        p.noStroke();
        p.textSize(25);
        p.text(line1, x, y);
        p.text(line2, x, y + 25);
        p.pop();
    }

    p.setup = () => {
        p.createCanvas(500, 500);
        p.colorMode(p.HSB);
        p.background(0, 0, 95);
        p.noFill();
        p.strokeWeight(6);
        p.translate(0, -60);

        const horizontalSpacing = 160;
        const curvature = 2;

        p.push();
        p.translate(-horizontalSpacing, 0);
        const drawHyperbolic = createDrawPolygonFunction(-curvature);
        drawHyperbolic();
        drawText('Hyperbolic', 'κ = -1');
        p.pop();

        const drawEuclid = createDrawPolygonFunction(0);
        drawEuclid();
        drawText('Euclidean', 'κ = 0');

        p.translate(horizontalSpacing, 0);
        const drawSpherical = createDrawPolygonFunction(curvature);
        drawSpherical();
        drawText('Spherical', 'κ = 1');
    };
});
