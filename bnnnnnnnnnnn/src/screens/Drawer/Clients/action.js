import Api from '../../../store/api'
import { CLIENT_GET, CLIENT_SEARCH, CLIENT_EDIT, CLIENT_DELETE, CLIENT_PREVIOUS_SALES ,TEMP_CLIENT_LIST,CLIENT_ASSET_CRUD} from '../../../store/endpoint'

export const fetch_client_list = (type) => {

    return function (dispatch) {
        // dispatch({ type: 'CLIENT_FETCHING' })
        let get_url = CLIENT_GET + 'alpha_asc/'+ type +'/'

        console.log("hhhhhhhhhhhh"+get_url)
        Api('get', get_url)
            .then(response => {
                dispatch({ type: 'CLIENT_LIST', clients: response })
            })
    }
}
export const fetch_client_list_init = (type) => {

    return function (dispatch) {
        dispatch({ type: 'CLIENT_FETCHING' })
        let get_url = CLIENT_GET + 'alpha_asc/'+ type +'/'

        console.log("hhhhhhhhhhhh"+get_url)
        Api('get', get_url)
            .then(response => {
                dispatch({ type: 'CLIENT_LIST_INIT', clients: response })
            })
    }
}
export const fetch_client_previous_list = (id) => {

    return function (dispatch) {
        dispatch({ type: 'CLIENT_FETCHING' })
        let get_url = CLIENT_PREVIOUS_SALES + id + '/'


        Api('get', get_url)
            .then(response => {
                dispatch({ type: 'CLIENT_PREVIOUS_LIST', clients_previous: response })
            })
    }
}
export const fetch_temp_clients = (type) => {
    return function (dispatch) {
        console.log("temp+"+TEMP_CLIENT_LIST +type +'/')
        Api('get', TEMP_CLIENT_LIST +type +'/' ).then(response => {
            // if (response.length > 0) {
                dispatch({ type: 'TEMP_CLIENTS', tempClient: response })
            // }
        })
    }
}



export const select_type_data = (data) => {
    return function (dispatch) {
        dispatch({ type: 'SELECT_TYPE_DATA', selectTypedata: data })
    }
}
export const select_location_data = (data) => {
    return function (dispatch) {
        dispatch({ type: 'SELECT_LOCATION', selectlocation: data })
    }
}
export const search_client_list = (query,data) => {
    return function (dispatch) {
        if (query) {
            let formbody = new FormData()
            formbody.append('key', query)
            Api('post', CLIENT_SEARCH +data+'/', formbody)
                .then(response => {
                    dispatch({ type: 'CLIENT_LIST', clients: response.data })
                })
        } else {
            dispatch(fetch_client_list(data))
        }
    }
}

export const select_client = (data) => {
    return function (dispatch) {
        dispatch({ type: 'SELECT_CLIENT', client: data })
    }
}

export const edit_client = (data, client_id, success, failed,type) => {

    return function (dispatch) {
        let edit_url = CLIENT_EDIT + client_id + '/'
        console.log("ress"+JSON.stringify(edit_url))

        Api('patch-forms', edit_url, data,success,failed)
            .then(response => {
                console.log("response from client"+JSON.stringify(response))

                success()
                if(response.status>=400){
                    failed(response)
                }else if(response.status===200){
                    success(response)
                    dispatch({ type: 'RESET_CLIENT_DATA', client: response })

                    dispatch(fetch_client_list(type))


                }
                

            }).catch(err => {
                failed()
            })
    }
}
export const add_client = (data, client_id, success, failed,type) => {

    return function (dispatch) {
        let edit_url = CLIENT_EDIT + client_id + '/'
        console.log("ress"+JSON.stringify(edit_url))

        Api('post-form1', edit_url, data,success,failed)
            .then(response => {
                console.log("response from client"+JSON.stringify(response))

                if(response.status===400){
                    failed(response)
                }else if(response.status===200){
                    dispatch(fetch_client_list(type))

                    success(response)


                }
                console.log("data from client"+JSON.stringify(data))

               console.log("response from client"+JSON.stringify(response))
                

            }).catch(err => {
                failed()
            })
    }
}

export const delete_client = (client_id, success, failed) => {
    return function (dispatch) {
        let delete_url = CLIENT_DELETE + client_id + '/'
        Api('delete', delete_url)
            .then(response => {
                success()
                dispatch(fetch_client_list())
            })
            .catch(err => {
                failed()
            })
    }
}

export const delete_asset = (client_id, success, failed) => {
    return function (dispatch) {
        let delete_url = CLIENT_ASSET_CRUD + client_id + '/'
        Api('delete', delete_url)
            .then(response => {
                success()
                dispatch(get_asset())
            })
            .catch(err => {
                failed()
            })
    }
}

export const post_asset = (data, success, failed,id) => {
    

return function (dispatch) {

    const success_fx = () => {
        dispatch(get_asset(id))
        success()
    }
    Api('post-form', CLIENT_ASSET_CRUD, data, success_fx, failed,id)

}
}
export const put_asset = (data, success, failed,id,id1) => {
    console.log("ffffffffffff"+JSON.stringify(data))
    return function (dispatch) {

        const success_fx = () => {
            dispatch(get_asset(id))
            success()
        }
        Api('put1', CLIENT_ASSET_CRUD +id1+'/', data,success_fx, failed)
    
    }
}
export const get_asset = (id) => {
    return function (dispatch) {
        
            
            Api('get', CLIENT_ASSET_CRUD +id+'/')
            .then(response => {
                
                dispatch({ type: 'ASSET_LIST', asset: response })
            })
        
    }
}