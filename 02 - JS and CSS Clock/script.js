const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.min-hand');
const secondHand = document.querySelector('.second-hand');

function syncDate() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    const DEGREES_PER_HOUR = 360.0 / 12.0;
    const DEGREES_PER_TICK = 360.0 / 60.0;
    const ANGLE_OFFSET = -90.0;

    const hourAngle = (DEGREES_PER_HOUR*hours + minutes/60.0*DEGREES_PER_HOUR + ANGLE_OFFSET) % 360;
    const minutesAngle = (DEGREES_PER_TICK*minutes + DEGREES_PER_TICK*seconds/60.0 + ANGLE_OFFSET) % 360;
    const secondsAngle = (DEGREES_PER_TICK*seconds) % 360;

    hourHand.style.transform = `rotate(${hourAngle}deg)`;
    minuteHand.style.transform = `rotate(${minutesAngle}deg)`;
    secondHand.style.transform = `rotate(${secondsAngle}deg)`;
    
    // console.log(`Clock config: (${hourAngle}, ${minutesAngle}, ${secondsAngle})`);
}

syncDate();

setInterval(syncDate, 500);
