const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    args: process.env.CI ? ['--no-sandbox', '--disable-setuid-sandbox'] : []
  });
  const page = await browser.newPage();

  const htmlPath = path.resolve(__dirname, 'static/cv/caroline-maguire-cv.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

  // Page size and margins come from the @page rule in the CV's CSS.
  await page.emulateMediaType('print');

  const outputPath = path.resolve(__dirname, 'static/cv/caroline-maguire-cv.pdf');
  await page.pdf({
    path: outputPath,
    preferCSSPageSize: true,
    printBackground: true,
    tagged: true
  });

  console.log(`PDF generated: ${outputPath}`);
  await browser.close();
})();
