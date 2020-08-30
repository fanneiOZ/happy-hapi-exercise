import Hapi from '@hapi/hapi'

export default class HapiServer {
    constructor() {
        this.server = Hapi.server({ host: 'localhost', port: 3030 })
    }

    start() {
        this.server
            .start()
            // eslint-disable-next-line no-console
            .then(() => console.log(`Start listening on port ${this.server.settings.port}`))
    }

    /**
     * Register routes
     * @param {Route[]} routes
     * @returns {HapiServer}
     */
    registerRoutes(routes) {
        routes.forEach(route => {
            this.server.route({
                method: route.method,
                path: route.path,
                handler: route.handler,
            })
        })

        return this
    }
}
