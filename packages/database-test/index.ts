import { AnalyticsEvent, Database, PointInTime, ApiTimeGraphResponse } from 'nextract/api/types'
import { GetPageviewsCases } from './cases/getPageviewsCases'
import { GetTopPagesCases } from './cases/getTopPagesCases'
import { GetTopSourcesCases } from './cases/getTopSourcesCases'
import { getEventForPathname, getEventForSource, getEventForTimestamp } from './utils'

export interface TestOptions {
  adapter: Database
  database: {
    /**
     * Manually establishes a db connection before all tests,
     * if your db doesn't do this automatically
     */
    connect?: () => Promise<any>
    /**
     * Manually disconnect database after all tests have been run,
     * if your adapter doesn't do it automatically
     */
    disconnect?: () => Promise<any>
    /**
     * Manually clears all data from the db before tests are run
     */
    clear: () => Promise<any>
    /** A simple query function that returns an event directly from the db. */
    event: (id: string) => Promise<AnalyticsEvent | null>
  }
}

/**
 * A wrapper to run the most basic tests.
 * Run this at the top of your test file.
 * You can add additional tests below, if you wish.
 */
export const runBasicTests = (options: TestOptions) => {
  beforeAll(async () => {
    await options.database.connect?.()
    await options.database.clear()
  })

  afterAll(async () => {
    await options.database.clear()
    await options.database.disconnect?.()
  })

  const database = options.adapter

  // All database adapters must define these methods
  test('Required methods exist', () => {
    const requiredMethods = ['insertEvent', 'getUniquePageviews']
    requiredMethods.forEach((method) => {
      expect(database).toHaveProperty(method)
    })
  })

  //Example event
  const event = getEventForTimestamp(new Date('2002-10-16T00:00:00.000Z'))

  // A database must be able to insert an event
  test('Able to insert an event', async () => {
    await database.insertEvent(event)
    const dbEvent = await options.database.event(event.id)
    expect(dbEvent).toEqual(event)
  })

  //Example event
  const sameUserEvent = {
    ...event,
    id: `${event.id}-same-user`,
    userId: event.userId,
    timestamp: event.timestamp + 1000 * 60, //One minute later
  }

  test('Multiple events of same user are being grouped (counted as one)', async () => {
    await database.insertEvent(sameUserEvent)

    const uniquePageviews = await database.getUniquePageviews({
      startTime: event.timestamp,
      endTime: sameUserEvent.timestamp,
      groupBy: PointInTime.HOUR,
    })

    expect(uniquePageviews).toEqual<ApiTimeGraphResponse>({
      graph: {
        [new Date('2002-10-16T00:00:00.000Z').getTime()]: 1,
      },
      total: 1,
    })
  })

  test('Multiple events of same user are not being grouped (counted as many)', async () => {
    const uniquePageviews = await database.getPageviews({
      startTime: event.timestamp,
      endTime: sameUserEvent.timestamp,
      groupBy: PointInTime.HOUR,
    })

    expect(uniquePageviews).toEqual<ApiTimeGraphResponse>({
      graph: {
        [new Date('2002-10-16T00:00:00.000Z').getTime()]: 2,
      },
      total: 2,
    })
  })

  describe.each(GetPageviewsCases)('Retrieve unique pageviews by $groupBy', (testCase) => {
    beforeAll(async () => {
      await options.database.clear()
      //Insert all events
      const events = testCase.dates.map((date, i) => getEventForTimestamp(new Date(date), i))
      await Promise.all(events.map(database.insertEvent))
    })

    test.each(testCase.tests)('$name', async (test) => {
      const result = await database.getUniquePageviews({
        ...test,
        groupBy: testCase.groupBy,
      })
      expect(result).toEqual(test.expected)
    })
  })

  describe.each(GetPageviewsCases)('Retrieve pageviews by $groupBy', (testCase) => {
    beforeAll(async () => {
      await options.database.clear()
      //Insert all events
      const events = testCase.dates.map((date, i) => getEventForTimestamp(new Date(date), i))
      await Promise.all(events.map(database.insertEvent))
    })

    test.each(testCase.tests)('$name', async (test) => {
      const result = await database.getPageviews({
        ...test,
        groupBy: testCase.groupBy,
      })
      expect(result).toEqual(test.expected)
    })
  })

  const now = new Date()
  const currentActiveEvent = getEventForTimestamp(now)

  test('Get current active users count', async () => {
    await options.database.clear()

    await database.insertEvent(currentActiveEvent)

    jest.useFakeTimers().setSystemTime(now.getTime() + 1000 * 60 * 3) // 3 minutes later

    const count = await database.getRealtimeUserCount({})

    expect(count).toEqual(1)
  })

  test('A single user is only counted once', async () => {
    await database.insertEvent({ ...currentActiveEvent, id: `${currentActiveEvent.id}-same-user` })

    jest.useFakeTimers().setSystemTime(now.getTime() + 1000 * 60 * 4) // 4 minutes later

    const count = await database.getRealtimeUserCount({})

    expect(count).toEqual(1)
  })

  test('Different users are counted seperately', async () => {
    await database.insertEvent({
      ...currentActiveEvent,
      id: `${currentActiveEvent.id}-different-user`,
      userId: 'different-user',
    })

    jest.useFakeTimers().setSystemTime(now.getTime() + 1000 * 60 * 4) // 4 minutes later

    const count = await database.getRealtimeUserCount({})

    expect(count).toEqual(2)
  })

  describe.each(GetTopPagesCases)('Retrieve top pages', (testCase) => {
    beforeAll(async () => {
      await options.database.clear()
      //Insert all events
      const events = testCase.data.map(({ pathname, userId }, i) => getEventForPathname(pathname, userId, i))
      await Promise.all(events.map(database.insertEvent))
    })

    test(testCase.test.name, async () => {
      const result = await database.getTopPages({
        startTime: new Date().getTime() - 1000 * 60,
        endTime: new Date().getTime() + 1000 * 60,
      })
      expect(result).toEqual(testCase.test.expected)
    })
  })

  describe.each(GetTopSourcesCases)('Retrieve top sources', (testCase) => {
    beforeAll(async () => {
      await options.database.clear()
      //Insert all events
      const events = testCase.data.map(({ userId, ...source }, i) => getEventForSource(source, userId, i))
      await Promise.all(events.map(database.insertEvent))
    })

    test.each(testCase.tests)('$name', async (test) => {
      const result = await database.getTopSources({
        startTime: new Date().getTime() - 1000 * 60,
        endTime: new Date().getTime() + 1000 * 60,
        sourceType: test.sourceType,
      })

      expect(result).toEqual(test.expected)
    })
  })
}
