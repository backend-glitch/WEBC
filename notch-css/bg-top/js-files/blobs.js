export function initBlobs(canvas) {
  const ctx = canvas.getContext("2d");

  let animationId;
  let objects = [];

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  class Blob {
    constructor() {
      this.radius = Math.random() * 80 + 50;
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.dx = (Math.random() - 0.5) * 1;
      this.dy = (Math.random() - 0.5) * 1;
      this.color = `hsla(${Math.random()*360},70%,60%,0.3)`;
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

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    objects.forEach(obj => obj.update());
    animationId = requestAnimationFrame(animate);
  }

  return {
    start() { animate(); },
    stop() { cancelAnimationFrame(animationId); }
  };
}
