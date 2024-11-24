const bigPictureElement = document.querySelector('.big-picture');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentListElement = bigPictureElement.querySelector('.social__comments');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const cancelButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const bigPictureImg = bigPictureElement.querySelector('.big-picture__img img');
const likesCount = bigPictureElement.querySelector('.likes-count');
const photoCaption = bigPictureElement.querySelector('.social__caption');
const bodyElement = document.querySelector('body');
const createComment = ({ name, avatar, message }) => {
  const newComment = document.createElement('li');
  newComment.classList.add('social__comment');
  const imgComment = document.createElement('img');
  imgComment.classList.add('social__picture');
  imgComment.src = avatar;
  imgComment.alt = name;
  const textComment = document.createElement('p');
  textComment.classList.add('social__text');
  textComment.textContent = message;
  newComment.appendChild(imgComment);
  newComment.appendChild(textComment);
  return newComment;
};
const renderComments = (comments) => {
  commentListElement.innerHTML = '';
  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const element = createComment(comment);
    fragment.appendChild(element);
  });
  commentListElement.appendChild(fragment);
};
const hideBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};
function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}
const onCancelbuttonClick = () => {
  hideBigPicture();
};
const showBigPhoto = (data) => {
  const {url, likes, description, comments} = data;
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');
  bigPictureImg.src = url;
  likesCount.textContent = likes;
  photoCaption.textContent = description;
  renderComments(comments);
  document.addEventListener('keydown', onDocumentKeydown);
};
cancelButtonElement.addEventListener('click', onCancelbuttonClick);
export { showBigPhoto };
