const puppeteer = require('puppeteer');

async function scrapeAmazonProduct(searchQuery) {
  // const executablePath = await new Promise(resolve => locateChrome(arg => resolve(arg))) || '';
  const browser = await puppeteer.launch(
    {
    headless: true,
    executablePath: '/usr/bin/google-chrome',
    args: [
        "--no-sandbox",
        "--disable-gpu",
    ]
}
);
  const page = await browser.newPage();

  try {
    // Navigate to the search results page
    const searchURL = `https://www.amazon.in/s?k=${encodeURIComponent(searchQuery)}`;
    await page.goto(searchURL);

    // Wait for the search results to load
    await page.waitForSelector('.s-result-item', { timeout: 90000 }); // Increase the timeout to 90 seconds


    // Extract product details
    const products = await page.$$eval('.s-result-item', (elements) =>
      elements.slice(0, 10).map((element) => {
        const titleElement = element.querySelector('h2 > a');
        const title = titleElement ? titleElement.innerText : '';

        const priceElement = element.querySelector('.a-price-whole');
        const price = priceElement ? priceElement.innerText : '';

        const url = titleElement ? titleElement.href : '';

        return { title, price, url };
      })
    );

    return products;
  } catch (error) {
    console.error('An error occurred:', error);
    return []; // Return an empty array or handle the error as per your requirement
  } finally {
    await browser.close();
  }
}

module.exports = { scrapeAmazonProduct };
