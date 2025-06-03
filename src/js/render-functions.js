import SimpleLightbox from 'simplelightbox';

let lightbox;

export function renderGallery(images) {
  const galleryEl = document.getElementById('gallery');

  const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <li class="photo-card">
      <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${likes}</p>
        <p><b>Views:</b> ${views}</p>
        <p><b>Comments:</b> ${comments}</p>
        <p><b>Downloads:</b> ${downloads}</p>
      </div>
    </li>
  `).join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('#gallery a');
  } else {
    lightbox.refresh();
  }
}

export function clearGallery() {
  document.getElementById('gallery').innerHTML = '';
}

export function toggleLoader(show) {
  const loader = document.getElementById('loader');
  loader.classList.toggle('hidden', !show);
}
