// const fs = require('fs');
const lighthouse = require('lighthouse');
// const desktopConfig = require('./node_modules/lighthouse/lighthouse-core/config/lr-desktop-config');
const mobileConfig = require('./node_modules/lighthouse/lighthouse-core/config/lr-mobile-config')

const puppeteer = require('puppeteer');



const getLHReport = async(hostName, config) => {
  const browserless_endpoint ='wss://chrome.browserless.io?token=1d617369-f1ab-4dbf-8523-592e81a28d05';
  // let browser = null
  const browser = await puppeteer.connect({
    browserWSEndpoint: browserless_endpoint,
  });
  // const browser = await puppeteer.launch();
  const PORT = new URL(browser.wsEndpoint()).port

  // const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {output: 'json', port: PORT};
  const runnerResult = await lighthouse(hostName, options, config);
  
  // `.report` is the HTML report as a string
  const reportJSON = runnerResult.lhr;
  return {data: reportJSON};
};

getLHReport("https://ecomexperts.io",mobileConfig, 57868).then(res => console.log(res));


