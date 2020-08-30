import { Route } from '../../../src/libs/common/route'

describe('Route', () => {
    describe('instance', () => {
        test('Should have valid attributes', () => {
            const route = new Route('GET', '/path/to')

            expect(route.method).toBe('GET')
            expect(route.path).toBe('/path/to')
            expect(route.handler).toBeUndefined()
        })
    })

    describe('setHandler', () => {
        test('Should set to handler attribute properly', () => {
            const route = new Route('GET', '/path/to')
            const testHandler = () => {
                return 'test'
            }

            route.setHandler(testHandler)

            expect(route.handler).toStrictEqual(testHandler)
        })
    })
})
