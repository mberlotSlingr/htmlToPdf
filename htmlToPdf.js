const fs = require('fs');
const svc = require('@slingr/slingr-services');
const puppeteer = require('puppeteer');
const Handlebars = require('handlebars');



async function generatePdfFromHtml(params) {
  let { fileName, htmlBody, htmlHeader, htmlFooter, model } = params.params;
  try {
    // Compile templates
    const bodyTemplate = Handlebars.compile(htmlBody || '');
    const headerTemplate = Handlebars.compile(htmlHeader || '<span></span>');
    const footerTemplate = Handlebars.compile(htmlFooter || '<span></span>');

    const compiledBody = bodyTemplate(model);
    const compiledHeader = headerTemplate(model);
    const compiledFooter = footerTemplate(model);

    // Generate PDF with Puppeteer
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    await page.setContent(compiledBody, { waitUntil: 'networkidle0' });

    const buffer = await page.pdf({
      format: 'A4',
      displayHeaderFooter: htmlHeader || htmlFooter ? true : false,
      headerTemplate: compiledHeader,
      footerTemplate: compiledFooter,
      printBackground: true,
      margin: {
        top: htmlHeader ? '80px' : '40px',
        bottom: htmlFooter ? '80px' : '40px',
        left: '40px',
        right: '40px'
      }
    });

    await browser.close();

    // Upload the file
    let name = fileName ? fileName + ".pdf" : "undefined.pdf";
    let fileProcessed = await svc.files.upload(name, buffer);

    // return {
    //   ...params,
    //   fileProcessed
    // };
    svc.events.send('onGenerateComplete', {
      fileProcessed,
      ok: true,
    }, name);
  } catch (err) {
    svc.events.send('onGenerateComplete', {
                ok: false,
                error: err.message,
            }, fileName ? fileName + ".pdf" : "undefined.pdf");
  }
}

module.exports = {
  generatePdfFromHtml
};
