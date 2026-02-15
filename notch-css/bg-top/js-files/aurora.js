export function initAurora(canvas) {
  const ctx = canvas.getContext("2d");

  let animationId;
  let time = 0;
  let running = false;

 function resize() {

   canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

}


  window.addEventListener("resize", resize);
  resize();

  function drawAurora() {
    if (!running) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    
    ctx.fillStyle = "#0f0f1a";
    ctx.fillRect(0, 0, width, height);

for (let i = 0; i < 6; i++) {
  const gradient = ctx.createLinearGradient(
    0,
    height * 0.5,
    width,
    height
  );

 
  const hue1 = (i / 6) * 360 + time * 20;
  const hue2 = (i / 6) * 360 + 60 + time * 30;

  gradient.addColorStop(0, `hsla(${hue1}, 100%, 60%, 0.4)`);
  gradient.addColorStop(0.5, `hsla(${hue2}, 100%, 65%, 0.3)`);
  gradient.addColorStop(1, "transparent");

  ctx.fillStyle = gradient;
  ctx.beginPath();

  for (let x = 0; x <= width; x += 10) {
    const y =
      height * 0.6 +
      Math.sin(x * 0.01 + time + i) * 40 +
      Math.sin(x * 0.02 + time * 0.5) * 20;

    ctx.lineTo(x, y);
  }

  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.closePath();
  ctx.fill();
}

    time += 0.01;
    animationId = requestAnimationFrame(drawAurora);
  }

  return {
    start() {
      if (!running) {
        running = true;
        drawAurora();
      }
    },
    stop() {
      running = false;
      cancelAnimationFrame(animationId);
    }
  };
}
