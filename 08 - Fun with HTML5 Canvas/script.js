const canvas = document.getElementById('draw');
const context = canvas.getContext('2d');
const rect = canvas.getBoundingClientRect();
const dpiScale = window.devicePixelRatio || 1;

[canvas.width, canvas.height] = [rect.width * dpiScale, rect.height * dpiScale];

context.strokeStyle = '#000000';
context.lineJoin = 'round';
context.lineCap = 'round';

context.beginPath();
context.moveTo(50.5, 50);
context.lineTo(100.5, 100);
context.stroke();
