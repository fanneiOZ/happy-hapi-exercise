/**
 * Http exception class
 */
export class HttpException extends Error {
    /**
     *
     * @param {Error} e - Error subclass
     * @returns {HttpException} - Instance of Http exception
     */
    static wrapError(e) {
        return new HttpException(500, e.message).withCause(e)
    }

    /**
     * @param {number} code - Http error code
     * @param {string} message - error message
     */
    constructor(code, message = undefined) {
        super(message ?? 'Http exception')
        this.code = code
        this.message = message ?? 'Http exception'
    }

    /**
     * @param {Error | HttpException} e
     * @returns {HttpException}
     */
    withCause(e) {
        this.errorCause = e

        return this
    }

    /**
     * @param {any} input
     * @return {HttpException}
     */
    withInput(input) {
        this.input = input

        return this
    }
}
