# A simple diceware generator

Loads CZ or EN diceware phrases file to generate pseudorandom passphrase in NodeJS.

## Usage

Execute main JS file in terminal:

```bash
node diceware.js {LENGTH} {LANG} {SEPARATOR}
```

* `{LENGTH}` - number indicating length of the passhprase (number of phrases)
* `{LANG}` - string locale of the phrases source file ("cz" or "en")
* `{SEPARATOR}` - string indicating separator between individual phrases in the resulting passphrase

### Example

#### Input

```bash
node diceware.js 8 en "-"
```

#### Output

```bash
You threw dice codes: 64145, 26562, 45462, 46334, 46455, 13655, 63632, 65241
Your passphrase is: botch-fiber-promotion-raft-reappear-unfazed-unimpeded-uproar
Time: 0 s, 21.912494 ms
```