import { query, statsQuery } from './variables';
import httpGet from './httpGet';
import videoRender from './videoRender';
import Pager from './components/pager';

/* global document */

export default class Search {
  constructor() {
    this.nextPageToken = '';
    this.searchString = '';
    this.pager = {};
    this.videos = [];
  }

  startSearch(searchString, newPage = false) {
    if (newPage) {
      this.searchString = searchString;
      this.nextPageToken = '';

      const width = document.getElementsByTagName('main')[0].offsetWidth;
      if (width < 1000) {
        this.pager = new Pager(1, 15);
      } else {
        this.pager = new Pager(3, 15);
      }
      this.videos = [];
      if (document.getElementsByClassName('video').length) {
        document.querySelector('.videosWrapper').innerHTML = '';
      }
    }

    const formatedString = encodeURIComponent(this.searchString);
    const searchUrl = `${query}&q=${formatedString
    }${this.nextPageToken ? `&pageToken=${this.nextPageToken}` : ''}`;

    httpGet(searchUrl)
      .then((response) => {
        const result = JSON.parse(response);
        this.nextPageToken = result.nextPageToken;
        this.videos = this.videos.concat(result.items);

        const ids = result.items.map(item => item.id.videoId);
        const statsUrl = `${statsQuery}&id=${ids.join(',')}`;

        httpGet(statsUrl)
          .then((statsResponse) => {
            const statsResult = JSON.parse(statsResponse);
            this.render(result, statsResult);
          });
      });
  }

  nextPage() {
    if (this.pager.isLastPage() && this.nextPageToken) {
      this.startSearch(this.searchString);
      this.pager.openNextPage();
    } else {
      this.pager.openNextPage();
    }
  }

  prevPage() {
    this.pager.openPrevPage();
  }

  getCurrentPage() {
    this.pager.getCurrentPage();
  }

  render(result, statsResult) {
    this.pager.setTotalCount(this.videos.length);

    const videos = result.items.map(
      (item, key) => videoRender(result.items[key], statsResult.items[key].statistics),
    );
    videos.map(item => document.querySelector('.videosWrapper').appendChild(item));
    this.pager.render();
  }
}
