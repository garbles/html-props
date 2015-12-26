var test = require('tape');
var props = require('./index');

function generateRandomNumber () {
  return (Math.random() * 0x10000000)
}

function generateRandomString () {
  return generateRandomNumber().toString(36);
}

function falsyString (value) {
  switch (typeof value) {
    case 'undefined':
      return 'undefined';
    case 'false':
      return 'false';
    case 'string':
      return value.length ? value : '""';
  }
}

function createTests (setter) {
  return function (truthy, falsy) {
    var tString = truthy.toString();
    var fString = falsyString(falsy);

    return function (prop, key) {
      var el = document.createElement('div');
      var key = prop.computed;

      test(key, function (t) {
        t.plan(3);

        var value = el.getAttribute(key) || el[key];
        t.notOk(
          value,
          key + ' is not set truthy by default'
        );

        setter(el, key, truthy);
        var value = el.getAttribute(key) || el[key];
        t.ok(
          value === truthy || value === tString,
          key + ' is ' + tString + ' when set to ' + tString
        );

        setter(el, key, falsy);
        var value = el.getAttribute(key) || el[key];
        t.notOk(
          value === truthy || value === tString,
          key + ' is not ' + tString + ' when set to ' + fString
        );
      });
    }
  }
}

function attributeSetter (el, key, value) { el.setAttribute(key, value) }
function equalSetter (el, key, value) { el[key] = value }

var setBooleanWithFunctionTest = createTests(attributeSetter)(true, false);
var setNumberWithFunctionTest = createTests(attributeSetter)(generateRandomNumber(), undefined);
var setStringWithFunctionTest = createTests(attributeSetter)(generateRandomString(), '');
var setBooleanWithEqualsTest = createTests(equalSetter)(true, false);
var setNumberWithEqualsTest = createTests(equalSetter)(generateRandomNumber(), undefined);
var setStringWithEqualsTest = createTests(equalSetter)(generateRandomString(), '');

Object.keys(props).forEach(function (key) {
  var prop = props[key];

  if (key === 'style' || prop.isStar) {
    return; // ignore
  }

  switch (true) {
    case (prop.setWithFunction && prop.setWithEquals):
      throw key + ' can\'t have two setters!';
      break;
    case (prop.setWithEquals && prop.hasBooleanValue):
      setBooleanWithEqualsTest(prop);
      break;
    case (prop.setWithEquals && prop.hasNumberValue):
      setNumberWithEqualsTest(prop);
      break;
    case (prop.setWithEquals):
      setStringWithEqualsTest(prop);
      break;
    case (prop.setWithFunction && prop.hasBooleanValue):
      setBooleanWithFunctionTest(prop);
      break;
    case (prop.setWithFunction && prop.hasNumberValue):
      setNumberWithFunctionTest(prop);
      break;
    case (prop.setWithFunction):
      setStringWithFunctionTest(prop);
      break;
    default:
      throw key + ' does not have setter!';
  }
});
