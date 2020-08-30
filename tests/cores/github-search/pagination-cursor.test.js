import {
    decodeToken,
    encodeToken,
    PaginationCursor,
} from '../../../src/cores/github-search/pagination-cursor'
import { HttpException } from '../../../src/libs/common/http-exception'

describe('Pagination cursor', () => {
    describe('instance', () => {
        test('Should contain requiring attributes', () => {
            const cursor = new PaginationCursor(5, 20, 'query', 'DESC')

            expect(cursor.lastPage).toBeUndefined()
            expect(cursor.page).toBe(5)
            expect(cursor.perPage).toBe(20)
            expect(cursor.query).toBe('query')
            expect(cursor.sort).toBe('DESC')
        })
    })

    describe('toRequestParams', () => {
        test('Should return valid object', () => {
            const cursor = new PaginationCursor(5, 20, 'query', 'DESC')
            const expectedOutput = { page: 5, per_page: 20, q: 'query', sort: 'DESC' }

            const output = cursor.toRequestParams()

            expect(output).toStrictEqual(expectedOutput)
        })
    })

    describe('end', () => {
        test('Should end the cursor properly', () => {
            const cursor = new PaginationCursor(5, 20, 'query', 'DESC')

            cursor.end()

            expect(cursor.lastPage).toBeTruthy()
        })

        test('Should prevent page increment', () => {
            const cursor = new PaginationCursor(5, 20, 'query', 'DESC')

            cursor.end()
            cursor.nextPage()

            expect(cursor.page).toBe(5)
        })

        test('Should omit result of toJSON method', () => {
            const cursor = new PaginationCursor(5, 20, 'query', 'DESC')

            cursor.end()

            expect(cursor.toJSON()).toBeUndefined()
        })
    })

    describe('toJSON', () => {
        test('Should return valid JSON result', () => {
            const cursor = new PaginationCursor(5, 20, 'query', 'DESC')
            const expectedOutput = {
                page: 5,
                perPage: 20,
                query: 'query',
                sort: 'DESC',
                lastPage: undefined,
            }

            const output = cursor.toJSON()

            expect(output).toStrictEqual(expectedOutput)
        })
    })

    describe('next', () => {
        test('Should increase page by 1', () => {
            const cursor = new PaginationCursor(5, 20, 'query', 'DESC')

            cursor.nextPage()

            expect(cursor.page).toBe(6)
        })
    })

    describe('encodeToken', () => {
        test('Should encode properly with param', () => {
            const output = encodeToken(new PaginationCursor(5, 20, 'query', 'DESC'))

            expect(output).toBe(
                'eyJwYWdlIjo1LCJwZXJQYWdlIjoyMCwicXVlcnkiOiJxdWVyeSIsInNvcnQiOiJERVNDIn0='
            )
        })

        test('Should encode properly with param which is not instance of pagination cursor', () => {
            const output = encodeToken('asdfasdf')

            expect(output).toBe('ImFzZGZhc2RmIg==')
        })

        test('Should not encode when param is undefined', () => {
            const output = encodeToken(undefined)

            expect(output).toBeUndefined()
        })

        test('Should not encode when param is omit', () => {
            const output = encodeToken()

            expect(output).toBeUndefined()
        })
    })

    describe('decodeToken', () => {
        test('Should decode and return instance of pagination cursor', () => {
            const output = decodeToken(
                'eyJwYWdlIjo1LCJwZXJQYWdlIjoyMCwicXVlcnkiOiJxdWVyeSIsInNvcnQiOiJERVNDIn0='
            )
            const expectedOutput = new PaginationCursor(5, 20, 'query', 'DESC')

            expect(output).toStrictEqual(expectedOutput)
        })

        test('Should throw if input token is invalid object', () => {
            expect.assertions(1)

            try {
                decodeToken('e30=')
            } catch (e) {
                expect(e).toBeInstanceOf(HttpException)
            }
        })

        test('Should throw if input token is in invalid format', () => {
            expect.assertions(1)

            try {
                decodeToken('asdasdbb')
            } catch (e) {
                expect(e).toBeInstanceOf(SyntaxError)
            }
        })
    })
})
