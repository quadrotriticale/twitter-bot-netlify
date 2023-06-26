const {TwitterApi} = require('twitter-api-v2');

const twitterClient = new TwitterApi({
  appKey: '2E9tsMTus56oVPpEBepI6kJuw',
  appSecret: 'nUTTVjyjHXmfBdndYo4mFQT64VJrB6JN9KttjbOTVcBzCkmDC8',
  accessToken: '3415253579-d93jiqArKMbLWVr06dt7lY8yfMQHLX5QGsEVvzm',
  accessSecret: 'p2DlSZSrhCqpMpuPxXFEhrpVrStapanAPp0cDUqbmdBeV'
});

const readWriteClient = twitterClient.readWrite;

const tweet = async (title, url) => {
  try {
    const mediaId = await readWriteClient.v1.uploadMedia('./image.png');
    const tweetText = title + " " + url;
    await readWriteClient.v2.tweet({ text: tweetText, media: { media_ids: [mediaId] } });
  } catch(error) {
    console.log(error);
  }
}

module.exports = tweet;