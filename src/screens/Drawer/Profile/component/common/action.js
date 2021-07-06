import {
    PROFILE,
    EDIT_PROFILE

} from '../../../../../store/endpoint'
import Api from '../../../../../store/api'




export const fetch_profile = () => {
    return function (dispatch) {

        Api('get', PROFILE).then(response => {

            dispatch({ type: 'PROFILE', profile_data: response })

        })
    }
}




export const edit_profile = (content, success, failed) => {
    return function (dispatch) {
        let get_url = EDIT_PROFILE
        console.log("get_url"+EDIT_PROFILE)
        Api('patch-forms', get_url, content, success, failed).then(response => {
            console.log("response"+JSON.stringify(response))
            success(response)

            dispatch(fetch_profile())
        })
            .catch(err => {
                failed(err)
            })
    }
}




