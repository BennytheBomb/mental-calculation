// import data from '../data/training.json';
import { setup, Tool, Path, Point } from 'paper';

interface DrawnNumber {
    label: number;
    data: [number, number][];
}

window.onload = () => {
    const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('content');
    if (!canvas) {
        throw new Error('Could not find canvas named content in document!');
    }

    setup(canvas);

    // Create a simple drawing tool:
    let tool: Tool = new Tool();
    let path: Path;
    let rectanglePath: Path;

    const drawnNumbers: DrawnNumber[] = [];

    // Define a mousedown and mousedrag handler
    tool.onMouseDown = (event) => {
        if (path) {
            path.remove();
        }

        if (rectanglePath) {
            rectanglePath.remove();
        }

        path = new Path({
            segments: [event.point],
            strokeColor: 'black',
            fullySelected: true
        });
    }

    tool.onMouseDrag = (event) => {
        path.add(event.point);
    }

    tool.onMouseUp = (event) => {
        path.simplify(10);

        const amount = 20;
        const length = path.length;
        const points: Point[] = [];
        for (var i = 0; i < amount; i++) {
            var offset = i / (amount - 1) * length;

            // Find the point on the path at the given offset:
            const point = path.getPointAt(offset);
            points.push(point);

            // Create a small circle shaped path at the point:
            const circle = new Path.Circle({
                center: point,
                radius: 3,
                fillColor: 'red'
            });
        }

        const bounds = path.bounds;

        rectanglePath = new Path.Rectangle(bounds);
        rectanglePath.strokeColor = 'black';

        const newPoints: Point[] = [];
        for (const point of points) {
            let newPoint = point.subtract(bounds.point);
            newPoint = newPoint.divide(bounds.width);
            newPoints.push(newPoint);
        }

        drawnNumbers.push({
            label: 8,
            data: newPoints.map(point => [point.x, point.y]),
        });

        console.log(JSON.stringify(drawnNumbers));

        console.log(points);
        console.log(newPoints);
    }
};

