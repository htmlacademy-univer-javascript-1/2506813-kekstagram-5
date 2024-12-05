const Zoom = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const minusButton = document.querySelector('.scale__control--smaller');
const plusButton = document.querySelector('.scale__control--bigger');
const controlValueElement = document.querySelector('input[name="scale"]');

const sliderField = document.querySelector('.img-upload__effect-level');
const sliderElement = sliderField.querySelector('.effect-level__slider');
const sliderElementValue = sliderField.querySelector('.effect-level__value');

const previewContainer = document.querySelector('.img-upload__preview');
const picture = previewContainer.querySelector('img');

const effectRadios = document.querySelectorAll('input[name="effect"]');

const Effects = {
  chrome: {
    MAX: 1,
    MIN: 0,
    STEP: 0.1,
  },
  sepia: {
    MAX: 1,
    MIN: 0,
    STEP: 0.1,
  },
  marvin: {
    MAX: 100,
    MIN: 0,
    STEP: 1,
  },
  phobos: {
    MAX: 3,
    MIN: 0,
    STEP: 0.1,
  },
  heat: {
    MAX: 3,
    MIN: 1,
    STEP: 0.1,
  },
};

sliderField.classList.add('hidden');

const resetSlider = () => {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
};

const changeSliderForNone = () => {
  picture.style.filter = '';
  sliderField.classList.add('hidden');
  sliderElement.noUiSlider.destroy();
};

const createSliderForChrome = () => {
  let currentSliderValue = Effects.chrome.MAX;
  resetSlider();
  sliderField.classList.remove('hidden');
  noUiSlider.create(sliderElement, {
    range: {
      min: Effects.chrome.MIN,
      max: Effects.chrome.MAX,
    },
    start: Effects.chrome.MAX,
    step: Effects.chrome.STEP,
    connect: 'lower',
  });
  sliderElement.noUiSlider.on('update', () => {
    currentSliderValue = sliderElement.noUiSlider.get();
    sliderElementValue.value = currentSliderValue;
    picture.style.filter = `grayscale(${currentSliderValue})`;
  });
};
const createSliderForSepia = () => {
  let currentSliderValue = Effects.sepia.MAX;
  resetSlider();
  sliderField.classList.remove('hidden');
  noUiSlider.create(sliderElement, {
    range: {
      min: Effects.sepia.MIN,
      max: Effects.sepia.MAX,
    },
    start: Effects.sepia.MAX,
    step: Effects.sepia.STEP,
    connect: 'lower',
  });
  sliderElement.noUiSlider.on('update', () => {
    currentSliderValue = sliderElement.noUiSlider.get();
    sliderElementValue.value = currentSliderValue;
    picture.style.filter = `sepia(${currentSliderValue})`;
  });
};
const createSliderForMarvin = () => {
  let currentSliderValue = Effects.marvin.MAX;
  resetSlider();
  sliderField.classList.remove('hidden');
  noUiSlider.create(sliderElement, {
    range: {
      min: Effects.marvin.MIN,
      max: Effects.marvin.MAX,
    },
    start: Effects.marvin.MAX,
    step: Effects.marvin.STEP,
    connect: 'lower',
  });
  sliderElement.noUiSlider.on('update', () => {
    currentSliderValue = sliderElement.noUiSlider.get();
    sliderElementValue.value = currentSliderValue;
    picture.style.filter = `invert(${currentSliderValue}%)`;
  });
};
const createSliderForPhobos = () => {
  let currentSliderValue = Effects.phobos.MAX;
  resetSlider();
  sliderField.classList.remove('hidden');
  noUiSlider.create(sliderElement, {
    range: {
      min: Effects.phobos.MIN,
      max: Effects.phobos.MAX,
    },
    start: Effects.phobos.MAX,
    step: Effects.phobos.STEP,
    connect: 'lower',
  });
  sliderElement.noUiSlider.on('update', () => {
    currentSliderValue = sliderElement.noUiSlider.get();
    sliderElementValue.value = currentSliderValue;
    picture.style.filter = `blur(${currentSliderValue}px)`;
  });
};
const createSliderForHeat = () => {
  let currentSliderValue = Effects.heat.MAX;
  resetSlider();
  sliderField.classList.remove('hidden');
  noUiSlider.create(sliderElement, {
    range: {
      min: Effects.heat.MIN,
      max: Effects.heat.MAX,
    },
    start: Effects.heat.MAX,
    step: Effects.heat.STEP,
    connect: 'lower',
  });

  sliderElement.noUiSlider.on('update', () => {
    currentSliderValue = sliderElement.noUiSlider.get();
    sliderElementValue.value = currentSliderValue;
    picture.style.filter = `brightness(${currentSliderValue})`;
  });
};

effectRadios.forEach((radio) => {
  radio.addEventListener('change', (evt) => {
    if (evt.target.value === 'none') {
      changeSliderForNone();
    } else if (evt.target.value === 'chrome') {
      createSliderForChrome();
    } else if (evt.target.value === 'sepia') {
      createSliderForSepia();
    } else if (evt.target.value === 'marvin') {
      createSliderForMarvin();
    } else if (evt.target.value === 'phobos') {
      createSliderForPhobos();
    } else if (evt.target.value === 'heat') {
      createSliderForHeat();
    }
  });
});

const resetSliderToNone = () => {
  picture.style.filter = '';
  sliderField.classList.add('hidden');
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
};

const changeZoom = (factor = 1) => {
  let size = parseInt(controlValueElement.value, 10) + (Zoom.STEP * factor);

  if (size < Zoom.MIN) {
    size = Zoom.MIN;
  }

  if (size > Zoom.MAX) {
    size = Zoom.MAX;
  }

  controlValueElement.value = `${size}%`;
  previewContainer.style.transform = `scale(${size / 100})`;
};

const onMinusButtonClick = () => {
  changeZoom(-1);
};

const onPlusButtonClick = () => {
  changeZoom();
};

const resetControlToStandart = () => {
  controlValueElement.value = '100%';
  previewContainer.style.transform = 'scale(1)';
};

minusButton.addEventListener('click', onMinusButtonClick);
plusButton.addEventListener('click', onPlusButtonClick);

export {resetSliderToNone, resetControlToStandart};
