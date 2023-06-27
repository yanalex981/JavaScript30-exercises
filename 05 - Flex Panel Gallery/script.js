const panels = document.querySelectorAll('.panel');

function handleOnClick() {
    this.style.flex = this.style.flex? '' : '4';
}

panels.forEach((node, key, parent) => {
    node.addEventListener('click', handleOnClick);
});
