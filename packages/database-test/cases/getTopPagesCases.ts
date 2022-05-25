import { TopPageTestCase } from '.'

const GetTopPagesCases: TopPageTestCase[] = [
  {
    data: [
      {
        pathname: '/',
        userId: 'user1',
      },
      {
        pathname: '/',
        userId: 'user1',
      },
      {
        pathname: '/a',
        userId: 'user1',
      },
      {
        pathname: '/',
        userId: 'user2',
      },
    ],
    test: {
      name: 'Return top pages #1',
      expected: [
        {
          path: '/',
          userCount: 2,
          pageviewCount: 3,
        },
        {
          path: '/a',
          userCount: 1,
          pageviewCount: 1,
        },
      ],
    },
  },
  {
    data: [
      {
        pathname: '/a',
        userId: 'user1',
      },
      {
        pathname: '/b',
        userId: 'user1',
      },
      {
        pathname: '/b',
        userId: 'user2',
      },
      {
        pathname: '/a',
        userId: 'user1',
      },
      {
        pathname: '/b',
        userId: 'user2',
      },
      {
        pathname: '/c',
        userId: 'user1',
      },
      {
        pathname: '/b',
        userId: 'user3',
      },
    ],
    test: {
      name: 'Return top pages #2',
      expected: [
        {
          path: '/b',
          userCount: 3,
          pageviewCount: 4,
        },
        {
          path: '/a',
          userCount: 1,
          pageviewCount: 2,
        },
        {
          path: '/c',
          userCount: 1,
          pageviewCount: 1,
        },
      ],
    },
  },
]

export { GetTopPagesCases }
