import { jest } from '@jest/globals'
import { assignmentTwoController } from '../../../src/app/controllers/assignment-two.controller.js'
import searchService from '../../../src/cores/github-search/search.service.js'

jest.mock('../../../src/cores/github-search/search.service.js')

describe('Assignment two controller', () => {
    test('Should call service with request payload', () => {
        const query = { token: 'abc' }
        jest.spyOn(searchService, 'searchRepositories').mockReturnValue([{ test: true }])

        const output = assignmentTwoController({ query })

        expect(output).toStrictEqual([{ test: true }])
        expect(searchService.searchRepositories).toHaveBeenCalledTimes(1)
        expect(searchService.searchRepositories).toHaveBeenCalledWith('abc')
    })
})
