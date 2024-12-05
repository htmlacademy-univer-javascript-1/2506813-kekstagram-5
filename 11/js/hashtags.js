import {isEscapeKey} from './util.js';
import {resetSliderToNone, resetControlToStandart} from './slider.js';

const MAX_HASHTAGS_COUNT = 5;
const MAX_SYMBOLS = 20;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const form = document.querySelector('.img-upload__form');
const formOverlay = form.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const inputHashtag = form.querySelector('.text__hashtags');

const pristine = new Pristine (form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const showModal = () => {
  formOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const hideModal = () => {
  form.reset();
  pristine.reset();
  resetSliderToNone();
  resetControlToStandart();
  formOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isTextFieldFocused = () => document.activeElement === inputHashtag
  || document.activeElement === form.querySelector('.text__description');

let errorMessage = '';
const error = () => errorMessage;
const hashtagsHandler = (value) => {
  errorMessage = '';
  const inputText = value.toLowerCase().trim();
  if (!inputText) {
    return true;
  }
  const inputArray = inputText.split(/\s+/);
  const rules = [
    {
      check: inputArray.some((item) => item.length === 1 && item[0] === '#'),
      error: 'Хэш-тэг не может состоять из одного символа #',
    },
    {
      check: inputArray.length > MAX_HASHTAGS_COUNT,
      error: `Нельзя указать более ${MAX_HASHTAGS_COUNT} хэш-тегов`,
    },
    {
      check: inputArray.some((item) => item.length > MAX_SYMBOLS),
      error: `Максимальная длина одного хэш-тега ${MAX_SYMBOLS} символов, включая решётку`,
    },
    {
      check: inputArray.some((item) => item.indexOf('#', 1) >= 1),
      error: 'Хэш-теги разделяются пробелами',
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хэш-тег должен начинаться с символа #',
    },
    {
      check: inputArray.some((item, num, arr) => arr.includes(item, num + 1)),
      error: 'Хэш-теги не должны повторяться',
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

pristine.addValidator(inputHashtag, hashtagsHandler, error, 2, false);


function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
}

const onCancelButtonClick = () => hideModal;
const onFileInputChange = () => showModal;

form.addEventListener('change', onFileInputChange());
form.querySelector('.img-upload__cancel').addEventListener('click', onCancelButtonClick());
