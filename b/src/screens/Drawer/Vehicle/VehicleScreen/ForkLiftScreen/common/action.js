import Api from '../../../../../../store/api'
import {
    VEHICLE_GET,

    VEHICLE_FORKLIFT_MAINTANACE_GET,
    VEHICLE_FORKLIFT_MAINTANACE_SEARCH,
    VEHICLE_ALL_GET,
    VEHICLE_FORKLIFT_MAINTANACE_EDIT,
    VEHICLE_FORKLIFT_MAINTANACE_ADD,
    VEHICLE_FORKLIFT_MAINTANACE_DELETE,
    VEHICLE_TRUCK_PREINSPECTION,
    VEHICLE_TRUCK_FUEL_GET,
    VEHICLE_TRUCK_FUEL_ADD,
    VEHICLE_TRUCK_FUEL_EDIT
} from '../../../../../../store/endpoint'



export const fetch_forklift_list = (page) => {
    return function (dispatch) {
        let get_url = VEHICLE_TRUCK_FUEL_GET  + 'fork-lift/' + page + '/'
        console.log(VEHICLE_TRUCK_FUEL_GET  + 'fork-lift/' + page + '/')
        Api('get', get_url)
            .then(response => {
                if (response.length > 0) {
                    dispatch({ type: 'FORKLIFT_LIST', forkliftlist: response, page: page })
                }
            })
    }
}
export const __edit_fuel = (maintanace_id, data, success, failed, page_no) => {
    return function (dispatch) {
        let edit_url = `${VEHICLE_TRUCK_FUEL_EDIT + maintanace_id}/`

        const success_res = () => {
            success()
            dispatch(fetch_forklift_list(page_no))
        }
        Api('patch-form', edit_url, data, success_res, failed)
            .then(response => {
                // console.log(response)
            })
    }
}

export const __create_fuel = (data, success, failed) => {
    return function (dispatch) {
        const success_res = () => {
            success()
            dispatch(fetch_forklift_list(1))
        }
        Api('post-form', VEHICLE_TRUCK_FUEL_ADD, data, success_res, failed)
            .then(response => {
                // console.log(response)
            })
    }
}

export const fetch_all_forklift_list = () => {
    return function (dispatch) {
        let get_url = VEHICLE_ALL_GET + 'fork-lift/'
        console.log("jkjj"+get_url)
        Api('get', get_url)
            .then(response => {
                if (response.length > 0) {
                    dispatch({ type: 'ALL_FORKLIFT_LIST', forklifts: response })
                }
            })
    }
}





export const __select_vehicle = (forklift) => {
    return function (dispatch) {
        dispatch({ type: 'SELECT_FORKLIFT', forklift: forklift })
    }
}




//                  MAINTANANCE
//

export const fetch_maintanace_list = (page) => {
    return function (dispatch) {
        dispatch({ type: 'FORKLIFT_FETCHING' })
        let get_url = VEHICLE_FORKLIFT_MAINTANACE_GET + page + '/'
        Api('get', get_url)
            .then(response => {
                if (response.length > 0) {
                    dispatch({ type: 'FORKLIFT_MAINTANACE_LIST', maintanace: response, page: page })
                }
            })
    }
}



export const search_maintanance_list = (query) => {
    return function (dispatch) {
        if (query) {
            let formbody = new FormData()
            formbody.append('key', query)
            Api('post', VEHICLE_FORKLIFT_MAINTANACE_SEARCH, formbody)
                .then(response => {
                    dispatch({ type: 'FORKLIFT_MAINTANACE_LIST', maintanace: response })
                })
        } else {
            dispatch(fetch_maintanace_list(1))
        }
    }
}

export const __select_maintanace = (maintanace) => {
    return function (dispatch) {
        dispatch({ type: 'SELECT_MAINTANACE', maintanace: maintanace })
    }
}



export const __edit_maintanace = (maintanace_id, data, success, failed, page_no) => {
    return function (dispatch) {
        let edit_url = `${VEHICLE_FORKLIFT_MAINTANACE_EDIT + maintanace_id}/`
        const success_res = () => {
            success()
            dispatch(fetch_maintanace_list(1))
        }
        Api('patch-form', edit_url, data, success_res, failed)
            .then(response => {
                
            })
    }
}



export const __create_maintanace = (data, success, failed) => {
    return function (dispatch) {
        const success_res = () => {
            success()
            dispatch(fetch_maintanace_list(1))
        }
        Api('post-form', VEHICLE_FORKLIFT_MAINTANACE_ADD, data, success_res, failed)
            .then(response => {
                // console.log(response)
            })
    }
}



export const __delete_maintanace = (maintanace_id, success, failed, page_no) => {
    return function (dispatch) {
        const success_res = () => {
            success()
            dispatch(fetch_maintanace_list(page_no))
        }
        let delete_url = `${VEHICLE_FORKLIFT_MAINTANACE_DELETE + maintanace_id}/`
        Api('delete', delete_url, '', success_res, failed)
            .then(response => {
                // console.log(response)
            })
    }
}

export const fetch_preinspection_list = () => {

    return function (dispatch) {
        dispatch({ type: 'TRUCK_FETCHING' })

        let get_url = VEHICLE_TRUCK_PREINSPECTION +'fork-lift/'

        Api('get', get_url)
            .then(response => {

                if (response.length > 0) {

                    dispatch({ type: 'TRUCK_PREINSPECTION_LIST', preinspect: response })

                }
            })
    }
}

export const __create_preinspection = (data, success, failed) => {
    return function (dispatch) {
        const success_res = () => {
            success()
            dispatch(fetch_maintanace_list(1))
        }
        Api('post-form1', VEHICLE_TRUCK_PREINSPECTION +'fork-lift/', data, success_res, failed)
            .then(response => {
                if(response.status===400){
                    failed(response)
                }else if(response.status===200){
                    success(response)

                }
            })
    }
}
// pre ins:fork-lift/




