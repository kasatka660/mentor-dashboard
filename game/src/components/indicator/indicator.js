import indicatorView from './indicator.template';
import './indicator.scss';


export default class Indicator {
  constructor(maxHP) {
    this.maxHP = maxHP;
    this.HP = this.maxHP;
  }

  static render() {
    return indicatorView;
  }

  reduceScore() {
    this.HP -= 25;
  }

  getCurrentScore() {
    return this.HP;
  }

  setCurrentScore(side) {
    $(`${side} .progress-bar`).css('width', `${this.HP}%`);
  }
}
