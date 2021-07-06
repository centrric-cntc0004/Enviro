import Api from '../../../store/api'
import {
    TEAM_LIST,
    TEAM_DELETE,
    TEAM_EDIT,
    TEAM_ADD,
    TEAM_CERTIFICATE,
    TEAM_SEARCH,
    TEAM_ALL_FOLDERS_LIST,
    TEAM_FOLDER_DETAILS,

    TEAM_DESIGNATION,
    TEAM_CURRENT_LIST,
    TEAM_TERMINATED_LIST,
    TEAM_ALL_FOLDERS_LIST1


} from '../../../store/endpoint'

export const team_list = () => {
    return function (dispatch) {
        dispatch({ type: 'TEAM_FETCHING' })
        Api('get', TEAM_LIST)
            .then(response => {

                dispatch({ type: 'TEAM_FETCHING_SUCCESS', teams: response })
            })
            .catch(error => {
                dispatch({ type: 'TEAM_FETCHING_FAILED' })
            })
    }
}
export const team_list_current = () => {
    return function (dispatch) {
        dispatch({ type: 'TEAM_FETCHING' })
        Api('get', TEAM_CURRENT_LIST)
            .then(response => {
                dispatch({ type: 'TEAM_FETCHING_SUCCESS', teams: response })
            })
            .catch(error => {
                dispatch({ type: 'TEAM_FETCHING_FAILED' })
            })
    }
}
export const team_list_current1 = () => {
    return function (dispatch) {
       
        Api('get', TEAM_CURRENT_LIST)
            .then(response => {
                dispatch({ type: 'TEAM_FETCHING_SUCCESS', teams: response })
            })
            .catch(error => {
                dispatch({ type: 'TEAM_FETCHING_FAILED' })
            })
    }
}

export const team_list_term = () => {
    return function (dispatch) {
        dispatch({ type: 'TEAM_FETCHING' })
        Api('get', TEAM_TERMINATED_LIST)
            .then(response => {
                dispatch({ type: 'TEAM_FETCHING_SUCCESS', teams: response })
            })
            .catch(error => {
                dispatch({ type: 'TEAM_FETCHING_FAILED' })
            })
    }
}
export const team_list_term1 = () => {
    return function (dispatch) {
        Api('get', TEAM_TERMINATED_LIST)
            .then(response => {
                dispatch({ type: 'TEAM_FETCHING_SUCCESS', teams: response })
            })
            .catch(error => {
                dispatch({ type: 'TEAM_FETCHING_FAILED' })
            })
    }
}
export const designation_list = () => {
    return function (dispatch) {
        Api('get', TEAM_DESIGNATION)
            .then(response => {
                dispatch({ type: 'DESIGNATION_FETCHING_SUCCESS', designation: response.designations })
            })
            .catch(error => {
                dispatch({ type: 'DESIGNATION_FETCHING_FAILED' })
            })
    }
}

export const add_employee = (data, success, failed) => {

    return function (dispatch) {

        Api('post-form1', TEAM_ADD, data,success,failed)
            .then(response => {
                if(response.status===400){
                    failed(response)
                }else if(response.status===200){
                    success(response)

                }
                // dispatch(team_list())
               
            })
            .catch(err => {
                failed(response)
            })
    }

        // dispatch(team_list())

}

export const select_employee = (data) => {
    return function (dispatch) {
        dispatch({ type: 'SELECT_EMPLOYEE', employee: data })
    }
}
export const tab_employee = (data) => {
    return function (dispatch) {
        dispatch({ type: 'TAB_EMPLOYEE', tabData: data })
    }
}

export const edit_employee = (data, employee_id, success, failed) => {
    return function (dispatch) {
        // dispatch({ type: 'TEAM_FETCHING' })
        let edit_url = TEAM_EDIT + employee_id + '/'
        console.log("edit_url" + edit_url)
        Api('patch-forms', edit_url, data,success, failed)
            .then(response => {
                console.log("response"+JSON.stringify(response))
                if(response.status>=400){
                    failed(response)
                }else if(response.status===200){
                    success(response)
                    dispatch({ type: 'RESET_EMPLOYEE_DATA', employee: response })


                    dispatch(team_list())

                }
               
            })
            .catch(error => {
                if (failed) {
                    failed()
                }
            })
    }
}

export const delete_employee = (employee_id, success, failed) => {
    return function (dispatch) {
        dispatch({ type: 'DELETE_LOADING', loading: true })
        let delete_url = TEAM_DELETE + employee_id + '/'
        Api('delete', delete_url)
            .then(response => {
                success()

                dispatch({ type: 'DELETE_LOADING', loading: false })
                // dispatch({ type: 'SELECT_EMPLOYEE', employee: undefined })
                dispatch(team_list())

            })
            .catch(error => {
                failed()
                dispatch({ type: 'TEAM_FETCHING_FAILED' })
            })
    }
}

export const search_employees = (keyword) => {
    return function (dispatch) {
        let formBody = new FormData()
        formBody.append('key', keyword)
        Api(
            'post-form',
            TEAM_SEARCH,
            formBody
        ).then(response => {
            dispatch({ type: 'TEAM_FETCHING_SUCCESS', teams: response })
        })
    }
}
//Emp Home Folder Api
export const all_vehicle_folders = () => {
    return function (dispatch) {
        let a=TEAM_ALL_FOLDERS_LIST +'/1/'
        Api(
            'get',
            a
        ).then(response => {
            console.log("respobse"+JSON.stringify(response))
            dispatch({ type: 'FOLDER_FETCHING_SUCCESS', folders: response })
        })
    }
}

export const folder_details = (id) => {
    return function (dispatch) {
        let url = TEAM_FOLDER_DETAILS + id + '/'
        Api(
            'get',
            url
        ).then(response => {
            dispatch({ type: 'FOLDER_DETAILS_ETCHING_SUCCESS', folders: response })
        })
    }
}


export const certificate_list = (id) => {

    return function (dispatch) {

        // const req_url = TEAM_CERTIFICATE + id + '/'
        let a=TEAM_ALL_FOLDERS_LIST1+ id+'/'+'1/'
        console.log("kjhkjhkjhjk"+a)

        Api('get', a)
            .then(response => {
                dispatch({ type: 'FOLDER_EMP_FETCHING_SUCCESS', folders: response })
                success()
            })

            .catch(error => {
                // failed()

                dispatch({ type: 'FOLDER_FETCHING_FAILED' })
            })
    }
}
export const certificate_list1 = (id,folderid) => {

    return function (dispatch) {

        // const req_url = TEAM_CERTIFICATE + id + '/'
        let a=TEAM_ALL_FOLDERS_LIST1+ id+'/'+ folderid+'/'
        console.log("kjhkjhkjhjk"+a)

        Api('get', a)
            .then(response => {
                dispatch({ type: 'FOLDER_EMP_FETCHING_SUCCESS', folders: response })
                success()
            })

            .catch(error => {
                // failed()

                dispatch({ type: 'FOLDER_FETCHING_FAILED' })
            })
    }
}
// export const fetch_folders_inner_files = (id) => {
//     return function (dispatch) {
//         dispatch({ type: 'FOLDER_FETCHING' })
//         let get_url = TEAM_ALL_FOLDERS_LIST + id + '/'
//         Api('get', get_url).then(response => {
//             if (response.folders.length > 0) {
//                 dispatch({ type: 'FOLDERS_INNER_DATA', sub_folders: response.folders })
//             }
//         })
//     }
// }
export const certificate_list2 = (id,folderid) => {

    return function (dispatch) {

        // const req_url = TEAM_CERTIFICATE + id + '/'
        let a=TEAM_ALL_FOLDERS_LIST1+ id+'/'+ folderid+'/'
        console.log("kjhkjhkjhjk"+a)

        Api('get', a)
            .then(response => {
                dispatch({ type: 'FOLDERS_INNER_DATA', sub_folders: response.folders })
                success()
            })

            .catch(error => {
                // failed()

                dispatch({ type: 'FOLDER_FETCHING_FAILED' })
            })
    }
}





