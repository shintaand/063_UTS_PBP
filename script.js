    let currentPage = 1;
    const totalPages = 7;
    const audio = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicBtn');
    let isPlaying = false;

    AOS.init();

    function createPetals() {
      const container = document.getElementById('petalContainer');
      const petalCount = 12;
      const petalSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="18" height="18"><path d="M15 0 C25 10, 25 20, 15 30 C5 20, 5 10, 15 0 Z" fill="%23ffffff" opacity="0.8"/></svg>`;

      for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.backgroundImage = `url('${petalSvg}')`;
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.width = `${10 + Math.random() * 10}px`;
        petal.style.height = `${10 + Math.random() * 10}px`;
        petal.style.animationDuration = `${5 + Math.random() * 5}s`;
        petal.style.animationDelay = `${Math.random() * 4}s`;
        container.appendChild(petal);
      }
    }
    createPetals();

    function updatePageUI() {

      for (let i = 1; i <= totalPages; i++) {
        const page = document.getElementById(`page-${i}`);
        page.classList.remove('active', 'prev-page');
        if (i === currentPage) {
          page.classList.add('active');
        } else if (i < currentPage) {
          page.classList.add('prev-page');
        }
      }

      document.querySelectorAll('.nav-btn').forEach((btn, index) => {
        btn.classList.remove('active');
      });

      if (currentPage === 1) document.querySelectorAll('.nav-btn')[0].classList.add('active');
      else if (currentPage === 3) document.querySelectorAll('.nav-btn')[1].classList.add('active');
      else if (currentPage === 4) document.querySelectorAll('.nav-btn')[2].classList.add('active');
      else if (currentPage === 5) document.querySelectorAll('.nav-btn')[3].classList.add('active');
      else if (currentPage >= 6) document.querySelectorAll('.nav-btn')[4].classList.add('active');

      document.getElementById('prevBtn').style.opacity = currentPage === 1 ? '0.3' : '1';
      document.getElementById('nextBtn').style.opacity = currentPage === totalPages ? '0.3' : '1';
    }

    function goToPage(pageNum) {
      if (pageNum < 1 || pageNum > totalPages) return;

      currentPage = pageNum;
      updatePageUI();
    }

    function nextPage() {
      if (currentPage < totalPages) {
        goToPage(currentPage + 1);
      }
    }

    function prevPage() {
      if (currentPage > 1) {
        goToPage(currentPage - 1);
      }
    }

    let touchStartX = 0;
    let touchEndX = 0;
    const viewport = document.querySelector('.viewport');

    viewport.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, false);

    viewport.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, false);

    function handleSwipe() {
      if (touchEndX < touchStartX - 50) {
        nextPage();
      }
      if (touchEndX > touchStartX + 50) {
        prevPage();
      }
    }

    function playMusic() {
      audio.play().then(() => {
        isPlaying = true;
        musicBtn.classList.add('playing');
      }).catch(err => {
        console.log("Autoplay blocked:", err);
      });
    }

    function toggleMusic() {
      if (isPlaying) {
        audio.pause();
        isPlaying = false;
        musicBtn.classList.remove('playing');
      } else {
        playMusic();
      }
    }

    let currentSlide = 0;
    const slides = document.querySelectorAll('#galleryScreen img');
    
    function changeGallerySlide() {
      if (slides.length === 0) return;
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }

    setInterval(changeGallerySlide, 2000);

    updatePageUI();