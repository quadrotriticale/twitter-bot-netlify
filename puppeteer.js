const puppeteer = require('puppeteer-core');
//const chromium = require('chrome-aws-lambda');
const chromium = require("@sparticuz/chromium");

const RANDOM_URL = 'https://commons.wikimedia.org/wiki/Special:Random/Image';
const descriptionSel = 'td.description';


const getImage = async () => {
    const browser = await puppeteer.launch({
        executablePath: await chromium.executablePath,
        args: chromium.args,
        headless: chromium.headless
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(RANDOM_URL);

    const title = await page.title();
    const url = await page.url();
  
    /* await page.waitForSelector('.fullImageLink a img');
    const element = await page.$('.fullImageLink a img');
    await element.screenshot({path: 'image.png'}); */
    const descriptionEl = await page.$(descriptionSel);
    const descriptionText = await (await descriptionEl.getProperty('textContent')).jsonValue();

    await browser.close();
    return {
        descriptionText,
        url
    }
}

module.exports = getImage;