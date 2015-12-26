:tada: :tada: :tada: :tada: :tada: :tada: :tada: :tada:

## A bunch of descriptors for HTML element properties

:tada: :tada: :tada: :tada: :tada: :tada: :tada: :tada:

Originally extracted from [yolk.js](https://github.com/garbles/yolk).

##### setWithEquals

Set value using `=`. e.g. `el.href = 'http://goodbits.io'`

##### setWithFunction

Set value using `setAttribute`. e.g. `el.setAttribute('cols', 5)`

##### hasBooleanValue

Value is always a boolean.

##### hasNumberValue

Value is always a number.

##### isStar

Custom attribute who's prefix is the key. e.g. `data-target` or `aria-language`

##### computed

The HTML5 valid version of the name. Many keys are different than their valid names because they read better. e.g. `maxLength` has a computed value of `maxlength`
