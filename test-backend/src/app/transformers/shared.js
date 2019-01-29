import { except } from '@modules/transform'

export const exceptTimestamps = except('createdAt', 'updatedAt')
