import fs from 'fs'
import { performance } from 'perf_hooks'
import { Browser, Builder, By, Key, until, WebDriver } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome'
// import chalk from 'chalk'

const TM_CSS_PLAYLIST = 'https://www.youtube.com/playlist?list=PLillGF-RfqbZTASqIqdvm1R5mLrQq79CU'
// const LINDSEY_VIDEOS = 'https://www.youtube.com/c/lindseystirling/videos'

const printLastVideo = async (driver: WebDriver) => {
  const titleLinks = await driver.findElements(By.id('video-title'))
  const lastTitleLink = await titleLinks[titleLinks.length - 1]
  const title = await lastTitleLink.getText()
  const link = await lastTitleLink.getAttribute('href')

  console.log(`Loaded until ${titleLinks.length}, ${title}: ${link}`)
}

const run = async () => {
  // headless option
  let driver = await new Builder().forBrowser('chrome').build()
  // let driver = await new Builder()
  //   .forBrowser('chrome')
  //   .setChromeOptions(new chrome.Options().addArguments('--headless'))
  //   .build()

  try {
    const startTime = performance.now()
    console.log(`Initial Fetching 1: `, performance.now() - startTime, 'ms passed.')

    await driver.get(TM_CSS_PLAYLIST)
    printLastVideo(driver)

    for (let i = 0; i < 6; i++) {
      await driver.executeScript(`window.scrollTo(0, ${1000 * (i + 1)});`)
      await new Promise((resolve) => setTimeout(resolve, 500)) // wait for 0.5 seconds
    }

    // Extract titles and links
    const titleLinks = await driver.findElements(By.id('video-title'))
    const overlays = await driver.findElements(By.id('overlays'))

    console.log(titleLinks.length)
    console.log(overlays.length)

    // Write in the file
    const filename = 'results/traversy-media-css.csv'

    try {
      if (!fs.existsSync(filename)) {
        await fs.writeFileSync(filename, '')
      }
    } catch (err: any) {
      console.log(err)
    }

    titleLinks.forEach(async (titleLink, index) => {
      let title = await titleLink.getText()
      title = title.replaceAll(',', '')
      const link = await titleLink.getAttribute('href')
      const time = await overlays[index + 2].getText()
      try {
        fs.appendFileSync(filename, `${index + 1},${title}, ${time},${link}\n`)
      } catch (err: any) {
        console.log(err.message)
      }
    })

    console.log(`${titleLinks.length} video links are successfully extracted!`)

    // const endTime = performance.now()
    // console.log(`time passed: ${endTime - startTime} milliseconds`)
  } catch (err: any) {
    console.log(err.message)
  } finally {
    // do not uncomment until the process of writing to file finishes
    // await driver.quit()
  }
}

run()
