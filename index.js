window.addEventListener('DOMContentLoaded', ready);
window.onbeforeunload = () => window.scrollTo(0, 0);

function ready() {
  let markHeight = document.querySelector('.mark svg').getBoundingClientRect().height;
  let windowInnerHeigth = window.innerHeight;

  setWorksSpace();

  observer(document.querySelectorAll('.showroom'), entry => {
    let initialScrollY = window.scrollY;
    let lastTranslateUnit = 0;
    let lastScroll = 0;

    document.addEventListener('scroll', event => {
      const topShowroom = parseInt(entry.target.getBoundingClientRect().top);
      const topHeader = parseInt(markHeight + (windowInnerHeigth * 0.15));
      // if (topShowroom === topHeader && lastScroll < window.scrollY) {
        if (topShowroom === topHeader) {
          entry.target.style.transform = `translate3d(${lastTranslateUnit}px, 0px, 0px)`;
        lastTranslateUnit = (initialScrollY - window.scrollY).toFixed();
      }
      // else if (lastTranslateUnit < 1) {
      //   console.log('up')
      //   entry.target.style.transform = `translate3d(${lastTranslateUnit}px, 0px, 0px)`;
      //   lastTranslateUnit = (initialScrollY - window.scrollY).toFixed();
      // }
      lastScroll = window.scrollY;
    });


  });

  document.querySelectorAll('.works-header').forEach(worksHeader => {
    // TODO: que sea baseline con el titulo
    worksHeader.style.top = `${markHeight / 2}px`;
  });
  
  document.querySelectorAll('.showroom').forEach(showroom => {
    showroom.style.top = `${markHeight + (windowInnerHeigth * 0.15) }px`;
  });

  window.addEventListener("scroll", e => { setTopLabelPixel(markHeight) }, { once: true });
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
        work.style.height = `${(work.scrollWidth * 1.5) + naturalHeight}px`;
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