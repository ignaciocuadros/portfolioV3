const ignacioSvg = document.getElementById('ignacio');
const cuadrosSvg = document.getElementById('cuadros');
const svgInitial = ignacioSvg.getBoundingClientRect();

ignacioSvg.style.top = `${(window.innerHeight / 2) - (parseInt(svgInitial.height) * 1.25)}px`;
cuadrosSvg.style.bottom = `${(window.innerHeight / 2) - (parseInt(svgInitial.height) * 1.25)}px`;

const svgInitialSet = ignacioSvg.getBoundingClientRect();

let start, previousTimeStamp;
let done = false;
let scaleLimit = 0.5;
let actualScale = 1;

window.addEventListener('scroll', () => {
    window.requestAnimationFrame(step);
});

function step(timestamp) {
    if (start === undefined) {
      start = timestamp;
    }

    const elapsed = timestamp - start;
  
    if (previousTimeStamp !== timestamp) {
        const limit = parseInt(svgInitialSet.top) - 20;
        const count = Math.min(0.2 * elapsed, limit);

        ignacioSvg.style.transform = `translateY(-${count}px)`;
        ignacioSvg.style.transform += `scale(${actualScale})`;
        cuadrosSvg.style.transform = `translateY(${count}px)`;
        cuadrosSvg.style.transform += `scale(${actualScale})`;

        if (actualScale > scaleLimit) {
            actualScale -= 0.01;
        }
        if (count === limit) done = true;
    }
  
    if (elapsed < 3000) { // Stop the animation after 3 seconds
      previousTimeStamp = timestamp;
      if (!done) {
        window.requestAnimationFrame(step);
      }
    }
  }
