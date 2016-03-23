const fs = require('fs')
const path = require('path')

console.log(fs.readFileSync(path.join(__dirname, '../src/markdown/profile.md'), 'utf-8').trim().split('\n').slice(1, -1).join('\n'))
