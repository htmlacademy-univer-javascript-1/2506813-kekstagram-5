
import { Effect, effectToFilter, effectToSliderOptionals } from './generate.js';

const modalElement = document.querySelector('.img-upload');
const imageElement = modalElement.querySelector('.img-upload__preview img');
const effectElement = modalElement.querySelector('.effects');
const sliderElement = modalElement.querySelector('.effect-level__slider');
const sliderContainerElement = modalElement.querySelector('.img-upload__effect-level');
const effectLevelElement = modalElement.querySelector('.effect-level__value');

let chosenEffect = Effect.DEFAULT;

const setImageStyle = () => {
  if (chosenEffect === Effect.DEFAULT) {
    imageElement.style.filter = null;
    return;
  }

  const { value } = effectLevelElement;
  const { style, unit } = effectToFilter[chosenEffect];
  imageElement.style.filter = `${style}(${value}${unit})`;
};

const onSliderUpdate = () => {
  effectLevelElement.value = sliderElement.noUiSlider.get();
  setImageStyle();
};

const createSlider = ({ min, max, step }) => {
  noUiSlider.create(sliderElement, {
    range: { min, max },
    step,
    start: max,
    connect: 'lower',
  });
  sliderElement.noUiSlider.on('update', onSliderUpdate);
};

const showSlide = () => {
  sliderContainerElement.classList.remove('hidden');
};

const hideSlide = () => {
  sliderContainerElement.classList.add('hidden');
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.set(0);
  }
};

const updateSlider = () => {
  if (sliderElement.noUiSlider) {
    const { min, max, step } = effectToSliderOptionals[chosenEffect];
    sliderElement.noUiSlider.updateOptions({
      range: { min, max },
      step,
      start: max,
    });
  }
};

const setSlider = () => {
  hideSlide();

  if (chosenEffect !== Effect.DEFAULT) {
    if (!sliderElement.noUiSlider) {
      createSlider(effectToSliderOptionals[chosenEffect]);
    } else {
      updateSlider();
    }
    showSlide();
  }
};

const setEffect = (effect) => {
  chosenEffect = effect;
  setSlider();
  setImageStyle();
};

const reset = () => {
  setEffect(Effect.DEFAULT);
  setImageStyle();
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.reset();
  }
};

const onEffectChange = (evt) => {
  setEffect(evt.target.value);
};

function init() {
  hideSlide();
  setSlider();
  effectElement.addEventListener('change', onEffectChange);
}

export { init, reset };

const DEFAULT_EFFECT_LEVEL = 100;

const Slider = {
  MIN: 10,
  MAX: 100,
  STEP: 10,
};

const sliderElement = document.querySelector('.effect-level__slider');
const sliderUpload = document.querySelector('.img-upload__effect-level');
const currentSlider = document.querySelector('.effect-level__value');
const filterRadios = document.querySelectorAll('.effects__item');
const picture = document.querySelector('.img-upload__preview img');

let currentRadio = document.querySelector('.effects__radio').value;

currentSlider.value = DEFAULT_EFFECT_LEVEL;

const Effects = {
  none: 0,
  chrome: {
    filter: 'grayscale',
    range: {min: 0, max: 1.0},
    step: 0.1,
    measurementUnit: ''},
  sepia: {
    filter: 'sepia',
    range: {min: 0, max: 1.0},
    step: 0.1,
    measurementUnit: ''},
  marvin: {
    filter: 'invert',
    range: {min: 0, max: 100},
    step: 1,
    measurementUnit: '%'},
  phobos: {
    filter: 'blur',
    range: {min: 0, max: 3.0},
    step: 0.1,
    measurementUnit: 'px'},
  heat: {
    filter: 'brightness',
    range: {min: 1, max: 3.0},
    step: 0.1,
    measurementUnit: ''}
};

const sliderConnector = () => {
  if (currentRadio !== 'none') {
    const effect = Effects[currentRadio];
    picture.style.filter = `${effect.filter}(${sliderElement.noUiSlider.get()}${effect.measurementUnit})`;
    currentSlider.value = `${parseFloat(sliderElement.noUiSlider.get())}${effect.measurementUnit}`;
  } else {
    picture.style.filter = '';
  }
};

const changeSlider = (newEffect) => {
  const effect = Effects[newEffect];
  if(effect !== 0){
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: effect.range.min,
        max: effect.range.max,
      },
      start: effect.range.max,
      step: effect.step
    });
    sliderUpload.classList.remove('visually-hidden');
    sliderConnector();
  } else{
    sliderUpload.classList.add('visually-hidden');
    picture.style.filter = '';
  }
};

const onNoUiSliderChange = () => {
  sliderConnector();
};

const onRadioChange = (evt) =>{
  currentRadio = evt.currentTarget.querySelector('.effects__radio').value;
  changeSlider(currentRadio);
};

const resetFilters = () =>{
  filterRadios.forEach((filter) => {
    filter.removeEventListener('change', onRadioChange);
  });

  picture.style.filter = 'none';
  sliderElement.noUiSlider.off('change', onNoUiSliderChange);
};

const initRadios = () =>{
  sliderElement.noUiSlider.on('change', onNoUiSliderChange);
  sliderUpload.classList.add('visually-hidden');
  filterRadios.forEach((filter) => {
    filter.addEventListener('change', onRadioChange);
  });
  picture.style.filter = 'none';
};

noUiSlider.create(sliderElement, {
  range: {
    min: Slider.MIN,
    max: Slider.MAX
  },
  start: Slider.MAX,
  step: Slider.STEP,
  connect: 'lower',
});

export {initRadios, resetFilters};

