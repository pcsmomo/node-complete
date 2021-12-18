import { Browser, Builder, By, Key, until } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome'

const MY_PMG_PLAYLIST = 'https://www.youtube.com/playlist?list=PLSPcBbeiH6w2VekObHJtOxnHipf5Nvxxw'
const PMG_VIDEOS = 'https://www.youtube.com/c/postmodernjukebox/videos'

const run = async () => {
  // headless option
  // let driver = await new Builder().forBrowser('chrome').build()
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().addArguments('--headless')).build()

  try {
    await driver.get(MY_PMG_PLAYLIST)
    // driver.executeScript('window.scrollTo(0, 10000);')
    const indexes = await driver.findElements(By.id('index'))
    // console.log(indexes)
    console.log(await indexes[0].getText())
  } catch (err: any) {
    console.log(err.message)
  } finally {
    await driver.quit()
  }
}

run()

// await driver.get('http://www.google.com')
// await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN)
// await driver.wait(until.titleIs('webdriver - Google Search'), 1000)
