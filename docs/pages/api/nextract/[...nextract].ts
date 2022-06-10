import PrismaDatabase from '@nextract/database-prisma'
import { prisma } from '../../../lib/prisma'
import Nextract from 'nextract'

export default Nextract({
  database: PrismaDatabase(prisma),
  isDebug: process.env.NODE_ENV !== 'production',
  allowedOrigins: ['demo.nextractjs.org'],
})
