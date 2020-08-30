import { Controller } from '../../libs/common/controller.js'
import { searchRepositories } from '../../cores/github-search/search.service.js'

export class AssignmentTwoController extends Controller {
    async handle(req) {
        const { token } = req.query

        return await searchRepositories(token)
    }
}
