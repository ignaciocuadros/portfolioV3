let ignacioSvg, cuadrosSvg, svgInitial, svgInitialSet, topForWork;
let start, previousTimeStamp;
let done = false;
let scaleLimit = 0.5;
let actualScale = 1;

window.addEventListener("load", () => {
  //Set the position of IGNACIO and CUADROS
  ignacioSvg = document.getElementById('ignacio');
  cuadrosSvg = document.getElementById('cuadros');
  svgInitial = ignacioSvg.getBoundingClientRect();
  ignacioSvg.style.top = `${(window.innerHeight / 2) - (parseInt(svgInitial.height) * 1.25)}px`;
  cuadrosSvg.style.bottom = `${(window.innerHeight / 2) - (parseInt(svgInitial.height) * 1.25)}px`;
  //Set position of the Welcome GIF
  document.querySelector('.welcome').style.top = ignacioSvg.style.top;

  svgInitialSet = ignacioSvg.getBoundingClientRect();

  initWelcome();
  //TODO: aqui debería llamar tambien a la linea 26 para que se setee el ignacio y cuadros si ya hay scroll

  setWorksSpace();
});

//EVENT SCROLL
document.querySelector('main').addEventListener("wheel", (evt) => {
  if (!done) {
    window.requestAnimationFrame(step);
  }

  //Hide or show the handwriting
  observer(document.querySelectorAll('.welcome'), (entry) => {
    if (entry.intersectionRatio < 1) {
      document.querySelector('.welcome').classList.add("hide");
    } else {
      document.querySelector('.welcome').classList.replace("hide", "show");
    }
  });

  observer(document.querySelectorAll('.works .header'), (entry) => {
    // console.log("observer ~ entry", entry);
    if (entry.boundingClientRect.top <= 100) {
      console.log("ESTOY", entry);
      setTopToWork(entry.target);
      //TODO: en vez de hacer que se vaya sumando el scroll horizontal que mueva el eje x para que sea mas smooth
      // imagesContainer.scrollLeft += evt.deltaY;
    } else {

    }
  });
  
});


function setWorksSpace() {
  const worksContainers = document.querySelectorAll('.works');
  worksContainers.forEach(work => {
    let imagesContainer = work.children[0];
    let naturalHeight = imagesContainer.getBoundingClientRect().height;
    if (!imagesContainer.style.height) {
      imagesContainer.style.height = `${imagesContainer.scrollWidth + naturalHeight}px`;
    }    
  });
}

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
    }
  
    if (elapsed < 2000) {
      previousTimeStamp = timestamp;
      if (!done) {
        window.requestAnimationFrame(step);
      }
    }
}
  
function initWelcome() {
  addClassName('welcome-1', 'show');
  setTimeout(() => {
    addClassName('welcome-2', 'show');
    setTimeout(() => {
      addClassName('welcome-3', 'show');
    }, 2070);
  }, 1540);
}

function addClassName(id, className) {
  document.getElementById(id).classList.add(className);
}

function setTopToWork(element) {
  console.log("setTopToWork ~ element", element);
  ignacioSvg = document.getElementById('ignacio').getBoundingClientRect();
  topForWork = ignacioSvg.top + ignacioSvg.height;
  // element.style.top = `${topForWork}px`;
  // element.style.position = 'sticky';
}


//Observers
function observer(entries, functionToExecute) {
  entries.forEach(entri => { 
    const io = new IntersectionObserver(entri => {
      entri.forEach(entry => {
        functionToExecute(entry);
      });
    });
  
    io.observe(entri);
  })
}