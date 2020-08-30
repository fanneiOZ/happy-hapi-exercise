import { decodeToken, encodeToken, PaginationCursor } from './pagination-cursor.js'

export class GitHubSearchApi {
    /**
     * @param {GitHubV3ApiClient} apiAdaptor
     */
    constructor(apiAdaptor) {
        this.api = apiAdaptor
    }

    /**
     * @return {{repositories: [], nextToken: string}}
     */
    async searchRepositories(token = undefined) {
        const cursor = token
            ? decodeToken(token)
            : new PaginationCursor(1, 10, 'nodejs in:name', 'ASC')
        const response = await this.api.get('/search/repositories', cursor.toRequestParams())
        const { items: repositories } = response.data

        return {
            repositories,
            nextToken: encodeToken(cursor.nextPage()),
        }
    }
}
