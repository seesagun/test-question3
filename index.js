const puppeteer = require ('puppeteer');

//initiating Puppeteer
puppeteer
  .launch ()
  .then (async browser => {
  
    //opening a new page and navigating to Reddit
    const page = await browser.newPage ();
    await page.goto ('https://codequiz.azurewebsites.net/');
    await page.waitForSelector ('body');
    await page.click('input')
    await page.waitForSelector ('table');
    // await page.$x("//button[contains(., 'Logout')]");
  
    //manipulating the page's content
    const data = await page.evaluate(() => {
        const tds = Array.from(document.querySelectorAll('table tr td'))
        return tds.map(td => td.innerText)
      });
    //outputting the scraped data
    if((process.argv[2].toUpperCase().indexOf('B') === -1) || (data.indexOf(process.argv[2]) === -1)){
        console.log('NOT FOUND')
    }else{
        console.log(data[data.indexOf(process.argv[2].toUpperCase()) + 1]);
    }
    //closing the browser
    await browser.close ();
  })
  //handling any errors
  .catch (function (err) {
    console.error (err);
  });