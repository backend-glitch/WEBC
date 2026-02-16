const container = document.querySelector('.container');
const rect = document.querySelectorAll(".rects");
const square = document.querySelectorAll(".squares");

const observer = new IntersectionObserver((entries) => {
    // for whole section
    /*
if(entries[0].isIntersecting){
    entries[0].target.classList.add("show");
}else{
    entries[0].target.classList.remove("show");
}
    */

entries.forEach(entry =>{
    if(entry.isIntersecting){
        entry.target.classList.add("show");
      
    }else{
        entry.target.classList.remove("show");
      
    }
})

},{
 threshold : 0,
 rootMargin: "0px 0px 0px 400px"
});

//observer.observe(container);

rect.forEach(rects => observer.observe(rects));
square.forEach(squares => observer.observe(squares));








// infinte to do list 
const todoList = document.getElementById("todo-list");
const sentinel = document.getElementById("sentinel");

// Fake data generator
let counter = 1;
function generateTodos(count = 10) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const li = document.createElement("li");
    li.textContent = `Task ${counter++}`;
    li.classList.add("hidden");
    fragment.appendChild(li);

    // Animate in
    requestAnimationFrame(() => {
      li.classList.remove("hidden");
      li.classList.add("show");
    });
  }
  todoList.appendChild(fragment);
}

// Initial load
generateTodos();

// IntersectionObserver to load more when sentinel is visible
const observer2 = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    generateTodos(); // load more tasks
  }
}, {
  rootMargin: "100px", // trigger before hitting bottom
});

observer2.observe(sentinel);



//bg change effect
const boxes = document.querySelectorAll(".box");

const observer3 = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
}, {
  threshold: 0.5 // triggers when 20% of element is visible
});

boxes.forEach(box => observer3.observe(box));