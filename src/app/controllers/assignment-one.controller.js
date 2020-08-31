import transformerService from '../../cores/hierarchy-transformer/transformer.service.js'

export function assignmentOneController(req) {
    const { payload } = req

    return transformerService.transformHierarchy(payload)
}
