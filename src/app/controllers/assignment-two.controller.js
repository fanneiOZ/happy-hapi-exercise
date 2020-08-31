import searchService from '../../cores/github-search/search.service.js'

export function assignmentTwoController(req) {
    const { token } = req.query

    return searchService.searchRepositories(token)
}