const pictures = (photos) => {
  const photoList = document.querySelector('.pictures');
  const photoFragment = document.createDocumentFragment();
  const photoElementTemplate = document.querySelector('#picture').content;
  photos.forEach((photo) => {
    const photoElement = photoElementTemplate.cloneNode(true);
    const img = photoElement.querySelector('.picture__img');
    img.src = photo.url;
    img.alt = photo.description;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoFragment.append(photoElement);
  });
  photoList.append(photoFragment);
};

export { pictures };
