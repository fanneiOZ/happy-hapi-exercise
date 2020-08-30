import { HttpException } from '../../../src/libs/common/http-exception.js'

describe('Http exception class', () => {
    describe('instance', () => {
        test('Should be subclass of Error', () => {
            const exception = new HttpException(500)

            expect(exception).toBeInstanceOf(Error)
            expect(exception.errorCause).toBeUndefined()
            expect(exception.input).toBeUndefined()
            expect(exception.code).toBe(500)
            expect(exception.message).toBe('Http exception')
        })

        test('Should have valid error message', () => {
            const exception = new HttpException(500, 'Custom error message')

            expect(exception).toBeInstanceOf(Error)
            expect(exception.errorCause).toBeUndefined()
            expect(exception.input).toBeUndefined()
            expect(exception.code).toBe(500)
            expect(exception.message).toBe('Custom error message')
        })
    })

    describe('withCause', () => {
        test('Should be able to attach Error', () => {
            const exception = new HttpException(500).withCause(new TypeError())

            expect(exception.errorCause).toBeInstanceOf(TypeError)
        })

        test('Should be able to attach HttpException', () => {
            const exception = new HttpException(500).withCause(new HttpException())

            expect(exception.errorCause).toBeInstanceOf(HttpException)
        })
    })

    describe('withInput', () => {
        test('Should kept param as error input', () => {
            const exception = new HttpException(500).withInput('asdbasdfba')

            expect(exception.input).toBe('asdbasdfba')
        })
    })

    describe('wrapError', () => {
        test('Should return http exception', () => {
            const exception = HttpException.wrapError(new TypeError('Type error'))

            expect(exception).toBeInstanceOf(HttpException)
            expect(exception.errorCause).toBeInstanceOf(TypeError)
            expect(exception.input).toBeUndefined()
            expect(exception.code).toBe(500)
            expect(exception.message).toBe('Type error')
        })
    })
})
