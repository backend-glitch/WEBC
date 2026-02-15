const color1 = document.getElementById("color1");
const color2 = document.getElementById("color2");
const direction = document.getElementById("direction");
const preview = document.getElementById("preview");
const cssCode = document.getElementById("cssCode");
//const button = document.button;

const blobs = document.querySelectorAll(".background span");

function updateGradient(){
    const gradient = `linear-gradient(${direction.value}, ${color1.value}, ${color2.value})`;
    
    preview.style.background = gradient;
    cssCode.value = `background: ${gradient};`;
}

color1.addEventListener("input", updateGradient);
color2.addEventListener("input", updateGradient);
direction.addEventListener("change", updateGradient);

function copyCode(){
    cssCode.select();
    document.execCommand("copy");
   // alert("CSS Copied!");
}

updateGradient();



//
//const blobs = document.querySelectorAll(".background span");

blobs.forEach(blob => {

    const size = blob.offsetWidth;

   
    let x = Math.random() * (window.innerWidth - size);
    let y = Math.random() * (window.innerHeight - size);

    blob.style.left = x + "px";
    blob.style.top = y + "px";

    let dx = (Math.random() - 0.5) * 1.2;
    let dy = (Math.random() - 0.5) * 1.2;

    function animate() {

        x += dx;
        y += dy;

      
        if (x <= 0 || x >= window.innerWidth - size) {
            dx *= -1;
        }

        if (y <= 0 || y >= window.innerHeight - size) {
            dy *= -1;
        }

        blob.style.left = x + "px";
        blob.style.top = y + "px";

        requestAnimationFrame(animate);
    }

    animate();
});


