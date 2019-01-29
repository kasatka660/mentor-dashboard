import './battle.scss';
import battleGrid from './battle.template';
import Dialog from '../../components/dialog/dialog';
import Monster from '../../components/monster/monster';
import Player from '../../components/player/player';
import monsterHitting from '../../components/hit/hitMonster';
import playerHitting from '../../components/hit/hitPlayer';
import newGameBtn from './newGame.template';
import { START_SCORE, KEYS } from '../../variables';
import { scoreTable, createTableRow } from '../../components/score/score.template';

require('isomorphic-fetch');

export default class Battle {
  constructor(player, monster) {
    this.player = player;
    this.monster = monster;
    this.dialog = new Dialog();
    this.roundCount = 0;
  }

  startBattle() {
    document.body.classList.add('battle');
    $('.container').append(battleGrid);
    this.player.renderPlayer();
    Monster.renderMonster(this.roundCount);
    this.dialog.init(this);
  }

  hitTheMonster() {
    $('.middle').append(monsterHitting);
    Monster.playSound();
    setTimeout(() => {
      $('.monster-hitting').hide();
      this.monster.updateScore();
      if (this.monster.indicator.getCurrentScore() <= 0) {
        this.startNextBattle();
      }
    }, 3000);
  }

  hitThePlayer() {
    $('.middle').append(playerHitting);
    Player.playSound();
    setTimeout(() => {
      $('.player-hitting').hide();
      this.player.updateScore();
      if (this.player.indicator.getCurrentScore() <= 0) {
        this.dialog.endGame();
        this.endGame();
      }
    }, 3000);
  }

  startNextBattle() {
    $('.monster').addClass('monster-disappear');
    $('.monster').on('animationend', () => {
      $('.right-side').html('');
      this.roundCount += 1;
      if (this.roundCount < 3) {
        this.monster = new Monster();
        Monster.renderMonster(this.roundCount);
      } else {
        this.dialog.endGame();
        fetch('https://rss-game-kasatka660.herokuapp.com/new-player', {
          method: 'post',
          body: new URLSearchParams(`name=${this.player.playerName}&score=${this.player.indicator.getCurrentScore()}`),
        })
          .then(() => {
            this.endGame();
          });
      }
    });
  }

  endGame() {
    this.roundCount = 0;
    $('.right-side').html('');
    $('.left-side').html('');
    $('.middle').html('');

    fetch('https://rss-game-kasatka660.herokuapp.com/result')
      .then(response => response.json())
      .then((players) => {
        $('.middle').append(scoreTable);
        players.map(player => $('.middle tbody').append(createTableRow(player)));

        $('.middle').append(newGameBtn);
        document.body.addEventListener('keydown', (e) => {
          if (e.keyCode === KEYS.ENTER_KEY && $('#newGameBtn').length) {
            this.player.playerScore = START_SCORE;
            $('.container').html('');
            this.startBattle();
          }
        });
        $('#newGameBtn').on('click', () => {
          this.player.playerScore = START_SCORE;
          $('.container').html('');
          this.startBattle();
        });
      })
      .catch();
  }
}
