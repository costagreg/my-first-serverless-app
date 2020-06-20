import { isValidUrl, sanitiseUrl } from './urlHelpers'

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
      'www.test.gr',
    ]

    const invalidUrls = [
      'thisisnotanurl',
      'lllllll,,foufos.gddddddddr',
      ',,,,,,.',
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

  describe('sanitiseUrl', () => {
    const cases = [
      ['www.example.com', 'https://www.example.com'],
      ['example.com', 'https://example.com'],
      ['www.test.gr', 'https://www.test.gr'],
      ['http://www.test.gr', 'http://www.test.gr'],
      ['https://www.example.com', 'https://www.example.com'],
      ['ttt.com', 'https://ttt.com'],
    ]

    it.each(cases)('should return true for %p', (unsanitisedUrl, sanitisedUrl) => {
      const result = sanitiseUrl(unsanitisedUrl)

      expect(result).toEqual(sanitisedUrl)
    })

  })
})
