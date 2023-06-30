const canvas = document.getElementById('draw');
const context = canvas.getContext('2d');
const rect = canvas.getBoundingClientRect();
const dpiScale = window.devicePixelRatio || 1;

[canvas.width, canvas.height] = [rect.width * dpiScale, rect.height * dpiScale];

context.strokeStyle = '#000000';
context.lineJoin = 'round';
context.lineCap = 'round';

const ZERO = { x: 0, y: 0 };
const SAMPLE_PERIOD = 1000 / 144;
const MAX_BRUSH_SIZE = 12;
const MIN_BRUSH_SIZE = 2;
const BUFFER_SIZE = 6;

let drawing = false;

let posBuffer = [];
let lineStart = ZERO;
let lineEnd = ZERO;
let mousePosition = ZERO
let velocity = 0;
let brushIntensity = 1;

canvas.addEventListener('pointerdown', (event) => {
    mousePosition = { x: event.offsetX, y: event.offsetY };
    drawing = true;
    posBuffer = [mousePosition];
    lineStart = mousePosition;
    lineEnd = mousePosition;
    velocity = 0;
});

canvas.addEventListener('pointerup', (event) => {
    mousePosition = { x: event.offsetX, y: event.offsetY };
    drawing = false;
});

canvas.addEventListener('pointermove', (event) => {
    mousePosition = { x: event.offsetX, y: event.offsetY };
});

function* bubble(arr) {
    for (let i = 0; i < arr.length - 1; ++i)
        yield [arr[i], arr[i + 1]];
}

function* lengthsOf(points) {
    for (const segment of bubble(points)) {
        [p1, p2] = segment;

        yield Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
    }
}

function clamp(value, min, max) {
    if (value > max) return max;
    if (value > min) return value;
    return min;
}

function takeSamples() {
    posBuffer.push(mousePosition);
    if (posBuffer.length > BUFFER_SIZE)
        posBuffer.shift();

    lineStart = lineEnd;
    lineEnd = posBuffer.reduce((sum, pos) => ({ x: pos.x / posBuffer.length + sum.x, y: pos.y / posBuffer.length + sum.y }), { x: 0, y: 0 });

    velocity = [... lengthsOf(posBuffer)].reduce((total, value) => total + value, 0);
    
    brushIntensity = velocity > 60? MIN_BRUSH_SIZE : 1/21600*(60 - velocity) ** 3 + MIN_BRUSH_SIZE;
}

setInterval(() => {
    if (!drawing) return;
    takeSamples();
    context.lineWidth = clamp(brushIntensity, MIN_BRUSH_SIZE, MAX_BRUSH_SIZE);
    context.beginPath();
    context.moveTo(lineStart.x, lineStart.y);
    context.lineTo(lineEnd.x, lineEnd.y);
    context.stroke();
}, SAMPLE_PERIOD);
