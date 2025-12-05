document.addEventListener("DOMContentLoaded", () => {
  // --- Carrusel con flechas y autoplay ---
  const carousel = document.getElementById("photo-carousel");
  const items = carousel ? carousel.querySelectorAll(".carousel-item") : [];
  const total = items.length;
  let currentIndex = 0;
  let autoplayInterval;

  function showSlide(i) {
    // mover el carrusel al slide correspondiente
    carousel.style.transform = `translateX(-${i * 100}%)`;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % total;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + total) % total;
    showSlide(currentIndex);
  }

  // Botones
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");
  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);

  // Autoplay
  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 4000); // cada 4 segundos
  }
  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  if (carousel) {
    startAutoplay();
    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);
  }

  // --- Slideshow en hover de las tarjetas ---
  document.querySelectorAll(".group").forEach(card => {
    const slides = card.querySelectorAll(".slideshow");
    let hoverIndex = 0;
    let hoverInterval;

    card.addEventListener("mouseenter", () => {
      hoverInterval = setInterval(() => {
        slides.forEach((img, i) => {
          img.style.opacity = (i === hoverIndex ? "1" : "0");
        });
        hoverIndex = (hoverIndex + 1) % slides.length;
      }, 800);
    });

    card.addEventListener("mouseleave", () => {
      clearInterval(hoverInterval);
      slides.forEach((img, i) => {
        img.style.opacity = (i === 0 ? "1" : "0");
      });
      hoverIndex = 0;
    });
  });

  // --- Efecto máquina de escribir en la pizarra ---
  const board = document.getElementById("events-board");
  if (board) {
    const text = board.textContent;
    board.textContent = "";

    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        board.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 30);
      }
    }
    typeWriter();
  }
});