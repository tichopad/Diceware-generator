# Diceware passphrase generator

Generates [diceware](http://world.std.com/~reinhold/diceware.html) passphrase from local word list.

## Usage

Run main JS file:

```bash
node index.js {LENGTH} --list {LIST} --separator {SEPARATOR}
```

* `{LENGTH}` - number of words in a passphrase (default "6")
* `{LIST}` - source word list: "en", "beale" or "cs" (default "en")
* `{SEPARATOR}` - string separating words in a passphrase

For help run:
```bash
node index.js --help
```

### Example

#### Input

```bash
node index.js 8 -s "-"
```

#### Output

```bash
botch-fiber-promotion-raft-reappear-unfazed-unimpeded-uproar
```