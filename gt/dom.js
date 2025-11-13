/*
:

🌐 DOM Cheat Sheet
🔍 1. Selecting Elements

document.getElementById("id") → Selects element by id

document.getElementsByClassName("class") → Returns HTMLCollection

document.getElementsByTagName("tag") → Returns HTMLCollection

document.querySelector("cssSelector") → First match (e.g. ".box", "#id")

document.querySelectorAll("cssSelector") → NodeList of all matches

✅ Example:

let title = document.getElementById("title");
let boxes = document.querySelectorAll(".box");

✍️ 2. Changing Content

element.innerText = "Hello" → Updates only visible text

element.innerHTML = "<b>Hello</b>" → Updates HTML content

element.textContent → Returns all text (even hidden)

🎨 3. Styling

element.style.color = "red";

element.style.backgroundColor = "yellow";

element.classList.add("classname")

element.classList.remove("classname")

element.classList.toggle("classname")

🏗 4. Creating & Removing Elements

document.createElement("div") → Create new element

parent.appendChild(newElement) → Add inside parent

parent.insertBefore(newElement, referenceElement)

element.remove() → Remove element

🧾 5. Attributes

element.getAttribute("src")

element.setAttribute("src", "image.png")

element.removeAttribute("src")

🎮 6. Events

HTML way: <button onclick="sayHi()">Click</button>

JS way:

element.onclick = function() { ... }
element.addEventListener("click", () => { ... });
element.removeEventListener("click", handler);

⏳ 7. Form & Input

input.value → Get/set value of <input>

input.checked → Checkbox/radio status

select.value → Get selected option

📍 8. Traversing the DOM

element.parentElement

element.children

element.firstElementChild

element.lastElementChild

element.nextElementSibling

element.previousElementSibling

✅ Tip to remember:

Get/Query → find elements

Inner/Style/Class → change look or text

Create/Append/Remove → modify structure

Events → add interactivity
*/