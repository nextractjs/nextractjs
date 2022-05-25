import { createMocks as _createMocks, Mocks } from 'node-mocks-http'
import type { RequestOptions, ResponseOptions } from 'node-mocks-http'

const createAnalyticsMocks = _createMocks as (
  reqOptions?: RequestOptions,
  resOptions?: ResponseOptions,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: Fixing this: https://github.com/howardabrams/node-mocks-http/issues/245
) => Mocks<NextractRequest, NextApiResponse>

export default createAnalyticsMocks
