
let initialState = {
    daywise_schedule_list: [],
    schedule_list: [],
    isLoading: false,
    current_date: "",
    selected_client: undefined,
    complete_schedule_list: [],
    job_card_data: undefined,
    comment_list: [],
    comment_data: [],
    array_images: [],
    type: "waste",
    status: ""


}


const schedule = (state = initialState, actions) => {
    switch (actions.type) {

        case "SCHEDULE_FETCHING":
            return {
                ...state,
                isLoading: true,

            }

        case "SCHEDULE_FETCHING_SUCCESS":
            return {
                ...state,
                isLoading: false,
                error: false,
                schedule_list: actions.schedule,
            }


        case "SCHEDULE_FETCHING_FAILED":
            return {
                ...state,
                isLoading: false,
                error: true,
            }
        case "JOBCARD_FETCHING_SUCCESS":
            return {
                ...state,
                isLoading: false,
                error: false,
                job_card_data: actions.jobcard,
            }


        case "JOBCARD_FETCHING_FAILED":
            return {
                ...state,
                isLoading: false,
                error: true,
            }
        case "COMMENT_FETCHING_SUCCESS":
            return {
                ...state,
                isLoading: false,
                error: false,
                comment_list: actions.comment,
            }


        case "COMMENT_FETCHING_FAILED":
            return {
                ...state,
                isLoading: false,
                error: true,
            }
        case "COMPLETE_SCHEDULE_FETCHING_SUCCESS":
            return {
                ...state,
                isLoading: false,
                error: false,
                complete_schedule_list: actions.complete,
            }


        case "COMPLETE_SCHEDULE_FETCHING_FAILED":
            return {
                ...state,
                isLoading: false,
                error: true,
            }
        case "DAYWISE_SCHEDULE_FETCHING_SUCCESS":
            return {
                ...state,
                isLoading: false,
                error: false,
                daywise_schedule_list: actions.dayschedule,
            }


        case "DAYWISE_SCHEDULE_FETCHING_FAILED":
            return {
                ...state,
                isLoading: false,
                error: true,
            }

        case "SELECT_DATE":
            return {
                ...state,
                current_date: actions.selectDate

            }
        case "SELECT_DATA":
            return {
                ...state,
                selected_client: actions.selectData

            }

        case "SELECT_COMMENT":
            return {
                ...state,
                comment_data: actions.selectComment

            }
        case "SELECT_IMAGES":
            return {
                ...state,
                array_images: actions.selectImage

            }
        case "SELECT_TYPE":
            console.log("kkkkkkkkkkkkkkkggggggg" + actions.selectType)
            return {
                ...state,
                type: actions.selectType

            }
        case "SELECT_STATUS":
            return {
                ...state,
                status: actions.selectStatus

            }



        case "RESET_DATA":
            let temp_list = state.schedule_list

            let updated_data = actions.schedule_data
            let prevData = temp_list.find(item => item.id === updated_data.id)
            let index = temp_list.indexOf(prevData)
            temp_list[index] = updated_data

            return {
                ...state,
                schedule_list: temp_list,
                selected_client: updated_data.status
            }


        default:
            return state
    }
}



export default schedule