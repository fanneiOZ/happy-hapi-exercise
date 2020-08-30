import {
    extractChildren,
    transformHierarchy,
} from '../../../src/cores/hierarchy-transformer/transformer.service.js'

describe('Hierarchy transformer services', () => {
    describe('extractChildren', () => {
        test('Should return empty list of children when node is undefined', () => {
            const givenNodeMap = new Map()

            const output = extractChildren(givenNodeMap, 1)

            expect(output).toHaveLength(0)
        })

        test('Should return list of children when node is defined', () => {
            const expectedOutput = [{ id: 'children2', children: [] }]
            const givenNodeMap = new Map().set(1, [{ id: 'children2', children: [] }])

            const output = extractChildren(givenNodeMap, 1)

            expect(output).toStrictEqual(expectedOutput)
        })

        test('Should return list of children recursively when node is defined', () => {
            const expectedOutput = [
                { id: 2, children: [{ id: 3, children: [{ id: 4, children: [] }] }] },
            ]
            const givenNodeMap = new Map()
                .set(1, [{ id: 2, children: [{ id: 3, children: [] }] }])
                .set(2, [{ id: 3, children: [{ id: 4, children: [] }] }])
                .set(3, [{ id: 4, children: [] }])

            const output = extractChildren(givenNodeMap, 1)

            expect(output).toStrictEqual(expectedOutput)
        })
    })

    describe('transformHierarchy', () => {
        test('Should transform properly', () => {
            const payload = {
                0: [{ id: 10, title: 'House', level: 0, children: [], parent_id: null }],
                1: [
                    { id: 12, title: 'Red Roof', level: 1, children: [], parent_id: 10 },
                    { id: 18, title: 'Blue Roof', level: 1, children: [], parent_id: 10 },
                    { id: 13, title: 'Wall', level: 1, children: [], parent_id: 10 },
                ],
                2: [
                    { id: 17, title: 'Blue Window', level: 2, children: [], parent_id: 12 },
                    { id: 16, title: 'Door', level: 2, children: [], parent_id: 13 },
                    { id: 15, title: 'Red Window', level: 2, children: [], parent_id: 12 },
                ],
            }
            const expectedOutput = [
                {
                    id: 10,
                    title: 'House',
                    level: 0,
                    children: [
                        {
                            id: 12,
                            title: 'Red Roof',
                            level: 1,
                            children: [
                                {
                                    id: 17,
                                    title: 'Blue Window',
                                    level: 2,
                                    children: [],
                                    parent_id: 12,
                                },
                                {
                                    id: 15,
                                    title: 'Red Window',
                                    level: 2,
                                    children: [],
                                    parent_id: 12,
                                },
                            ],
                            parent_id: 10,
                        },
                        {
                            id: 18,
                            title: 'Blue Roof',
                            level: 1,
                            children: [],
                            parent_id: 10,
                        },
                        {
                            id: 13,
                            title: 'Wall',
                            level: 1,
                            children: [
                                {
                                    id: 16,
                                    title: 'Door',
                                    level: 2,
                                    children: [],
                                    parent_id: 13,
                                },
                            ],
                            parent_id: 10,
                        },
                    ],
                    parent_id: null,
                },
            ]

            const output = transformHierarchy(payload)

            expect(output).toStrictEqual(expectedOutput)
        })
    })
})
