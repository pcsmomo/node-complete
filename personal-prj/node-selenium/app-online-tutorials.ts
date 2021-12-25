import fs from 'fs'
import { performance } from 'perf_hooks'
import { Browser, Builder, By, Key, until, WebDriver } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome'
// import chalk from 'chalk'

// const MY_LINDSEY_PLAYLIST = 'https://www.youtube.com/playlist?list=PLSPcBbeiH6w0EyWhp5sgmv0vcQ-jJQK9T'
const VIDEOS = 'https://www.youtube.com/c/OnlineTutorials4Designers/videos'

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
  // let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().addArguments('--headless')).build()

  try {
    const startTime = performance.now()
    console.log(`Initial Fetching 1: `, performance.now() - startTime, 'ms passed.')

    await driver.get(VIDEOS)
    printLastVideo(driver)

    for (let i = 0; i < 100; i++) {
      console.log(`Fetch ${i + 2}, `, performance.now() - startTime, 'ms passed.')

      await driver.executeScript('window.scrollTo(0, 100000);')
      await new Promise((resolve) => setTimeout(resolve, 3000)) // wait for 3 seconds
      printLastVideo(driver)
    }

    // Extract titles and links
    const titleLinks = await driver.findElements(By.id('video-title'))
    const thumbnails = await driver.findElements(By.id('thumbnail'))

    console.log(titleLinks.length)
    console.log(thumbnails.length)

    // Write in the file
    const filename = 'css-list.csv'

    try {
      if (!fs.existsSync(filename)) {
        fs.writeFileSync(filename, '')
      }
    } catch (err: any) {
      console.log(err)
    }

    titleLinks.forEach(async (titleLink, index) => {
      const title = await titleLink.getText()
      const link = await titleLink.getAttribute('href')
      const time = await thumbnails[index + 1].getText()
      try {
        fs.appendFileSync(filename, `${index + 1}, ${title}, ${time}, ${link}\n`)
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
    // await driver.quit()
  }
}

run()
