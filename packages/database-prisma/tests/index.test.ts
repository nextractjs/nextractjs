import { AnalyticsEvent } from 'nextract/api/types'
import { PrismaClient } from '@prisma/client'
import { runBasicTests } from 'database-test'
import PrismaDatabase from '../src/index'
import { eventToPrisma, prismaToEvent } from '../src/utils'

const prisma = new PrismaClient()

runBasicTests({
  adapter: PrismaDatabase(prisma),
  database: {
    event: async (id: string) => {
      const event = await prisma.analyticsEvent.findUnique({
        where: { id },
        rejectOnNotFound: true,
      })
      return prismaToEvent(event)
    },
    clear: async () => {
      await prisma.analyticsEvent.deleteMany()
    },
  },
})

const event: AnalyticsEvent = {
  id: `id`,
  name: 'pageview',
  timestamp: new Date('2002-10-16T04:40:00.000Z').getTime(),
  hostname: 'www.example.com',
  pathname: '/test-path',
  userId: `userId`,
  isPageview: true,
  payload: {},
  referrer: undefined,
  utmCampaign: undefined,
  utmSource: undefined,
  utmMedium: undefined,
}

const correctPrismaEvent = {
  ...event,
  timestamp: new Date(event.timestamp),
  year: new Date('2002-01-01T00:00:00.000Z'),
  month: new Date('2002-10-01T00:00:00.000Z'),
  day: new Date('2002-10-16T00:00:00.000Z'),
  hour: new Date('2002-10-16T04:00:00.000Z'),
  minute: new Date('2002-10-16T04:40:00.000Z'),
  utmMedium: null,
  utmSource: null,
  utmCampaign: null,
  referrer: null,
  payload: '{}',
}

test('Converts AnalyticsEvent to Prisma', () => {
  expect(eventToPrisma(event)).toEqual(correctPrismaEvent)
})

test('Converts PrismaAnalyticsEvent to AnalyticsEvent', () => {
  expect(prismaToEvent(correctPrismaEvent)).toEqual(event)
})
