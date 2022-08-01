const ignacioSvg = document.getElementById('ignacio');
const cuadrosSvg = document.getElementById('cuadros');
let lastScroll = 0;
const root = document.querySelector(':root');
rootStyle = getComputedStyle(root);

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScroll) {
        const cuadrosSvgInfo = cuadrosSvg.getBoundingClientRect();
    
        if ((cuadrosSvgInfo.top + cuadrosSvgInfo.height + 20) < window.innerHeight) {
            cuadrosSvg.style.top = cuadrosSvgInfo.top + 7.5 + 'px';
        }
    
        const ignacioSvgInfo = ignacioSvg.getBoundingClientRect();
    
        if ((ignacioSvgInfo.top > 20)) {
            ignacioSvg.style.top = ignacioSvgInfo.top - 7.5 + 'px';
        }
    
        if (window.scrollY > (window.innerHeight - 150)) {
            document.querySelector('.presentation').classList.add('fade-out');
        }

        const actualHeight = parseInt(rootStyle.getPropertyValue('--heightX'));
        if (actualHeight > 9) {
            root.style.setProperty('--heightX', `${actualHeight - 1}vh`); 
        }

        lastScroll = window.scrollY;
    }
});