window.onbeforeunload = () => window.scrollTo(0, 0);

window.addEventListener("scroll", e => {
  let markHeight = document.querySelector('.mark svg').getBoundingClientRect().height;

  document.querySelector('.top-label').style.top = `${markHeight + 20}px`;
 }, { once: true });