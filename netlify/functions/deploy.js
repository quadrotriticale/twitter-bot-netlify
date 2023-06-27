const { schedule } = require("@netlify/functions");
const getImageInfo = require('../../puppeteer.js');
const tweet = require('../../twitter.js');

const handler =  async (event, context) => {
  console.log("Here's the scheduled function.");
  await main();
  return {
    statusCode: 200
  };
};

const main = async () => {
  try {
    const {title, url} = await getImageInfo();
    await tweet(title, url)
  } catch(error) {
    console.log(error);
  }
}

exports.handler = schedule("0 */6 * * *", handler);