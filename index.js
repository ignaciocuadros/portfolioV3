let documentScrollTopPosition = {};
let init = false;

window.onbeforeunload = () => window.scrollTo(0, 0);

window.onscroll = () => {
  if(!init) {
    setStickyContainersSize();
    init = true;
  }
  wheelHandler();
}

function setStickyContainersSize() {
  document.querySelectorAll(".sticky-container").forEach(container => {
    const stickyContainerHeight = container.querySelector(".main").scrollWidth;
    container.style.height = `${stickyContainerHeight * .70}px`;
    documentScrollTopPosition[container.id] = null;
  })
}

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top <= 0 && rect.bottom > document.documentElement.clientHeight;
}

function wheelHandler(event) {
  //TITLE MARK EFFECT
  const classListMark = document.querySelector('.mark').classList;

  (document.querySelector('.presentation').getBoundingClientRect().top > -100) ? classListMark.add('blur') : classListMark.remove('blur');

  //IMAGE CARROUSEL
  let idInView = null;
  const containerInViewPort = Array.from(document.querySelectorAll(".sticky-container")).filter(container => {
    const isInViewPort = isElementInViewport(container);
    const elementInViewMain = container.querySelector('.main');
    if(isInViewPort) {
      idInView = container.id;
      elementInViewMain.classList.add('show');
      elementInViewMain.classList.remove('hide');
    } else {
      elementInViewMain.classList.replace('show', 'hide');
    }
    return isInViewPort;
  })[0];

  if (!containerInViewPort) {
    return;
  } 

  const isPlaceHolderBelowTop = containerInViewPort.offsetTop < document.documentElement.scrollTop;
  const isPlaceHolderBelowBottom = (containerInViewPort.offsetTop + containerInViewPort.offsetHeight) > document.documentElement.scrollTop;

  if (isPlaceHolderBelowTop && isPlaceHolderBelowBottom) {
    if (!documentScrollTopPosition[idInView]) {
      documentScrollTopPosition[idInView] = document.documentElement.scrollTop;
    }
    containerInViewPort.querySelector(".main").scrollLeft = document.documentElement.scrollTop - documentScrollTopPosition[idInView];
  }
}