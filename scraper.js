const { chromium } = require('playwright');

async function scrapeAndSum(seed) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
  await page.goto(url);
  await page.waitForSelector("table");

  const numbers = await page.$$eval("table td", tds =>
    tds.map(td => td.innerText).flat().map(x => parseFloat(x)).filter(x => !isNaN(x))
  );

  const sum = numbers.reduce((a, b) => a + b, 0);
  await browser.close();
  return sum;
}

(async () => {
  let grandTotal = 0;
  for (let seed = 21; seed <= 30; seed++) {
    const sum = await scrapeAndSum(seed);
    console.log(`Seed ${seed} total: ${sum}`);
    grandTotal += sum;
  }
  console.log("FINAL TOTAL:", grandTotal);
})();
