// Reference document: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
import { inRange } from 'lodash'

const startUpperKey = 'A'.charCodeAt()
const endUpperKey = 'Z'.charCodeAt()
const startLowerKey = 'a'.charCodeAt()
const endLowerKey = 'z'.charCodeAt()
const NUM_OF_CHARS = 26
const alphabetKeyValues = {}
const alphabetKeyCodes = {}
const upper2LowerKeyCodes = {}

for (let i = 0; i < NUM_OF_CHARS; i++) {
  const upperKeyCode = startUpperKey + i
  const upperChar = String.fromCharCode(upperKeyCode)
  const lowerKeyCode = startLowerKey + i
  const lowerChar = String.fromCharCode(lowerKeyCode)

  alphabetKeyValues[upperChar] = upperChar
  alphabetKeyCodes[upperKeyCode] = upperChar

  alphabetKeyValues[lowerChar] = lowerChar
  alphabetKeyCodes[lowerKeyCode] = lowerChar

  upper2LowerKeyCodes[upperKeyCode] = lowerKeyCode
}

const KEY_VALUES = {
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  TAB: 'Tab',
  SHIFT: 'Shift',
  SPACE: ' ',
  ALT: 'Alt',
  ESCAPE: 'Escape',
  ENTER: 'Enter',
  DELETE: 'Delete',
  BACKSPACE: 'Backspace',
  ...alphabetKeyValues
}
const KEY_CODES = {
  38: 'ArrowUp',
  40: 'ArrowDown',
  37: 'ArrowLeft',
  39: 'ArrowRight',
  9: 'Tab',
  16: 'Shift',
  32: ' ',
  18: 'Alt',
  27: 'Escape',
  13: 'Enter',
  46: 'Delete',
  8: 'Backspace',
  ...alphabetKeyCodes
}

function isCharacter(keycode) {
  return inRange(keycode, startLowerKey, endLowerKey) ||
          inRange(keycode, startUpperKey, endUpperKey)
}

function isCapslockEnable(event) {
  return event.getModifierState('CapsLock')
}

function convert(event) {
  const keycode = event.which
  if (!isCharacter(keycode)) return String.fromCharCode(keycode)
  let convertedKeycode = keycode
  if (!isCapslockEnable(event) && !event.shiftKey) convertedKeycode = upper2LowerKeyCodes[keycode]

  return KEY_CODES[convertedKeycode]
}

function getKey(event) {
  return event.key || convert(event)
}

export {
  getKey,
  KEY_VALUES
}
