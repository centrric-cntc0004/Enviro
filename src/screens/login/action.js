import Api from '../../store/api'
import { AUTHENTICATION, PROFILE, PROFILE_PERMISSION, FIREBASE_TOKEN } from '../../store/endpoint'
import AsyncStorage from '@react-native-community/async-storage'
let a = ""
import { getToken } from '../../store/pushnotification/GetToken'
export const signin = (user_data,) => {
    return function (dispatch) {

        dispatch({ type: 'AUTH_FETCHING' })
        Api('post', AUTHENTICATION, user_data)
            .then(async response => {
                console.log("rrrrrrrrrrrr"+JSON.stringify(response))
                if (response.data.detail === "No active account found with the given credentials") {
                    dispatch({ type: 'AUTH_FETCHING_ERROR' })

                } else {
                    await AsyncStorage.setItem('enviro-token', response.data.access)

                    dispatch({ type: 'AUTH_FETCHING_SUCCESS', token: response.data.access })
                    Api('get', PROFILE)
                        .then(async response => {
                            await AsyncStorage.setItem('enviro-profile', JSON.stringify(response))
                            await AsyncStorage.setItem('enviro-logininfo', JSON.stringify(user_data))

                             getToken.get_Data()

                        })
                        .catch(error => {
                            console.log('error in action', error)
                        })
                }
                Api('get', PROFILE_PERMISSION)
                    .then(async response => {
                        await AsyncStorage.setItem('enviro-permission', JSON.stringify(response))

                    })


            })

            .catch(error => {
                console.log('error in action', error)
            })
    }
}

export const fetch_firebase_token = async (token) => {
    return function (dispatch) {
        Api('post', FIREBASE_TOKEN, token)
            .then(async response => {
                console.log("response from forebase" + JSON.stringify(response))
                await AsyncStorage.setItem('notification_key', JSON.stringify(token))

            })
    }
}
export const fetch_permission_list = async () => {
    return function (dispatch) {
        let get_url = PROFILE_PERMISSION
        Api('get', get_url)
            .then(async response => {
                await AsyncStorage.setItem('enviro-permission', JSON.stringify(response))

            })
    }
}
export const delete_firebase_key = (formdata, success, failed) => {
    console.log("form_data" + JSON.stringify(formdata))
    return function (dispatch) {
        let delete_url = FIREBASE_TOKEN
        console.log("form_data" + JSON.stringify(delete_url))

        Api('delete_form', delete_url, formdata, success, failed)
            .then(response => {
                console.log("response" + JSON.stringify(response))
                success()

            })
            .catch(err => {
                failed()
            })
    }
}