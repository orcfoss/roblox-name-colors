# roblox-name-colors
Computes Roblox name colors

## Usage
### Installation
```bash
npm install roblox-name-colors
```

### Documentation
```js
const robloxNameColors = require("roblox-name-colors")

robloxNameColors.compute("reesemcblox") // "{ red: 1, green: 162, blue: 255, describer: 'blue' }"
robloxNameColors.compute("reesemcblox", true, false) // "{ red: 13, green: 105, blue: 172, describer: 'blue' }"
robloxNameColors.compute("reesemcblox", false, false) // "0d69ac"

robloxNameColors.describedBy("old red") // "{ red: 196, green: 40, blue: 28, describer: 'red' }"
```

More detailed documentation is available on the [repository's GitHub wiki.](https://github.com/orcfoss/roblox-name-colors/wiki)

## License
roblox-name-colors is licensed under the MIT license. A copy of the license [has been included](https://github.com/orcfoss/roblox-name-colors/blob/trunk/LICENSE) with roblox-name-colors.