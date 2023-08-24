
import 'dotenv/config'

import createServer from './createServer'

const port = process.env.PORT || 3000

createServer().then((app) => {
  app
    .listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is listening on port ${port}`)
    })
    .on('error', (err) => {
      // eslint-disable-next-line no-console;
      console.error(err)
    })
})
