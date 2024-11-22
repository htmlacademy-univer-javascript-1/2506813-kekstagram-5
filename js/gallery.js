import { renderMiniatures } from './miniatures.js';
import { showBigPhoto } from './BigPicture.js';
const container = document.querySelector('.pictures');
const renderGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-picture-id]');
    if (!thumbnail) {
      return;
    }
    evt.preventDefault();
    const picId = +thumbnail.dataset.pictureId;
    const picture = pictures.find((item) => item.id === picId);
    showBigPhoto(picture);
  });
  renderMiniatures(pictures, container);
};
export {renderGallery};
