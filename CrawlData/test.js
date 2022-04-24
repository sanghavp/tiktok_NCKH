const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.tiktok.com/search?q=onhiemmoitruong&t=1649906730287');
  await page.screenshot({ path: 'tiktok.png' });

  await browser.close();
})();