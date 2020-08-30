import Hapi from '@hapi/hapi'
import { jest } from '@jest/globals'
import HapiServer from '../../../src/libs/server/hapi.server.js'
import { Route } from '../../../src/libs/common/route.js'

jest.mock('@hapi/hapi')

describe('Hapi Server', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('instance', () => {
        test('Should properly create hapi server', () => {
            const stubHapiServer = { test: 'server' }
            jest.spyOn(Hapi, 'server').mockReturnValue(stubHapiServer)

            const instance = new HapiServer()

            expect(Hapi.server).toHaveBeenCalledTimes(1)
            expect(Hapi.server).toHaveBeenCalledWith({ host: 'localhost', port: 3030 })
            expect(instance.server).toStrictEqual(stubHapiServer)
        })
    })

    describe('start', () => {
        test('Should properly start server', async () => {
            const spiedStartMethod = jest.fn()
            const mockedHapiServer = { start: spiedStartMethod, settings: { port: 3030 } }
            jest.spyOn(Hapi, 'server').mockReturnValue(mockedHapiServer)
            jest.spyOn(mockedHapiServer, 'start').mockResolvedValue(true)

            await new HapiServer().start()

            expect(mockedHapiServer.start).toHaveBeenCalledTimes(1)
        })
    })

    describe('registerRoutes', () => {
        test('Should register every routes in list', () => {
            const handler = () => ({ test: 'handler' })
            const routeA = new Route('GET', 'a').setHandler(handler)
            const routeB = new Route('POST', 'B').setHandler(handler)

            const spiedRouteMethod = jest.fn()
            const mockedHapiServer = { route: spiedRouteMethod }
            jest.spyOn(Hapi, 'server').mockReturnValue(mockedHapiServer)
            jest.spyOn(mockedHapiServer, 'route')

            new HapiServer().registerRoutes([routeA, routeB])

            expect(mockedHapiServer.route).toHaveBeenCalledTimes(2)
            expect(mockedHapiServer.route).toHaveBeenNthCalledWith(1, {
                method: 'GET',
                path: 'a',
                handler,
            })
            expect(mockedHapiServer.route).toHaveBeenNthCalledWith(2, {
                method: 'POST',
                path: 'B',
                handler,
            })
        })
    })
})
