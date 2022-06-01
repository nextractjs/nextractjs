import createPageviewFromRequest from '../../../src/api/lib/createPageviewFromRequest'
import createRequestMock from './helpers/createRequestMock'

test('Request data should be converted to a pageview item successfully', () => {
  const req = createRequestMock({
    body: {
      u: 'https://www.example.com/test-path?utm_source=test-source&utm_medium=test-medium&utm_campaign=test-campaign',
      r: 'https://soenkep.com/',
    },
  })

  const pageview = createPageviewFromRequest(req)

  const properties: { name: string; value: any }[] = [
    { name: 'referrer', value: 'https://soenkep.com/' },
    { name: 'utmCampaign', value: 'test-campaign' },
    { name: 'utmSource', value: 'test-source' },
    { name: 'utmMedium', value: 'test-medium' },
  ]

  for (const property of properties) {
    expect(pageview).toHaveProperty(property.name, property.value)
  }
})
