#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const process = require('process');
const readline = require('readline');
const joi = require('@hapi/joi');
const meow = require('meow');
const randomNumber = require('random-number-csprng');

const cli = meow(
  `
    Usage
      $ diceware <length> (default: 5)

    Options
      --separator, -s Words separator (default: " ")
      --list, -l      Word list ("beale", "cs", "en"; default: "en")

    Examples
      $ diceware 4 -s "."
      bonsai.camper.frequent.power
      $ diceware --list cs --separator "@"
      1925@poprvé@přitom@upjatý@úporně@zázemí
`,
  {
    flags: {
      separator: {
        type: 'string',
        alias: 's',
      },
      list: {
        type: 'string',
        alias: 'l',
      },
    },
  },
);

const schemaInput = joi.number().integer().positive().min(1).default(6).label('Passphrase length');
const schemaFlags = joi.object({
  separator: joi.string().default(' ').label('Separator'),
  list: joi.string().equal('beale', 'cs', 'en').default('en').label('List'),
});

let passphraseLength, flags;

try {
  passphraseLength = joi.attempt(cli.input?.[0], schemaInput);
  flags = joi.attempt(cli.flags, schemaFlags);
} catch ({ message }) {
  console.error(message);
  process.exit(1);
}

const createRandomCode = length => async () => {
  const numbersPromise = [...Array(length)].map(() => randomNumber(1, 6));
  const number = await Promise.all(numbersPromise);

  return number.join('');
};
const codesPromises = [...Array(passphraseLength)].map(createRandomCode(5));

(async () => {
  const codes = await Promise.all(codesPromises);
  const listFilePath = path.resolve(__dirname, 'lists', `${flags.list}.txt`);
  const readStream = fs.createReadStream(listFilePath, 'utf8');
  const lineReader = readline.createInterface({ input: readStream });

  let diceware = [];

  lineReader
    .on('line', line => {
      if (diceware.length >= passphraseLength) {
        lineReader.close();
        return;
      }
      const [code, word] = line.split(/\s+/);
      if (codes.includes(code)) {
        diceware.push(word);
      }
    })
    .on('close', () => {
      console.log(diceware.join(flags.separator));
    })
    .on('error', error => {
      throw new Error(error);
    });
})();
