const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/casasmodernas/');
  // await page.screenshot({ path: "instagram.png" });

  const imgList = await page.evaluate(() => {
    const nodeList = document.querySelectorAll('article img');
    const imgArray = [...nodeList];
    const list = imgArray.map(({ src }) => ({
      src,
    }));

    return list;
  });

  fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), (err) => {
    if (err) throw new Error(err);

    console.log('done');
  });

  await browser.close();
})();
