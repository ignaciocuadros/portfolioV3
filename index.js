let ignacioSvg, cuadrosSvg, svgInitial, svgInitialSet, topForWork;
let start, previousTimeStamp;
let done = false;
let scaleLimit = 0.5;
let actualScale = 1;

window.addEventListener("load", () => {
  ignacioSvg = document.getElementById('ignacio');
  cuadrosSvg = document.getElementById('cuadros');
  svgInitial = ignacioSvg.getBoundingClientRect();
  ignacioSvg.style.top = `${(window.innerHeight / 2) - (parseInt(svgInitial.height) * 1.25)}px`;
  cuadrosSvg.style.bottom = `${(window.innerHeight / 2) - (parseInt(svgInitial.height) * 1.25)}px`;
  document.querySelector('.welcome').style.top = ignacioSvg.style.top;

  svgInitialSet = ignacioSvg.getBoundingClientRect();

  initWelcome();
});


document.querySelector('main').addEventListener("wheel", (evt) => {
  if (!done) {
    window.requestAnimationFrame(step);
  }

  observer(document.querySelectorAll('.work'), (entry) => {
    if (entry.intersectionRatio > 0) {
      document.querySelector('.welcome').classList.add("hide");
    } else {
      document.querySelector('.welcome').classList.replace("hide", "show");
    }
  });
  

  observer(document.querySelectorAll('.work'), (entry) => {
    const imagesContainer = entry.target.children[1];
    if (entry.intersectionRatio > 0.8 && imagesContainer.offsetWidth + imagesContainer.scrollLeft <= imagesContainer.scrollWidth) {
      console.log('aqui')
      document.querySelector('main').addEventListener("wheel", (evt) => evt.preventDefault());
      imagesContainer.scrollLeft += evt.deltaY;
    } else if (imagesContainer.offsetWidth + imagesContainer.scrollLeft > imagesContainer.scrollWidth) {
      console.log('listo el pollo')
      // document.querySelector('main').allowDefault = true;
    }
  });
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
    }
  
    if (elapsed < 2000) {
      previousTimeStamp = timestamp;
      if (!done) {
        window.requestAnimationFrame(step);
      } else {
        document.getElementById('ignacio').classList.replace('overlay', 'elementWithBackground');
        if(!topForWork) {
          setTopToWork();
        }
        document.querySelectorAll('.product.hide').forEach(product => { 
          product.classList.replace('hide', 'show');
        })
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

function setTopToWork() {
  ignacioSvg = ignacioSvg.getBoundingClientRect();
  topForWork = ignacioSvg.top + ignacioSvg.height;
  document.querySelectorAll('.work .header').forEach(work => {
    work.style.top = `${topForWork}px`;
    work.style.position = 'sticky';
  });
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