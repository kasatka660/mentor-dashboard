import { START_SCORE } from '../../variables';
import './player.scss';
import playerView from './player.template';
import Indicator from '../indicator/indicator';

export default class Player {
  constructor(playerName) {
    this.playerName = playerName;
    this.playerScore = START_SCORE;
    this.indicator = new Indicator(this.playerScore);
  }

  renderPlayer() {
    $('.left-side').append(Indicator.render() + playerView);
    $('.player-name').html(this.playerName);
  }

  updateScore() {
    this.indicator.reduceScore();
    this.indicator.setCurrentScore('.left-side');
  }

  static playSound() {
    const audio = new Audio('./../src/audio/sound-player.wav');
    audio.play();
  }
}
