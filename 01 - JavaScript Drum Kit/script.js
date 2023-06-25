let keys = new Map(
    [... document.getElementsByClassName('key')]
        .map(item => [item.dataset.key, item]));
console.log(keys);
let audio = new Map(
    [... document.getElementsByTagName('audio')]
        .map(item => [item.dataset.key, item]));
console.log(audio);

// window.addEventListener('keydown',
//     function (event) {
//         console.log(event);

//         audio[1].play();
//     }
// );
