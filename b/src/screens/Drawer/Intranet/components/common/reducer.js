
let initialState = {
    folders_files: [],
    inner_files: [],
    isLoading: false,
    folders_sub_files: [],
    datafolder:[],
    dataFile:[]

}

const intranet = (state = initialState, actions) => {

    switch (actions.type) {
        case "FOLDER_FETCHING":
            return {
                ...state,
                isLoading: true,
            }
        case "INTRANET_FOLDERS_DATA":
            return {
                ...state,
                folders_files: actions.folders,
                isLoading: false,
            }
        case "INTRANET_FOLDERS_INNER_DATA":
            return {
                ...state,
                folders_sub_files: actions.sub_folders,
                isLoading: false,
            }

        case "INTRANET_INNER_FILES":
            return {
                ...state,
                inner_files: actions.files,
                isLoading: false,
            }
            case "FILES_LIST":

            return {
                ...state,
                dataFile: actions.filedata,
                isLoading: false
            }
            case "FOLDER_LIST":

            return {
                ...state,
                datafolder: actions.folderdata,
                isLoading: false
            }

        default:
            return state

    }
}

export default intranet