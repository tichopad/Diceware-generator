const fs = require('fs')
const rl = require('readline')

// Get command line parameters
let LENGTH = parseInt(process.argv[2]) || 6
let LANG = process.argv[3] || 'cz'
let SEP = process.argv[4] || ' '

if (!['cz', 'en'].includes(LANG)) LANG = 'cz'
if (typeof SEP !== 'string') SEP = ' ' 

// Start performance measure
const start = process.hrtime();

// Get random int in range
const rnd = (min, max) => {
    return Math.floor(Math.random() * (max + 1 - min) + min)
}

// Get string of 5 random ints in range 1-6
const getCode = () => {
    let code = '';
    for (let i = 0; i < 5; i++) {
        code += rnd(1, 6)
    }

    return code;
}

// Get array of length filled with strings of 5 random ints in range 1-6
const getCodes = (length) => {
    return Array
        .from(Array(length))
        .map(getCode)
}

// Open words file read stream
const readStream = fs.createReadStream(`${__dirname}/${LANG}.txt`, 'utf8')
const lineReader = rl.createInterface({ input: readStream })

// Get codes array and prepare final diceware words array
const codes = getCodes(LENGTH)
let diceware = []

lineReader
    .on('line', (line) => {
        let data = line.split(/\s+/)
        let code = data[0]
        let word = data[1]
        // If code from file line is in codes array, push the corresponding word into diceware
        if (codes.includes(code)) diceware.push(word)
    })
    .on('close', () => {
        // Print thrown codes and diceword with separator
        console.log(`You threw dice codes: ${codes.join(', ')}`)
        console.log(`Your passphrase is: ${diceware.join(SEP)}`)

        // Measure final time
        const time = process.hrtime(start)
        console.log(`Time: ${time[0]} s, ${time[1] / 1e6} ms`) 
    })
    .on('error', (err) => {
        console.error(err)
    })

