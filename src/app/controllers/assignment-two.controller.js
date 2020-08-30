import { Controller } from '../../libs/common/controller.js'
import { searchRepositories } from '../../cores/github-search/search.service.js'

export class AssignmentTwoController extends Controller {
    async handle(req) {
        try {
            const { query } = req
            const pageToken = query.pageToken ? query.pageToken : undefined

            return await searchRepositories(pageToken)
        } catch (e) {
            console.log(e)
            throw e
        }
    }
}
