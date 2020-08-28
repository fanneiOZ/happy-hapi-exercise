import HapiServer from './src/libs/server/hapi-server'
import assignmentRoutes from './src/app/controllers/routes'

const server = new HapiServer()

server.registerRoutes(assignmentRoutes)

server.start()
