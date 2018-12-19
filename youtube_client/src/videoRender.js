/* global document */

export default function (item, stats) {
  const video = document.createElement('article');
  video.classList.add('video');
  video.innerHTML = `
    <img class="thumb" alt="video" src=${item.snippet.thumbnails.medium.url}>
      <div class="video-info">
        <a href="https://www.youtube.com/watch?v=${item.id.videoId}"><h2>${item.snippet.title}</h2></a>
        <p>${item.snippet.description}</p>
        <div class="author">
          <i class="fas fa-user-circle"></i>
          <span>${item.snippet.channelTitle}</span>
        </div>
        <div class="date">
          <i class="far fa-calendar-alt"></i>
          <span>${item.snippet.publishedAt}</span>
        </div>
        <div>
          <i class="fas fa-eye"></i>
          <span>${stats.viewCount}</span>
        </div>
        <div class="likes">
          <i class="far fa-thumbs-up"></i><br>
          <span>+ ${stats.likeCount}</span>
        </div>
        <div class="dislikes">
          <i class="far fa-thumbs-down"></i><br>
          <span>- ${stats.dislikeCount}</span>
        </div>
      </div>`;
  return video;
}
