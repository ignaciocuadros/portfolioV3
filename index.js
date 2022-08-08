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
  if (!done) {
    window.requestAnimationFrame(step);
  }
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

      if (count === limit) done = true;
      
      if (actualScale > scaleLimit && !done) {
        actualScale -= 0.02;
      }

      if (done) {
        initWelcome();
      }
    }
  
    if (elapsed < 2000) {
      previousTimeStamp = timestamp;
      if (!done) {
        window.requestAnimationFrame(step);
      }
    }
}
  
function initWelcome() {
  document.getElementById('welcome-1').classList.add('show');
  setTimeout(() => {
    document.getElementById('welcome-2').classList.add('show');
    setTimeout(() => {
      document.getElementById('welcome-3').classList.add('show');
      setTimeout(() => {
        document.getElementById('welcome-4').classList.add('show');
      }, 2000);
    }, 2000);
  }, 2000);
}
