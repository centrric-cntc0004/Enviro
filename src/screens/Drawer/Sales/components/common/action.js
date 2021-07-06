import Api from '../../../../../store/api'
import {
    SALES_WASTE_GENERATE_QUOTE,
    SALES_WASTE_TEMPLATE_LIST,
    SALES_WASTE_ATTACH_FILE,
    SALES_WASTE_JOB_LIST,
    SALES_WASTE_SALES_PERFORMANCE_LIST,
    SALES_WASTE_QUOTE_LIST,
    SALES_WASTE_SALES_PERFORMANCE_DETAIL,
    SALES_PUMP_JOBS, SALES_PUMP_QUOTE_REGISTER,
    SALER_PUMP_SALE_PERFORMANCE,
    SALES_WASTE_JOB_PERFORMANCE_DETAIL,
    SALES_TEMP_CLIENTS,
    SALES_CREATE_TEMPORARY_CLIENT,
    SALES_QUOTE_GENERATE,
    SALES_QUOTE_ATTACH_TEMPLATE,
    SALES_GENERATE_TEMPLATE_DRAFT, SALES_ALL_DRAFTS,
    SALES_CLIENT_QUOTE_TEMPLATE,
    SALES_GENERATE_SINGLE_TEMPLATES,
    SALES_JOB_TYPEOSWASTE,
    SALES_CLIENT_SERACH,
    SALES_JOB_CARD,
    SALES_JOB_CARD_LIST,
    SALES_JOB_CARD_CREATE,
    SALES_JOB_CARD_BY_CLIENT,
    SALES_JOB_CARD_EDIT

} from '../../../../../store/endpoint'


export const generate_quote_list = (page) => {
    return function (dispatch) {
        dispatch({ type: 'QUOTE_FETCHING' })
        let get_url = SALES_WASTE_GENERATE_QUOTE + 'waste/'
        Api('get', get_url)
            .then(response => {
                if (response) {

                    dispatch({ type: 'QUOTE_LIST', quote: response.folders })
                }
            })
    }
}

export const template_listData = (page) => {
    return function (dispatch) {
        let get_url = SALES_WASTE_TEMPLATE_LIST
        Api('get', get_url)
            .then(response => {
                if (response.length > 0) {
                    if (response[0].html_content) {
                        dispatch({ type: 'TEMPLATE', template: response[0].html_content })

                    }

                    dispatch({ type: 'TEMPLATE_LIST', template: response })

                }
            })
    }
}
export const attach_file_list = (type) => {
    return function (dispatch) {
        let get_url = SALES_WASTE_ATTACH_FILE + type + '/'
        Api('get', get_url)

            .then(response => {

                if (response) {
                    dispatch({ type: 'FILE_LIST', file: response })
                }
            })
    }
}
export const attach_file_list_quote = (id) => {
    return function (dispatch) {
        let get_url = SALES_WASTE_ATTACH_FILE + 'waste/' + id + '/'
        Api('get', get_url)
            .then(response => {
                dispatch({ type: 'QUOTE_FILE_LIST', quote_file: response.template })

            })
    }
}
export const create_temp_clients = (data, success, failed) => {
    return function (dispatch) {

        const success_fx = () => {
            dispatch(fetch_temp_clients())
            success()
        }
        Api('post-form', SALES_CREATE_TEMPORARY_CLIENT, data, success_fx, failed)

    }
}

export const fetch_temp_clients = (type) => {
    return function (dispatch) {
        Api('get', SALES_TEMP_CLIENTS +type+'/').then(response => {
            console.log("saaaaaaaaaaaaaaaaaaa"+JSON.stringify(response))
            if (response.length > 0) {
                dispatch({ type: 'TEMP_CLIENTS', tempClient: response })
            }
        })
    }
}
export const sales_quoter_registration = (data, success, failed, types) => {
    let get_url = SALES_QUOTE_GENERATE + types + '/'
    Api('post-form', get_url, data, success, failed)
}
// export const add_new_job_card = (data, success, failed) => {
//     let get_url = SALES_JOB_CARD_CREATE 
//     Api('post', get_url, data, success, failed)
// }
export const add_new_job_card = (data, success, failed) => {
    return function (dispatch) {

        dispatch(fetch_job_card_list())
        dispatch(fetch_job_card_by_client(data.client))

        const success_fx = (res) => {


            success()
        }
        Api('post', SALES_JOB_CARD_CREATE, data, success_fx, failed)
        dispatch(fetch_job_card_list())
        dispatch(fetch_job_card_by_client(data.client))


    }
}
export const edit_new_job_card = (id, data, success, failed) => {
    return function (dispatch) {
        const success_fx = (res) => {
            dispatch(fetch_job_card_list())
            success()
        }
        Api('put1', SALES_JOB_CARD_EDIT + id + '/', data, success_fx, failed)
    }
}

export const job_list = (page) => {
    return function (dispatch) {
        dispatch({ type: 'QUOTE_FETCHING' })

        let get_url = SALES_WASTE_JOB_LIST + 'waste/' + page + '/?limit=20'
        Api('get', get_url)
            .then(response => {
                if (response) {
                    dispatch({ type: 'JOB_LIST', job: response })
                }
            })
    }
}
export const complete_job_list = (data) => {
    return function (dispatch) {
        dispatch({ type: 'COMPLETE_JOB_LIST', job_list: data })
    }
}
export const get_tab_type = (data) => {
    return function (dispatch) {
        dispatch({ type: 'TAB_TYPES', tab_type: data })
    }
}
export const get_client_info = (data) => {
    return function (dispatch) {
        dispatch({ type: 'CLIENT_INFO', newclient: data })
    }
}

export const job_list_pagination = (page, success, failed,) => {
    return function (dispatch) {
        let get_url = SALES_WASTE_JOB_LIST + 'waste/' + page + '/?limit=20'
        Api('get', get_url)
            .then(response => {
                if (response) {
                    success(response)
                    dispatch({ type: 'JOB_LIST_PAGINATION', job_page: response })
                }
            })
    }
}
export const fetch_waste_list = () => {
    return function (dispatch) {
        let get_url = SALES_JOB_TYPEOSWASTE
        Api('get', get_url)
            .then(response => {
                if (response) {

                    dispatch({ type: 'WASTE_LIST', waste_list: response })
                }
            })
    }
}

export const fetch_waste_sale_performance = (year, month) => {

    return function (dispatch) {
        let get_url = `${SALES_WASTE_SALES_PERFORMANCE_LIST}waste/${year}/${month}/`
        Api('get', get_url).then(response => {
            if (response) {
                console.log("kjshdkjsa"+JSON.stringify(response))
                dispatch({ type: 'SALE_PERFORMANCE_LIST', sales: response.app_data, month, year })
            }
        })
    }
}
export const fetch_type_sale_performance = (type, year, month) => {

    return function (dispatch) {
        let get_url = `${SALER_PUMP_SALE_PERFORMANCE}${"performance"}/${type}/${year}/${month}/`

        Api('get', get_url).then(response => {
            if (response.app_data) {
                dispatch({ type: 'SALE_PERFORMANCE_LIST', sales: response.app_data, month, year })
            }
        })
    }
}
export const sales_performance_details = (id, page) => {


    return function (dispatch) {
        dispatch({ type: 'QUOTE_FETCHING' })

        let get_url = SALES_WASTE_SALES_PERFORMANCE_DETAIL + 'waste/' + id + '/' + page

        Api('get', get_url)
            .then(response => {
                if (response) {
                    dispatch({ type: 'SALES_PERFORMANCE_DETAILS', sales_detail: response })
                }
            })
    }
}
export const job_performance_details = (id) => {


    return function (dispatch) {
        dispatch({ type: 'QUOTE_FETCHING' })

        let get_url = SALES_WASTE_JOB_PERFORMANCE_DETAIL + id + '/'
        Api('get', get_url)
            .then(response => {
                if (response) {
                    dispatch({ type: 'JOB_PERFORMANCE_DETAILS', job_detail: response })
                }
            })
    }
}

export const quote_register_list = (page) => {

    return function (dispatch) {
        let get_url = SALES_WASTE_QUOTE_LIST + 'waste/' + page + "/?limit=20"

        Api('get', get_url)
            .then(response => {
                if (response) {
                    dispatch({ type: 'QUOTE_REGISTER_LIST', quote: response })
                }
            })
    }
}
export const complete_quote_list = (data) => {
    return function (dispatch) {
        dispatch({ type: 'COMPLETE_QUOTE_LIST', quote_list: data })
    }
}
export const fetch_folder_list = (data) => {
    return function (dispatch) {
        dispatch({ type: 'FOLDER_LIST', folderList: data })
    }
}

export const fetch_job_card = (data) => {
    return function (dispatch) {
        dispatch({ type: 'CARD_LIST', cardList: data })
    }
}
export const fetch_template = (data) => {
    return function (dispatch) {
        dispatch({ type: 'TEMPLATE', template: data })
    }
}
export const fetch_selected_client = (data) => {
    return function (dispatch) {
        dispatch({ type: 'SINGLE_CLIENT', clientselect: data })
    }
}

export const fetch_selected_payment = (data) => {
    return function (dispatch) {
        dispatch({ type: 'SELECTED_PAYMENT', payment: data })
    }
}
export const fetch_sales_quote_amount = (data) => {
    return function (dispatch) {
        dispatch({ type: 'SALES_QUOTE_AMOUNT', amount: data })
    }
}
export const fetch_job_card_full_data = (data) => {
    return function (dispatch) {
        dispatch({ type: 'SALES_JOB_FULL', full: data })
    }
}

export const quote_list_pagination = (page, success, failed,) => {

    return function (dispatch) {
        let get_url = SALES_WASTE_QUOTE_LIST + 'waste/' + page + '/?limit=20'

        Api('get', get_url)
            .then(response => {
                if (response) {
                    success(response)
                    dispatch({ type: 'QUOTE_LIST_PAGINATION', quote_page: response })
                }
            })
    }
}
export const fetch_job_list_pump = (type, page_no, filter) => {
    return function (dispatch) {
        let get_url = `${SALES_PUMP_JOBS}jobs/${type}/${page_no}/?limit=20`
        Api('get', get_url).then(response => {

            if (response) {
                dispatch({ type: 'JOB_LIST', job: response })
            }
        })
    }
}

export const fetch_pump_quote_registers_list = (type, page_no) => {
    return function (dispatch) {
        let get_url = `${SALES_PUMP_QUOTE_REGISTER}quote/${type}/${page_no}/?limit=50`
        Api('get', get_url).then(response => {
            if (response) {
                dispatch({ type: 'QUOTE_REGISTER_LIST', quote: response })
            }
        })
    }
}
export const fetch_quote_template = (type, data, success, failed,) => {
    return function (dispatch) {
        let get_url = SALES_QUOTE_ATTACH_TEMPLATE + type + '/'
        Api('post', get_url, data).then(response => {
            success(response)
            dispatch({ type: 'TEMPLATE_DATA', template_data: response })



        })
    }
}

export const fetch_quote_drafts = (type) => {
    return function (dispatch) {


        Api('get', `${SALES_ALL_DRAFTS}${type}/`).then(response => {
            dispatch({
                type: 'DRAFTED_TEMPLATES',
                templatesList: response
            })
        })
    }
}
export const fetch_job_card_list = () => {
    return function (dispatch) {


        Api('get', `${SALES_JOB_CARD_LIST}`).then(response => {
            console.log("LLLLLLLLLLLLLLLLLLLLL" + JSON.stringify(response[0]))
            dispatch({
                type: 'JOB_CARD_LIST',
                jobcardlist: response
            })
        })
    }
}

export const fetch_quote_client_draft = (content, type, id, success, failed) => {
    return function (dispatch) {
        // if(content===''){
        Api('get', `${SALES_GENERATE_TEMPLATE_DRAFT}${type}/${id}/`).then(response => {
            let a = `${SALES_GENERATE_TEMPLATE_DRAFT}${type}/${id}/`
            console.log("kkkkkkkkkkkkkkkkkkkkkkkk")
            dispatch({
                type: 'SALE_CLIENT_DRAFTS',
                templateList: response
            })
            dispatch({ type: 'SINGLE_CLIENT', clientselect: response })

        })
    }

}
export const fetch_job_card_by_client = (id, success, failed) => {
    return function (dispatch) {
        // if(content===''){
        Api('get', `${SALES_JOB_CARD_BY_CLIENT}${id}/`).then(response => {
            console.log("hjgjhgjhgjhgjhjg" + JSON.stringify(response[0]))
            dispatch({
                type: 'SALE_JOB_CARD_CLIENT',
                clientjobcard: response
            })


        })
    }

}
export const fetch_client_quote_template = (data) => {
    return function (dispatch) {
        let get_url = SALES_CLIENT_QUOTE_TEMPLATE + data + '/'
        Api('get', get_url).then(response => {
            dispatch({ type: 'CLIENT_TEMPLATE_DATA', client_template_data: response })
            if (response) {
                if (response.template !== null) {
                    dispatch({ type: 'TEMPLATE', template: response.template })

                }
            }

        })
    }
}
export const fetch_single_draft = (content, id, success, failed, type) => {
    return function (dispatch) {
        if (content !== null)
            Api('get', `${SALES_GENERATE_SINGLE_TEMPLATE}${id}/`).then(response => {

                
            })


    }
}
export const fetch_quote_client_draft_tem = (content, type, id, success, failed) => {
    return function (dispatch) {
        Api('post-form', `${SALES_GENERATE_TEMPLATE_DRAFT}${type}/${id}/`, content, success, failed).then(response => {
            dispatch(
                fetch_quote_drafts(type)
            )
        })


    }
}
export const search_employee_list = (query) => {
    return function (dispatch) {
        if (query) {
            let formbody = new FormData()
            formbody.append('key', query)
            Api('post-form', SALES_CLIENT_SERACH, formbody)
                .then(response => {

                    dispatch({ type: 'TEMP_CLIENTS', tempClient: response.temporary_client })
                    dispatch({ type: 'CLIENT_LIST', clients: response.permenent })

                })
        } else {
            // dispatch(fetch_client_list())
        }
    }
}
export const job_card_data = (quote_id) => {

    return function (dispatch) {
        dispatch({ type: 'QUOTE_FETCHING' })
        let url = SALES_JOB_CARD + quote_id + '/'
        Api('get', url)
            .then(response => {
                dispatch({ type: 'SJOBCARD_FETCHING_SUCCESS', jobcardData: response })
            })
            .catch(error => {
                dispatch({ type: 'SJOBCARD_FETCHING_FAILED' })
            })
    }
}
export const edit_job_card = (quote_id, formbody, success, failure) => {

    return function (dispatch) {
        dispatch({ type: 'QUOTE_FETCHING' })
        let url = SALES_JOB_CARD + quote_id + '/'
        Api('patch-form', url, formbody, success, failure)
            .then(response => {
                job_card_data(quote_id)

            })
    }
}