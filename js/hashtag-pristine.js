const MAX_SYMBOLS = 20;
const MAX_HASHTAGS = 5;

const formUpload = document.querySelector('.img-upload__form');
const submitBtn = document.querySelector('#upload-submit');
const textDescriptionInput = document.querySelector('.text__description');

const pristine = new Pristine(formUpload, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'img-upload__error'
}, true);


const inputHashtag = document.querySelector('.text__hashtags');

let errorMessage = '';

const error = () => errorMessage;

const hashtagHandler = (value) =>{
  errorMessage = '';

  const inputText = value.toLowerCase().trim();

  if(!inputText) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);
  if(inputArray.length === 0){
    return true;
  }

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
      check: inputArray.some((item) => item.length > MAX_SYMBOLS),
      error: `Максимальная длина одного хэш-тега ${MAX_SYMBOLS} символов, включая решётку`,
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      error: `Нельзя указать больше ${MAX_HASHTAGS} хэш-тегов`,
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хэш-тег содержит недопустимые символы',
    },
  ];
  return rules.every((rule) => {
    const isInvalid = rule.check;
    if(isInvalid){
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

const validateInput = () =>{
  if(pristine.validate()){
    submitBtn.disabled = false;
  } else{
    submitBtn.disabled = true;
  }
};


pristine.addValidator(inputHashtag, hashtagHandler, error, 2, false);

const validateDescription = (value) => value.length <= 140;

pristine.addValidator(
  textDescriptionInput,
  validateDescription,
  'Не более 140 символов'
);

inputHashtag.addEventListener('input', validateInput);
textDescriptionInput.addEventListener('input', validateInput);
formUpload.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

export {pristine};
