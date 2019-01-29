import { START_SCORE } from '../../variables';
import monsterView from './monster.template';
import './monster.scss';
import Indicator from '../indicator/indicator';


export default class Monster {
  constructor() {
    this.monsterScore = START_SCORE;
    this.indicator = new Indicator(this.monsterScore);
  }

  static renderMonster(monsterNumb) {
    $('.right-side').append(Indicator.render() + monsterView);
    $('.monster-name').html(Monster.generateMonsterName());
    const monsterPics = ['./../src/images/lady-monster.png',
      './../src/images/fish-monster.png',
      './../src/images/witch-monster.png'];
    $('.monster').attr('src', monsterPics[monsterNumb]);
  }

  static generateMonsterName() {
    const monsterFirstNamePart = ['mad', 'angry', 'silly', 'huge', 'selfish', 'horrible', 'fearful'];
    const monsterSecondNamePart = ['Beast', 'Horror', 'Giant', 'Devil', 'Mutant'];
    const monsterThirdNamePart = ['Sally', 'Peggy', 'Sue', 'Jammy'];
    return `${monsterFirstNamePart[Monster.getRandomInt(monsterFirstNamePart.length)]} ${
      monsterSecondNamePart[Monster.getRandomInt(monsterSecondNamePart.length)]} ${
      monsterThirdNamePart[Monster.getRandomInt(monsterThirdNamePart.length)]}`;
  }

  static getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  updateScore() {
    this.indicator.reduceScore();
    this.indicator.setCurrentScore('.right-side');
  }

  static playSound() {
    const audio = new Audio('./../src/audio/sound-monster.wav');
    audio.play();
  }
}
