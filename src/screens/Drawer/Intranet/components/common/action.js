import Api from '../../../../../store/api'
import {
    INTRANET_FOLDERS_FILES, INTRANET_INNER_FOLDERS, OHS_AND_S_FOLDERS,
    INTRANET_FOLDERS_CREATE,
    INTRANET_FOLDERS_EDIT,
    INTRANET_FOLDERS_DELETE,
    INTRANET_FILE_CREATE,
    INTRANET_FILE_DELETE,
    INTRANET_FILE_EDIT,




    INTRANET_FOLDERS_SEARCH
} from "../../../../../store/endpoint"

export const fetch_folders_files = () => {
    return function (dispatch) {
        dispatch({ type: 'FOLDER_FETCHING' })
        let get_url = INTRANET_FOLDERS_FILES + '1/'
        Api('get', get_url).then(response => {
            if (response.folders.length > 0) {
                dispatch({ type: 'INTRANET_FOLDERS_DATA', folders: response.folders })
            }
        })
    }
}


export const fetch_ohs_folders_files = () => {
    return function (dispatch) {
        dispatch({ type: 'FOLDER_FETCHING' })
        let get_url = OHS_AND_S_FOLDERS + '1/'
        Api('get', get_url).then(response => {
            if (response.folders.length > 0) {
                dispatch({ type: 'INTRANET_FOLDERS_DATA', folders: response.folders })
                
                dispatch({ type: 'FILES_LIST', filedata: response.folders[0].files })
                dispatch({ type: 'FOLDER_LIST', folderdata: response.folders[0].folders })


            }
        })
    }
}
// export const search_folder_list = (query) => {
//     return function (dispatch) {
//         if (query) {
//             let formbody = new FormData()
//             formbody.append('key', query)
//             Api('post', INTRANET_FOLDERS_SEARCH, formbody)
//                 .then(response => {
//                     console.log("response"+JSON.stringify(response))
//                      dispatch({ type: 'INTRANET_FOLDERS_DATA', folders: response.data })
//                 })
//         } else {
//             dispatch(fetch_ohs_folders_files())
//         }
//     }
// }
export const fetch_ohs_folders_inner_files = (id) => {
    return function (dispatch) {
        dispatch({ type: 'FOLDER_FETCHING' })
        let get_url = OHS_AND_S_FOLDERS + id + '/'
        Api('get', get_url).then(response => {
            console.log("responsedata"+JSON.stringify( OHS_AND_S_FOLDERS + id + '/'))

            console.log("responsedata"+JSON.stringify(response))
            if (response.folders.length > 0) {
                dispatch({ type: 'INTRANET_FOLDERS_INNER_DATA', sub_folders: response.folders })
            }
        })
    }
}

export const fetch_folders_inner_files = (id) => {
    return function (dispatch) {
        dispatch({ type: 'FOLDER_FETCHING' })
        let get_url = INTRANET_FOLDERS_FILES + id + '/'
        Api('get', get_url).then(response => {
            if (response.folders.length > 0) {
                dispatch({ type: 'INTRANET_FOLDERS_INNER_DATA', sub_folders: response.folders })
            }
        })
    }
}

export const fetch_inner_files = () => {
    return function (dispatch) {
        Api('get', INTRANET_INNER_FOLDERS).then(response => {
            if (response.length > 0) {
                dispatch({ type: 'INTRANET_INNER_FILES', files: response })
            }
        })
    }
}
export const add_folder = (data, success, failed) => {

    return function (dispatch) {
        Api('post-form1', INTRANET_FOLDERS_CREATE, data, success, failed)
            .then(response => {
                console.log("responseuuuuuuu"+JSON.stringify(response))
                if (response.data.status === 400) {
                    failed(response)
                } else if (response.data.status === 200) {
                    success(response)
                   dispatch(fetch_ohs_folders_files()) 
                }
            })
            .catch(err => {
                // failed(response)
            })
    }

}
export const add_file = (id,data, success, failed) => {
    console.log("datdaread")
    return function (dispatch) {
        Api('post-form1', INTRANET_FILE_CREATE, data, success, failed)
            .then(response => {
                console.log("ggggggggggg"+JSON.stringify(response))
                if (response.data.status === 400) {
                    failed(response)
                } else if (response.data.status === 200) {
                    success(response)
                   dispatch(fetch_ohs_folders_inner_files(id)) 
                }
            })
            .catch(err => {
                // failed(response)
            })
    }

}
export const edit_file = (id, success, failed) => {

    return function (dispatch) {
        Api('put', INTRANET_FILE_EDIT +id+'/', success, failed)
            .then(response => {
                if (response.status === 400) {
                    failed(response)
                } else if (response.status === 200) {
                    success(response)
                    dispatch(fetch_ohs_folders_files()) 


                }
            })
            .catch(err => {
                // failed(response)
            })
    }

}
export const edit_folder = (id,data, success, failed) => {
    return function (dispatch) {
        const success_fx = (res) => {
            dispatch(fetch_ohs_folders_files())
            success()
        }
        Api('put1', INTRANET_FOLDERS_EDIT +id+'/', data, success_fx, failed)
    }
}


export const delete_folder = (employee_id, success, failed) => {
    return function (dispatch) {
        let delete_url = INTRANET_FOLDERS_DELETE + employee_id + '/'
        Api('delete', delete_url)
            .then(response => {
                success()

               
                // dispatch({ type: 'SELECT_EMPLOYEE', employee: undefined })
                dispatch(fetch_ohs_folders_files())

            })
            .catch(error => {
                failed()
            })
    }
}
