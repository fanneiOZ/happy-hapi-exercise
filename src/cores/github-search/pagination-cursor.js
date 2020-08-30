import btoa from 'btoa'
import atob from 'atob'
import { HttpException } from '../../libs/common/http-exception.js'

export class PaginationCursor {
    /**
     * @constructor
     * @param {number} page
     * @param {number} perPage
     * @param {string} query
     * @param {'ASC' | 'DESC'} sort
     */
    constructor(page, perPage, query, sort) {
        this.page = page
        this.query = query
        this.perPage = perPage
        this.sort = sort
    }

    /**
     * @return {{
     *      perPage: number,
     *      lastPage: boolean,
     *      query: string,
     *      page: number,
     *      sort: ("ASC"|"DESC")
     * } | undefined}
     */
    toJSON() {
        const data = {
            page: this.page,
            perPage: this.perPage,
            query: this.query,
            sort: this.sort,
            lastPage: this.lastPage,
        }

        return !this.lastPage ? data : undefined
    }

    /**
     * @return {{next_page: number, q: string, sort: string}}
     */
    toRequestParams() {
        return {
            per_page: this.perPage,
            q: this.query,
            sort: this.sort,
            page: this.page,
        }
    }

    /**
     * @return {PaginationCursor}
     */
    nextPage() {
        this.page += this.lastPage ? 0 : 1

        return this
    }

    /**
     * End the cursor
     * @return {PaginationCursor}
     */
    end() {
        this.lastPage = true

        return this
    }
}

/**
 * @param {string} token
 * @return {PaginationCursor}
 * @throws HttpException
 */
export function decodeToken(token) {
    const payload = JSON.parse(atob(token))

    if (!(payload.page && payload.perPage && payload.query && payload.sort)) {
        throw new HttpException(400, 'Invalid pagination cursor')
    }
    return new PaginationCursor(payload.page, payload.perPage, payload.query, payload.sort)
}

/**
 * @param {PaginationCursor} cursor
 * @return {*|undefined}
 */
export function encodeToken(cursor) {
    return cursor ? btoa(JSON.stringify(cursor)) : undefined
}
