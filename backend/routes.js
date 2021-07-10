const express = require('express');
const { delay } = require('lodash');
const axios = require('axios');
const cheerio = require('cheerio');
const router = express.Router();
const data = require('./data/index');
const { life, food, trip, culture, top } = data;

const PAGING_UNIT = 12;
const ERROR_ENCOUNT_PERCENT = 10;
const MAX_DELAY_TIME = 3000;

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getError = () => getRandomNumber(0, 100) <= ERROR_ENCOUNT_PERCENT;

router.get('/best', (req, res) => {
  delay(() => {
    if (getError()) {
      return res.status(500).send({
        message: 'This is an intentional error.',
      });
    }
    return res.status(200).send({
      data: data.top,
    });
  }, getRandomNumber(0, MAX_DELAY_TIME));
});

router.get('/content/:category', (req, res) => {
  const { category } = req.params;
  const page = req.query.page ? Number(req.query.page) : 1;
  const limit = req.query.limit ? Number(req.query.limit) : 40;

  if (!category) {
    return res.status(400).send({
      message: 'Parameter(category) should be given.',
    });
  }
  const startIndex = (page - 1) * PAGING_UNIT;
  const endIndex = startIndex + PAGING_UNIT;

  delay(() => {
    if (getError()) {
      console.log(getError());
      return res.status(500).send({
        message: 'This is an intentional error.',
      });
    }
    if (category === 'home') {
      const mainData = {
        top,
        life: life.slice(0, 12),
        food: food.slice(0, 12),
        trip: trip.slice(0, 12),
        culture: culture.slice(0, 12),
      };
      return res.status(200).send({
        data: mainData,
      });
    } else {
      const foundContents = data[category];

      if (!foundContents) {
        return res.status(400).send({
          message: 'The contents data with the given category could not be found.',
        });
      }

      return res.status(200).send({
        data: foundContents.slice(0, limit).slice(startIndex, endIndex),
      });
    }
  }, getRandomNumber(0, MAX_DELAY_TIME));
});

const getHtml = async (contentUrl) => {
  try {
    return await axios.get(contentUrl);
  } catch (error) {
    console.log(error);
  }
};

router.get('/detail/:media/:idx', (req, res) => {
  const { media, idx } = req.params;
  const contentUrl = 'https://hub.zum.com/' + media + idx;
  console.log(`contentUrl>>>`, contentUrl);

  if (!contentUrl) {
    return res.status(400).send({
      message: 'Parameter(contentUrl) should be given.',
    });
  }

  delay(async () => {
    if (getError()) {
      return res.status(500).send({
        message: 'This is an intentional error.',
      });
    }

    getHtml(contentUrl)
      .then((html) => {
        let contentData = [];
        const $ = cheerio.load(html.data);
        const $content = $('#container').children('.contents');

        $content.each(function (i) {
          contentData[i] = {
            titleTop: $(this).find('p.top').html(),
            title: $(this).find('h2.main_title').text(),
            writer: $(this).find('p.writer').html(),
            body: $(this).find('div.article').html(),
          };
        });

        const data = contentData.filter((n) => n.title);
        return data;
      })
      .then((res) => {
        console.log(res);
        return res.status(200).send({
          data: res[0],
        });
      })
      .catch((error) =>
        res.status(400).send({
          message: 'The detail page with the given contentUrl could not be found.',
          error,
        }),
      );
  }, getRandomNumber(0, MAX_DELAY_TIME));
});

module.exports = router;
