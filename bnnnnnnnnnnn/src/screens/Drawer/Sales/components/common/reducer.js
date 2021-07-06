
let current_date = new Date()

let initialState = {
    generate_quote_list: [],
    isLoading: false,
    template_lists: [],
    file_list: [],
    job_list: [],
    sale_performance: [],
    quote_register_list: [],
    job_list_pagination: [],
    quote_list_pagination: [],
    complete_job_lists: [],
    complete_quote_lists: [],
    sales_performance_detail: [],
    job_performance_detail: undefined,
    sale_prfrm_month: current_date.getMonth() + 1,
    sale_prfrm_year: current_date.getFullYear(),
    temp_client_list: [],
    folder_list: [],
    card_list:undefined,
    types: "waste",
    template_quote_list: undefined,

    sale_draft_template_list: [],
    sale_draft_template: '',
    sale_eight_template: '',
    sale_client_drafts_list: [],
    sale_client_draft: '',

    quote_content: '',
    quote_file_list: '',
    template_client_list: undefined,
    single_clients:[],
    selected_payment:{ "id": 1, "option": 'Yes' },
    client_info:undefined,
    wastes_list:[],
    job_card: undefined,
    quote_amount:0,
    job_card_lists:[],
    sales_client_job_card:[],
    job_full:undefined



}

const sales = (state = initialState, actions) => {
    switch (actions.type) {
        case "QUOTE_FETCHING":
            return {
                ...state,
                isLoading: true,
            }
        case "QUOTE_LIST":

            return {
                ...state,
                generate_quote_list: actions.quote,
                isLoading: false
            }


        case "TEMPLATE_LIST":

            return {
                ...state,
                template_lists: actions.template,
                isLoading: false
            }
        case "FILE_LIST":

            return {
                ...state,
                file_list: actions.file,
                isLoading: false
            }
        case "QUOTE_FILE_LIST":

            return {
                ...state,
                quote_file_list: actions.quote_file,
                isLoading: false
            }
        case "JOB_LIST":

            return {
                ...state,
                job_list: actions.job,
                isLoading: false
            }
        case "JOB_LIST_PAGINATION":

            return {
                ...state,
                job_list_pagination: actions.job_page,
                isLoading: false
            }
        case "COMPLETE_JOB_LIST":

            return {
                ...state,
                complete_job_lists: actions.job_list,
                isLoading: false
            }
        case "TEMP_CLIENTS":
            return {
                ...state,
                temp_client_list: actions.tempClient,
            }
        case "FOLDER_LIST":
            return {
                ...state,
                folder_list: actions.folderList,
            }
            case "CARD_LIST":
            return {
                ...state,
                card_list: actions.cardList,
            }
            case "SALES_JOB_FULL":
            return {
                ...state,
                job_full: actions.full,
            }

        case "SALE_PERFORMANCE_LIST":

            return {
                ...state,
                sale_performance: actions.sales,
                sale_prfrm_month: actions.month,
                sale_prfrm_year: actions.year,
                isLoading: false
            }
        case "SALES_PERFORMANCE_DETAILS":

            return {
                ...state,
                sales_performance_detail: actions.sales_detail,
                isLoading: false
            }
        case "JOB_PERFORMANCE_DETAILS":

            return {
                ...state,
                job_performance_detail: actions.job_detail,
                isLoading: false
            }

        case "TAB_TYPES":
            return {
                ...state,
                types: actions.tab_type

            }
        case "TEMPLATE_DATA":
            return {
                ...state,
                template_quote_list: actions.template_data

            }
            case "WASTE_LIST":

                return {
                    ...state,
                    wastes_list: actions.waste_list
    
                }
        case "CLIENT_TEMPLATE_DATA":
            return {
                ...state,
                template_client_list: actions.client_template_data

            }
            case "SALES_SET_CONTENT_QUOTE":
                return{
                    ...state,
                    quote_content: actions.content,
                }
    
        case "QUOTE_REGISTER_LIST":

            return {
                ...state,
                quote_register_list: actions.quote,
                isLoading: false
            }
        case "COMPLETE_QUOTE_LIST":

            return {
                ...state,
                complete_quote_lists: actions.quote_list,
                isLoading: false
            }
        case "TEMPLATE":
            return {
                ...state,
                quote_content: actions.template,
                isLoading: false
            }

        case "QUOTE_LIST_PAGINATION":

            return {
                ...state,
                quote_list_pagination: actions.quote_page,
                isLoading: false
            }

        case "DRAFTED_TEMPLATES":
            return {
                ...state,
                sale_draft_template_list: actions.templatesList
            }
            case "JOB_CARD_LIST":
            return {
                ...state,
                job_card_lists: actions.jobcardlist
            }
            case "SINGLE_CLIENT":
                return {
                    ...state,
                    single_clients: actions.clientselect
                }
                case "SELECTED_PAYMENT":
                    return {
                        ...state,
                        selected_payment: actions.payment
                    }

                
        case "CLIENT_INFO" : 
            return{
                ...state,
                client_info: actions.newclient
            }

        case "SALE_CLIENT_DRAFTS":
            return {
                ...state,
                sale_client_drafts_list: actions.templateList
            }

            case "SALE_JOB_CARD_CLIENT":
            return {
                ...state,
                sales_client_job_card: actions.clientjobcard
            }

            case "SALES_QUOTE_AMOUNT":
                return {
                    ...state,
                    quote_amount: actions.amount
                }

        // case "SINGLE_CLIENT_DRAFT":
        //     return{
        //         ...state,
        //         sale_client_draft: actions.clientDraft
        //     }

        case "SJOBCARD_FETCHING_SUCCESS":
            return {
                ...state,
                isLoading: false,
                error: false,
                job_card: actions.jobcardData,
            }


        case "SJOBCARD_FETCHING_FAILED":
            return {
                ...state,
                isLoading: false,
                error: true,
            }
        default:
            return state

    }
}

export default sales