const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const modalElement = document.querySelector('.img-upload');
const smallButtonElement = modalElement.querySelector('.scale__control--smaller');
const bigButtonElement = modalElement.querySelector('.scale__control--bigger');
const scaleInputElement = modalElement.querySelector('.scale__control--value');
const imageElement = modalElement.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imageElement.style.transform = `scale(${value / 100})`;
  scaleInputElement.value = `${value}%`;
};

const onSmallButton = () => {
  const newScaleValue = parseInt(scaleInputElement.value, 10) - SCALE_STEP;
  scaleImage(Math.max(newScaleValue, MIN_SCALE));
};

const onBigButton = () => {
  const newScaleValue = parseInt(scaleInputElement.value, 10) + SCALE_STEP;
  scaleImage(Math.min(newScaleValue, MAX_SCALE));
};

const resetScale = () => scaleImage(DEFAULT_SCALE);

smallButtonElement.addEventListener('click', onSmallButton);
bigButtonElement.addEventListener('click', onBigButton);

export { resetScale };


