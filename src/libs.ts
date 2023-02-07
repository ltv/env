const hasOwnProperty = Object.prototype.hasOwnProperty

/** Used to compose unicode character classes. */
const rsAstralRange = '\\ud800-\\udfff'
const rsComboMarksRange = '\\u0300-\\u036f'
const reComboHalfMarksRange = '\\ufe20-\\ufe2f'
const rsComboSymbolsRange = '\\u20d0-\\u20ff'
const rsComboMarksExtendedRange = '\\u1ab0-\\u1aff'
const rsComboMarksSupplementRange = '\\u1dc0-\\u1dff'
const rsComboRange =
  rsComboMarksRange +
  reComboHalfMarksRange +
  rsComboSymbolsRange +
  rsComboMarksExtendedRange +
  rsComboMarksSupplementRange
const rsVarRange = '\\ufe0e\\ufe0f'

/** Used to compose unicode capture groups. */
const rsZWJ = '\\u200d'

/** Used to compose unicode capture groups. */
const rsAstral = `[${rsAstralRange}]`
const rsCombo = `[${rsComboRange}]`
const rsFitz = '\\ud83c[\\udffb-\\udfff]'
const rsModifier = `(?:${rsCombo}|${rsFitz})`
const rsNonAstral = `[^${rsAstralRange}]`
const rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}'
const rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]'

/** Used to compose unicode regexes. */
const reOptMod = `${rsModifier}?`
const rsOptVar = `[${rsVarRange}]?`
const rsOptJoin = `(?:${rsZWJ}(?:${[rsNonAstral, rsRegional, rsSurrPair].join(
  '|'
)})${rsOptVar + reOptMod})*`
const rsSeq = rsOptVar + reOptMod + rsOptJoin
const rsNonAstralCombo = `${rsNonAstral}${rsCombo}?`
const rsSymbol = `(?:${[
  rsNonAstralCombo,
  rsCombo,
  rsRegional,
  rsSurrPair,
  rsAstral,
].join('|')})`

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
// eslint-disable-next-line no-misleading-character-class
const reHasUnicode = RegExp(
  `[${rsZWJ + rsAstralRange + rsComboRange + rsVarRange}]`
)

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
const reUnicode = RegExp(`${rsFitz}(?=${rsFitz})|${rsSymbol + rsSeq}`, 'g')

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(string: string) {
  return reHasUnicode.test(string)
}

function stringToArray(str: string) {
  return hasUnicode(str) ? str.match(reUnicode) || [] : str.split('')
}

/**
 * Checks if `key` is a direct property of `object`.
 *
 * @param {Object} object The object to query.
 * @param {string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 * @example
 *
 * const object = { 'a': { 'b': 2 } }
 * const other = create({ 'a': create({ 'b': 2 }) })
 *
 * has(object, 'a')
 * // => true
 *
 * has(other, 'a')
 * // => false
 */
export function has<T>(object: T, key: PropertyKey): boolean {
  return object != null && hasOwnProperty.call(object, key)
}

/**
 * Removes leading and trailing whitespace or specified characters from `string`.
 *
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @returns {string} Returns the trimmed string.
 * @example
 *
 * trim('  abc  ')
 * // => 'abc'
 *
 * trim('-_-abc-_-', '_-')
 * // => 'abc'
 */
export function trim(str: string, chars?: string) {
  if (str && chars === undefined) {
    return str.trim()
  }
  if (!str || !chars) {
    return str || ''
  }
  const strSymbols = stringToArray(str)
  const chrSymbols = stringToArray(chars)

  let start = 0
  let end = strSymbols.length - 1
  while (chrSymbols.includes(str[start])) {
    start++
  }
  while (chrSymbols.includes(str[end])) {
    end--
  }
  return strSymbols.slice(start, end + 1).join('')
}
