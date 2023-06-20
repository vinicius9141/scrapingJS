const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.google.com/maps/place/FISHING+MUSIC/@-14.4095261,-51.31668,4z/data=!3m1!4b1!4m6!3m5!1s0x9496435caf2832a7:0xeb41dee6a92e3d28!8m2!3d-14.4095262!4d-51.31668!16s%2Fg%2F11qnqzcbnd?entry=ttu');

  const textList = await page.evaluate(() => {
    const nodeList = document.querySelectorAll('.wiI7pd');
    const textoArray = [...nodeList];

    const list = textoArray.map(text => ({
      value: text.textContent
    }));

    console.log(list);
    return list;
  });

  fs.writeFile('avaliacoes.json', JSON.stringify(textList, null , 2 ), err =>{
    if(err) throw new Error('Error writing avaliacoes.json')

    console.log('Sucessfully writing avaliacoes.json')
  }) 

  // await browser.close();
})();
