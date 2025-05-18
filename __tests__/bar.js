import { Progress, termx } from '../src/index.js'

const progress = new Progress({
  total: 100,
  width: 20,
  mode: 'bar',
  barColor: '#fff',
  message: '',
  messageColor: 'yellow',
  completeMessage: 'Process completed in {{elapsed}}s',
  cursor: false,
  bar: '◼',
})

for (let i = 0; i < 100; i++) {
  setTimeout(() => {
    progress.process(`Step ${termx.blue.write(i + 1)} of ${termx.green.write(100)}`)
  }, i * 100)
}
