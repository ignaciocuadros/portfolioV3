window.addEventListener('onload', ready);

function ready() {
  let markHeight = document.querySelector('.mark svg').getBoundingClientRect().height;
  let windowInnerHeigth = window.innerHeight;

  setWorksSpace();

  observer(document.querySelectorAll('.showroom'), entry => {
    let lastTranslateUnit = 0;
    let initialScrollY = window.scrollY;
    document.addEventListener('scroll', event => {
      const topShowroom = parseInt(entry.target.getBoundingClientRect().top);
      const topHeader = parseInt(markHeight + (windowInnerHeigth * 0.15));
      if (topShowroom === topHeader) {
        lastTranslateUnit = window.scrollY - initialScrollY;
        entry.target.style.transform = `translate3d(-${lastTranslateUnit}px, 0px, 0px)`;
      }
    });
  });

  document.querySelectorAll('.works-header').forEach(worksHeader => {
    // TODO: que sea baseline con el titulo
    worksHeader.style.top = `${markHeight / 2}px`;
  });
  
  document.querySelectorAll('.showroom').forEach(showroom => {
    showroom.style.top = `${markHeight + (windowInnerHeigth * 0.15) }px`;
  });

  if (window.scrollY) {
    setTopLabelPixel(markHeight);
  } else {
    window.addEventListener("wheel", e => { setTopLabelPixel(markHeight) }, { once: true });
  }
}

function setTopLabelPixel(markHeight) {
  document.querySelector('.top-label').style.top = `${markHeight + 20}px`;
}

function setWorksSpace() {
  const worksContainers = document.querySelectorAll('.works');
  worksContainers.forEach(work => {
    if (work) {
      let naturalHeight = work.getBoundingClientRect().height;
      if (!work.style.height) {
        work.style.height = `${work.scrollWidth + naturalHeight}px`;
      }      
    }
  });
}

//Observers
function observer(entries, functionToExecute) {
  entries.forEach(entry => { 
    const io = new IntersectionObserver(entry => {
      if (entry[0].isIntersecting === true) {
        functionToExecute(entry[0])
      }
    }, { threshold: [1] });
  
    io.observe(entry);
  })
}