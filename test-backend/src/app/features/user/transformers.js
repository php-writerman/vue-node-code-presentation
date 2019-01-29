import { except, combine } from '@modules/transform'
import { exceptTimestamps } from '@app/transformers'

const exceptSequreData = except(
  'loginAttempts',
  'lastFailedTime',
  'updatedToken',
  'password',
)

export const userTransformer = {
  toView: combine(
    exceptSequreData,
    exceptTimestamps
  )
}
