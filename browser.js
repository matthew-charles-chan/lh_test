const chromeLauncher = require('chrome-launcher')


const chromeLaunch = async () => {
  const browser = await chromeLauncher.launch({chromeFlags: ['--headless']});
  console.log(browser.port)
} 

chromeLaunch();
chromeLaunch();