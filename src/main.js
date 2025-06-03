import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.min.css';
import './styles.css';

import iziToast from 'izitoast';
import { fetchImages } from './pixabay-api';
import { renderGallery, clearGallery, toggleLoader } from './render-functions';

const form = document.getElementById('search-form');

form.addEventListener('submit', onSearch);

async function onSearch(evt) {
  evt.preventDefault();

  const query = evt.currentTarget.query.value.trim();
  if (!query) {
    iziToast.warning({ title: 'Warning', message: 'Please enter a search term.' });
    return;
  }

  clearGallery();
  toggleLoader(true);

  try {
    const images = await fetchImages(query);
    if (images.length === 0) {
      iziToast.error({
        title: 'No results',
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      renderGallery(images);
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message });
  } finally {
    toggleLoader(false);
  }
}
