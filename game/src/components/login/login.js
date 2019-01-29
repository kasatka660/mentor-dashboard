import './login.scss';
import { startGameBtn, loginForm } from './login.template';
import Player from '../player/player';
import { KEYS } from '../../variables';

export default () => new Promise(((resolve) => {
  document.querySelector('.container').innerHTML = loginForm;
  $('#loginForm').on('shown.bs.modal', () => {
    $('#usernameInput').trigger('focus');
  });
  const nameInput = document.querySelector('input');

  const loginOnkeydown = (e) => {
    if (e.keyCode === KEYS.ENTER_KEY) {
      $('.start-game-btn').remove();
      $('#loginForm').modal('show');
    }
  };

  function addNewPlayer() {
    if (nameInput.value.length === 0) {
      return;
    }
    document.body.removeEventListener('keydown', loginOnkeydown);
    const newPlayer = new Player(nameInput.value);
    $('#loginForm').modal('hide');
    $('#loginForm').remove();
    $('.modal-backdrop').remove();
    resolve(newPlayer);
  }

  const submitBtn = document.querySelector('#submit');
  submitBtn.addEventListener('click', () => {
    addNewPlayer();
  });


  nameInput.addEventListener('keydown', (e) => {
    if (e.keyCode === KEYS.ENTER_KEY) {
      addNewPlayer();
    }
  });
  function addStartBtn() {
    $('.container').append(startGameBtn);
    $('.start-game-btn').focus();
    document.querySelector('.start-game-btn').addEventListener('click', () => {
      document.querySelector('.start-game-btn').remove();
      $('#loginForm').modal('show');
    });
    document.body.addEventListener('keydown', loginOnkeydown);
  }
  $('#loginForm').on('hidden.bs.modal', () => {
    addStartBtn();
  });
  addStartBtn();
}));
