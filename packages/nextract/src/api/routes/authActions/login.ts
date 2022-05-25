import { AuthOptions, NextractRequest } from 'api/types'
import { NextApiResponse } from 'next'
import logger from '../../../logger'
import { withAuthApi } from '../auth'

const loginHandler = async (req: NextractRequest, res: NextApiResponse, options: AuthOptions) => {
  if (req.method !== 'POST') return res.status(400).end(`Error: HTTP ${req.method} is not supported`)

  const { username } = JSON.parse(req.body)

  const user = options.users.find((user) => user.username === username)

  if (user == null) {
    logger.debug('USER_NOT_FOUND', `User ${username} not found`)
    return res.status(401).json({
      success: false,
      message: 'Invalid username/password combination.',
    })
  }

  return await withAuthApi(req, res, options, async (req, res) => {
    req.session.user = user
    await req.session.save()
    res.send({ success: true, message: 'Successfully logged in' })
  })
}

export default loginHandler
