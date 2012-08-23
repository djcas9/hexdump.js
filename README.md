[![build status](https://secure.travis-ci.org/mephux/hexdump.js.png)](http://travis-ci.org/mephux/hexdump.js)
# Hexdump.js

* [Homepage](https://github.com/mephux/hexdump.js)
* [Documentation](https://github.com/mephux/hexdump.js)

## Description

A javascript utility for fast and simple hexdumping. Hexdump.js is very customizable
with format options like width and byte grouping. Check out the documentation for
more information.

## Live Example

* [http://mephux.github.com/hexdump.js/](http://mephux.github.com/hexdump.js/)

## Example

``` html
<!DOCTYPE HTML>
<html lang="en-EN">
  <head>
    <meta charset="UTF-8">
    <title>Hexdump.js</title>
    <script type="text/javascript" src="hexdump.js"></script>
  </head>
  
  <body>
    <pre id="hexdump"></pre>
    
    <script type="text/javascript">
      var payload = '䉁䅃䍂䉁䅃䍂䉁䅃䉁䅃䍂䉁䅃䍂䉁䅃䉁䅃䍂䉁䅃䍂䍂䉁䅃䍂䉁䅃';

      new Hexdump(payload, {
        container: 'hexdump'
        , base: 'hex'
        , width: 7
        , ascii: false,
        , byteGrouping: 0
        , html: false
        , lineNumber: true
        , style: {
            lineNumberLeft: ''
          , lineNumberRight: ':'
          , stringLeft: '|'
          , stringRight: '|'
          , hexLeft: ''
          , hexRight: ''
          , hexNull: '.g'
          , stringNull: '.'
        }
      });
    </script>
  </body>
</html>
```

## Output

    00000000: 4241 4143 4342 4241 4143 4342 4241 |䉁䅃䍂䉁䅃䍂䉁|
    00000007: 4143 4241 4143 4342 4241 4143 4342 |䅃䉁䅃䍂䉁䅃䍂|
    00000014: 4241 4143 4241 4143 4342 4241 4143 |䉁䅃䉁䅃䍂䉁䅃|
    00000021: 4342 4342 4241 4143 4342 4241 4143 |䍂䍂䉁䅃䍂䉁䅃|

## Install

	$ npm install hexdump

## Copyright

Copyright (c) 2011 Dustin Willis Webber

See LICENSE.txt for details.
