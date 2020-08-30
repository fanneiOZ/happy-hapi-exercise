import HapiServer from './src/libs/server/hapi.server.js'
import assignmentRoutes from './src/app/controllers/routes.js'

const server = new HapiServer()

server.registerRoutes(assignmentRoutes)

server.start()
