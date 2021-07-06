import Api from '../../../../../../store/api'
import {
    VEHICLE_GET,
    VEHICLE_FORKLIFT_MAINTANACE_SEARCH,
    VEHICLE_FORKLIFT_MAINTANACE_ADD,
    VEHICLE_TRUCK_PREINSPECTION,
    VEHICLE_TRUCK_FUEL_ADD,
    VEHICLE_TRUCK_FUEL_DELETE

} from '../../../../../../store/endpoint'



export const fetch_forklift_list = (page,type,tab) => {
    return function (dispatch) {
        var tabtype=""
        if(tab==="Forklift"){
          tabtype="fork-lift"
        }else{
            tabtype="machinery"
        }
        let get_url = VEHICLE_GET + type+'/'+tabtype+'/getFuelExpenses/'+ page + '/'

        Api('get', get_url)
            .then(response => {
                if (response.length > 0) {
                    dispatch({ type: 'FORKLIFT_LIST', forkliftlist: response, page: page })
                }
            })
    }
}
export const __edit_fuel = (type,maintanace_id, data, success, failed, page_no) => {
    return function (dispatch) {
        let edit_url = VEHICLE_GET +type+'/fork-lift/editFuelExpense/'+ maintanace_id+'/'


        const success_res = () => {
            success()
            dispatch(fetch_forklift_list(page_no,type))
        }
        Api('patch-form', edit_url, data, success_res, failed)
            .then(response => {
            })
    }
}

export const __create_fuel = (type,data, success, failed) => {
    return function (dispatch) {
        const success_res = () => {
            success()
            dispatch(fetch_forklift_list(1,type))
        }
        Api('post-form', VEHICLE_TRUCK_FUEL_ADD, data, success_res, failed)
            .then(response => {
                // console.log(response)
            })
    }
}

export const fetch_all_forklift_list = (type,tab) => {
    return function (dispatch) {
        var tabtype=""
        if(tab==="Forklift"){
          tabtype="fork-lift"
        }else{
            tabtype="machinery"
        }
        let get_url = VEHICLE_GET +type+ '/'+tabtype+'/list/'

        console.log("jkjj"+get_url)
        Api('get', get_url)
            .then(response => {
                if (response.length > 0) {
                    dispatch({ type: 'ALL_FORKLIFT_LIST', forklifts: response })
                }
            })
    }
}

export const vehicle_list_pagination = (pages,type,tab) => {
    var tabtype=""
    if(tab==="Forklift"){
        tabtype="fork-lift"
      }else{
          tabtype="machinery"
      }
    return function (dispatch) {
        let get_url = VEHICLE_GET +type + '/' + tabtype +'/all/' + pages + '/'

        Api('get', get_url)
            .then(response => {
                if (response) {
                  
                    dispatch({ type: 'FORKLIFT_LIST_PAGINATION', vehicle_page: response })
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

export const fetch_maintanace_list = (page,type,tab) => {
    return function (dispatch) {
        dispatch({ type: 'FORKLIFT_FETCHING' })
        let tabtype=""
        if(tab==="Forklift"){
          tabtype="fork-lift"
        }else{
            tabtype="machinery"
        }
        let get_url = VEHICLE_GET +type+ '/'+tabtype+'/'+ 'maintenance/reports/'+ page + '/'
        console.log("geturl"+get_url)
        Api('get', get_url)
            .then(response => {
                if (response.length > 0) {
                    dispatch({ type: 'FORKLIFT_MAINTANACE_LIST', maintanace: response, page: page })
                }
            })
    }
}



export const search_maintanance_list = (query,type) => {
    return function (dispatch) {
        if (query) {
            let formbody = new FormData()
            formbody.append('key', query)
            Api('post', VEHICLE_FORKLIFT_MAINTANACE_SEARCH, formbody)
                .then(response => {
                    dispatch({ type: 'FORKLIFT_MAINTANACE_LIST', maintanace: response })
                })
        } else {
            dispatch(fetch_maintanace_list(1,type))
        }
    }
}

export const __select_maintanace = (maintanace) => {
    return function (dispatch) {
        dispatch({ type: 'SELECT_MAINTANACE', maintanace: maintanace })
    }
}



export const __edit_maintanace = (type,maintanace_id, data, success, failed, page_no) => {
    return function (dispatch) {
        let edit_url = `${VEHICLE_GET + maintanace_id}/`
        const success_res = () => {
            success()
            dispatch(fetch_maintanace_list(1,type))
        }
        Api('patch-form', edit_url, data, success_res, failed)
            .then(response => {
                
            })
    }
}



export const __create_maintanace = (type,data, success, failed) => {
    return function (dispatch) {
        const success_res = () => {
            success()
            dispatch(fetch_maintanace_list(1,type))
        }
        Api('post-form', VEHICLE_FORKLIFT_MAINTANACE_ADD, data, success_res, failed)
            .then(response => {
                // console.log(response)
            })
    }
}



export const __delete_maintanace = (type,maintanace_id, success, failed, page_no) => {
    return function (dispatch) {
        const success_res = () => {
            success()
            dispatch(fetch_maintanace_list(page_no,type))
        }
        let delete_url = VEHICLE_GET +type+'/fork-lift/maintenance/report/delete/' + maintanace_id + '/'

        Api('delete', delete_url, '', success_res, failed)
            .then(response => {
                dispatch(fetch_maintanace_list(1,type))

                // console.log(response)
            })
    }
}

export const __delete_fuel = (type,maintanace_id, success, failed, page_no) => {
    return function (dispatch) {
        const success_res = () => {
            success()
            dispatch(fetch_forklift_list(page_no,type))
        }
        let delete_url = VEHICLE_GET +type+'/fork-lift/deleteFuelExpense/' + maintanace_id + '/'

        Api('delete', delete_url, '', success_res, failed)
            .then(response => {
                dispatch(fetch_forklift_list(1,type))

                // console.log(response)
            })
    }
}

export const fetch_preinspection_list = (page,type,tab) => {

    return function (dispatch) {
        dispatch({ type: 'TRUCK_FETCHING' })
        var tabtype=""
        if(tab==="Forklift"){
          tabtype="fork-lift"
        }else{
            tabtype="machinery"
        }
        let get_url = VEHICLE_GET +  type+ '/'+tabtype+'/pre-inspection/'+page+'/'       

        Api('get', get_url)
            .then(response => {

                if (response.length > 0) {

                    dispatch({ type: 'FORK_PREINSPECTION_LIST', preinspect1: response })

                }
            })
    }
}

export const __create_preinspection = (type,data, success, failed) => {
    return function (dispatch) {
        const success_res = () => {
            success()
            dispatch(fetch_maintanace_list(1,type))
        }

        Api('post-form1', VEHICLE_TRUCK_PREINSPECTION+'fork-lift/', data, success_res, failed)
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


export const get_vehicle_info = (data) => {
    return function (dispatch) {
        console.log("hhh"+JSON.stringify(data))
        dispatch({ type: 'VEHICLE_INFO', newvehicle: data })
    }
}

