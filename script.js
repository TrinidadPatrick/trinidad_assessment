const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const closeButton = document.getElementById("closeButton");

hamburger.addEventListener("click", () => {
    sidebar.classList.remove("-translate-x-full");
    overlay.classList.remove("hidden");
})

overlay.addEventListener("click", () => {
    sidebar.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
})

closeButton.addEventListener("click", () => {
    sidebar.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
})

const carousel = document.getElementById('carousel');

let isDragging = false,
    startX,
    startScrollLeft;

// Mouse event handlers
carousel.addEventListener('mousedown', (e) => {
    isDragging = true;
    carousel.classList.add('cursor-grabbing');
    carousel.classList.remove('cursor-grab');
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
});

carousel.addEventListener('mousemove', (e) => {
    if(!isDragging) return;
    e.preventDefault();
    const deltaX = e.pageX - startX;
    carousel.scrollLeft = startScrollLeft - deltaX;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    carousel.classList.remove('cursor-grabbing');
    carousel.classList.add('cursor-grab');
});

// Touch event handlers
carousel.addEventListener('touchstart', (e) => {
    isDragging = true;
    carousel.classList.add('cursor-grabbing');
    carousel.classList.remove('cursor-grab');
    startX = e.touches[0].pageX;
    startScrollLeft = carousel.scrollLeft;
});

carousel.addEventListener('touchmove', (e) => {
    if(!isDragging) return;
    e.preventDefault();
    const deltaX = e.touches[0].pageX - startX;
    carousel.scrollLeft = startScrollLeft - deltaX;
});

carousel.addEventListener('touchend', () => {
    isDragging = false;
    carousel.classList.remove('cursor-grabbing');
    carousel.classList.add('cursor-grab');
});
