/*
 * action 类型
 */

export const ADD_API = 'ADD_API'
export const DEL_API = 'DEL_API'
export const EDIT_API = 'EDIT_API'
export const SEARCH_API = 'SEARCH_API'
export const FILTER_API = 'FILTER_API'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

/*
 * 其它的常量
 */

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * action 创建函数
 */
let nextApiId = 0;
export const addApi = (testDate) => {
    return {
        type: ADD_API,
        id:nextApiId++,
        testDate
    }
}

export function delApi(api) {
    return { 
        type: DEL_API, 
        ...api
    }
}

export function filterApi(filter) {
    return { type: FILTER_API, filter }
}