import { Browser, Builder, By, Key, until, WebDriver } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome'
import { performance } from 'perf_hooks'

const MY_PMG_PLAYLIST = 'https://www.youtube.com/playlist?list=PLSPcBbeiH6w2VekObHJtOxnHipf5Nvxxw'
const PMG_VIDEOS = 'https://www.youtube.com/c/postmodernjukebox/videos'

const printLastVideo = async (driver: WebDriver) => {
  const indexes = await driver.findElements(By.id('index'))
  const lastIndex = await indexes[indexes.length - 1].getText()

  const titles = await driver.findElements(By.id('video-title'))
  const lastTitle = await titles[titles.length - 1].getText()

  console.log(`Loaded until ${lastIndex}: ${lastTitle}`)
}

const run = async () => {
  // headless option
  let driver = await new Builder().forBrowser('chrome').build()
  // let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().addArguments('--headless')).build()

  try {
    const startTime = performance.now()
    console.log(`Initial Fetching 1: `, performance.now() - startTime, 'ms passed.')

    await driver.get(MY_PMG_PLAYLIST)
    printLastVideo(driver)

    for (let i = 0; i < 3; i++) {
      console.log(`Fetch ${i + 2}, `, performance.now() - startTime, 'ms passed.')

      await driver.executeScript('window.scrollTo(0, 100000);')
      await new Promise((resolve) => setTimeout(resolve, 5000)) // wait for 5 seconds
      printLastVideo(driver)
    }

    // const indexes = await driver.findElements(By.id('index'))
    // console.log(indexes)
    // console.log(await indexes[0].getText())

    const endTime = performance.now()
    console.log(`time passed: ${endTime - startTime} milliseconds`)
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

// TODO: PMG videos need to fetch 13+ times
