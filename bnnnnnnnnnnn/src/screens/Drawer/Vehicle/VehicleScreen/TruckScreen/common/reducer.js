let initialState = {
    truck_list: [],
    vehicle_modal: false,
    truck_page: 1,
    selected_truck: {},
    truck_maintanace_list: [],
    truck_preinspection_list: [],
    selected_truck_maintanance: {},
    maintanace_search_qry: '',
    truck_maintanance_page: 1,
    all_truck_list: [],
    truck_fuel_list: [],
    selected_truck_fuel: {},
    truck_fuel_page: 1,
    truck_fleet_list: [],
    selected_truck_fleet: {},
    truck_fleet_page: 1,
    vehicle_id: '',
    isLoading: false,
    complete_vehicle_lists: [],
    vehicle_list_pagination: [],
    complete_fuel_lists: [],
    fuel_list_pagination: []



}

const truck = (state = initialState, actions) => {
    switch (actions.type) {
        case "TRUCK_FETCHING":
            return {
                ...state,
                isLoading: true,
            }
        case "TRUCK_LIST":
            return {
                ...state,
                truck_list: actions.trucks,
                truck_page: actions.page,
                isLoading: false
            }

        case "TRUCK_MAINTANACE_LIST":
            return {
                ...state,
                truck_maintanace_list: actions.maintanace,
                truck_maintanance_page: actions.page,
                isLoading: false
            }
        case "TRUCK_PREINSPECTION_LIST":
            return {
                ...state,
                truck_preinspection_list: actions.preinspect,
                isLoading: false
            }
        case "VEHICLE_LIST_PAGINATION":

            return {
                ...state,
                vehicle_list_pagination: actions.vehicle_page,
                isLoading: false
            }
        case "COMPLETE_VEHICLE_LIST":

            return {
                ...state,
                complete_vehicle_lists: actions.vehicle_list,
                isLoading: false
            }
        case "FUEL_LIST_PAGINATION":

            return {
                ...state,
                fuel_list_pagination: actions.fuel_page,
                isLoading: false
            }
        case "COMPLETE_FUEL_LIST":

            return {
                ...state,
                complete_fuel_lists: actions.fuel_list,
                isLoading: false
            }

        case "ALL_TRUCK_LIST":
            return {
                ...state,
                all_truck_list: actions.trucks,
                isLoading: false
            }



        case "VEHCILE_MODAL":
            return {
                ...state,
                vehicle_modal: actions.modal
            }

        case "SELECT_TRUCK":
            return {
                ...state,
                selected_truck: actions.truck
            }

        case "SELECT_TRUCK_MAINTANACE":
            return {
                ...state,
                selected_truck_maintanance: actions.maintanace
            }


        case "TRUCK_FUEL_LIST":
            return {
                ...state,
                truck_fuel_list: actions.fuel,
                truck_fuel_page: actions.page,
                isLoading: false
            }

        case "SELECT_TRUCK_FUEL":
            return {
                ...state,
                selected_truck_fuel: actions.fuel
            }


       
      
        default:
            return state

    }
}

export default truck