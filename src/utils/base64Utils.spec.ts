import { encodeBase64, decodeBase64 } from './base64Utils'

describe('Base64 encoding/decoding', () => {
  const dataSet = [
    {
      id: 1,
      encoded: 'eyJrZXkxIjoidmFsdWUxIiwia2V5MiI6InZhbHVlMiJ9',
      payload: {
        key1: 'value1',
        key2: 'value2',
      },
    },
    {
      id: 2,
      encoded: 'eyJrZXkxIjoiYXNkYXNkIiwia2V5MiI6MjEyMzEyMzIzMn0=',
      payload: {
        key1: 'asdasd',
        key2: 2123123232,
      },
    },
    {
      id: 3,
      encoded: 'e30=',
      payload: {},
    },
  ]

  it.each(dataSet)('should decode payload', (payloadDefinition) => {
    const decoded = decodeBase64(payloadDefinition.encoded)
    expect(decoded).toEqual(payloadDefinition.payload)
  })

  it.each(dataSet)('should encode payload', (payloadDefinition) => {
    const encoded = encodeBase64(payloadDefinition.payload)
    expect(encoded).toEqual(payloadDefinition.encoded)
  })
})

describe('Decoding fail', () => {
  it('should return undefined, if decoding failed', () => {
    const decoded = decodeBase64('someString')
    expect(decoded).toBeUndefined()
  })
})
