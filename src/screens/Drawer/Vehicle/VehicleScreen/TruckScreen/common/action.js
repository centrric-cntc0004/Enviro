import Api from '../../../../../../store/api'
import {
    
    VEHICLE_TRUCK_MAINTANACE_GET,
    VEHICLE_TRUCK_MAINTANACE_SEARCH,
    VEHICLE_TRUCK_MAINTANACE_ADD,
    VEHICLE_TRUCK_FUEL_ADD,
    VEHICLE_TRUCK_PREINSPECTION,
    VEHICLE_SEARCH

} from '../../../../../../store/endpoint'

// ******************************************************
//                      T R U C K
// ******************************************************

export const fetch_truck_list = (page,type) => {
    return function (dispatch) {
        let get_url = VEHICLE_TRUCK_MAINTANACE_GET +type + '/' + 'truck' +'/all/' + page + '/'

        console.log(get_url)
        Api('get', get_url)
            .then(response => {
                if (response.length > 0) {
                    dispatch({ type: 'TRUCK_LIST', trucks: response, page: page })
                }
            })
    }
}


export const fetch_all_truck_list = (type) => {
    return function (dispatch) {

        let get_url = VEHICLE_TRUCK_MAINTANACE_GET +type+ '/truck/list/'
        Api('get', get_url)
            .then(response => {
                 console.log("response"+response)
                if (response.length > 0) {
                    dispatch({ type: 'ALL_TRUCK_LIST', trucks: response })
                }
            })
    }
}


export const complete_vehicle_list = (data) => {
    return function (dispatch) {
        dispatch({ type: 'COMPLETE_VEHICLE_LIST', vehicle_list: data })
    }
}


export const vehicle_list_pagination1 = (page,type) => {

    return function (dispatch) {
        dispatch({ type: 'TRUCK_FETCHING' })
        let get_url = VEHICLE_GET +type + '/' + 'truck' +'/all/' + page + '/'
        Api('get', get_url)
            .then(response => {
                
                if (response) {
                    dispatch({ type: 'VEHICLE_LIST_PAGINATION', vehicle_page: response })
                }
            })
    }
}

export const __select_vehicle = (truck) => {
    return function (dispatch) {
        dispatch({ type: 'SELECT_TRUCK', truck: truck })
    }
}




// ******************************************************
//                  M A I N T A N A N C E
// ******************************************************


export const fetch_maintanace_list = (page,type) => {

    return function (dispatch) {
        dispatch({ type: 'TRUCK_FETCHING' })
        let get_url = VEHICLE_TRUCK_MAINTANACE_GET +type+ '/truck/'+ 'maintenance/reports/'+ page + '/'
        Api('get', get_url)
            .then(response => {
                console.log("main"+response)
                if (response.length > 0) {
                    dispatch({ type: 'TRUCK_MAINTANACE_LIST', maintanace: response, page: page })
                }
            })
    }
}


export const search_maintanance_list = (query,type) => {
    return function (dispatch) {
        if (query) {
            let formbody = new FormData()
            formbody.append('key', query)
            Api('post', VEHICLE_TRUCK_MAINTANACE_SEARCH, formbody)
                .then(response => {
                    dispatch({ type: 'TRUCK_MAINTANACE_LIST', maintanace: response })
                })
        } else {
            dispatch(fetch_maintanace_list(1,type))
        }
    }
}


export const __select_maintanace = (maintanace) => {
    return function (dispatch) {
        dispatch({ type: 'SELECT_TRUCK_MAINTANACE', maintanace: maintanace })
    }
}


export const __edit_maintanace = (type,maintanace_id, data, success, failed, page_no) => {

    return function (dispatch) {
        let edit_url = VEHICLE_TRUCK_MAINTANACE_GET +type+ '/truck/maintenance/report/edit/'+maintanace_id+'/'
        console.log(edit_url)

        const success_res = () => {
            success()
            dispatch(fetch_maintanace_list(page_no,type))
        }
        Api('patch-forms', edit_url, data, success, failed)
            .then(response => {
                
                if(response.status===400){
                    failed(response)
                }else if(response.status===200){
                    success(response)
                    dispatch(fetch_maintanace_list(1,type))

                }
            })
    }
}


export const __create_maintanace = (type,data, success, failed) => {
    return function (dispatch) {
        const success_res = () => {
            success()
            dispatch(fetch_maintanace_list(1,type))
        }
        Api('post-form1', VEHICLE_TRUCK_MAINTANACE_ADD, data, success_res, failed)
            .then(response => {
                if(response.status===400){
                    failed(response)
                }else if(response.status===200){
                    success(response)
                    dispatch(fetch_maintanace_list(1,type))

                }
            })
    }
}



export const __delete_maintanace = (type,maintanace_id, success, failed, page_no) => {
    return function (dispatch) {
        const success_res = () => {
            success()
            dispatch(fetch_maintanace_list(page_no,type))
        }
        let delete_url = VEHICLE_TRUCK_MAINTANACE_GET +type+'/truck/maintenance/report/delete/'+maintanace_id+'/'

        Api('delete', delete_url, '', success_res, failed)
            .then(response => {
                // console.log(response)
            })
    }
}



// ******************************************************
//                       F U E L   E X P
// ******************************************************


export const fetch_fuel_list = (page,type) => {

    return function (dispatch) {
        dispatch({ type: 'TRUCK_FETCHING' })
        let get_url = VEHICLE_TRUCK_MAINTANACE_GET + type+'/truck/getFuelExpenses/'+ page + '/'
        Api('get', get_url)
            .then(response => {

                // console.log(response)
                if (response.length > 0) {
                    dispatch({ type: 'TRUCK_FUEL_LIST', fuel: response, page: page })
                }
            })
    }
}


export const complete_fuel_list = (data) => {
    return function (dispatch) {
        dispatch({ type: 'COMPLETE_FUEL_LIST', fuel_list: data })
    }
}
export const __select_fuel = (fuel) => {
    return function (dispatch) {
        dispatch({ type: 'SELECT_TRUCK_FUEL', fuel: fuel })
    }
}


export const __edit_fuel = (type,maintanace_id, data, success, failed, page_no) => {
    return function (dispatch) {
        let edit_url = VEHICLE_TRUCK_MAINTANACE_GET +type+'/truck/editFuelExpense/'+ maintanace_id+'/'

        const success_res = () => {
            success()
            dispatch(fetch_fuel_list(page_no,type))
        }
        Api('patch-form', edit_url, data, success_res, failed)
            .then(response => {
                 dispatch(fetch_fuel_list(1,type))

            })
    }
}


export const __create_fuel = (type,data, success, failed) => {
    return function (dispatch) {
        const success_res = () => {
            success()
            dispatch(fetch_fuel_list(1,type))
        }
        Api('post-form', VEHICLE_TRUCK_FUEL_ADD, data, success_res, failed)
            .then(response => {
                // console.log(response)
            })
    }
}



export const __delete_fuel = (type,maintanace_id, success, failed, page_no) => {
    return function (dispatch) {
        const success_res = () => {
            success()
            dispatch(fetch_fuel_list(page_no,type))
        }
        let delete_url = VEHICLE_TRUCK_MAINTANACE_GET +type+'/truck/deleteFuelExpense/' + maintanace_id + '/'

        Api('delete', delete_url)
            .then(response => {
                dispatch(fetch_fuel_list(page_no,type))

                // console.log(response)
            })
    }
}
export const truck_delete_data = (type,maintanace_id, success, failed, page_no) => {
    console.log("kjhkjhkhkii")

    return function (dispatch) {
        let delete_url = VEHICLE_TRUCK_MAINTANACE_GET +type+'/truck/maintenance/report/delete/' + maintanace_id + '/'
        console.log(delete_url)
        Api('delete', delete_url)
            .then(response => {
                success()

                              dispatch(fetch_maintanace_list(1,type))


            })
            .catch(error => {
                failed()
            })
    }
}



// export const __delete_fleet = (fleet_id, success, failed, page_no, vehicle_id) => {
//     return function (dispatch) {
//         const success_res = () => {
//             success()
//             dispatch(fetch_fleet_list(page_no, vehicle_id))
//         }
//         let delete_url = `${VEHICLE_TRUCK_MAINTANACE_GET + fleet_id}/`
//         Api('delete', delete_url, '', success_res, failed)
//             .then(response => {
//                 // console.log(response)
//             })
//     }
// }


// ******************************************************
//           P R E I N S P E C T I O N   C H E C K
// ******************************************************





export const __create_preinspection = ( type,data, success, failed) => {
    return function (dispatch) {
        Api('post-form', VEHICLE_TRUCK_PREINSPECTION +'truck/', data, success, failed)
            .then(response => {
                if(response.status===400){
                    failed(response)
                }else if(response.status===200){
                    success(response)
                    dispatch(fetch_preinspection_list(1,type))

                }
            })
    }
}

export const fetch_preinspection_list = (page,type) => {
  console.log("datadatdaenter")
    return function (dispatch) {
        dispatch({ type: 'TRUCK_FETCHING' })

        let get_url = VEHICLE_TRUCK_MAINTANACE_GET +  type+ '/truck/pre-inspection/'+page+'/'       
        Api('get', get_url)
            .then(response => {
                 console.log("preins"+JSON.stringify(response))
                if (response.length > 0) {

                    dispatch({ type: 'TRUCK_PREINSPECTION_LIST', preinspect: response })

                }
            })
    }
}


// ******************************************************
//           V E H I C L E    S E A R C H
// ******************************************************


export const vehicle_search = (query,type) => {
    return function (dispatch) {
        if (query) {
            let formbody = new FormData()
            formbody.append('key', query)
            Api('post', VEHICLE_SEARCH, formbody)
                .then(response => {
                    //dispatch({ type: 'TRUCK_LIST', trucks: response,page: page })
                })
        } else {
            dispatch(fetch_truck_list(1,type))
        }
    }
}
export const get_vehicle_info = (data) => {
    return function (dispatch) {
        dispatch({ type: 'VEHICLE_INFO', newvehicle: data })
    }
}
export const get_company_type = (data) => {
    return function (dispatch) {
        dispatch({ type: 'COMPANY_TYPE', companytype: data })
    }
}
export const get_tab_type = (data) => {
    return function (dispatch) {
        dispatch({ type: 'TAB_TYPE', tabtype: data })
    }
}
export const get_sub_header = (data) => {
return function (dispatch) {
        dispatch({ type: 'SUBHEADER_TYPE', header: data })
    }
}