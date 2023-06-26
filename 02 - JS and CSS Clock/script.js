const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.min-hand');
const secondHand = document.querySelector('.second-hand');

const DEGREES_PER_HOUR = 360.0 / 12.0;
const DEGREES_PER_TICK = 360.0 / 60.0;
const ANGLE_OFFSET = -90.0;

function setHoursAngle(angle) {
    hourHand.style.transform = `rotate(${angle}deg)`;
}

function setMinutesAngle(angle) {
    minuteHand.style.transform = `rotate(${angle}deg)`;
}

function setSecondsAngle(angle) {
    secondHand.style.transform = `rotate(${angle}deg)`;
}

function getHoursAngle(hours, minutes) {
    return DEGREES_PER_HOUR*hours + minutes/60.0*DEGREES_PER_HOUR;
}

function getMinutesAngle(minutes, seconds) {
    return DEGREES_PER_TICK*minutes + DEGREES_PER_TICK*seconds/60.0;
}

function getSecondsAngle(seconds) {
    return DEGREES_PER_TICK*seconds;
}

let prevDate = new Date();
let currentDate = new Date();

let secondsAngle = getSecondsAngle(currentDate.getSeconds()) + ANGLE_OFFSET;

function advanceHands() {
    prevDate = currentDate;
    currentDate = new Date();
    const timeDiff = currentDate - prevDate;
    const seconds = timeDiff / 1000.0;
    setHoursAngle(getHoursAngle(currentDate.getHours(), currentDate.getMinutes()) + ANGLE_OFFSET);
    setMinutesAngle(getMinutesAngle(currentDate.getMinutes(), currentDate.getSeconds()) + ANGLE_OFFSET);
    secondsAngle += getSecondsAngle(seconds);
    setSecondsAngle(secondsAngle + ANGLE_OFFSET);
}

setInterval(() => {
    advanceHands();
}, 1000);
