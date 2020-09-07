import converter from '~/assets/js/utils/converter'

describe('utils converter.ts', () => {
  describe('arrayToString: transform array to string', () => {
    it('check an array of numbers', () => {
      const array: number[] = [1, 2, 3]
      expect(converter.arrayToString(array)).toBe('1,2,3')
    })

    it('check an array of strings', () => {
      const array: string[] = ['1', '2', '3']
      expect(converter.arrayToString(array)).toBe('"1","2","3"')
    })

    it('check an empty array', () => {
      const array: any[] = []
      expect(converter.arrayToString(array)).toBe('')
    })

    it('check an default value', () => {
      expect(converter.arrayToString()).toBe('')
    })

    it('check don\'t array', () => {
      const value: any = ''
      expect(converter.arrayToString(value)).toBe('')
    })
  })

  describe('stringToArray: transform string to array', () => {
    it('check an string with numbers', () => {
      const str: string = '1,2,3'
      expect(converter.stringToArray(str)).toStrictEqual([1, 2, 3])
    })

    it('check an string with string of numbers', () => {
      const str: string = '"1","2","3"'
      expect(converter.stringToArray(str)).toStrictEqual(['1', '2', '3'])
    })

    it('check an default value', () => {
      expect(converter.stringToArray()).toStrictEqual([])
    })

    it('check an number', () => {
      const value: any = 123
      expect(converter.stringToArray(value)).toStrictEqual([123])
    })

    it('check error handler ', () => {
      console.error = jest.fn()
      const value: any = new Error()
      expect(converter.stringToArray(value)).toStrictEqual([])
    })
  })

  describe('timeAddHours: added some hours for time', () => {
    it('without hours value', () => {
      const time: Date = new Date()
      expect(converter.timeAddHours(time)).toBe(time)
    })

    it('check add hours', () => {
      const time: string = 'Mon Aug 03 2020 17:44:13 GMT+0300'
      const timeResponse: string = 'Mon Aug 03 2020 20:44:13 GMT+0300'
      const hours: number = 3
      expect(converter.timeAddHours(new Date(time), hours)).toEqual(new Date(timeResponse))
    })

    it('without value', () => {
      const DATE_TO_USE = new Date('2020')
      // @ts-ignore
      global.Date = jest.fn(() => DATE_TO_USE)
      expect(converter.timeAddHours()).toEqual(DATE_TO_USE)
    })
  })
})
