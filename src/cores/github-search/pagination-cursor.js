import btoa from 'btoa'
import atob from 'atob'
import { HttpException } from '../../libs/common/http-exception.js'

export class PaginationCursor {
    /**
     * @constructor
     * @param {number} page
     * @param {number} perPage
     * @param {string} query
     * @param sort
     */
    constructor(page, perPage, query, sort) {
        this.page = page
        this.query = query
        this.perPage = perPage
        this.sort = sort
    }

    /**
     * @return {{nextPage: number, query: string, sort: *}}
     */
    toJSON() {
        return {
            page: this.page,
            perPage: this.perPage,
            query: this.query,
            sort: this.sort,
        }
    }

    /**
     * @return {{next_page: number, q: string, sort: *}}
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
        this.page += 1

        return this
    }
}

/**
 * @param {string} token
 * @return {PaginationCursor}
 */
export function decodeToken(token) {
    try {
        const payload = JSON.parse(atob(token))
        return new PaginationCursor(payload.page, payload.perPage, payload.query, payload.sort)
    } catch (e) {
        throw new HttpException(400, 'Invalid pagination cursor')
    }
}

/**
 * @param {PaginationCursor} cursor
 * @return {*}
 */
export function encodeToken(cursor) {
    return btoa(JSON.stringify(cursor))
}
