import createEventBaseFromRequest from '../../../src/api/lib/createEventBaseFromRequest'
import createRequestMock from './helpers/createRequestMock'

test('Request data should be converted to an event base successfully', () => {
  const req = createRequestMock({
    body: {
      u: 'https://www.example.com/test-path',
      r: null,
    },
    headers: {
      forwarded: '0.0.0.0',
    },
    path: 'pageview',
  })

  const eventBase = createEventBaseFromRequest(req)

  const properties: { name: string; value?: any }[] = [
    { name: 'id' },
    { name: 'name', value: 'pageview' },
    { name: 'timestamp' },
    { name: 'hostname', value: 'www.example.com' },
    { name: 'pathname', value: '/test-path' },
    { name: 'userId' },
    { name: 'isPageview', value: false },
  ]

  for (const property of properties) {
    if (property.value) {
      expect(eventBase).toHaveProperty(property.name, property.value)
    } else {
      expect(eventBase).toHaveProperty(property.name)
    }
  }
})

test('Event base should fail to be created when request is invalid', () => {
  const req = createRequestMock()

  expect(() => createEventBaseFromRequest(req)).toThrowError('Missing required query param: u.')
})
