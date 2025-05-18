import { Progress } from '../src/index.js'

const total = 20

const progress = new Progress({
  total,
  width: 20,
  mode: 'dots',
  completeMessage: 'Process completed in {{elapsed}}s',
  completeMessagePosition: 'newline',
  barColor: 'blue',
  message: 'Lorem ipsum dollor sit amet, consectetur adipiscing elit. {{percent}}% completed',
  dotsType: 'star',
  cursor: true,
  spaceBefore: 1,
  spaceAfter: 1,
})

await progress.here()

for (let i = 0; i < total; i++) {
  setTimeout(() => {
    progress.process(`Processing item ${i + 1}`)
  }, i * 100)
}

