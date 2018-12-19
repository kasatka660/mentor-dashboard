const messagesArray = [`0 Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Aliquam vel mauris eu turpis placerat malesuada ac eget turpis. 
Quisque nec ex suscipit, aliquam`,
`1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Aliquam vel mauris eu turpis placerat malesuada ac eget turpis. 
 Quisque nec ex suscipit, aliquam`,
`2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Aliquam vel mauris eu turpis placerat malesuada ac eget turpis. 
 Quisque nec ex suscipit, aliquam`,
`3 Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Aliquam vel mauris eu turpis placerat malesuada ac eget turpis. 
 Quisque nec ex suscipit, aliquam`,
`4 Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Aliquam vel mauris eu turpis placerat malesuada ac eget turpis. 
Quisque nec ex suscipit, aliquam`];

/* global document localStorage */

function Notifications(messages) {
  // If "Disable Tips" checkbox was checked- do nothing.
  if (localStorage.getItem('disable')) {
    return;
  }
  // Variables initialization.
  let index = 0;
  const docsBody = document.body;

  const messageBox = document.createElement('div');
  messageBox.classList.add('message-box');

  const messageContent = document.createElement('div');
  messageContent.classList.add('message-content');

  const header = document.createElement('h2');
  header.textContent = 'Email Tip of the day';

  const tip = document.createElement('p');
  tip.textContent = messages[index];

  const closeButton = document.createElement('button');
  closeButton.innerHTML = '&times;';
  closeButton.classList.add('close');

  const inputContainer = document.createElement('label');
  inputContainer.classList.add('container');
  inputContainer.textContent = 'Disable Tips';

  const input = document.createElement('input');
  input.setAttribute('type', 'checkbox');

  const leftButton = document.createElement('button');
  leftButton.classList.add('display', 'display-left');
  leftButton.innerHTML = '<';

  const rightButton = document.createElement('button');
  rightButton.classList.add('display', 'display-right');
  rightButton.innerHTML = '>';

  const circlesContainer = document.createElement('div');
  circlesContainer.classList.add('circles-container');

  const circle = document.createElement('div');
  circle.classList.add('circle');
  for (let i = 0; i < messages.length; i += 1) {
    circlesContainer.appendChild(circle.cloneNode());
  }
  circlesContainer.children[0].classList.add('active');

  // Creating html structure.
  messageBox.appendChild(header);
  messageContent.appendChild(tip);
  messageBox.appendChild(messageContent);
  messageBox.appendChild(closeButton);
  messageBox.appendChild(inputContainer);
  inputContainer.prepend(input);
  messageBox.appendChild(rightButton);
  messageBox.appendChild(leftButton);
  messageBox.appendChild(circlesContainer);

  // Marking circle as active.
  function addActiveCircle() {
    const activeCircle = document.getElementsByClassName('active')[0];
    const newActiveCircle = document.getElementsByClassName('circle')[index];
    activeCircle.classList.remove('active');
    newActiveCircle.classList.add('active');
  }

  // Closing notifications.
  function closeMessage() {
    messageBox.classList.add('hidden');
  }

  // Showing next one message.
  function scrollRight() {
    index += 1;
    if (index >= messages.length) {
      index = 0;
    }
    tip.textContent = messages[index];
    addActiveCircle();
  }

  // Showing previous message.
  function scrollLeft() {
    index -= 1;
    if (index < 0) {
      index = messages.length - 1;
    }
    tip.textContent = messages[index];
    addActiveCircle();
  }

  // Showing next or previous message, closing notifications depending on key pressed.
  function checkKey(e) {
    switch (e.keyCode) {
      // left arrow
      case 37:
        scrollLeft();
        break;
        // right arrow
      case 39:
        scrollRight();
        break;
      // escape
      case 27:
        closeMessage();
        break;
      default:
        break;
    }
  }

  /* If checbox was checked - setting 'disable' in localStorage,
     if unchecked - removing it from localSorage */
  function disableNotifications(e) {
    if (e.target.checked) {
      localStorage.setItem('disable', 'true');
    } else {
      localStorage.removeItem('disable');
    }
  }

  // Initialization of all the events and appending compoment into body of html.
  function init() {
    docsBody.appendChild(messageBox);

    closeButton.addEventListener('click', closeMessage);
    rightButton.addEventListener('click', scrollRight);
    leftButton.addEventListener('click', scrollLeft);
    input.addEventListener('change', disableNotifications);
    document.onkeydown = checkKey;
  }

  // Running init in 5sec after page load.
  setTimeout(init, 5000);
}

// Call of component with certain scope of messages.
Notifications(messagesArray);
