# @jacobbubu/pull-randomly-split

[![Build Status](https://travis-ci.org/jacobbubu/pull-randomly-split.svg)](https://travis-ci.org/jacobbubu/pull-randomly-split)
[![Coverage Status](https://coveralls.io/repos/github/jacobbubu/pull-randomly-split/badge.svg)](https://coveralls.io/github/jacobbubu/pull-randomly-split)
[![npm](https://img.shields.io/npm/v/@jacobbubu/pull-randomly-split.svg)](https://www.npmjs.com/package/@jacobbubu/pull-randomly-split/)

> Rewritten [pull-randomly-split](https://github.com/dominictarr/pull-randomly-split) in TypeScript

# pull-randomly-split

randomly split incoming buffers, to test that parsing works correctly.

``` ts
import randomSplit from '@jacobbubu/pull-randomly-split'
pull(
  pull.values(crypto.randomBytes(1024*1024)),
  randomSplit(1024, 2096),
  pull.collect(function () {
    //...
  })
)
```

Please see test-cases for the usage.

## License

MIT
