import Axios from 'axios'
import { HttpException } from '../../libs/common/http-exception.js'

export class GitHubV3ApiClient {
    /**
     * @constructor
     * @param {string} endpoint - GitHub API endpoint
     */
    constructor(endpoint = 'https://api.github.com/') {
        this.client = Axios.create({
            baseURL: endpoint,
            timeout: 10000,
            headers: { Accept: 'application/vnd.github.v3+json' },
        })
    }

    /**
     * @param {string} url
     * @param {Object | undefined} query
     * @return {Promise<any>}
     */
    get(url, query = undefined) {
        const config = query ? { params: query } : {}

        console.log(query)

        return this.client
            .get(url, config)
            .then(response => response)
            .catch(error => {
                throw new HttpException(500, 'GitHub Api error').withCause(error)
            })
    }
}
