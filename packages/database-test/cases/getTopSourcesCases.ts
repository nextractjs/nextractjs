import { TopSourceTestCase } from '.'

const GetTopSourcesCases: TopSourceTestCase[] = [
  {
    data: [
      {
        referrer: 'example.com',
        utmCampaign: 'campaign',
        utmMedium: 'medium',
        utmSource: 'source',
        userId: 'user1',
      },
    ],
    tests: [
      {
        name: 'Return top sources by referrer #1',
        sourceType: 'referrer',
        expected: [
          {
            name: 'example.com',
            userCount: 1,
            pageviewCount: 1,
          },
        ],
      },
      {
        name: 'Return top sources by utmCampaign #1',
        sourceType: 'utmCampaign',
        expected: [
          {
            name: 'campaign',
            userCount: 1,
            pageviewCount: 1,
          },
        ],
      },
      {
        name: 'Return top sources by utmSource #1',
        sourceType: 'utmSource',
        expected: [
          {
            name: 'source',
            userCount: 1,
            pageviewCount: 1,
          },
        ],
      },
      {
        name: 'Return top sources by utmMedium #1',
        sourceType: 'utmMedium',
        expected: [
          {
            name: 'medium',
            userCount: 1,
            pageviewCount: 1,
          },
        ],
      },
    ],
  },
  {
    data: [
      {
        userId: 'user1',
        referrer: 'example.com',
        utmCampaign: 'campaign',
        utmMedium: undefined,
        utmSource: undefined,
      },
      {
        userId: 'user1',
        referrer: 'example.com',
        utmCampaign: 'campaign',
        utmMedium: undefined,
        utmSource: undefined,
      },
    ],
    tests: [
      {
        name: 'Double visit is counted as one user and two pageviews',
        sourceType: 'referrer',
        expected: [
          {
            name: 'example.com',
            userCount: 1,
            pageviewCount: 2,
          },
        ],
      },
    ],
  },
  {
    data: [
      {
        userId: 'user1',
        referrer: 'example.com',
        utmCampaign: undefined,
        utmMedium: 'medium1',
        utmSource: 'source1',
      },
      {
        userId: 'user1',
        referrer: 'example.com',
        utmCampaign: undefined,
        utmMedium: 'medium2',
        utmSource: 'source1',
      },
      {
        userId: 'user2',
        referrer: 'example.com',
        utmCampaign: undefined,
        utmMedium: undefined,
        utmSource: undefined,
      },
    ],
    tests: [
      {
        name: 'Aggregation is only done on the same source',
        sourceType: 'utmSource',
        expected: [
          {
            name: 'source1',
            userCount: 1,
            pageviewCount: 2,
          },
        ],
      },
      {
        name: 'Aggregation is not done for different sources',
        sourceType: 'utmMedium',
        expected: [
          {
            name: 'medium1',
            userCount: 1,
            pageviewCount: 1,
          },
          {
            name: 'medium2',
            userCount: 1,
            pageviewCount: 1,
          },
        ],
      },
      {
        name: 'Undefined is not counted',
        sourceType: 'utmCampaign',
        expected: [],
      },
    ],
  },
]

export { GetTopSourcesCases }
