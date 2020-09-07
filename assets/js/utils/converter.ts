import { InputValue, MultiSelectValue } from '~/types'

/**
 * transform [1, 2, 3] => to '1,2,3'
 */
const arrayToString = (array: MultiSelectValue = []): string => {
  const string: string = JSON.stringify(array)
  const indexFirstBracketsOfArray: number = 1
  const indexLastBracketsOfArray: number = string.length - 2
  return string.substr(indexFirstBracketsOfArray, indexLastBracketsOfArray)
}

/**
 * transform '1,2,3' => to [1, 2, 3]
 * or '"1", "2", "3"' => ["1", "2", "3"]
 */
const stringToArray = (string: InputValue = ''): MultiSelectValue => {
  try {
    return JSON.parse(`[${string}]`)
  } catch (error) {
    console.error('unexpected value')
    return []
  }
}

/**
 * add 7 hours
 * transform '01/07/2020 13:00' => to '01/07/2020 20:00'
 */
const timeAddHours = (time: Date = new Date(), hours: number = 0): Date => {
  time.setHours(time.getHours() + hours)
  return time
}

export default {
  arrayToString,
  stringToArray,
  timeAddHours
}
