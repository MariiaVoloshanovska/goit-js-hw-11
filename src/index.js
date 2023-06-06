import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { scroll } from './ourscroll';
import { getGallery, totalPages } from './pixabayset';
import { makeNewGalleries } from './new-cards';


export { gallery };

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const carddiv = document.querySelector('.carddiv');
// Ініціалізація змінних
let query = '';
let page = 1;
// Створення об'єкту SimpleLightbox для галереї зображень
const lightbox = new SimpleLightbox('.gallery a');
// Налаштування параметрів для IntersectionObserver
const options = {
  root: null,
  rootMargin: '100px',
  threshold: 0,
};

// Створення екземпляра IntersectionObserver (об'єкт спостерігача, 
//який слідкуватиме за появою елементів в зоні видимості)
const interObserv = new IntersectionObserver(onPagination, options);

//// Додаємо слухачі подій для форми пошуку
searchForm.addEventListener('change', onInput);
searchForm.addEventListener('submit', onSubmit);

// Асинхронна функція для отримання галереї зображень при надсиланні форми пошуку
async function addGallerySub() {
  try {
    // Отримання галереї зображень з використанням функції getGallery
    const response = await getGallery(query, page);
    // Додавання зображень до галереї
    addImages(response);
    // Активація спостерігача, якщо є ще сторінки для завантаження
    if (page !== totalPages) {
      interObserv.observe(carddiv);
    }
  } catch (error) {
   // Обробка помилок, якщо сталася помилка при отриманні галереї зображень
  }
}
// Асинхронна функція для отримання наступної сторінки галереї зображень
async function addNextGalaryStr() {
  try {
    // Прокручуємо до нижнього краю сторінки
    scroll();
    // Отримання галереї зображень з використанням функції getGallery
    const response = await getGallery(query, page);
    const images = response.data.hits;
    // Створення нових галерей зображень
    makeNewGalleries(images);
    // Оновлення SimpleLightbox
    lightbox.refresh();
// Виведення повідомлення, якщо досягнуто останню сторінку
    if (page > totalPages) {
      Notiflix.Notify.warning(
        "Sorry, but you have reached the end of the search results."
      );
    }
  } catch (error) {
    // Обробка помилок, якщо сталася помилка при отриманні галереї зображень
  }
}
// Функція, що виконується при зміні значення поля вводу
function onInput(evt) {
  query = evt.target.value.trim();
  return query;
}
// Функція, що виконується при надсиланні форми пошуку
function onSubmit(evt) {
  // Перевіряємо, чи введено значення в полі пошуку
  if (evt.target.elements.searchQuery.value.trim === ''){
    return
  }
  evt.preventDefault();
  page = 1;
  gallery.innerHTML = '';
   // Перевіряємо, чи введено значення в полі пошуку
  if (!evt.target.elements.searchQuery.value.trim()) {
    Notiflix.Notify.failure('Sorry, you should enter a search query');
  } else {
    // Викликаємо функцію для отримання галереї зображень
    addGallerySub();
  }
}
// Функція для додавання зображень до галереї
function addImages(response) {
  const images = response.data.hits;
// Перевіряємо, чи є зображення, що відповідають запиту
  if (!images.length) {
    gallery.innerHTML = '';
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    // Створюємо нові галереї зображень
    makeNewGalleries(images);
    Notiflix.Notify.success(
      `Hooray! We've found ${response.data.totalHits} images.`
    );
    // Оновлюємо SimpleLightbox, щоб зображення були доступні для перегляду
    lightbox.refresh();
  }
}
// Функція, що виконується при перетині елементом зони видимості
function onPagination(entries, interObserv) {
  entries.map(entry => {
    console.log(entry);
    if (entry.isIntersecting) {
      page += 1;
      // Викликаємо функцію для отримання наступної сторінки галереї
      addNextGalaryStr();
      // При досягненні останньої сторінки відключаємо спостерігач
      if (page === totalPages) {
        interObserv.unobserve(carddiv);
      }
    }
  });
}






// Button turn on
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
// import { getGallery, totalPages } from './pixabayset';
// import { makeNewGalleries } from './new-cards';
// import Notiflix from 'notiflix';

// const searchForm = document.querySelector('#search-form');
// const gallery = document.querySelector('.gallery');
// const btnLoad = document.querySelector('.load-more');
// const carddiv = document.querySelector('.carddiv');
// let query = '';
// let page = 1;
// const lightbox = new SimpleLightbox('.gallery a');
// const options = {
//   root: null,
//   rootMargin: '100px',
//   threshold: 0,
// };

// const interObserv = new IntersectionObserver(onPagination, options);

// searchForm.addEventListener('change', onInput);
// searchForm.addEventListener('submit', onSubmit);
// btnLoad.addEventListener('click', onClick);

// async function addGallerySub() {
//   try {
//     const response = await getGallery(query, page);
//     addImages(response);
//     if (page !== totalPages) {
//       btnLoad.classList.remove('btn-hidden');
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// async function addNextGalaryStr() {
//   try {
//     const response = await getGallery(query, page);
//     const images = response.data.hits;
//     makeNewGalleries(images);
//     lightbox.refresh();

//     if (page >= totalPages) {
//       btnLoad.classList.add('btn-hidden');
//       Notiflix.Notify.warning(
//         "We're sorry, but you've reached the end of search results."
//       );
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// function onInput(evt) {
//   query = evt.target.value.trim();
//   return query;
// }

// function onSubmit(evt) {
//   evt.preventDefault();
//   page = 1;
//   gallery.innerHTML = '';
//   btnLoad.classList.add('btn-hidden');

//   if (!evt.target.elements.searchQuery.value) {
//     Notiflix.Notify.failure('Please enter a search query');
//   } else {
//     addGallerySub();
//   }
// }

// function addImages(response) {
//   const images = response.data.hits;

//   if (!images.length) {
//     gallery.innerHTML = '';
//     Notiflix.Notify.failure(
//       'Sorry, there are no images matching your search query. Please try again.'
//     );
//   } else {
//     makeNewGalleries(images);
//     Notiflix.Notify.success(
//       `Hooray! We found ${response.data.totalHits} images.`
//     );
//     lightbox.refresh();
//   }
// }

// function onClick() {
//   page += 1;
//   addNextGalaryStr();
// }

// function onPagination(entries, interObserv) {
//   entries.forEach(entry => {
//     console.log(entry);
//     if (entry.isIntersecting) {
//       interObserv.unobserve(carddiv);
//       page += 1;
//       addNextGalaryStr();
//     }
//   });
// }

// export { gallery };
