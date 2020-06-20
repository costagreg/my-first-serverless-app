import { isValidUrl } from './urlHelpers'

describe('urlHelpers', () => {
  describe('isValidUrl', () => {
    const validUrls = [
      'www.example.com',
      'http://www.example.com',
      'http://www.example.com/path/to',
      'http://www.example.com/path/to.html',
      'https://www.example.com/path/to.html',
      'https://www.example.com/path/to.php',
      'example.com',
      'www.test.gr'
    ]

    const invalidUrls = [
      'thisisnotanurl',
      'lllllll,,foufos.gddddddddr',
      ',,,,,,.'
    ]

    it.each(validUrls)('should return true for %p', (url) => {
      const result = isValidUrl(url)

      expect(result).toEqual(true)
    })

    it.each(invalidUrls)('should return false for %p', (url) => {
      const result = isValidUrl(url)

      expect(result).toEqual(false)
    })
  })
})
