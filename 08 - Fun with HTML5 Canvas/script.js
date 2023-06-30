const canvas = document.getElementById('draw');
const context = canvas.getContext('2d');
const rect = canvas.getBoundingClientRect();
const dpiScale = window.devicePixelRatio || 1;

[canvas.width, canvas.height] = [rect.width * dpiScale, rect.height * dpiScale];

context.strokeStyle = '#000000';
// context.lineWidth = 1;
context.lineJoin = 'round';
context.lineCap = 'round';

// context.beginPath();
// context.moveTo(0, 0);
// context.lineTo(canvas.width, canvas.height);
// context.stroke();

const ZERO = { x: 0, y: 0 };
const SAMPLE_PERIOD = 1000 / 120;
const MAX_BRUSH_SIZE = 32;
const MIN_BRUSH_SIZE = 4;
const BUFFER_SIZE = 8;

let drawing = false;

let posBuffer = [];
let lineStart = ZERO;
let lineEnd = ZERO;
let mousePosition = ZERO
let velocity = 0;
let brushIntensity = 1;

canvas.addEventListener('mousedown', (event) => {
    drawing = true;
    mousePosition = { x: event.offsetX, y: event.offsetY };
    posBuffer = [mousePosition];
    lineStart = mousePosition;
    lineEnd = mousePosition;
    velocity = 0;
});

canvas.addEventListener('mouseup', (event) => {
    drawing = false;
    mousePosition = { x: event.offsetX, y: event.offsetY };
});

canvas.addEventListener('mousemove', (event) => {
    mousePosition = { x: event.offsetX, y: event.offsetY };
    // if (!drawing) return;

    // // console.log(event);
    // posBuffer.shift();
    // posBuffer.push({ x: event.offsetX, y: event.offsetY });

    // console.log(posBuffer);

    // // velocity = posBuffer.forEach(value => {
    // //     //
    // // });
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
    // console.log(lineEnd);

    velocity = [... lengthsOf(posBuffer)].reduce((total, value) => total + value, 0);
    
    brushIntensity = velocity > 250? MIN_BRUSH_SIZE : 7/14400*(velocity - 250) ** 2 + MIN_BRUSH_SIZE;
}

setInterval(() => {
    if (!drawing) return;
    takeSamples();
    context.lineWidth = brushIntensity;
    context.beginPath();
    context.moveTo(lineStart.x, lineStart.y);
    context.lineTo(lineEnd.x, lineEnd.y);
    context.stroke();
}, SAMPLE_PERIOD);
