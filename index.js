const ignacioSvg = document.getElementById('ignacio');
const cuadrosSvg = document.getElementById('cuadros');

window.addEventListener('scroll', () => {
    let paddingAvailable = 22.5;
    let toTranslate = (paddingAvailable * window.pageYOffset) / window.innerHeight;

    if (toTranslate < paddingAvailable) {   
        ignacioSvg.style.transform = `translateX(-${toTranslate}vw)`;
        cuadrosSvg.style.transform = `translateX(${toTranslate}vw)`;
    }
    
    const widthX = getComputedStyle(document.documentElement).getPropertyValue('--widthX');
    if(widthX !== `${50}vw`) {
        document.documentElement.style.setProperty('--widthX', `${parseInt(widthX) - 1}vw`);
    }
});