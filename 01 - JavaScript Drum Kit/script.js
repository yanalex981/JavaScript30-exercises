let keys = new Map(
    [... document.getElementsByClassName('key')]
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
        
        
        sound.play();
    }
);
