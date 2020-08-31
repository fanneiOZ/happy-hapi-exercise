import Axios from 'axios'
import { jest } from '@jest/globals'
import { GitHubV3ApiClient } from '../../../src/cores/github-search/github-v3-api-client'
import { HttpException } from '../../../src/libs/common/http-exception.js'

jest.mock('axios')

describe('GitHub V3 API client', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('instance', () => {
        test('Should create axios client', () => {
            const expectedParam = {
                baseURL: 'https://api.github.com/',
                timeout: 10000,
                headers: { Accept: 'application/vnd.github.v3+json' },
            }
            jest.spyOn(Axios, 'create').mockReturnValue({ client: true })

            const apiClient = new GitHubV3ApiClient()

            expect(apiClient.client).toStrictEqual({ client: true })
            expect(Axios.create).toHaveBeenCalledTimes(1)
            expect(Axios.create).toHaveBeenCalledWith(expectedParam)
        })
    })

    describe('get', () => {
        const apiClient = new GitHubV3ApiClient()

        beforeEach(() => {
            apiClient.client = { get: jest.fn() }
        })

        test('Should call API with params', async () => {
            const givenQuery = { param1: 'a', param2: 'b' }
            jest.spyOn(apiClient.client, 'get').mockResolvedValue({ response: 'return value' })

            const output = await apiClient.get('url', givenQuery)

            expect(output).toStrictEqual({ response: 'return value' })
            expect(apiClient.client.get).toHaveBeenCalledTimes(1)
            expect(apiClient.client.get).toHaveBeenCalledWith('url', {
                params: givenQuery,
            })
        })

        test('Should call API when params are omitted', async () => {
            jest.spyOn(apiClient.client, 'get').mockResolvedValue({ response: 'return value' })

            const output = await apiClient.get('url')

            expect(output).toStrictEqual({ response: 'return value' })
            expect(apiClient.client.get).toHaveBeenCalledTimes(1)
            expect(apiClient.client.get).toHaveBeenCalledWith('url', {})
        })

        test('Should throw http exception when api call error', async () => {
            jest.spyOn(apiClient.client, 'get').mockRejectedValue(new Error('Api error'))

            expect.assertions(3)
            try {
                await apiClient.get('url')
            } catch (e) {
                expect(e).toBeInstanceOf(HttpException)
                expect(apiClient.client.get).toHaveBeenCalledTimes(1)
                expect(apiClient.client.get).toHaveBeenCalledWith('url', {})
            }
        })
    })
})
