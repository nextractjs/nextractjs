import * as requestIp from 'request-ip'
import * as crypto from 'crypto'
import { NextractRequest } from 'api/types'

const createUserHash = (req: NextractRequest) => {
  const ip = requestIp.getClientIp(req)
  if (!ip) throw new Error('Not able to generate a user hash because IP is missing')

  const currentDay = new Date().getUTCDate()
  return crypto.createHash('md5').update(`${ip}:${currentDay}`).digest('hex')
}

export default createUserHash
