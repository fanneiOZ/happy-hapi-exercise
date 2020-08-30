import { HierarchyTransformerService } from '../../../src/cores/hierarchy-transformer/hierarchy-transformer.service.js'

describe('Hierarchy transformer services', () => {
    describe('getChildren', () => {
        test('Should return empty list of children when node is undefined', () => {
            const givenNodeMap = new Map()

            const output = new HierarchyTransformerService().getChildren(givenNodeMap, 1)

            expect(output).toHaveLength(0)
        })

        test('Should return list of children when node is defined', () => {
            const expectedOutput = [{ id: 'children2', children: [] }]
            const givenNodeMap = new Map().set(1, [{ id: 'children2', children: [] }])

            const output = new HierarchyTransformerService().getChildren(givenNodeMap, 1)

            expect(output).toStrictEqual(expectedOutput)
        })
    })
})
