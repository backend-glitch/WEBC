// Select all list items
const items = document.querySelectorAll("#item-list li");

// Loop through each item
items.forEach((item) => {
  item.addEventListener("click", () => {
    // Toggle 'active' class
    item.classList.toggle("active");
  });
});

/*

items.forEach((item) => {
  item.addEventListener("click", () => {
    // First, remove 'active' class from all items
    items.forEach((el) => el.classList.remove("active"));

    // Then add 'active' only to the clicked one
    item.classList.add("active");
  });
});

*/

// Array of image URLs
const images = [
  "https://picsum.photos/id/237/600/400",
  "https://picsum.photos/id/238/600/400",
  "https://picsum.photos/id/239/600/400",
  "https://picsum.photos/id/240/600/400"
];

let currentIndex = 0;
let slideInterval; // store interval

const slide = document.getElementById("slide");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Function to update the image
function showImage(index) {
  slide.src = images[index];
}

// Show next image
function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
}

// Show previous image
function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
}

// Start auto-slide
function startSlide() {
  slideInterval = setInterval(nextImage, 3000);
}

// Stop auto-slide
function stopSlide() {
  clearInterval(slideInterval);
}

// Event Listeners
nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", prevImage);

// Hover events for pause/resume
slide.addEventListener("mouseenter", stopSlide);
slide.addEventListener("mouseleave", startSlide);

// Start auto-slide initially
startSlide();
