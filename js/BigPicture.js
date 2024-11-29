const COMMENTS_STEP = 5;

const bigPictureElement = document.querySelector('.big-picture');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentListElement = bigPictureElement.querySelector('.social__comments');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const cancelButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const bigPictureImg = bigPictureElement.querySelector('.big-picture__img img');
const likesCount = bigPictureElement.querySelector('.likes-count');
const photoCaption = bigPictureElement.querySelector('.social__caption');
const bodyElement = document.querySelector('body');
const commentElement = document.querySelector('#comment').content.querySelector('.social__comment');

let commentsShown = 0;
let currentComments = [];

const createComment = ({ avatar, name, message }) => {
  const comment = commentElement.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = () => {
  commentsShown += COMMENTS_STEP;
  if (commentsShown >= currentComments.length) {
    commentsLoaderElement.classList.add('hidden');
    commentsShown = currentComments.length;
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const comment = createComment(currentComments[i]);
    fragment.append(comment);
  }
  commentListElement.innerHTML = '';
  commentListElement.append(fragment);
  commentCountElement.querySelector('.comments-shown-count').textContent = commentsShown;
  commentCountElement.querySelector('.comments-count').textContent = currentComments.length;
};

const onCommentsLoaderClick = () => renderComments();
const hideBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsShown = 0;
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

const onCancelButtonClick = () => {
  hideBigPicture();
};

const renderPictureDetails = ({ url, likes, description }) => {
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  likesCount.textContent = likes;
  photoCaption.textContent = description;
};

const showBigPicture = (data) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentsLoaderElement.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  renderPictureDetails(data);
  currentComments = data.comments;
  if (currentComments.length > 0) {
    renderComments();
  }
};

cancelButtonElement.addEventListener('click', onCancelButtonClick);
commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);

export { showBigPicture };
