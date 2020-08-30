import { searchRepositories } from '../../cores/github-search/search.service.js'

export function assignmentTwoController(req) {
    const { token } = req.query

    return searchRepositories(token)
}