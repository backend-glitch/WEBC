import { initBlobs } from "./js-files/blobs.js";
import { initParticles } from "./js-files/particles.js";

const sections = document.querySelectorAll(".bg-section");

sections.forEach((section, index) => {
  const canvas = section.querySelector("canvas");

  let animation;

  if (index === 0) {
    animation = initBlobs(canvas);
  }

  if (index === 1) {
    animation = initParticles(canvas);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        section.classList.add("visible");
        animation.start();
      } else {
        section.classList.remove("visible");
        animation.stop();
      }
    });
  }, { threshold: 0.4 });

  observer.observe(section);
});
