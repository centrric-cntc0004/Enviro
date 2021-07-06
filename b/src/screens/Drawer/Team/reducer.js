
let initialState = {
    team_list: [],
    designation_list: [],
    isLoading: false,
    error: false,
    loading: false,
    selected_employee: undefined,
    all_folders: [],
    folder_details: [],

    folder_emp: [],
    tab:"Current Employee",
    sub_files: [],

}

const team = (state = initialState, actions) => {
    switch (actions.type) {

        case "TEAM_FETCHING":
            return {
                ...state,
                isLoading: true,
            }

        case "TEAM_FETCHING_SUCCESS":
            return {
                ...state,
                isLoading: false,
                error: false,
                team_list: actions.teams,
            }
        case "DESIGNATION_FETCHING_SUCCESS":
            return {
                ...state,
                isLoading: false,
                error: false,
                designation_list: actions.designation,
            }

        case "FOLDER_FETCHING_SUCCESS":
            return {
                ...state,
                all_folders: actions.folders,
            }


        case "FOLDER_EMP_FETCHING_SUCCESS":
            return {
                ...state,
                loading: false,
                folder_emp: actions.folders

            }
        case "FOLDER_EMP_FETCHING_FAILED":
            return {
                ...state,
                loading: false,
                error: true,
            }


        case "FOLDER_DETAILS_ETCHING_SUCCESS":
            return {
                ...state,
                folder_details: actions.folders,
            }

        case "TEAM_FETCHING_FAILED":
            return {
                ...state,
                isLoading: false,
                error: true,
            }

        case "DESIGNATION_FETCHING_FAILED":
            return {
                ...state,
                isLoading: false,
                error: true,
            }

        case "SELECT_EMPLOYEE":
            return {
                ...state,
                selected_employee: actions.employee
            }
            case "TAB_EMPLOYEE":
                return {
                    ...state,
                    tab: actions.tabData
                }
                case "FOLDERS_INNER_DATA":
            return {
                ...state,
                sub_files: actions.sub_folders,
                isLoading: false,
            }


        case "RESET_EMPLOYEE_DATA":
            let temp_list = state.team_list
            let updated_data = actions.employee
            console.log("temp_list" + JSON.stringify(temp_list))
            console.log("updated_data" + JSON.stringify(updated_data))

            let prevData = temp_list.find(item => item.employee_id === updated_data.employee_id)
            console.log("updated_data" + JSON.stringify(prevData))

            let index = temp_list.indexOf(prevData)
            console.log("index" + JSON.stringify(index))

            temp_list[index] = updated_data
            return {
                ...state,
                team_list: temp_list,
                selected_employee: actions.employee
            }
        default:
            return state

    }
}

export default team