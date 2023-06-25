let keyNodes = document.getElementsByClassName('key');

let keys = new Map(
    [... keyNodes]
        .map(item => [item.dataset.key, item]));

let audio = new Map(
    [... document.getElementsByTagName('audio')]
        .map(item => [item.dataset.key, item]));

window.addEventListener('keydown',
    function (event) {
        let key = keys.get(event.key);
        let sound = audio.get(event.key);
        if (!sound || !key)
            return;
        
        key.classList.add('playing');

        sound.currentTime = 0;
        sound.play();
    }
);

function clearPlaying(event) {
    if (event.propertyName !== 'transform') return;
    console.log('time to go...');
    const key = this; // because the key node would be calling this function when it's done transitioning
    key.classList.remove('playing');
}

for (const node of keyNodes) {
    node.addEventListener('transitionend', clearPlaying);
}
