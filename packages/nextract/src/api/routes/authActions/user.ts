import { NextApiResponse } from 'next'
import { withAuthApi } from '../auth'
import { AuthOptions, NextractRequest } from 'api/types'

const userHandler = async (req: NextractRequest, res: NextApiResponse, options: AuthOptions) => {
  if (req.method !== 'GET') return res.status(400).end(`Error: HTTP ${req.method} is not supported`)

  return await withAuthApi(req, res, options, async (req, res) => {
    if (req.session.user != null) {
      return res.status(200).json({
        success: true,
        message: 'User is authenticated.',
        user: {
          ...req.session.user,
          password: undefined, // Don't send the password back
        },
      })
    } else {
      return res.status(401).json({
        success: false,
        message: 'You are currently not authenticated.',
      })
    }
  })
}

export default userHandler
