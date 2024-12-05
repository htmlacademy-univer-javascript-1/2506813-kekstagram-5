import { getRandomInt } from './util.js';

const PHOTO_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MAX_COMMENTS = 30;
const AVATAR_COUNT = 6;

function generatePhotos() {
  const photos = [];
  const names = ['Настя', 'Артём', 'Саша', 'Ирина', 'Андрей', 'Максим'];
  const descriptions = [
    'Отличные выходные!',
    'Теплый вечер.',
    'Покупка мечты!',
    'Повод улыбнуться.',
    'Работал работал - заработал.',
    'Всё возможно!',
    'Провожу время с любимыми.',
    'Кекс заставил выложить!'
  ];
  const comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  for (let i = 1; i <= PHOTO_COUNT; i++) {
    const photo = {
      id: i,
      url: `photos/${i}.jpg`,
      description: descriptions[getRandomInt(0, descriptions.length - 1)],
      likes: getRandomInt(MIN_LIKES, MAX_LIKES),
      comments: []
    };

    const commentCount = getRandomInt(0, MAX_COMMENTS);
    for (let j = 0; j < commentCount; j++) {
      photo.comments.push({
        id: j + 1,
        avatar: `img/avatar-${getRandomInt(1, AVATAR_COUNT)}.svg`,
        message: `${comments[getRandomInt(0, comments.length - 1)]}`,
        name: names[getRandomInt(0, names.length - 1)]
      });
    }
    photos.push(photo);
  }
  return photos;
}

export {generatePhotos};
