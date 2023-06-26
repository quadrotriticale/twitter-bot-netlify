const puppeteer = require('puppeteer');

const RANDOM_URL = 'https://commons.wikimedia.org/wiki/Special:Random/Image';


const getImage = async () => {
    const browser = await puppeteer.launch({headless: "new"});
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(RANDOM_URL);

    const title = await page.title();
    const url = await page.url();
  
    await page.waitForSelector('.fullImageLink a img');
    const element = await page.$('.fullImageLink a img');
    await element.screenshot({path: 'image.png'});

    await browser.close();
    return {
        title,
        url
    }
}

module.exports = getImage;