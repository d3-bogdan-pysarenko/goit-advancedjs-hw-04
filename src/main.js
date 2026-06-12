import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery, RECORDS_PER_PAGE } from './js/pixabay-api';
import {
  refs,
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const NO_MORE_RESULTS_MESSAGE = "There are no more items to show on set query!";

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

function notifyNoResults() {
  iziToast.info({
      message: NO_MORE_RESULTS_MESSAGE,
      position: 'topRight',
      messageColor: '#fff',
      backgroundColor: '#6366f1',
      timeout: 3000,
  });
}

function notifyError(message) {
  iziToast.error({
      message,
      position: 'topRight',
      messageColor: '#fff',
      backgroundColor: '#EF4040',
      timeout: 3000,
  });
}

refs.form.addEventListener('submit', async event => {
  event.preventDefault();

  const query = event.target.elements['search-text'].value.trim();
  if (!query) {
    window.alert('Please, provide non-empty key to search');
    return;
  }

  currentQuery = query;
  currentPage = 1;
  totalHits = 0;

  clearGallery();
  hideLoadMoreButton()
  showLoader();

try {
  const data = await getImagesByQuery(currentQuery, currentPage);
  totalHits = data.totalHits;

  if (data.hits.length === 0) {
    notifyError('There are no images matching your search query. Try search with dufferent key!');
    return;
  }

  createGallery(data.hits);

  if (currentPage * RECORDS_PER_PAGE < totalHits) {
    showLoadMoreButton();
  } else {
      notifyNoResults();
  }

} catch (err) {
    notifyError('Ooops, something went wrong....');
    console.log(err);
  } finally {
    hideLoader();
    refs.form.reset();
  }
});

refs.loadMoreButton.addEventListener('click', async () => {
  currentPage += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    createGallery(data.hits);

    const firstCard = refs.gallery.firstElementChild;
    if (firstCard) {
        const { height } = firstCard.getBoundingClientRect();
        window.scrollBy({ top: height * 2, behavior: 'smooth' });
    }

    if (currentPage * RECORDS_PER_PAGE >= totalHits) {
        notifyNoResults();
    } else {
        showLoadMoreButton();
    }
  } catch {
      notifyError('Something went wrong. Please try again later.');
  } finally {
      hideLoader();
  }
});
