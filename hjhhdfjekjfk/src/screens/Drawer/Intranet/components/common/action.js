import Api from '../../../../../store/api'
import { INTRANET_FOLDERS_FILES, INTRANET_INNER_FOLDERS,OHS_AND_S_FOLDERS ,INTRANET_FOLDERS_SEARCH} from "../../../../../store/endpoint"

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
                console.log("kjasghdfkjshfkhsdkjhhhhhhhh"+JSON.stringify(response.folders))
                console.log("kjasghdfkjshfkhsdkj"+JSON.stringify(response.folders[0].files))

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
        let get_url = OHS_AND_S_FOLDERS + id +'/'
        Api('get', get_url).then(response => {
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