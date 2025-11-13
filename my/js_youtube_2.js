// Select the button
const buttonElement = document.querySelector('.js-subscribe-button'); // typing dot only in query selector.

// Add a click event listener
buttonElement.addEventListener('click', () => {
    if (buttonElement.innerText === 'SUBSCRIBE') {
        buttonElement.innerText = 'SUBSCRIBED';
        buttonElement.classList.add('is_subscribed'); // no dot required here.
    } else {
        buttonElement.innerText = 'SUBSCRIBE';
        buttonElement.classList.remove('is_subscribed')
    }
});
