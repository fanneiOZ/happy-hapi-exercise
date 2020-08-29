import { Controller } from '../../libs/common/controller'
import {
    HierarchyTransformerService,
} from '../../cores/hierarchy-transformer/hierarchy-transformer.service'

export class AssignmentOneController extends Controller {
    async handle(req) {
        const { payload } = req

        return new HierarchyTransformerService().execute(payload)
    }
}
