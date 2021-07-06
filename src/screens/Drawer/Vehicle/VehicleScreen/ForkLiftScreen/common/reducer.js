let initialState = {
    forklift_list: [],
    vehicle_modal: false,
    forklift_page: 1,
    selected_forklift: {},

    forklift_maintanace_list: [],
    selected_forklift_maintanance: {},
    maintanace_search_qry: '',
    forklift_maintanance_page: 1,
    vehicle_list_paginationfork:[],
    all_forklift_list: [],
    isLoading: false,
    truck_preinspection_list: [],
    vehicle_data:undefined

}

const forklift = (state = initialState, actions) => {
    switch (actions.type) {
        case "FORKLIFT_FETCHING":
            return {
                ...state,
                isLoading: true,
            }
        case "FORKLIFT_LIST":
            return {
                ...state,
                forklift_list: actions.forkliftlist,
                forklift_page: actions.page,
                isLoading: false
            }

            case "VEHICLE_INFO":
                console.log("actions.newvehicle"+JSON.stringify(actions.newvehicle))

                return {
                    ...state,
                    vehicle_data: actions.newvehicle,
                    isLoading: false
                }
        case "FORKLIFT_MAINTANACE_LIST":
            return {
                ...state,
                forklift_maintanace_list: actions.maintanace,
                forklift_maintanance_page: actions.page,
                isLoading: false
            }
            case "FORKLIFT_LIST_PAGINATION":

                return {
                    ...state,
                    vehicle_list_paginationfork: actions.vehicle_page,
                    isLoading: false
                }
            case "FORK_PREINSPECTION_LIST":
                return {
                    ...state,
                    truck_preinspection_list: actions.preinspect1,
                    isLoading: false
                }
        case "ALL_FORKLIFT_LIST":
            return {
                ...state,
                all_forklift_list: actions.forklifts,
                isLoading: false
            }


        case "VEHCILE_MODAL":
            return {
                ...state,
                vehicle_modal: actions.modal
            }

        case "SELECT_FORKLIFT":
            return {
                ...state,
                selected_forklift: actions.forklift
            }

        case "SELECT_MAINTANACE":
            return {
                ...state,
                selected_forklift_maintanance: actions.maintanace
            }

        default:
            return state

    }
}

export default forklift