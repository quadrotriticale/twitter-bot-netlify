const {TwitterApi} = require('twitter-api-v2');

const twitterClient = new TwitterApi({
  appKey: '<your_api_key>',
  appSecret: '<your_api_key_secret>',
  accessToken: '<your-access-token>',
  accessSecret: '<your_access_token_secret>'
});

const readWriteClient = twitterClient.readWrite;

const tweet = async (title, url) => {
  try {
    const tweetText = title + " " + url;
    await readWriteClient.v2.tweet({ text: tweetText });
  } catch(error) {
    console.log(error);
  }
}

module.exports = tweet;