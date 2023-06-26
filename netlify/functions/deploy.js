const { schedule } = require("@netlify/functions");
const getImage = require('../../puppeteer.js');
const tweet = require('../../twitter.js');

const handler =  async (event, context) => {
  console.log("Here's the scheduled function.");
  await main();
};

const main = async () => {
  try {
    const {title, url} = await getImage();
    tweet(title, url);
  } catch(error) {
    console.log(error);
  }
}

exports.handler = schedule("@hourly", handler);