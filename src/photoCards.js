import { gallery } from '../index';
function createMarkup(responseArray) {
  const markup = responseArray
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <a href=${largeImageURL} target="_self">
        <div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" width=340 height=250/>
       
    <div class="info">

      <p class="info-item">
        <b>Likes </b>
       <br>${likes}<br/>
      </p>
      <p class="info-item">
        <b>Views</b>
        <br>${views}<br/>
      </p>
      <p class="info-item">
        <b>Comments</b>
        <br>${comments}<br/>
      </p>
      <p class="info-item">
        <b>Downloads</b>
       <br>${downloads}<br/>
      </p>
    </div>
    </div>
    </a>
  `;
      }
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}
export { createMarkup };