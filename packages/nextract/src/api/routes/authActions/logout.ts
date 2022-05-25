import { NextApiResponse } from 'next'
import { withAuthApi } from '../auth'
import { AuthOptions, NextractRequest } from 'api/types'

const logoutHandler = async (req: NextractRequest, res: NextApiResponse, options: AuthOptions) => {
  if (req.method !== 'POST') return res.status(400).end(`Error: HTTP ${req.method} is not supported`)

  return await withAuthApi(req, res, options, async (req, res) => {
    req.session.destroy()
    res.send({ success: true, message: 'Successfully logged out' })
  })
}

export default logoutHandler
