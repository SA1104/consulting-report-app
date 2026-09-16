const puppeteer = require('puppeteer');

(async () => {
  console.log('Starting puppeteer...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  console.log('Navigating to localhost:3000...');
  await page.goto('http://localhost:3000', {waitUntil: 'networkidle0'});
  
  // Navigate to Step 7
  for (let i = 0; i < 7; i++) {
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const nextBtn = btns.find(b => b.textContent.includes('다음 단계'));
        if (nextBtn) nextBtn.click();
    });
    await new Promise(r => setTimeout(r, 200));
  }
  
  console.log('Clicking PDF 다운로드...');
  await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const pdfBtn = btns.find(b => b.textContent.includes('PDF 다운로드'));
        if (pdfBtn) pdfBtn.click();
  });
  
  await new Promise(r => setTimeout(r, 1000));
  
  console.log('Running page.pdf()...');
  try {
    await page.pdf({ path: 'test.pdf', format: 'A4', printBackground: true });
    console.log('PDF Generated successfully!');
  } catch (e) {
    console.error('PDF Generation Failed:', e);
  }
  
  await browser.close();
})();
