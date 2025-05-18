import { Activity, termx } from '../src/index.js'

const activity = new Activity({
  color: '#fff',
  messageColor: 'blue',
  type: 'dots',
  completeMessage: '√ Process completed in {{elapsed}}s',
})

for (let i = 0; i < 100; i++) {
  setTimeout(() => {
    activity.process(`Step ${termx.whiteBright.write(i + 1)}`)
  }, i * 100)
}

// activity.run("Processing...", 5000)

// await activity.init()
// activity.run("Processing...")
// console.log('Processing...2')
//
// setTimeout(() => {
//   activity.stop()
// }, 5000)
