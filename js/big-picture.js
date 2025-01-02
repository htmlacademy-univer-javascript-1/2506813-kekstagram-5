const COMMENTS_PER_PORTION = 5;

const bigPictureElement = document.querySelector('.big-picture');
const commentShownCountElement = bigPictureElement.querySelector('.comments-shown-count');
const commentCountElement = bigPictureElement.querySelector('.comments-count');
const commentListElement = bigPictureElement.querySelector('.social__comments');
const commentLoadElement = bigPictureElement.querySelector('.comments-loader');
const bodyElement = document.querySelector('body');
const cancelElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentElementTemplate = document.querySelector('.social__comment');

const createComment = function ({ avatar, name, message }) {
  const comment = commentElementTemplate.cloneNode(true);
  const element = comment.querySelector('.social__picture');
  element.src = avatar;
  element.alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

let commentsShown = 0;
let comments = [];

const renderComments = function () {
  commentsShown += COMMENTS_PER_PORTION;

  if (commentsShown >= comments.length) {
    commentLoadElement.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentLoadElement.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }

  commentListElement.innerHTML = '';
  commentListElement.append(fragment);
  commentShownCountElement.textContent = commentsShown;
  commentCountElement.textContent = comments.length;
};

const hidePicture = function () {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsShown = 0;
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hidePicture();
  }
}

const onCancelButtonClick = function () {
  hidePicture();
};

const onCommentLoadClick = function () {
  renderComments();
};

const renderPictureDetails = function ({ url, likes, description }) {
  const element = bigPictureElement.querySelector('.big-picture__img img');
  element.src = url;
  element.alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
};

const showBigPicture = function (data) {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentLoadElement.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  renderPictureDetails(data);
  comments = data.comments;
  if (comments.length > 0) {
    renderComments();
  }
};

cancelElement.addEventListener('click', onCancelButtonClick);
commentLoadElement.addEventListener('click', onCommentLoadClick);

export { showBigPicture };
