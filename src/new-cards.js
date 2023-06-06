import { gallery } from './index';

// Експортуємо функцію `makeNewGalleries`, щоб вона була доступна зовнішнім модулям.
export { makeNewGalleries };

// Функція `makeNewGalleries` створює 
//HTML-розмітку для кожного зображення з масиву `images` і додає її до галереї.
function makeNewGalleries(images) {
    const markup = images
    // Використовуємо метод `map` для перетворення кожного елемента масиву `images` в рядок HTML.
      .map(image => {
        // Деструктуризація об'єкта `image` для отримання потрібних полів.
        const {
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        } = image;
        // Повертаємо рядок HTML для кожного зображення.
        return `<a class="gallery__item" target="_self" href="${largeImageURL}">
                <div class="photo-card">
                    <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy"/>
                </div>
                <div class="info">
                    <p class="info-item"><b>Likes</b> <br>${likes}</p>
                    <p class="info-item"><b>Views</b> <br>${views}</p>
                    <p class="info-item"><b>Comments</b> <br>${comments}</p>
                    <p class="info-item"><b>Downloads</b> <br>${downloads}</p>
                </div></a>`;
      })
      .join(''); // Об'єднуємо рядки HTML в один рядок.

       // Додаємо створену HTML-розмітку до елементу `gallery` на сторінці.
    gallery.insertAdjacentHTML('beforeend', markup);
  }
  
 
