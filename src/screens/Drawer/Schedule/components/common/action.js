import Api from '../../../../../store/api'
import {
    SCHEDULE_LIST_WASTE,
    SCHEDULE_STATUS_CHANGE,
    SCHEDULE_JOB_CARD,
    SCHEDULE_IMAGE_ADD,
    SCHEDULE_SIGNATURE_ADD,
    SCHEDULE_COMMENT_VIEW,
    SCHEDULE_JOB_CARD1,
    SCHEDULE_DETAILS


} from '../../../../../store/endpoint'

export const schedule_list = (date, type) => {

    return function (dispatch) {
        dispatch({ type: 'SCHEDULE_FETCHING' })
        let url = SCHEDULE_LIST_WASTE + type + "/" + '?limit=200&from=' + date + '&to=' + date
           console.log("schedule"+url)
        Api('get', url)
            .then(response => {
                dispatch({ type: 'SCHEDULE_FETCHING_SUCCESS', schedule: response })
            })
            .catch(error => {
                dispatch({ type: 'SCHEDULE_FETCHING_FAILED' })
            })
    }
}
export const complete_schedule_list = (type) => {

    return function (dispatch) {
        dispatch({ type: 'SCHEDULE_FETCHING' })
        let url = SCHEDULE_LIST_WASTE + type + '/' + '?limit=200'
        console.log("complete"+url)


        Api('get', url)
            .then(response => {
                dispatch({ type: 'COMPLETE_SCHEDULE_FETCHING_SUCCESS', complete: response })
            })
            .catch(error => {
                dispatch({ type: 'COMPLETE_SCHEDULE_FETCHING_FAILED' })
            })
    }
}
export const complete_schedule_list1 = (date,type) => {

    return function (dispatch) {
        dispatch({ type: 'SCHEDULE_FETCHING' })
        let url = SCHEDULE_LIST_WASTE + type + "/" + '?limit=200&from=' + date + '&to=' + date
        console.log("complete"+url)


        Api('get', url)
            .then(response => {
                dispatch({ type: 'COMPLETE_SCHEDULE_FETCHING_SUCCESS', complete: response })
            })
            .catch(error => {
                dispatch({ type: 'COMPLETE_SCHEDULE_FETCHING_FAILED' })
            })
    }
}
export const daywise_schedule_list = (date, date1, type) => {
    return function (dispatch) {
        dispatch({ type: 'SCHEDULE_FETCHING' })
        let url = SCHEDULE_LIST_WASTE + type + '/' + '?limit=200&from=' + date + '&to=' + date1
        console.log("day"+url)

        Api('get', url)
            .then(response => {
                dispatch({ type: 'DAYWISE_SCHEDULE_FETCHING_SUCCESS', dayschedule: response })
            })
            .catch(error => {
                dispatch({ type: 'DAYWISE_SCHEDULE_FETCHING_FAILED' })
            })
    }
}

export const job_card_list = (job_id) => {

    return function (dispatch) {
        dispatch({ type: 'SCHEDULE_FETCHING' })
        let url = SCHEDULE_JOB_CARD1 + job_id + '/'
        console.log("gggggggggggggggg"+url)
        Api('get', url)
            .then(response => {
                dispatch({ type: 'JOBCARD_FETCHING_SUCCESS', jobcard: response })
            })
            .catch(error => {
                dispatch({ type: 'JOBCARD_FETCHING_FAILED' })
            })
    }
}

export const select_date = (date) => {
    return function (dispatch) {
        dispatch({ type: 'SELECT_DATE', selectDate: date })
    }
}
export const select_data = (data) => {
    return function (dispatch) {
        // dispatch({ type: 'SCHEDULE_FETCHING' })
        // let url = SCHEDULE_DETAILS + data+'/'
        //    console.log("schedule"+url)
        // Api('get', url)
        //     .then(response => {
                dispatch({ type: 'SELECT_DATA', selectData: data })
                // dispatch({ type: 'SCHEDULE_FETCHING_SUCCESS', schedule: response })
    //         })
    //         .catch(error => {
    //             dispatch({ type: 'SCHEDULE_FETCHING_FAILED' })
    //         })
    
    //     // dispatch({ type: 'SELECT_DATA', selectData: data })
    }
}

export const select_comment = (data) => {
    return function (dispatch) {
        dispatch({ type: 'SELECT_COMMENT', selectComment: data })
    }
}
export const select_images = (data) => {
    return function (dispatch) {
        dispatch({ type: 'SELECT_IMAGES', selectImage: data })
    }
}
export const select_type = (data) => {
    return function (dispatch) {
        console.log("hhhhhhhhhhhhhhhhhhgggggggggggg"+data)
        dispatch({ type: 'SELECT_TYPE', selectType: data })
    }
}
export const select_status = (data) => {
    return function (dispatch) {
        dispatch({ type: 'SELECT_STATUS', selectStatus: data })
    }
}



export const status_change = (data, date, success, failed, datee, type) => {

    return function (dispatch) {
        Api('put', SCHEDULE_STATUS_CHANGE, data)
            .then(response => {
                success()
                dispatch(schedule_list(date, datee))
                dispatch(complete_schedule_list(datee))
                dispatch(daywise_schedule_list(date, date, datee))



            }).catch(err => {
                failed()
            })
    }
}
export const __edit_comment = (id, data, success, failed, date, type) => {
    return function (dispatch) {
        let edit_url = `${SCHEDULE_COMMENT_VIEW + id}/`
        const success_res = () => {
            success()
            dispatch(schedule_list(date, type))
            dispatch(complete_schedule_list(type))
            dispatch(daywise_schedule_list(date, date, type))


        }
        Api('patch-form', edit_url, data, success_res, failed)
            .then(response => {
            })
    }
}


export const __create_comment = (data, success, failed, date, type) => {
    return function (dispatch) {
        const success_res = () => {

            success()
            dispatch(fetch_comment_list())
            dispatch(schedule_list(date, type))
            dispatch(complete_schedule_list(type))
            dispatch(daywise_schedule_list(date, date, type))


        }
        Api('post-form', SCHEDULE_COMMENT_VIEW, data, success_res, failed)
            .then(response => {
                // dispatch({ type: 'RESET_COMMENT_DATA', comment_data: response })

            })
    }
}
export const add_image = (data, success, failed, date, type) => {

    return function (dispatch) {
        const success_res = () => {
            success()
            dispatch(schedule_list(date, type))
            dispatch(complete_schedule_list(type))
            dispatch(daywise_schedule_list(date, date, type))
        }
        console.log(SCHEDULE_IMAGE_ADD)
        Api('post-form', SCHEDULE_IMAGE_ADD, data, success_res, failed)
            .then(response => {
                console.log("jsghhjsghsa"+JSON.stringify(response))
            })
    }
}
export const add_signature = (data, success, failed, date, type) => {
    return function (dispatch) {
        const success_res = () => {
            success()
            dispatch(schedule_list(date, type))
            dispatch(complete_schedule_list(type))

        }
        Api('post-form', SCHEDULE_SIGNATURE_ADD, data, success_res, failed)
            .then(response => {

            })
    }
}


export const fetch_comment_list = () => {

    return function (dispatch) {
        dispatch({ type: 'SCHEDULE_FETCHING' })
        let url = SCHEDULE_COMMENT_VIEW


        Api('get', url)
            .then(response => {
                dispatch({ type: 'COMMENT_FETCHING_SUCCESS', comment: response })
            })
            .catch(error => {
                dispatch({ type: 'COMMENT_FETCHING_FAILED' })
            })
    }
}

export const delete_comment = (id, success, failed, date, type) => {
    return function (dispatch) {
        let delete_url = SCHEDULE_COMMENT_VIEW + id + '/'
        console.log(delete_url)
        Api('delete', delete_url)
            .then(response => {
                success()
                dispatch(fetch_comment_list())
                dispatch(schedule_list(date, type))

            })
            .catch(err => {
                failed()
                dispatch(fetch_comment_list())

            })
    }
}
















