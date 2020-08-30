import { transformHierarchy } from '../../cores/hierarchy-transformer/transformer.service.js'

export function assignmentOneController(req) {
    const { payload } = req

    return transformHierarchy(payload)
}
