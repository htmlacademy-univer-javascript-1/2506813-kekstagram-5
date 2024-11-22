function renderMiniatures(photos, picturesContainer) {
  const photoTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  const photosFragment = document.createDocumentFragment();
  photos.forEach(({url, description, likes, comments, id}) => {
    const newPhoto = photoTemplate.cloneNode(true);
    newPhoto.querySelector('.picture__img').src = url;
    newPhoto.querySelector('.picture__img').alt = description;
    newPhoto.querySelector('.picture__likes').textContent = likes;
    newPhoto.querySelector('.picture__comments').textContent = comments.length;
    newPhoto.dataset.pictureId = id;
    photosFragment.appendChild(newPhoto);
  });
  picturesContainer.appendChild(photosFragment);
}
export {renderMiniatures};
