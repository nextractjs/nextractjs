import Nextract from 'nextract'
import PrismaDatabase from '@nextract/database-prisma'
import { PrismaClient } from '@prisma/client'

const client = new PrismaClient()

export default Nextract({
  database: PrismaDatabase(client),
  authOptions: {
    users: [
      {
        username: 'admin',
        password: 'password',
      },
    ],
    cookie: {
      password: 'abcXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // iron-session requires a long password
    },
  },
  isDebug: true,
})
