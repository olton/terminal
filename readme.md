<div align="center">

# Terminal

<div align="center">

![img.png](output.png)

</div>


[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
![NPM Version](https://img.shields.io/npm/v/%40olton%2Fterminal)
![Static Badge](https://img.shields.io/badge/dependencies-none-green)

`Terminal` - a JavaScript library for styling text output in a terminal, and screen and cursor control.

</div>

---

## Installation

```bash
npm install @olton/terminal
```

## Terminal output

You can create colored and styled outputs using `term` and `termx` functions.

### term()

With `term(msg, options)` function you can put text into terminal and styling it with options.
Options can be set as an object in the second argument.

```javascript
import { term, termx } from '@olton/terminal'

console.log(term('Hello World!', { style: 'bold, italic', color: 'redBright' }))
```

### termx()

With `termx` you can use chainable methods to set text style and color.
Chain must be ended with `write(msg)` method.

```javascript
import { term, termx } from '@olton/terminal'

console.log(termx.bold.italic.redBright.write('Hello World!'))
```

## Text style

You can set the text style using the `style` option. This is a comma-separated list of styles. The available styles are:
- `bold` - bold text
- `dim` - dim text
- `italic` - italic text
- `underline` - underlined text
- `inverse` - inverse text
- `hidden` - hidden text
- `strike` - strikethrough text

## Text color
You can set the text color using the `color` option. This is a comma-separated list of colors where first color is the text color and the second color is the background color. You can use next color values:

**1. Named colors**:

`black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `gray`
`blackBright`, `redBright`, `greenBright`, `yellowBright`, `blueBright`, `magentaBright`, `cyanBright`, `whiteBright`, `grayBright`

```js
import { term } from '@olton/terminal';

console.log(term('Hello World!', { color: 'yellowBright, blue' }))
console.log(termx.yellowBright.bgBlue.write('Hello World!'))
```

**2. Hex colors**: 

`#ff0000`, `#00ff00`, `#00f`, ...

```js
import { term } from '@olton/terminal';

console.log(term('Hello World!', { color: '#ff0000, #00ff00' }))
console.log(termx.hex('#ff0000', '#00ff00').write('Hello World!'))
```

**3. Color index**: from 0 to 255.

![](colors-indexes.png)

![](colors-256(8bit).png)

```js
import { term } from '@olton/terminal';

console.log(term('Hello World!', { color: '212, 27' }))
console.log(termx.ind(212, 27).write('Hello World!'))
```


#### Gradient color
You can set the gradient color using the `gradient` option. 
This is a comma-separated list of colors.
Colors can be in hex format.

```javascript
console.log(term('Hello World!', { gradient: "#ff0000, #0000ff" }))
console.log(term('Hello World!', { gradient: ["#f00", "#00f"] }))
console.log(termx.gradient("#f00", "#00f").write('Hello World!'))
```

### Themes
You can use predefined themes to style your text or add your one theme. Predefined themes are:
- `default` - default theme
- `sunset` - sunset theme
- `ocean` - ocean theme
- `forest` - forest theme
- `desert` - desert theme
- `twilight` - twilight theme
- `matrix` - matrix theme
- `error` - error theme
- `success` - success theme
- `warning` - warning theme
- `info` - info theme

#### Using themes with `term()`

```javascript
term('Hello World!', { theme: 'sunset' })
```

#### Using themes with `termx()`

```javascript
termx.sunset.write('Hello World!')
```

#### Global setup

You can set the default theme for all text using `Themes.set()` method.

```javascript
import { Themes } from '@olton/terminal'

Themes.set('sunset')
```

#### Reset theme
You can reset the theme to default using `Themes.reset()` method.

```javascript
import { Themes } from '@olton/terminal'

Themes.reset()
```

#### Adding custom theme
You can add your own theme using `Themes.add()` method.

```javascript
import { Themes } from '@olton/terminal'

Themes.add('myTheme', {
  color: ['red', 'blue'],
  style: ['bold', 'italic']
})
```

## Cursor

You can use `Cursor` class to manipulate the cursor position or visibility in the terminal.
Use fabric method `cursor` to create a new instance of `Cursor`.

```javascript
import { term, Cursor } from '@olton/terminal'

console.log(term('Hello World!'))
Cursor.hide()
setTimeout(() => {
  Cursor.show()
}, 2000)
```
 

#### Cursor methods
- `hide()` - hide the cursor
- `show()` - show the cursor
- `to(x, y)` - move the cursor to the specified position
- `up(n)` - move the cursor up `n` lines
- `down(n)` - move the cursor down `n` lines
- `left(n)` - move the cursor left `n` characters
- `right(n)` - move the cursor right `n` characters
- `save()` - save the current cursor position
- `restore()` - restore the cursor position
- `lineUp()` - move the cursor up 
- `linesUp(n)` - move the cursor up `n` lines and save the position
- `linesDown(n)` - move the cursor down `n` lines and save the position
- `getPos()` - get the current cursor position. This method returns a promise with the position object `{ x, y }`
- `shape` - set the cursor shape. This property contains methods to change cursor shape. Argument `blick` can be `false` or `true` and sets blinking cursor mode. The available shapes are:
  - `block(blink)` - block cursor
  - `line(blink)` - underline cursor
  - `bar(blink)` - bar cursor


```js
// Get cursor position
import { Cursor } from '@olton/terminal'

const pos = await Cursor.getPos()
console.log(`Cursor position is: column: ${pos.x}, row: ${pos.y}`)
```

```js
// Set cursor shape
import { Cursor } from '@olton/terminal'

Cursor.shape.block(true) // set block cursor with blinking
```

## Screen

You can use `Screen` class to manipulate the screen in the terminal.

Use fabric method `screen` to create a new instance of `Screen`.

```javascript
import { term } from '@olton/terminal'
import { screen } from '@olton/terminal'
console.log(term('Hello World!'))
setTimeout(() => {
  screen.clear()
}, 2000)
```

#### Screen methods
- `clear()` - clear the screen
- `clearLine()` - clear the current line
- `clearLeft()` - clear the left side of the current line
- `clearRight()` - clear the right side of the current line
- `clearDown()` - clear the screen from the current line down
- `clearUp()` - clear the screen from the current line up
- `size()` - get the current screen size.

```js
import { Screen } from '@olton/terminal'

// Clear terminal screen 
// and set cursor to the top left corner
Screen.clear()
```

> [!NOTE]
> Methods `clearLine`, `clearLeft`, `clearRight`, `clearDown`, `clearUp` not moved a cursor.


## ProgressBar
Progress is a simple command line tool to track your progress on various tasks. 
You can use `ProgressBar` or `Activity` to show the progress of your tasks in the terminal.

### Using
```js
import { Progress, ProgressOptions } from '@olton/terminal'

import { Progress } from "@olton/progress";

const options = {...ProgressOptions, ...{...}}
const progress = new Progress(options);

for (let i = 0; i < 100; i++) {
  setTimeout(() => {
    progress.process();
  }, i * 100);
}
```

### Progress options
You can set the progress options using `ProgressOptions` object.

```js
const ProgressOptions = {
  total: 0,
  completed: 0,
  width: 30,
  mode: 'default', // default, dots, bar
  completeMessageColor: 'green',
  completeMessage: '',
  completeMessagePosition: 'default', // default, newline
  barColor: 'green',
  backColor: 'gray',
  processMessage: '',
  processMessageColor: 'gray',
  dotsType: 'dots', // dots, clock, earth, moon
  unitName: 'unit',
  cursor: true,
  spaceBefore: 0,
  spaceAfter: 0,
  bar: '█',
  empty: '░',
}
```

#### Options Description
- `total`: Total number of operations. Default is `0`.
- `completed`: Number of completed operations. Default is `0`.
- `width`: Width of the progress bar. Default is `30`.
- `mode`: Mode of the progress bar: `default`, `dots`, or `bar`.
- `completeMessageColor`: Color of the complete message. Default is `green`.
- `completeMessage`: Message shown when the progress is completed. Default is `''`.
- `completeMessagePosition`: Position of the complete message: `default` or `newline`.
- `barColor`: Color of the progress bar. Default is `green`.
- `backColor`: Color of the empty part of the progress bar. Default is `gray`.
- `processMessage`: Message shown when the progress is updated. Default is `''`.
- `processMessageColor`: Color of the process message. Default is `gray`.
- `dotsType`: Type of the dots. See `Dots Types` below. Default is `dots`.
- `unitName`: Name of the unit. Default is `unit`.
- `cursor`: Show cursor. Default is `true`.
- `spaceBefore`: Space before the progress bar. Default is `0`.
- `spaceAfter`: Space after the progress bar. Default is `0`.
- `bar`: Character used for the progress bar. Default is `█`.
- `empty`: Character used for the empty part of the progress bar. Default is `░`.

### completeMessage
The message shown when the progress is completed. You can use the following replacers:
- `{{elapsed}}`: Elapsed time in seconds.

For example: `Completed {{total}} operations in {{elapsed}}s`.

### processMessage
The message shown when the progress is updated. You can use the following replacers:
- `{{total}}`: Total number of operations.
- `{{completed}}`: Number of completed operations.
- `{{elapsed}}`: Elapsed time in seconds.
- `{{percent}}`: Percentage of completion.
- `{{rate}}`: Rate of completion.

For example: `Completed {{completed}} of {{total}} in {{elapsed}}s ({{percent}}%)`.

> [!NOTE]
> You can use the `processMessage` for `bar`, and `dots` modes. For `default` mode, the `processMessage` is not used.

### Progress Modes

- `default`: Shows a progress bar with the percentage of completion.
- `dots`: Shows a series of dots to indicate progress.
- `bar`: Shows a progress bar with the percentage of completion.


### Colors
For `bar`, `processMessage`, `startMessage`, and `completeMessage` you can use different colors.

You can use named colors - `black`, `red`, `green`, `yellow`, `blue`,
`magenta`, `cyan`, `white`, `blackBright`, `gray`, `redBright`, `greenBright`,
`yellowBright`, `blueBright`, `magentaBright`, `cyanBright`, `whiteBright`.

Also, you can use hex colors. For example: `#ff0000`.

### Dots Types
`dots`: Shows a series of dots to indicate progress.
```js
["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]
```
`clock`: Shows a clock to indicate progress.
```js
["🕛", "🕐", "🕑", "🕒", "🕓", "🕔", "🕕", "🕖", "🕗", "🕘", "🕙", "🕚"]
```
`moon`: Shows a moon to indicate progress.
```js
["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"]
```
`earth`: Shows an earth to indicate progress.
```js
["🌍", "🌍", "🌍", "🌎", "🌎", "🌎", "🌏", "🌏", "🌏"]
```
`line`: Shows a line to indicate progress.
```js
['|', '/', '─', '\\', '|', '/', '─', '\\', '|']
```
`windows`: Shows a series of dots to indicate progress.
```js
['⢿', '⣻', '⣽', '⣾', '⣷', '⣯', '⣟', '⡿']
```

## Activity

Use activity to show the progress of a task that is not a linear process. For example, you can use it to show the progress of a file upload or download.

### Options

```js
export default {
  type: 'dots',
  cursor: true,
  spaceBefore: 0,
  spaceAfter: 0,
  color: 'green',
  message: '',
  messageColor: 'white',
  completeMessage: '',
  completeMessageColor: 'whiteBright',
}
```

#### Options Description
- `type`: Type of the activity. See `Dots Types` above. Default is `dots`.
- `cursor`: Show cursor. Default is `true`.
- `spaceBefore`: Space before the activity. Default is `0`.
- `spaceAfter`: Space after the activity. Default is `0`.
- `color`: Color of the activity. Default is `green`.
- `message`: The process message. Default is `''`.
- `messageColor`: Color of the message. Default is `white`.
- `completeMessage`: Message shown when the activity is completed. Default is `''`.
- `completeMessageColor`: Color of the complete message. Default is `whiteBright`.

### Usage

#### Create activity

```js
import { Activity } from "@olton/terminal";

const activity = new Activity({
  color: '#fff',
  message: '',
  messageColor: 'yellow',
  type: 'dots',
})
```

#### process()

You can use the `process()` method to update the activity.

```js
const activity = new Activity({...})

for (let i = 0; i < 100; i++) {
  setTimeout(() => {
    activity.process(`Step ${i + 1}`)
  }, i * 100)
}
```

#### run()

The `run(msg, timeout)` method starts the activity. This method runs an interval to update the activity.
You can use the `msg` parameter to show a message. The `timeout` parameter is used to stop the activity after a specified time.

```js
const activity = new Activity({...})

// Run activity and stop after 5 seconds
activity.run("Processing...", 5000)
```

#### stop()

The `stop(msg)` method stops the activity. You can use the `msg` parameter to show a message when the activity is stopped.

```js
const activity = new Activity({...})

activity.run("Processing...")

setTimeout(() => {
  activity.stop("Done!")
}, 5000)
```

## Method save()
The `save()` method save the position of progress or activity.
The saved position will be restored when you call `process()` method.

```js
const progress = new Progress({...});
progress.save()
```

## Method here()
The `here()` method save the position of progress or activity using async function `Cursor.getPos()`.
This function returns a promise with the position object `{ x, y }`.
You can use this value to output additional information to the terminal when the progress or activity is processed.

```js
const progress = new Progress({...});
await progress.here()
```

---
## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
## Code Standards

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

---

## Support

If you like this project, please consider supporting it by:

+ Star this repository on GitHub
+ Sponsor this project on GitHub Sponsors
+ **PayPal** to `serhii@pimenov.com.ua`.
+ **Patreon** https://www.patreon.com/metroui

---

Copyright (c) 2025 by [Serhii Pimenov](https://pimenov.com.ua)
