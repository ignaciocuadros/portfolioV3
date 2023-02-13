let documentScrollTopPosition = null;

window.onbeforeunload = () => window.scrollTo(0, 0);

window.addEventListener("scroll", e => { init() }, { once: true });

function init() {
  setStickyContainersSize();
  window.addEventListener("scroll", wheelHandler);
}

function setStickyContainersSize() {
  document.querySelectorAll(".sticky-container").forEach(container => {
    const stickyContainerHeight = container.querySelector(".main").scrollWidth;
    container.style.height = `${stickyContainerHeight * .70}px`;
  })
}

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top <= 0 && rect.bottom > document.documentElement.clientHeight;
}

function wheelHandler(event) {
  //TITLE MARK EFFECT
  if (document.querySelector('.presentation').getBoundingClientRect().top > -100) {
    document.querySelector('.mark').classList.add('blur');
  } else {
    document.querySelector('.mark').classList.remove('blur');
  }

  //IMAGE CARROUSEL
  const containerInViewPort = Array.from(document.querySelectorAll(".sticky-container")).filter(container => isElementInViewport(container))[0];

  if (!containerInViewPort) {
    documentScrollTopPosition = null;
    return;
  }

  const isPlaceHolderBelowTop = containerInViewPort.offsetTop < document.documentElement.scrollTop;
  const isPlaceHolderBelowBottom =
  containerInViewPort.offsetTop + containerInViewPort.offsetHeight >
  document.documentElement.scrollTop;

  if (isPlaceHolderBelowTop && isPlaceHolderBelowBottom) {
    if (!documentScrollTopPosition) {
      documentScrollTopPosition = document.documentElement.scrollTop;
    }
    containerInViewPort.querySelector(".main").scrollLeft =  document.documentElement.scrollTop - documentScrollTopPosition;
  }
}
