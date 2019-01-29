export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function onAnimationComplete(elem, resolve) {
  elem.removeEventListener('transitionend', onAnimationComplete);
  resolve();
}
export function animate(elem) {
  return new Promise((resolve) => {
    elem.addEventListener('animationend', () => {
      onAnimationComplete(elem, resolve);
    });
  });
}
