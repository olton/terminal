import { Progress } from '../src/index.js'

const progress = new Progress({
  total: 100,
  width: 20,
  mode: 'default',
  completeMessage: 'Completed tests in {{elapsed}}s\n',
  barColor: '200',
  unitName: 'test',
})

for (let i = 0; i < 100; i++) {
  setTimeout(() => {
    progress.process()
  }, i * 100)
}

setTimeout(() => {
  progress.save()
  progress.reset({
    total: 50,
    width: 30,
    mode: 'default',
    completeMessage: 'Completed tests in {{elapsed}}s\n',
    barColor: 'green',
  })

  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      progress.process()
    }, i * 50)
  }
}, 10000)
