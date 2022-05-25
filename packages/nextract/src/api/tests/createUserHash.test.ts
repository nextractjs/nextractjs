import createUserHash from '../lib/createUserHash'
import createAnalyticsMocks from './helpers/createAnalyticsMocks'

test('User hash should be different for two IPs', () => {
  const { req: firstIPReq } = createAnalyticsMocks({
    headers: {
      forwarded: '0.0.0.0',
    },
  })

  const { req: secondIPReq } = createAnalyticsMocks({
    headers: {
      forwarded: '0.0.0.1',
    },
  })

  const firstHash = createUserHash(firstIPReq)
  const secondHash = createUserHash(secondIPReq)

  expect(firstHash).not.toBe(secondHash)
})

test('User hash should stay stay same for same IP', () => {
  const { req } = createAnalyticsMocks({
    headers: {
      forwarded: '0.0.0.0',
    },
  })

  const firstHash = createUserHash(req)
  const secondHash = createUserHash(req)

  expect(firstHash).toBe(secondHash)
})

test('User hash should change every day', () => {
  const { req } = createAnalyticsMocks({
    headers: {
      forwarded: '0.0.0.0',
    },
  })

  jest.useFakeTimers().setSystemTime(new Date('2002-10-15').getTime())
  const firstHash = createUserHash(req)

  jest.useFakeTimers().setSystemTime(new Date('2002-10-16').getTime())
  const secondHash = createUserHash(req)

  expect(firstHash).not.toBe(secondHash)
})
