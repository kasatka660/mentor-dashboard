import Battle from './battle';
import Monster from '../../components/monster/monster';
import Player from '../../components/player/player';
import 'bootstrap';

window.$ = require('jquery');

test('battle screen display', () => {
  document.body.innerHTML = '<div class="container"></div>';

  const monster = new Monster();
  const newPlayer = new Player('Test');
  const newBattle = new Battle(newPlayer, monster);
  newBattle.startBattle();

  expect($('body').hasClass('battle')).toBeTruthy();
  expect($('.left-side').length).not.toBeNull();
  expect($('.right-side').length).not.toBeNull();
  expect($('#pickTheSpell')).not.toBeNull();
  $('#pickTheSpell').click();
  setTimeout(() => expect($('#pickTheSpell').css('display')).toBe('block'), 100);

  newBattle.dialog.toQuestionMode('simpleMath');
  let insertedAnswer = newBattle.dialog.questionsControl.question.currentQuestion.answer;
  $('#answer').val(insertedAnswer);
  $('#submit').click();


  newBattle.dialog.toQuestionMode('translation');
  insertedAnswer = newBattle.dialog.questionsControl.question.currentQuestion.answer;
  $('#answer').val(insertedAnswer);
  $('#submit').click();
  $('right-side');


  newBattle.dialog.toQuestionMode('translation');
  $('#answer').val('wrongAnswer');
  $('#submit').click();

  newBattle.dialog.endGame();
  newBattle.endGame();
  expect($('table').length).not.toBeNull();
});
