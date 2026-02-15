export function initParticles(canvas) {
  const ctx = canvas.getContext("2d");

  let animationId;
  let objects = [];

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

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

      if (this.x <= 0 || this.x >= canvas.width) this.dx *= -1;
      if (this.y <= 0 || this.y >= canvas.height) this.dy *= -1;

      this.draw();
    }
  }

  for (let i = 0; i < 80; i++) {
    objects.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    objects.forEach(obj => obj.update());

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

    animationId = requestAnimationFrame(animate);
  }

  return {
    start() { animate(); },
    stop() { cancelAnimationFrame(animationId); }
  };
}
