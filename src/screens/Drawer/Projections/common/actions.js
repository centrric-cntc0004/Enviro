import {
    OHS_NEWS_LIST, OHS_NOTIFY_LIST, OHS_NEWS_CREATE, OHS_NEWS_EDIT, OHS_NEWS_DELETE,
    OHS_NOTIFY_CREATE, OHS_NOTIFY_DELETE, OHS_NEWS_READ, OHS_NOTIFICATION_READ,
} from '../../../../store/endpoint'
import Api from '../../../../store/api'





export const fetch_news_list = (page_no) => {
    return function (dispatch) {
        dispatch({ type: 'OHS_FETCHING' })

        let get_url = `${OHS_NEWS_LIST}${page_no}/?limit=8`
        console.log(get_url)
        Api('get', get_url).then(response => {
            if (response.length > 0) {
                dispatch({ type: 'OHS_NEWS_LIST', news: response, page: page_no })
            } else {
                dispatch({ type: 'OHS_NEWS_LIST', news: [], page: page_no })
            }
        })
    }
}

export const fetch_member_name = (data) => {
    return function (dispatch) {
        dispatch({ type: 'MEMBER_NAME', membername: data })
    }
}


export const create_news = (content, success, failed) => {
    return function (dispatch) {
        let get_url = `${OHS_NEWS_CREATE}`
        Api('post', get_url, content, success, failed).then(response => {
            success(response)

            dispatch(fetch_news_list(1))
        })
            .catch(err => {
                failed(err)
            })
    }
}


export const edit_news = (pageNo, id, content, success, failed) => {
    return function (dispatch) {
        let get_url = `${OHS_NEWS_EDIT}${id}/`

        Api('patch-form', get_url, content, success, failed).then(response => {

            success(response)
            dispatch(fetch_news_list(pageNo))

        })
            .catch(err => {
                failed(err)
            })
    }
}

export const delete_news = (pageNo, id, success, failed) => {
    return function (dispatch) {
        let get_url = `${OHS_NEWS_DELETE}${id}/`
        Api('delete', get_url, '', success, failed).then(response => {
            if (response) {
                dispatch(fetch_news_list(pageNo))
            }
        })
    }
}

export const delete_notify = (pageNo, id, success, failed) => {
    return function (dispatch) {
        let get_url = `${OHS_NOTIFY_DELETE}${id}/`
        Api('delete', get_url, '', success, failed).then(response => {

            if (response) {
                 dispatch(fetch_notify_list(pageNo))
            }
        })
    }
}

export const read_news = (pageNo, id) => {
    return function (dispatch) {
        let get_url = `${OHS_NEWS_READ}${id}/`
        Api('get', get_url).then(response => {
            if (response) {
                dispatch(fetch_news_list(pageNo))
            }
        })
    }
}
export const select_data = (data) => {
    return function (dispatch) {
        dispatch({ type: 'SELECT_DATA', selectdata: data })
    }
}

export const read_notify = (pageNo, id) => {
    return function (dispatch) {
        let get_url = `${OHS_NOTIFICATION_READ}${id}/`
        Api('get', get_url).then(response => {
            console.log("jhgjhuguj"+JSON.stringify(response))
            dispatch(fetch_notify_list(pageNo))

            if (response) {
                dispatch(fetch_notify_list(pageNo))
            }
        })
    }
}

export const fetch_notify_list = (page_no) => {
    return function (dispatch) {
        dispatch({ type: 'OHS_FETCHING' })

        let get_url = `${OHS_NOTIFY_LIST}${page_no}/?limit=20`
        console.log(get_url)
        Api('get', get_url).then(response => {
            if (response) {
                dispatch({ type: 'OHS_NOTIFICATION_LIST', notifications: response, page: page_no })
            }
        })
    }
}



export const create_notify = (content, success, failed) => {
    return function (dispatch) {
        let get_url = `${OHS_NOTIFY_CREATE}`
        Api('post', get_url, content, success, failed).then(response => {
           console.log("responseujjjjjjjjjjjjjjjjjjjjjjjjjj"+JSON.stringify(response))
            success(response)

            dispatch(fetch_notify_list(1))
        })
            .catch(err => {
                failed(err)
            })
    }
}







export const fetch_member_list = (data) => {
    return function (dispatch) {
        dispatch({ type: 'MEMBER_LIST', memberlist: data })
    }
}