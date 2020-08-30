export class Route {
    /**
     * @constructor
     * @param {'GET' | 'POST'} method - RESTful API methods
     * @param {string} path
     */
    constructor(method, path) {
        /**
         * @type {'GET' | 'POST'} method - RESTful API methods
         */
        this.method = method
        /**
         * @type {string}
         */
        this.path = path
    }

    /**
     * @param {function} handler
     * @return {Route}
     */
    setHandler(handler) {
        this.handler = handler

        return this
    }
}
