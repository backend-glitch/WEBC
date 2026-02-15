const sections = document.querySelectorAll(".bg-section");

sections.forEach((section, index) => {
  const canvas = section.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let animationId;
  let objects = [];

  // Resize
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  // === SECTION 1: FLOATING BLOBS ===
  if (index === 0) {

    class Blob {
      constructor() {
        this.radius = Math.random() * 80 + 50;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.dx = (Math.random() - 0.5) * 1;
        this.dy = (Math.random() - 0.5) * 1;
        this.color = `hsla(${Math.random()*360}, 70%, 60%, 0.3)`;
      }

      draw() {
        const gradient = ctx.createRadialGradient(
          this.x, this.y, this.radius * 0.3,
          this.x, this.y, this.radius
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      update() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width)
          this.dx *= -1;

        if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height)
          this.dy *= -1;

        this.draw();
      }
    }

    for (let i = 0; i < 5; i++) {
      objects.push(new Blob());
    }

  }

  // === SECTION 2: PARTICLE NETWORK ===
  if (index === 1) {

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.dx = (Math.random() - 0.5) * 1;
        this.dy = (Math.random() - 0.5) * 1;
        this.size = 2;
      }

      draw() {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      update() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x <= 0 || this.x >= canvas.width)
          this.dx *= -1;

        if (this.y <= 0 || this.y >= canvas.height)
          this.dy *= -1;

        this.draw();
      }
    }

    for (let i = 0; i < 80; i++) {
      objects.push(new Particle());
    }

  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    objects.forEach(obj => obj.update());

    // Draw connections (only for section 2)
    if (index === 1) {
      for (let a = 0; a < objects.length; a++) {
        for (let b = a; b < objects.length; b++) {
          let dx = objects[a].x - objects[b].x;
          let dy = objects[a].y - objects[b].y;
          let dist = Math.sqrt(dx*dx + dy*dy);

          if (dist < 100) {
            ctx.strokeStyle = "rgba(255,255,255,0.1)";
            ctx.beginPath();
            ctx.moveTo(objects[a].x, objects[a].y);
            ctx.lineTo(objects[b].x, objects[b].y);
            ctx.stroke();
          }
        }
      }
    }

    animationId = requestAnimationFrame(animate);
  }

  // Intersection Observer (start/stop animation)
let isAnimating = false;

function startAnimation() {
  if (!isAnimating) {
    isAnimating = true;
    animate();
  }
}

function stopAnimation() {
  isAnimating = false;
  cancelAnimationFrame(animationId);
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {

    if (entry.isIntersecting) {

      // Add visual reveal class
      section.classList.add("visible");

      startAnimation();

    } else {

      section.classList.remove("visible");

      stopAnimation();
    }

  });
}, { threshold: 0.4 });

observer.observe(section);

  observer.observe(section);
});
