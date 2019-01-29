import '../src/app/tools/loadEnv'
import '../register-aliases'
import dbSeeder from '../src/app/seeders/dbSeeder'

dbSeeder()
  .then(() => {
    console.log('Database seeded')
    process.exit()
  })
  .catch((err) => {
    console.log(err)
    process.exit()
  })
