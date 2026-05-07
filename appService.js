const svc = require('@slingr/slingr-services');
const { generatePdfFromHtml } = require('./htmlToPdf');

svc.hooks.onSvcStart = () => {
    svc.logger.info('HTML to PDF Service has started');
}

svc.hooks.onSvcStop = (cause) => {
    svc.logger.info('HTML to PDF Service is stopping.');
}

svc.functions.generate = async (req) => { // Fixed to match SLINGR standard function binding
    await generatePdfFromHtml(req); // Note: req is usually the params directly in svc.functions.[name] depending on your SDK version
    return { ok: true };
};

svc.start();
