import { resetScale } from './scale.js';
import { init as initEffect, reset as resetEffect } from './effects.js';

const MAX_HASHTAG_COUNT = 5;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хештегов`,
  NOT_UNIQUE: 'Хештеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хештег',
};

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SUBMITTING: 'Отправляю...',
};

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const fileField = form.querySelector('.img-upload__input');
const submitButton = form.querySelector('.img-upload__submit');
const hashtagField = form.querySelector('.text__hashtags');
const photoPreview = form.querySelector('.img-upload__preview img');
const effectsPreviews = form.querySelectorAll('.effects__preview');
const textDescriptionInput = document.querySelector('.text__description');
const inputHashtag = document.querySelector('.text__hashtags');
const submitBtn = document.querySelector('#upload-submit');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

let errorMessage = '';

const error = () => errorMessage;

const hashtagHandler = (value) => {
  errorMessage = '';
  const inputText = value.toLowerCase().trim();

  if (!inputText) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  const rules = [
    {
      check: inputArray.some((item) => item.indexOf('#', 1) >= 1),
      error: 'Хэш-теги разделяются пробелами',
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хэш-тег должен начинаться с #',
    },
    {
      check: inputArray.some((item, num, arr) => arr.includes(item, num + 1)),
      error: 'Хэш-теги не должны повторяться',
    },
    {
      check: inputArray.some((item) => item.length > 20),
      error: 'Максимальная длина одного хэш-тега 20 символов, включая решётку',
    },
    {
      check: inputArray.length > MAX_HASHTAG_COUNT,
      error: `Нельзя указать больше ${MAX_HASHTAG_COUNT} хэш-тегов`,
    },
    {
      check: inputArray.some((item) => !VALID_SYMBOLS.test(item)),
      error: 'Хэш-тег содержит недопустимые символы',
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

const validateInput = () => {
  submitBtn.disabled = !pristine.validate();
};

inputHashtag.addEventListener('input', validateInput);
textDescriptionInput.addEventListener('input', validateInput);
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

pristine.addValidator(inputHashtag, hashtagHandler, error, 2, false);
pristine.addValidator(
  textDescriptionInput,
  (value) => value.length <= 140,
  'Не более 140 символов'
);

const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const hideModal = () => {
  form.reset();
  resetScale();
  resetEffect();
  submitBtn.disabled = false;
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled ? SubmitButtonText.SUBMITTING : SubmitButtonText.IDLE;
};

const isErrorMessageShown = () => Boolean(document.querySelector('.error'));

const isAnyFormFieldFocused = () => {
  const focusedElement = document.activeElement;
  return focusedElement !== null && form.contains(focusedElement);
};

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const normalizeTags = (tagString) => tagString.trim().split(' ').filter((tag) => Boolean(tag.length));

const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));
const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;
const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isAnyFormFieldFocused() && !isErrorMessageShown()) {
    evt.preventDefault();
    hideModal();
  }
}

const onCancelButtonClick = () => {
  hideModal();
};

const onFileInputChange = () => {
  const file = fileField.files[0];

  if (file && isValidType(file)) {
    resetEffect();
    photoPreview.src = URL.createObjectURL(file);
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${photoPreview.src}')`;
    });
    resetScale();
  }
  showModal();
};

const setOnFormSubmit = (callback) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      toggleSubmitButton(true);
      await callback(new FormData(form));
      toggleSubmitButton(false);
    }
  });
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);
form.addEventListener('submit', onFormSubmit);
initEffect();

pristine.addValidator(hashtagField, hasValidCount, ErrorText.INVALID_COUNT, 3, true);
pristine.addValidator(hashtagField, hasUniqueTags, ErrorText.NOT_UNIQUE, 1, true);
pristine.addValidator(hashtagField, hasValidTags, ErrorText.INVALID_PATTERN, 2, true);

export { hideModal, setOnFormSubmit };
