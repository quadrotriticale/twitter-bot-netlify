const puppeteer = require('puppeteer-core');
const chromium = require("@sparticuz/chromium");

const RANDOM_URL = 'https://commons.wikimedia.org/wiki/Special:Random/Image';
const descriptionSel = 'td.description';


const getImageInfo = async () => {
    const browser = await puppeteer.launch({
        executablePath: await chromium.executablePath,
        args: chromium.args,
        headless: chromium.headless
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(RANDOM_URL);

    const url = await page.url();
 
    const descriptionEl = await page.$(descriptionSel);
    let title = await (await descriptionEl.getProperty('textContent')).jsonValue();
    if (!title)
        title = await page.title();
    if (title.slice(0, 8) == "English:") 
        title = title.slice(9, title.length);
    if (title.length > 200)
        title = title.slice(0, 200) + '...';

    await browser.close();
    return {
        title,
        url
    }
}

module.exports = getImageInfo;