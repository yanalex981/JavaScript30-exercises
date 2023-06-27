const panels = document.querySelectorAll('.panel');

function handleOnClick() {
    this.classList.toggle('open');
}

function handleTransitionEnd(event) {
    if (event.propertyName !== 'flex-grow') return;
    this.classList.toggle('active');
}

panels.forEach((node, key, parent) => {
    node.addEventListener('click', handleOnClick);
    node.addEventListener('transitionend', handleTransitionEnd);
});
