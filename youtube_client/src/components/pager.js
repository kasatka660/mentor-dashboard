/* global document */

export default class Pager {
  constructor(itemsPerPage, totalCount) {
    this.itemsPerPage = itemsPerPage;
    this.totalCount = totalCount;
    this.currentPage = 1;
  }

  getCurrentPage() {
    return this.currentPage;
  }

  isLastPage() {
    return Math.round(this.totalCount / this.itemsPerPage) === this.currentPage + 1;
  }

  setPage(page) {
    this.currentPage = page;
  }

  setTotalCount(count) {
    this.totalCount = count;
  }

  getTotalCount() {
    return this.totalCount;
  }

  openNextPage() {
    if (this.currentPage < this.totalCount / this.itemsPerPage) {
      this.currentPage += 1;
      this.moveVideos();
      this.render();
    }
  }

  openPrevPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.moveVideos();
      this.render();
    }
  }

  render() {
    // Remove pager.
    if (document.querySelector('.paging')) {
      document.querySelector('.paging').remove();
    }
    // Add new pager.
    const paging = document.createElement('div');
    paging.classList.add('paging');
    const circle = document.createElement('span');
    circle.classList.add('circle');
    for (let i = 0; i < 5; i += 1) {
      const item = circle.cloneNode();
      item.textContent = this.currentPage;
      paging.appendChild(item);
    }
    paging.children[(this.currentPage - 1)%5].classList.add('active');
    document.getElementsByTagName('main')[0].appendChild(paging);


    document.querySelector('.videosWrapper').setAttribute('style', `width:calc(${this.getTotalCount() + 1} *100% + 20px);`);
  }

  moveVideos() {
    const slides = document.getElementsByClassName('video');
    const width = document.getElementsByTagName('main')[0].offsetWidth;
    const offset = (this.currentPage - 1) * width + 5 * this.currentPage;

    for (let i = 0; i < slides.length; i += 1) {
      slides[i].setAttribute('style', `transform:translateX(-${offset}px)`);
    }
  }
}
