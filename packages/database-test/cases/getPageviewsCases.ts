import { PointInTime } from 'nextract/api/database'
import { TimeGraphTestCase } from '.'

const GetPageviewsCases: TimeGraphTestCase[] = [
  {
    dates: [
      '2022-10-16T00:00:00.000Z',
      '2022-01-01T00:00:00.000Z',
      '2022-12-31T00:00:00.000Z',
      '2023-01-01T00:00:00.000Z',
      '2021-12-31T23:59:59.999Z',
    ],
    groupBy: PointInTime.YEAR,
    tests: [
      {
        name: 'Return (unique) pageviews in 2022 only',
        startTime: new Date('2022-01-01T00:00:00.000Z').getTime(),
        endTime: new Date('2022-12-31T23:59:59.999Z').getTime(),
        expected: {
          total: 3,
          graph: {
            [new Date('2022-01-01T00:00:00.000Z').getTime()]: 3,
          },
        },
      },
      {
        name: 'Return (unique) pageviews in 2021, 2022 and 2023',
        startTime: new Date('2021-01-01T00:00:00.000Z').getTime(),
        endTime: new Date('2023-12-31T23:59:59.999Z').getTime(),
        expected: {
          total: 5,
          graph: {
            [new Date('2021-01-01T00:00:00.000Z').getTime()]: 1,
            [new Date('2022-01-01T00:00:00.000Z').getTime()]: 3,
            [new Date('2023-01-01T00:00:00.000Z').getTime()]: 1,
          },
        },
      },
    ],
  },
  {
    dates: [
      '2022-04-16T00:00:00.000Z',
      '2022-04-01T00:00:00.000Z',
      '2022-04-30T00:00:00.000Z',
      '2022-05-01T00:00:00.000Z',
      '2021-04-30T23:59:59.999Z',
    ],
    groupBy: PointInTime.MONTH,
    tests: [
      {
        name: 'Return (unique) pageviews in Apr 22 only',
        startTime: new Date('2022-04-01T00:00:00.000Z').getTime(),
        endTime: new Date('2022-04-30T23:59:59.999Z').getTime(),
        expected: {
          total: 3,
          graph: {
            [new Date('2022-04-01T00:00:00.000Z').getTime()]: 3,
          },
        },
      },
      {
        name: 'Return (unique) pageviews in Apr 22, May 22 and Apr 21',
        startTime: new Date('2021-04-01T00:00:00.000Z').getTime(),
        endTime: new Date('2022-05-31T23:59:59.999Z').getTime(),
        expected: {
          total: 5,
          graph: {
            [new Date('2021-04-01T00:00:00.000Z').getTime()]: 1,
            [new Date('2022-04-01T00:00:00.000Z').getTime()]: 3,
            [new Date('2022-05-01T00:00:00.000Z').getTime()]: 1,
          },
        },
      },
    ],
  },
  {
    dates: [
      '2022-04-16T00:00:00.000Z',
      '2022-04-16T14:34:00.000Z',
      '2022-04-15T23:59:59.999Z',
      '2022-05-16T00:00:00.000Z',
      '2022-03-15T23:59:59.999Z',
    ],
    groupBy: PointInTime.DAY,
    tests: [
      {
        name: 'Return (unique) pageviews on Apr 16 only',
        startTime: new Date('2022-04-16T00:00:00.000Z').getTime(),
        endTime: new Date('2022-04-16T23:59:59.999Z').getTime(),
        expected: {
          total: 2,
          graph: {
            [new Date('2022-04-16T00:00:00.000Z').getTime()]: 2,
          },
        },
      },
      {
        name: 'Return (unique) pageviews on Apr 16, Apr 15, May 16 and Mar 15',
        startTime: new Date('2022-03-01T00:00:00.000Z').getTime(),
        endTime: new Date('2022-05-31T23:59:59.999Z').getTime(),
        expected: {
          total: 5,
          graph: {
            [new Date('2022-03-15T00:00:00.000Z').getTime()]: 1,
            [new Date('2022-04-15T00:00:00.000Z').getTime()]: 1,
            [new Date('2022-04-16T00:00:00.000Z').getTime()]: 2,
            [new Date('2022-05-16T00:00:00.000Z').getTime()]: 1,
          },
        },
      },
    ],
  },
  {
    dates: [
      '2022-04-16T00:00:00.000Z',
      '2022-04-16T14:34:00.000Z',
      '2022-04-16T12:00:00.000Z',
      '2022-04-15T23:59:59.999Z',
      '2022-04-16T12:13:00.000Z',
    ],
    groupBy: PointInTime.HOUR,
    tests: [
      {
        name: "Return (unique) pageviews on Apr 16 at 14 o'clock only",
        startTime: new Date('2022-04-16T14:00:00.000Z').getTime(),
        endTime: new Date('2022-04-16T14:59:59.999Z').getTime(),
        expected: {
          total: 1,
          graph: {
            [new Date('2022-04-16T14:00:00.000Z').getTime()]: 1,
          },
        },
      },
      {
        name: 'Return (unique) pageviews between Apr 15 and May 16 at all hours',
        startTime: new Date('2022-04-15T00:00:00.000Z').getTime(),
        endTime: new Date('2022-05-16T23:59:59.999Z').getTime(),
        expected: {
          total: 5,
          graph: {
            [new Date('2022-04-15T23:00:00.000Z').getTime()]: 1,
            [new Date('2022-04-16T00:00:00.000Z').getTime()]: 1,
            [new Date('2022-04-16T12:00:00.000Z').getTime()]: 2,
            [new Date('2022-04-16T14:00:00.000Z').getTime()]: 1,
          },
        },
      },
    ],
  },
  {
    dates: [
      '2022-04-16T00:00:13.000Z',
      '2022-04-16T14:34:00.000Z',
      '2022-04-16T12:00:23.000Z',
      '2022-04-16T23:59:59.999Z',
      '2022-04-16T12:13:19.435Z',
      '2022-04-16T00:00:59.000Z',
    ],
    groupBy: PointInTime.MINUTE,
    tests: [
      {
        name: 'Return (unique) pageviews on Apr 16 at 14:34 only',
        startTime: new Date('2022-04-16T14:34:00.000Z').getTime(),
        endTime: new Date('2022-04-16T14:34:59.999Z').getTime(),
        expected: {
          total: 1,
          graph: {
            [new Date('2022-04-16T14:34:00.000Z').getTime()]: 1,
          },
        },
      },
      {
        name: 'Return (unique) pageviews between on May 16 at all minutes',
        startTime: new Date('2022-04-16T00:00:00.000Z').getTime(),
        endTime: new Date('2022-05-16T23:59:59.999Z').getTime(),
        expected: {
          total: 6,
          graph: {
            [new Date('2022-04-16T00:00:00.000Z').getTime()]: 2,
            [new Date('2022-04-16T12:00:00.000Z').getTime()]: 1,
            [new Date('2022-04-16T12:13:00.000Z').getTime()]: 1,
            [new Date('2022-04-16T14:34:00.000Z').getTime()]: 1,
            [new Date('2022-04-16T23:59:00.000Z').getTime()]: 1,
          },
        },
      },
    ],
  },
]

export { GetPageviewsCases }
