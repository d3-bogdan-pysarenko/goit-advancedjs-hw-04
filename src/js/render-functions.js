import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const refs = {
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  loadMoreButton: document.querySelector('.load-more'),
  form: document.querySelector('.form'),
};

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <li class="gallery-item">
            <a class="gallery-link" href="${largeImageURL}">
                <img
                    class="gallery-image"
                    src="${webformatURL}"
                    alt="${tags}"
                />
            </a>
            <div class="gallery-info">
                <div class="column">
                    <h2>Likes</h2>
                    <p>${likes}</p>
                </div>
                <div class="column">
                    <h2>Views</h2>
                    <p>${views}</p>
                </div>
                <div class="column">
                    <h2>Comments</h2>
                    <p>${comments}</p>
                </div>
                <div class="column">
                    <h2>Downloads</h2>
                    <p>${downloads}</p>
                </div>
            </div>
        </li>`
    )
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  refs.gallery.innerHTML = '';
}

export function showLoader() {
  refs.loader.classList.add('is-active');
}

export function hideLoader() {
  refs.loader.classList.remove('is-active');
}

export function showLoadMoreButton() {
  refs.loadMoreButton.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  refs.loadMoreButton.classList.add('is-hidden');
}
