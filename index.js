var USES_LOWER_CASE = 0x1; // transform key to all lowercase
var USES_DASHED_CASE = 0x2; // transform key to dashed case
var SET_WITH_EQUALS = 0x4; // attributes only settable with =
var SET_WITH_FUNCTION = 0x8; // attributes only settable with setAttribute
var HAS_BOOLEAN_VALUE = 0x10; // attributes can only be booleans
var HAS_NUMBER_VALUE = 0x20; // attributes can only be numbers
var IS_STAR = 0x40; // attributes can be any dashed case, e.g. data-*

var DASHED_CASE_REGEX = /(?:^\w|[A-Z]|\b\w|\s+)/g;

function checkMask (value, bitmask) {
  return (value & bitmask) === bitmask;
}

function makeDashedCase (name) {
  return name.replace(DASHED_CASE_REGEX, function (letter, i) {
    if (+letter === 0) {
      return ''
    }

    if (i === 0) {
      return letter.toLowerCase()
    }

    return `-` + letter.toLowerCase()
  })
}

function computeName (name, usesLowerCase, usesDashedCase) {
  if (usesLowerCase) {
    return name.toLowerCase()
  } else if (usesDashedCase) {
    return makeDashedCase(name)
  } else {
    return name
  }
}

var attributes = {
  accept: SET_WITH_EQUALS,
  acceptCharset: SET_WITH_EQUALS | USES_DASHED_CASE,
  accessKey: SET_WITH_EQUALS | USES_LOWER_CASE,
  action: SET_WITH_EQUALS,
  align: SET_WITH_EQUALS,
  alt: SET_WITH_EQUALS,
  async: SET_WITH_EQUALS | HAS_BOOLEAN_VALUE,
  autoComplete: SET_WITH_EQUALS | USES_LOWER_CASE,
  autoFocus: SET_WITH_EQUALS | USES_LOWER_CASE | HAS_BOOLEAN_VALUE,
  autoPlay: SET_WITH_EQUALS | USES_LOWER_CASE | HAS_BOOLEAN_VALUE,
  autoSave: SET_WITH_EQUALS | USES_LOWER_CASE,
  bgColor: SET_WITH_EQUALS | USES_LOWER_CASE,
  border: SET_WITH_EQUALS,
  checked: SET_WITH_EQUALS | HAS_BOOLEAN_VALUE,
  cite: SET_WITH_EQUALS,
  className: SET_WITH_EQUALS,
  color: SET_WITH_EQUALS,
  colSpan: SET_WITH_EQUALS | USES_LOWER_CASE,
  content: SET_WITH_EQUALS,
  contentEditable: SET_WITH_EQUALS | USES_LOWER_CASE | HAS_BOOLEAN_VALUE,
  controls: SET_WITH_EQUALS | HAS_BOOLEAN_VALUE,
  coords: SET_WITH_EQUALS,
  default: SET_WITH_EQUALS | HAS_BOOLEAN_VALUE,
  defer: SET_WITH_EQUALS | HAS_BOOLEAN_VALUE,
  dir: SET_WITH_EQUALS,
  dirName: SET_WITH_EQUALS | USES_LOWER_CASE,
  disabled: SET_WITH_EQUALS | HAS_BOOLEAN_VALUE,
  draggable: SET_WITH_EQUALS | HAS_BOOLEAN_VALUE,
  dropZone: SET_WITH_EQUALS | USES_LOWER_CASE,
  encType: SET_WITH_EQUALS | USES_LOWER_CASE,
  for: SET_WITH_EQUALS,
  headers: SET_WITH_EQUALS,
  height: SET_WITH_EQUALS,
  href: SET_WITH_EQUALS,
  hrefLang: SET_WITH_EQUALS | USES_LOWER_CASE,
  httpEquiv: SET_WITH_EQUALS | USES_DASHED_CASE,
  icon: SET_WITH_EQUALS,
  id: SET_WITH_EQUALS,
  isMap: SET_WITH_EQUALS | USES_LOWER_CASE | HAS_BOOLEAN_VALUE,
  itemProp: SET_WITH_EQUALS | USES_LOWER_CASE,
  keyType: SET_WITH_EQUALS | USES_LOWER_CASE,
  kind: SET_WITH_EQUALS,
  label: SET_WITH_EQUALS,
  lang: SET_WITH_EQUALS,
  loop: SET_WITH_EQUALS | HAS_BOOLEAN_VALUE,
  max: SET_WITH_EQUALS,
  method: SET_WITH_EQUALS,
  min: SET_WITH_EQUALS,
  multiple: SET_WITH_EQUALS | HAS_BOOLEAN_VALUE,
  name: SET_WITH_EQUALS,
  noValidate: SET_WITH_EQUALS | USES_LOWER_CASE | HAS_BOOLEAN_VALUE,
  open: SET_WITH_EQUALS | HAS_BOOLEAN_VALUE,
  optimum: SET_WITH_EQUALS,
  pattern: SET_WITH_EQUALS,
  ping: SET_WITH_EQUALS,
  placeholder: SET_WITH_EQUALS,
  poster: SET_WITH_EQUALS,
  preload: SET_WITH_EQUALS,
  radioGroup: SET_WITH_EQUALS | USES_LOWER_CASE,
  readOnly: SET_WITH_EQUALS | USES_LOWER_CASE | HAS_BOOLEAN_VALUE,
  rel: SET_WITH_EQUALS,
  required: SET_WITH_EQUALS | HAS_BOOLEAN_VALUE,
  reversed: SET_WITH_EQUALS | HAS_BOOLEAN_VALUE,
  role: SET_WITH_EQUALS,
  rowSpan: SET_WITH_EQUALS | USES_LOWER_CASE | HAS_NUMBER_VALUE,
  sandbox: SET_WITH_EQUALS,
  scope: SET_WITH_EQUALS,
  seamless: SET_WITH_EQUALS | HAS_BOOLEAN_VALUE,
  selected: SET_WITH_EQUALS | HAS_BOOLEAN_VALUE,
  span: SET_WITH_EQUALS | HAS_NUMBER_VALUE,
  src: SET_WITH_EQUALS,
  srcDoc: SET_WITH_EQUALS | USES_LOWER_CASE,
  srcLang: SET_WITH_EQUALS | USES_LOWER_CASE,
  start: SET_WITH_EQUALS | HAS_NUMBER_VALUE,
  step: SET_WITH_EQUALS,
  summary: SET_WITH_EQUALS,
  tabIndex: SET_WITH_EQUALS | USES_LOWER_CASE,
  target: SET_WITH_EQUALS,
  title: SET_WITH_EQUALS,
  type: SET_WITH_EQUALS,
  useMap: SET_WITH_EQUALS | USES_LOWER_CASE,
  value: SET_WITH_EQUALS,
  width: SET_WITH_EQUALS,
  wrap: SET_WITH_EQUALS,

  allowFullScreen: SET_WITH_FUNCTION | USES_LOWER_CASE | HAS_BOOLEAN_VALUE,
  allowTransparency: SET_WITH_FUNCTION | USES_LOWER_CASE,
  capture: SET_WITH_FUNCTION | HAS_BOOLEAN_VALUE,
  charset: SET_WITH_FUNCTION,
  challenge: SET_WITH_FUNCTION,
  codeBase: SET_WITH_FUNCTION | USES_LOWER_CASE,
  cols: SET_WITH_FUNCTION | HAS_NUMBER_VALUE,
  contextMenu: SET_WITH_FUNCTION | USES_LOWER_CASE,
  dateTime: SET_WITH_FUNCTION | USES_LOWER_CASE,
  form: SET_WITH_FUNCTION,
  formAction: SET_WITH_FUNCTION | USES_LOWER_CASE,
  formEncType: SET_WITH_FUNCTION | USES_LOWER_CASE,
  formMethod: SET_WITH_FUNCTION | USES_LOWER_CASE,
  formTarget: SET_WITH_FUNCTION | USES_LOWER_CASE,
  frameBorder: SET_WITH_FUNCTION | USES_LOWER_CASE,
  hidden: SET_WITH_FUNCTION | HAS_BOOLEAN_VALUE,
  inputMode: SET_WITH_FUNCTION | USES_LOWER_CASE,
  is: SET_WITH_FUNCTION,
  list: SET_WITH_FUNCTION,
  manifest: SET_WITH_FUNCTION,
  maxLength: SET_WITH_FUNCTION | USES_LOWER_CASE,
  media: SET_WITH_FUNCTION,
  minLength: SET_WITH_FUNCTION | USES_LOWER_CASE,
  rows: SET_WITH_FUNCTION | HAS_NUMBER_VALUE,
  size: SET_WITH_FUNCTION | HAS_NUMBER_VALUE,
  sizes: SET_WITH_FUNCTION,
  srcSet: SET_WITH_FUNCTION | USES_LOWER_CASE,
  style: SET_WITH_FUNCTION,

  aria: IS_STAR,
  data: IS_STAR
};

module.exports = Object.keys(attributes).reduce(function (acc, key) {
  var attribute = attributes[key];
  var usesLowerCase = checkMask(attribute, USES_LOWER_CASE);
  var usesDashedCase = checkMask(attribute, USES_DASHED_CASE);
  var setWithEquals = checkMask(attribute, SET_WITH_EQUALS);
  var setWithFunction = checkMask(attribute, SET_WITH_FUNCTION);
  var hasBooleanValue = checkMask(attribute, HAS_BOOLEAN_VALUE);
  var hasNumberValue = checkMask(attribute, HAS_NUMBER_VALUE);
  var isStar = checkMask(attribute, IS_STAR);
  var computed = computeName(key, usesLowerCase, usesDashedCase);

  acc[key] = {
    setWithEquals: setWithEquals,
    setWithFunction: setWithFunction,
    hasBooleanValue: hasBooleanValue,
    hasNumberValue: hasNumberValue,
    isStar: isStar,
    computed: computed
  };

  return acc;
}, {});
