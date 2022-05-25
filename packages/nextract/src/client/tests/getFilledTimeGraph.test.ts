import { PointInTime, TimeGraph } from '../../api/database'
import { Timeframe } from '../components/TimeframeSelector'
import { GraphEntry } from '../types'
import getFilledTimeGraph from '../lib/getFilledTimeGraph'

interface TestCase {
  name: string
  systemTime: number
  existingPageviews: TimeGraph
  time: Timeframe
  expected: GraphEntry[]
}

const cases: TestCase[] = [
  {
    name: 'Last 5 minutes / "Realtime""',
    systemTime: new Date('2022-04-24T18:08:14.011Z').getTime(),
    existingPageviews: {
      [new Date('2022-04-24T18:07:00.000Z').getTime()]: 1,
      [new Date('2022-04-24T18:08:00.000Z').getTime()]: 1,
    },
    time: {
      endTime: new Date('2022-04-24T18:08:13.960Z').getTime(),
      groupBy: PointInTime.MINUTE,
      startTime: new Date('2022-04-24T18:04:00.000Z').getTime(),
    },
    expected: [
      {
        x: new Date('2022-04-24T18:04:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T18:05:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T18:06:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T18:07:00.000Z').getTime(),
        y: 1,
      },
      {
        x: new Date('2022-04-24T18:08:00.000Z').getTime(),
        y: 1,
      },
    ],
  },
  {
    name: 'Today',
    systemTime: new Date('2022-04-24T18:10:55.944Z').getTime(),
    existingPageviews: {
      [new Date('2022-04-24T17:00:00.000Z').getTime()]: 1,
      [new Date('2022-04-24T18:00:00.000Z').getTime()]: 2,
    },
    time: {
      groupBy: PointInTime.HOUR,
      startTime: new Date('2022-04-24T00:00:00.000Z').getTime(),
      endTime: new Date('2022-04-24T23:59:59.999Z').getTime(),
    },
    expected: [
      {
        x: new Date('2022-04-24T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T01:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T02:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T03:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T04:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T05:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T06:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T07:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T08:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T09:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T10:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T11:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T12:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T13:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T14:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T15:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T16:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T17:00:00.000Z').getTime(),
        y: 1,
      },
      {
        x: new Date('2022-04-24T18:00:00.000Z').getTime(),
        y: 2,
      },
      {
        x: new Date('2022-04-24T19:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T20:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T21:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T22:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T23:00:00.000Z').getTime(),
        y: 0,
      },
    ],
  },
  {
    name: 'Last 24 hours',
    systemTime: new Date('2022-04-24T19:14:23.813Z').getTime(),
    existingPageviews: {
      [new Date('2022-04-24T17:00:00.000Z').getTime()]: 1,
      [new Date('2022-04-24T18:00:00.000Z').getTime()]: 2,
    },
    time: {
      groupBy: PointInTime.HOUR,
      startTime: new Date('2022-04-23T18:00:00.000Z').getTime(),
      endTime: new Date('2022-04-24T19:14:23.697Z').getTime(),
    },
    expected: [
      {
        x: new Date('2022-04-23T18:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-23T19:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-23T20:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-23T21:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-23T22:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-23T23:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T01:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T02:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T03:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T04:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T05:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T06:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T07:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T08:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T09:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T10:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T11:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T12:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T13:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T14:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T15:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T16:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-24T17:00:00.000Z').getTime(),
        y: 1,
      },
      {
        x: new Date('2022-04-24T18:00:00.000Z').getTime(),
        y: 2,
      },
      {
        x: new Date('2022-04-24T19:00:00.000Z').getTime(),
        y: 0,
      },
    ],
  },
  {
    name: 'This week',
    systemTime: new Date('2022-04-24T19:16:48.897Z').getTime(),
    existingPageviews: {
      [new Date('2022-04-18T00:00:00.000Z').getTime()]: 1,
      [new Date('2022-04-19T00:00:00.000Z').getTime()]: 1,
      [new Date('2022-04-21T00:00:00.000Z').getTime()]: 1,
      [new Date('2022-04-22T00:00:00.000Z').getTime()]: 1,
      [new Date('2022-04-23T00:00:00.000Z').getTime()]: 1,
      [new Date('2022-04-24T00:00:00.000Z').getTime()]: 1,
    },
    time: {
      groupBy: PointInTime.DAY,
      startTime: new Date('2022-04-18T00:00:00.000Z').getTime(),
      endTime: new Date('2022-04-24T23:59:59.999Z').getTime(),
    },
    expected: [
      {
        x: new Date('2022-04-18T00:00:00.000Z').getTime(),
        y: 1,
      },
      {
        x: new Date('2022-04-19T00:00:00.000Z').getTime(),
        y: 1,
      },
      {
        x: new Date('2022-04-20T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-21T00:00:00.000Z').getTime(),
        y: 1,
      },
      {
        x: new Date('2022-04-22T00:00:00.000Z').getTime(),
        y: 1,
      },
      {
        x: new Date('2022-04-23T00:00:00.000Z').getTime(),
        y: 1,
      },
      {
        x: new Date('2022-04-24T00:00:00.000Z').getTime(),
        y: 1,
      },
    ],
  },
  {
    name: 'Last 7 days',
    systemTime: new Date('2022-04-24T19:18:42.135Z').getTime(),
    existingPageviews: {
      [new Date('2022-04-18T00:00:00.000Z').getTime()]: 1,
      [new Date('2022-04-19T00:00:00.000Z').getTime()]: 1,
      [new Date('2022-04-21T00:00:00.000Z').getTime()]: 1,
      [new Date('2022-04-22T00:00:00.000Z').getTime()]: 1,
      [new Date('2022-04-23T00:00:00.000Z').getTime()]: 1,
      [new Date('2022-04-24T00:00:00.000Z').getTime()]: 1,
    },
    time: {
      groupBy: PointInTime.DAY,
      startTime: new Date('2022-04-18T00:00:00.000Z').getTime(),
      endTime: new Date('2022-04-24T19:18:42.074Z').getTime(),
    },
    expected: [
      {
        x: new Date('2022-04-18T00:00:00.000Z').getTime(),
        y: 1,
      },
      {
        x: new Date('2022-04-19T00:00:00.000Z').getTime(),
        y: 1,
      },
      {
        x: new Date('2022-04-20T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-21T00:00:00.000Z').getTime(),
        y: 1,
      },
      {
        x: new Date('2022-04-22T00:00:00.000Z').getTime(),
        y: 1,
      },
      {
        x: new Date('2022-04-23T00:00:00.000Z').getTime(),
        y: 1,
      },
      {
        x: new Date('2022-04-24T00:00:00.000Z').getTime(),
        y: 1,
      },
    ],
  },
  {
    name: 'This month',
    systemTime: new Date('2022-04-24T19:22:52.698Z').getTime(),
    existingPageviews: {
      [new Date('2022-04-14T00:00:00.000Z').getTime()]: 1,
      [new Date('2022-04-18T00:00:00.000Z').getTime()]: 1,
      [new Date('2022-04-19T00:00:00.000Z').getTime()]: 1,
      [new Date('2022-04-21T00:00:00.000Z').getTime()]: 1,
      [new Date('2022-04-22T00:00:00.000Z').getTime()]: 1,
      [new Date('2022-04-23T00:00:00.000Z').getTime()]: 1,
      [new Date('2022-04-24T00:00:00.000Z').getTime()]: 1,
    },
    time: {
      groupBy: PointInTime.DAY,
      startTime: new Date('2022-03-31T00:00:00.000Z').getTime(),
      endTime: new Date('2022-04-29T23:59:59.999Z').getTime(),
    },
    expected: [
      {
        x: new Date('2022-03-31T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-01T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-02T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-03T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-04T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-05T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-06T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-07T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-08T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-09T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-10T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-11T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-12T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-13T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-14T00:00:00.000Z').getTime(),
        y: 1,
      },
      {
        x: new Date('2022-04-15T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-16T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-17T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-18T00:00:00.000Z').getTime(),
        y: 1,
      },
      {
        x: new Date('2022-04-19T00:00:00.000Z').getTime(),
        y: 1,
      },
      {
        x: new Date('2022-04-20T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-21T00:00:00.000Z').getTime(),
        y: 1,
      },
      {
        x: new Date('2022-04-22T00:00:00.000Z').getTime(),
        y: 1,
      },
      {
        x: new Date('2022-04-23T00:00:00.000Z').getTime(),
        y: 1,
      },
      {
        x: new Date('2022-04-24T00:00:00.000Z').getTime(),
        y: 1,
      },
      {
        x: new Date('2022-04-25T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-26T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-27T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-28T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-29T00:00:00.000Z').getTime(),
        y: 0,
      },
    ],
  },
  {
    name: 'Last 30 days',
    systemTime: new Date('2022-04-24T19:24:19.562Z').getTime(),
    existingPageviews: {
      [new Date('2022-04-14T00:00:00.000Z').getTime()]: 1,
      [new Date('2022-04-18T00:00:00.000Z').getTime()]: 1,
      [new Date('2022-04-19T00:00:00.000Z').getTime()]: 1,
      [new Date('2022-04-21T00:00:00.000Z').getTime()]: 1,
      [new Date('2022-04-22T00:00:00.000Z').getTime()]: 1,
      [new Date('2022-04-23T00:00:00.000Z').getTime()]: 1,
      [new Date('2022-04-24T00:00:00.000Z').getTime()]: 1,
    },
    time: {
      groupBy: PointInTime.DAY,
      startTime: new Date('2022-03-26T00:00:00.000Z').getTime(),
      endTime: new Date('2022-04-24T19:24:19.493Z').getTime(),
    },
    expected: [
      {
        x: new Date('2022-03-26T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-03-27T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-03-28T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-03-29T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-03-30T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-03-31T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-01T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-02T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-03T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-04T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-05T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-06T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-07T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-08T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-09T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-10T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-11T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-12T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-13T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-14T00:00:00.000Z').getTime(),
        y: 1,
      },
      {
        x: new Date('2022-04-15T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-16T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-17T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-18T00:00:00.000Z').getTime(),
        y: 1,
      },
      {
        x: new Date('2022-04-19T00:00:00.000Z').getTime(),
        y: 1,
      },
      {
        x: new Date('2022-04-20T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-21T00:00:00.000Z').getTime(),
        y: 1,
      },
      {
        x: new Date('2022-04-22T00:00:00.000Z').getTime(),
        y: 1,
      },
      {
        x: new Date('2022-04-23T00:00:00.000Z').getTime(),
        y: 1,
      },
      {
        x: new Date('2022-04-24T00:00:00.000Z').getTime(),
        y: 1,
      },
    ],
  },
  {
    name: 'This year',
    systemTime: new Date('2022-04-24T19:25:31.261Z').getTime(),
    existingPageviews: {
      [new Date('2022-04-01T00:00:00.000Z').getTime()]: 7,
    },
    time: {
      groupBy: PointInTime.MONTH,
      startTime: new Date('2022-01-01T00:00:00.000Z').getTime(),
      endTime: new Date('2022-12-31T23:59:59.999Z').getTime(),
    },
    expected: [
      {
        x: new Date('2022-01-01T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-02-01T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-03-01T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-01T00:00:00.000Z').getTime(),
        y: 7,
      },
      {
        x: new Date('2022-05-01T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-06-01T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-07-01T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-08-01T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-09-01T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-10-01T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-11-01T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-12-01T00:00:00.000Z').getTime(),
        y: 0,
      },
    ],
  },
  {
    name: 'Last 12 months',
    systemTime: new Date('2022-04-24T19:26:45.353Z').getTime(),
    existingPageviews: {
      [new Date('2022-04-01T00:00:00.000Z').getTime()]: 30,
    },
    time: {
      groupBy: PointInTime.MONTH,
      startTime: new Date('2021-05-01T00:00:00.000Z').getTime(),
      endTime: new Date('2022-04-24T19:26:45.287Z').getTime(),
    },
    expected: [
      {
        x: new Date('2021-05-01T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2021-06-01T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2021-07-01T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2021-08-01T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2021-09-01T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2021-10-01T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2021-11-01T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2021-12-01T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-01-01T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-02-01T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-03-01T00:00:00.000Z').getTime(),
        y: 0,
      },
      {
        x: new Date('2022-04-01T00:00:00.000Z').getTime(),
        y: 30,
      },
    ],
  },
]

describe('Fill TimeGraphs for all possible timeframes', () => {
  test.each(cases)('$name', (testCase) => {
    jest.useFakeTimers().setSystemTime(testCase.systemTime)
    expect(getFilledTimeGraph(testCase.existingPageviews, testCase.time)).toEqual(testCase.expected)
  })
})
