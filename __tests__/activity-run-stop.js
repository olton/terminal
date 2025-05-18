import { Activity, termx } from '../src/index.js'

const activity = new Activity({
  color: '#fff',
  messageColor: 'blue',
  type: 'dots',
  completeMessage: '√ Process completed in {{elapsed}}s',
})

console.log('Processing...1')
console.log('Processing...2')
console.log('Processing...3')

activity.save()

console.log('Processing...1')
console.log('Processing...2')
console.log('Processing...3')

activity.run("Processing...")

setTimeout(() => {
  activity.stop()
}, 5000)
