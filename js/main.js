
import { renderGallery } from './gallery.js';
import { getData, sendData } from './api.js';
import { showAlert, debounce } from './util.js';
import { hideModal, setOnFormSubmit } from './form.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { init as initFilter, getFilteredPictures } from './filter.js';

setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    hideModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  const debouncedRenderGallery = debounce(renderGallery);
  initFilter(data, debouncedRenderGallery);
  renderGallery(getFilteredPictures());
} catch (err) {
  showAlert(err.message);
}

import { createPictures } from './preview.js';
import './open-post.js';
import './hashtag-pristine.js';
import { openForm } from './form.js';
import { loadData } from './api.js';
import { initFilters } from './filters.js';

let pictures = [];

const onSuccess = (data) => {
  pictures = data.slice();
  createPictures(pictures);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');

};

const onFail = () =>{
  const errorMesage = document.createElement('div');
  errorMesage.style.position = 'absolute';
  errorMesage.style.left = 0;
  errorMesage.style.top = 0;
  errorMesage.style.right = 0;

  errorMesage.style.fontSize = '20px';
  errorMesage.style.backgroundColor = '#e1375f';
  errorMesage.style.padding = '15px';

  errorMesage.style.textAlign = 'center';
  errorMesage.textContent = 'Ошибка при загрузке изображений';
  document.body.append(errorMesage);

};


loadData(onSuccess, onFail);
openForm();

initFilters();

export {pictures};

