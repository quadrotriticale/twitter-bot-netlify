const getImage = require('./puppeteer.js');
const tweet = require('./twitter.js');
const { schedule } = require("@netlify/functions");

const handler = async (event, context) => {
    //console.log("Received event:", event);

    const main = async () => {
      try {
        const {title, url} = await getImage();
        tweet(title, url);
      } catch(error) {
        console.log(error);
      }
    }
    
    main();

    return {
        statusCode: 200,
    };
};

exports.handler = schedule("@hourly", handler);

/* const main = async () => {
  try {
    const {title, url} = await getImage();
    tweet(title, url);
  } catch(error) {
    console.log(error);
  }
}

main(); */
