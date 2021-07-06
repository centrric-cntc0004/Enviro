
let initialState = {
    profile_info: undefined,
    isLoading: false,
    

}

const profile = (state = initialState, actions) => {

    switch (actions.type) {
        case "PROFILE_FETCHING":
            return {
                ...state,
                isLoading: true,
            }
        case "PROFILE":
            return {
                ...state,
                profile_info: actions.profile_data,
                isLoading: false,
            }
       
        default:
            return state

    }
}

export default profile