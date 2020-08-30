import { Controller } from '../../libs/common/controller.js'
import {
    HierarchyTransformerService,
} from '../../cores/hierarchy-transformer/hierarchy-transformer.service.js'

export class AssignmentOneController extends Controller {
    async handle(req) {
        const { payload } = req

        return new HierarchyTransformerService().execute(payload)
    }
}
