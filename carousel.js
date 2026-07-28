(() => {
  const carousels = document.querySelectorAll('[data-carousel]');

  carousels.forEach((carousel) => {
    const viewport = carousel.querySelector('.carousel-viewport');
    const track = carousel.querySelector('.carousel-track');
    const slides = [...track.children];
    const dots = carousel.querySelector('[data-carousel-dots]');
    const previous = carousel.querySelector('[data-carousel-prev]');
    const next = carousel.querySelector('[data-carousel-next]');
    const isReviews = carousel.dataset.carousel === 'reviews';
    let current = 0;
    let timer;

    const visibleSlides = () => {
      if (isReviews) return window.innerWidth <= 800 ? 1 : 3;
      if (window.innerWidth <= 520) return 1;
      if (window.innerWidth <= 800) return 2;
      return 3;
    };

    const pageCount = () => Math.max(1, slides.length - visibleSlides() + 1);

    const renderDots = () => {
      dots.innerHTML = '';
      for (let index = 0; index < pageCount(); index += 1) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        dot.type = 'button';
        dot.setAttribute('aria-label', `Go to ${isReviews ? 'review' : 'service'} ${index + 1}`);
        dot.setAttribute('aria-current', index === current ? 'true' : 'false');
        dot.addEventListener('click', () => {
          current = index;
          render();
          restart();
        });
        dots.append(dot);
      }
    };

    const render = () => {
      current = Math.min(current, pageCount() - 1);
      const slideWidth = slides[0].getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(slides[0]).marginRight);
      track.style.transform = `translateX(-${current * (slideWidth + gap)}px)`;
      const featuredIndex = current + (visibleSlides() === 1 ? 0 : 1);
      slides.forEach((slide, index) => slide.classList.toggle('is-featured', isReviews && index === featuredIndex));
      [...dots.children].forEach((dot, index) => dot.setAttribute('aria-current', index === current ? 'true' : 'false'));
    };

    const restart = () => {
      window.clearInterval(timer);
      timer = window.setInterval(() => {
        current = (current + 1) % pageCount();
        render();
      }, 6500);
    };

    previous.addEventListener('click', () => {
      current = (current - 1 + pageCount()) % pageCount();
      render();
      restart();
    });
    next.addEventListener('click', () => {
      current = (current + 1) % pageCount();
      render();
      restart();
    });
    carousel.addEventListener('mouseenter', () => window.clearInterval(timer));
    carousel.addEventListener('mouseleave', restart);
    window.addEventListener('resize', () => {
      renderDots();
      render();
    });
    renderDots();
    render();
    restart();
  });
})();