Data.Future
===========

[![Build Status](https://secure.travis-ci.org/bompi88/folktale-data-future.png?branch=master)](https://travis-ci.org/bompi88/folktale-data-future)

This package wraps the Folktale`s Npm-module [data.future][npm].

The `Future(a, b)` structure represents values that depend on time. This allows one
to model time-based effects explicitly, such that one can have full knowledge
of when they're dealing with delayed computations, latency, or anything that
can not be computed immediately.

A common use for this monad is to replace the usual
[Continuation-Passing Style][CPS] form of programming, in order to be able to
compose and sequence time-dependent effects using the generic and powerful
monadic operations.


## Example

```js
// read : String -> Future(Error, Buffer)
function read(path) {
  return new Future(function(reject, resolve) {
    fs.readFile(path, function(error, data) {
      if (error)  reject(error)
      else        resolve(data)
    })
  })
}

// decode : Future(Error, Buffer) -> Future(Error, String)
function decode(buffer) {
  return buffer.map(function(a) {
    return a.toString('utf-8')
  })
}

var intro = decode(read('intro.txt'))
var outro = decode(read('outro.txt'))

// You can use `.chain` to sequence two asynchronous actions, and
// `.map` to perform a synchronous computation with the eventual
// value of the Future.
var concatenated = intro.chain(function(a) {
                     return outro.map(function(b) {
                       return a + b
                     })
                   })

// But the implementation of Future is pure, which means that you'll
// never observe the effects by using `chain` or `map` or any other
// method. The Future just records the sequence of actions that you
// wish to observe, and defers the playing of that sequence of actions
// for your application's entry-point to call.
//
// To observe the effects, you have to call the `fork` method, which
// takes a callback for the rejection, and a callback for the success.
concatenated.fork(
  function(error) { throw error }
, function(data)  { console.log(data) }
)
```


## Installing

    $ mrt add folktale-data-future
  
## Documentation

You can [read the documentation online][docs] or build it yourself:

    $ git clone git://github.com/folktale/monads.maybe.git
    $ cd monads.maybe
    $ npm install
    $ make documentation

Then open the file `docs/index.html` in your browser.

## Licence

Copyright (c) 2013-2014 Quildreen Motta.

Released under the [MIT licence](https://github.com/folktale/data.future/blob/master/LICENCE).

<!-- links -->
[npm]; https://github.com/folktale/data.future
[docs]: http://folktale.github.io/data.future
[CPS]: http://matt.might.net/articles/by-example-continuation-passing-style/
