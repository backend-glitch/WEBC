const layers = document.querySelectorAll(".layer");

window.addEventListener("mousemove", (e) => {
  const x = (window.innerWidth / 2 - e.clientX) / 25;
  const y = (window.innerHeight / 2 - e.clientY) / 25;

  layers.forEach((layer, index) => {
    const speed = (index + 1) * 5;
    layer.style.transform = `
      translate(-50%, -50%)
      translate(${x * speed}px, ${y * speed}px)
    `;
  });
});
