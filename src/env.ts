import has from 'lodash.has'
import trim from 'lodash.trim'
import dotenv from 'dotenv'

type EnvFunc = <T = unknown>(key: string, defaultValue?: T) => T

const envPath = process.env.ENV_PATH || 'local.env'
dotenv.config({ path: envPath })

export type StringOrUndefined<T extends undefined | string> = T extends string
  ? string
  : undefined
export type NumberOrUndefined<T extends undefined | number> = T extends number
  ? number
  : undefined
export type BooleanOrUndefined<
  T extends undefined | boolean
> = T extends boolean ? boolean : undefined
export type DateOrUndefined<T extends undefined | Date> = T extends Date
  ? Date
  : undefined
export type ArrayOfStringOrUndefined<
  T extends undefined | string[]
> = T extends string[] ? string[] : undefined

const utils = {
  /**
   * Get string from environment
   *
   * @param key string
   * @param defaultValue string
   * @returns string
   */
  string<R extends undefined | string>(key: string, defaultValue?: R) {
    const rtnValue = has(process.env, key) ? process.env[key] : defaultValue
    return rtnValue as StringOrUndefined<R>
  },

  /**
   * Get integer from environment
   *
   * @param key string
   * @param defaultValue integer number
   * @returns integer number
   */
  int<R extends undefined | number>(key: string, defaultValue?: R) {
    if (!has(process.env, key)) {
      return defaultValue
    }

    const value = process.env[key] || ''
    return parseInt(value, 10) as NumberOrUndefined<R>
  },

  /**
   * Get float from environment
   *
   * @param key string
   * @param defaultValue float number
   * @returns float number
   */
  float<R extends undefined | number>(key: string, defaultValue?: R) {
    if (!has(process.env, key)) {
      return defaultValue
    }

    const value = process.env[key] || ''
    return parseFloat(value) as NumberOrUndefined<R>
  },

  /**
   * Get boolean from environment
   *
   * @param key string
   * @param defaultValue boolean
   * @returns boolean
   */
  bool<R extends undefined | boolean>(key: string, defaultValue?: R) {
    if (!has(process.env, key)) {
      return defaultValue
    }

    const value = process.env[key]
    return (value === 'true') as BooleanOrUndefined<R>
  },

  /**
   * Get JSON object from environment
   *
   * @param key string
   * @param defaultValue string
   * @returns object
   */
  json<T = unknown>(key: string, defaultValue?: T) {
    if (!has(process.env, key)) {
      return defaultValue as T
    }

    const value = process.env[key] || ''
    try {
      return JSON.parse(value) as T
    } catch (error) {
      throw new Error(
        `Invalid json environment variable ${key}: ${(error as Error).message}`
      )
    }
  },

  /**
   * Get string array from environment
   *
   * @param key string
   * @param defaultValue string[]
   * @returns string[]
   */
  array<R extends undefined | string[]>(key: string, defaultValue?: R) {
    if (!has(process.env, key)) {
      return defaultValue as ArrayOfStringOrUndefined<R>
    }

    let value = process.env[key] || ''

    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.substring(1, value.length - 1)
    }

    return value
      .split(',')
      .map((v) => trim(trim(v, ' '), '"')) as ArrayOfStringOrUndefined<R>
  },

  /**
   * Get Date object from environment
   *
   * @param key string
   * @param defaultValue Date
   * @returns Date
   */
  date<R extends undefined | Date>(key: string, defaultValue?: R) {
    if (!has(process.env, key)) {
      return defaultValue
    }

    const value = process.env[key] || ''
    return new Date(value) as DateOrUndefined<R>
  },
}

/**
 * Get data from environment
 *
 * @param key string
 * @param defaultValue <T = any>
 * @returns T
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function env(key: string, defaultValue?: any) {
  return has(process.env, key) ? process.env[key] : defaultValue
}

export default Object.assign<EnvFunc, typeof utils>(env, utils)
