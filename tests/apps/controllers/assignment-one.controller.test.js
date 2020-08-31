import { jest } from '@jest/globals'
import transformerService from '../../../src/cores/hierarchy-transformer/transformer.service.js'
import { assignmentOneController } from '../../../src/app/controllers/assignment-one.controller.js'

jest.mock('../../../src/cores/hierarchy-transformer/transformer.service.js')

describe('Assignment one controller', () => {
    test('Should call service with request payload', () => {
        const payload = { a: 1, b: 2, c: 3 }
        jest.spyOn(transformerService, 'transformHierarchy').mockReturnValue([{ test: true }])

        const output = assignmentOneController({ payload })

        expect(output).toStrictEqual([{ test: true }])
        expect(transformerService.transformHierarchy).toHaveBeenCalledTimes(1)
        expect(transformerService.transformHierarchy).toHaveBeenCalledWith(payload)
    })
})
