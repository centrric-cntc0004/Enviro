let initialState = {
    client_list: [],
    isLoading: true,
    selected_client: undefined,
    sort: 'alpha_asc',
    client_previous_list: [],
    temp_client_list:[],
    typedata:"waste",
    asset_list:[],
    temp_client_location:{"latitude":-33.851971,"longitude":151.188341}
}

const client = (state = initialState, actions) => {
    switch (actions.type) {
        case "CLIENT_FETCHING":
            return {
                ...state,
                isLoading: true,
            }
        case "CLIENT_LIST":

            return {
                ...state,
                client_list: actions.clients,
            }
            case "CLIENT_LIST_INIT":

            return {
                ...state,
                client_list: actions.clients,
                isLoading: false
            }
            case "ASSET_LIST":

                return {
                    ...state,
                    asset_list: actions.asset,
                    isLoading: false
                }
            case "TEMP_CLIENTS":
            return {
                ...state,
                temp_client_list: actions.tempClient,
            }
            case "SELECT_LOCATION":
            return {
                ...state,
                temp_client_location: actions.selectlocation,
                
            }
            case "SELECT_TYPE_DATA":
            return {
                ...state,
                typedata: actions.selectTypedata

            }
        case "CLIENT_PREVIOUS_LIST":

            return {
                ...state,
                client_previous_list: actions.clients_previous,
                isLoading: false
            }

        case "SELECT_CLIENT":
            return {
                ...state,
                selected_client: actions.client
            }

        case "CHANGE_SORT":
            return {
                ...state,
                sort: actions.sort
            }

        case "RESET_CLIENT_DATA":
            let temp_list = state.client_list
            let updated_data = actions.client
            let prevData = temp_list.find(item => item.id === updated_data.id)
            let index = temp_list.indexOf(prevData)
            temp_list[index] = updated_data
            return {
                ...state,
                team_list: temp_list,
                selected_client: updated_data
            }


        default:
            return state

    }
}

export default client