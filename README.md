# Hexdump.js

* [Homepage](https://github.com/mephux/hexdump.js)
* [Documentation](https://github.com/mephux/hexdump.js)

## Description

A javascript utility for pretty hexdump output.

## Examples

    <pre id="hexdump"></pre>

    <script type="text/javascript">
      var payload = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

      new Hexdump(payload, {
        container: 'hexdump'
        , width: 20
        , spacing: 0
        , hexNull: '00'
        , stringNull: '.'
        , left: '|'
        , right: '|'
      });
    </script

## Output

    41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41  |AAAAAAAAAAAAAAAAAAAA|
    41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41  |AAAAAAAAAAAAAAAAAAAA|
    41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 00  |AAAAAAAAAAAAAAAAAAA.|

## Install

	$ npm install hexdump

## Copyright

Copyright (c) 2011 Dustin Willis Webber

See LICENSE.txt for details.