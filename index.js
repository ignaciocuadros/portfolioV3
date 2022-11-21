window.onbeforeunload = () => window.scrollTo(0, 0);

window.addEventListener(
  "scroll",
  (e) => {
    let markHeight = document.querySelector(".mark svg").getBoundingClientRect().height;
    document.querySelector(".top-label").style.top = `${markHeight + 20}px`;
    init();
  }, { once: true });

function init() {
  setStickyContainersSize();
  window.addEventListener("wheel", wheelHandler);
}

function setStickyContainersSize() {
  document.querySelectorAll(".sticky-container").forEach(container => {
    const stikyContainerHeight = container.querySelector(".main").scrollWidth;
    container.style.height = `${stikyContainerHeight}px`;
  })
}

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  console.log("isElementInViewport ~ rect", rect);
  return rect.top <= 0 && rect.bottom > document.documentElement.clientHeight;
}

function wheelHandler(event) {
  const containerInViewPort = Array.from(document.querySelectorAll(".sticky-container")).filter(container => isElementInViewport(container))[0];

  if (!containerInViewPort) {
    return;
  }

  const isPlaceHolderBelowTop = containerInViewPort.offsetTop < document.documentElement.scrollTop;
  const isPlaceHolderBelowBottom =
    containerInViewPort.offsetTop + containerInViewPort.offsetHeight >
    document.documentElement.scrollTop;

  if (isPlaceHolderBelowTop && isPlaceHolderBelowBottom) {
    containerInViewPort.querySelector(".main").scrollLeft += event.deltaY;
  }
}
