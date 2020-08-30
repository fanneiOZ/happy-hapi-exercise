import { GitHubSearchApi } from './github-search.api.js'
import { GitHubV3ApiClient } from './github-v3-api-client.js'

const apiClient = new GitHubV3ApiClient()
const searchApi = new GitHubSearchApi(apiClient)

/**
 * @param {string | undefined} token
 */
export function searchRepositories(token) {
    return searchApi.searchRepositories(token)
}
