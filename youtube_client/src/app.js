import header from './components/header';
import container from './components/container';
import videosWrapper from './components/videosWrapper';
import Search from './startSearch';

/* global document */

export default class App {
  constructor() {
    this.search = new Search();
    this.x0 = null;
    this.page = 0;
  }

  init() {
    document.body.innerHTML = container;
    document.querySelector('.container').innerHTML = header + videosWrapper;
    this.addFormListener();
    this.addSwipeListeners();
  }

  addFormListener() {
    this.form = document.querySelector('form');
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.search.startSearch(App.getInputValue(), true);
    });
  }

  addSwipeListeners() {
    const that = this;
    let x0 = null;
    function unify(event) {
      return event.changedTouches ? event.changedTouches[0] : event;
    }

    function lock(event) {
      x0 = unify(event).clientX;
    }

    function move(event) {
      if (x0) {
        const dx = unify(event).clientX - x0;
        const s = Math.sign(dx);
        x0 = null;
        if (Math.abs(dx) < 20 ) {
          return;
        }
        if (s < 0) {
          that.search.nextPage();
        } else {
          that.search.prevPage();
        }
      }
    }
    document.querySelector('.videosWrapper').addEventListener('mousedown', lock);
    document.querySelector('.videosWrapper').addEventListener('touchstart', lock);
    document.querySelector('.videosWrapper').addEventListener('mouseup', move);
    document.querySelector('.videosWrapper').addEventListener('touchend', move);
    document.querySelector('.videosWrapper').addEventListener('touchmove', (event) => { event.preventDefault(); }, false);
  }

  static getInputValue() {
    return document.getElementsByName('youtubeSearch')[0].value;
  }
}
