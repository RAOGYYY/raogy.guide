// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Slideshow
(function () {
    const track = document.getElementById('slidesTrack');
    const dotsWrap = document.getElementById('slideDots');
    const prevBtn = document.getElementById('slidePrev');
    const nextBtn = document.getElementById('slideNext');
    if (!track) return;

    const slides = Array.from(track.children);
    let index = 0;
    let timer = null;

    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function render() {
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }

    function goTo(i) {
        index = (i + slides.length) % slides.length;
        render();
        restartAutoplay();
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);

    function restartAutoplay() {
        if (timer) clearInterval(timer);
        timer = setInterval(next, 4000);
    }

    render();
    restartAutoplay();
})();
