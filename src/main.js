import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.min.css';
import './css/styles.css';

import iziToast from 'izitoast';
import { fetchImages } from './js/pixabay-api';
import { renderGallery, clearGallery, toggleLoader } from './js/render-functions';

const form = document.getElementById('search-form');
const loadMoreBtn = document.getElementById('load-more');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(evt) {
  evt.preventDefault();

  const query = evt.currentTarget.query.value.trim();
  if (!query) {
    iziToast.warning({ title: 'Warning', message: 'Please enter a search term.' });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  hideLoadMore();
  toggleLoader(true);

  try {
    const { hits, totalHits: total } = await fetchImages(currentQuery, currentPage);
    totalHits = total;

    if (hits.length === 0) {
      iziToast.error({ title: 'No results', message: 'No images found.' });
      return;
    }

    renderGallery(hits);
    if (hits.length < totalHits) showLoadMore();
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message });
  } finally {
    toggleLoader(false);
  }
}

async function onLoadMore() {
  currentPage++;
  toggleLoader(true);
  hideLoadMore();

  try {
    const { hits } = await fetchImages(currentQuery, currentPage);
    renderGallery(hits);
    smoothScroll();

    const totalPages = Math.ceil(totalHits / 15);
    if (currentPage < totalPages) {
      showLoadMore();
    } else {
      iziToast.info({ title: 'Info', message: "We're sorry, but you've reached the end of search results." });
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message });
  } finally {
    toggleLoader(false);
  }
}

function showLoadMore() {
  loadMoreBtn.classList.remove('hidden');
}

function hideLoadMore() {
  loadMoreBtn.classList.add('hidden');
}

function smoothScroll() {
  const { height: cardHeight } = document.querySelector('.gallery li').getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
