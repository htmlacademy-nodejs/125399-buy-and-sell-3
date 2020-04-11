'use strict';
const {
  getRandomInt,
  shuffle,
  printNumWithLead0
} = require(`../../utils`);
const fs = require(`fs`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const TITLES = [
  `Продам книги Стивена Кинга`,
  `Продам новую приставку Sony Playstation 5`,
  `Продам отличную подборку фильмов на VHS`,
  `Куплю антиквариат`,
  `Куплю породистого кота`,
];

const SENTENCES = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `При покупке с меня бесплатная доставка в черте города.`,
];

const CATEGORIES = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`,
];

const OfferType = {
  offer: `offer`,
  sale: `sale`,
};


const PictureRestrict = {
  min: 1,
  max: 16,
};

const SumRestrict = {
  min: 1000,
  max: 100000,
};

const getPictureFileName = (number) => `item${printNumWithLead0(number)}.jpg`;
const generatePicture = () => getPictureFileName(getRandomInt(PictureRestrict.min, PictureRestrict.max));

const generateCategory = () => CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)];
const generateDescription = () => shuffle(SENTENCES).slice(1, 5).join(` `);
const generateTitle = () => TITLES[getRandomInt(0, TITLES.length - 1)];
const generateType = () => Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)];

const generateOffers = (count) => {
  let offersArray = [];

  for (let i = 0; i < count; i++) {
    offersArray.push({
      category: [generateCategory()],
      description: generateDescription(),
      picture: generatePicture(),
      title: generateTitle(),
      type: generateType(),
      sum: getRandomInt(SumRestrict.min, SumRestrict.max),
    });
  }

  return offersArray;
};

const writeToFile = (content) => {
  fs.writeFile(FILE_NAME, content, (err) => {
    if (err) {
      return console.error(`Can't write data to file...`);
    }

    return console.info(`Operation success. File created.`);
  });
};

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const offers = generateOffers(countOffer);
    const content = JSON.stringify(offers);

    writeToFile(content);
  }
};
