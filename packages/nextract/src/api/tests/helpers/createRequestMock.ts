import { NextApiResponse } from 'next'
import { createRequest, createResponse, RequestOptions } from 'node-mocks-http'
import { NextractRequest } from '../../types'

type ApiRequest = NextractRequest & ReturnType<typeof createRequest>

const createRequestMock = (options?: RequestOptions) => createRequest<ApiRequest>(options)

export default createRequestMock
