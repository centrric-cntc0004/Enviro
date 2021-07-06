import axios from 'axios'
import { store } from './store'
import AsyncStorage from '@react-native-community/async-storage'
import { AUTHENTICATION, PROFILE, PROFILE_PERMISSION, FIREBASE_TOKEN } from '../store/endpoint'
import Api from '../store/api'

export default async function request(type, url, params, success, failed) {

    let state = store.getState()
    // let token = state.userLogin.authToken
    const token = await AsyncStorage.getItem('enviro-token')
    const info = await AsyncStorage.getItem('enviro-logininfo')


    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    console.log(token)

    switch (type) {
        case 'get':
            return axios.get(url)
                .then(response => {

                    if (success) {
                        success(response.data)
                    }
                    return response.data
                })
                .catch(error => {
                    console.log("Server Error", error)
                    console.log("server Responseddddd", error.response.status)
                   
                    if (info) {
                        console.log("server Response", info)

                        if (error.response.status === 401) {
                           
                            Api('post', AUTHENTICATION, JSON.parse(info))
                                .then(async response => {
                                    console.log("rsponsedata"+JSON.stringify(response))

                                    if (response.data.detail === "No active account found with the given credentials") {

                                    } else {
                                        await AsyncStorage.setItem('enviro-token', response.data.access)

                                        Api('get', PROFILE)
                                            .then(async response => {
                                                console.log('response ', response)
                                                await AsyncStorage.setItem('enviro-profile', JSON.stringify(response))
                                                await AsyncStorage.setItem('enviro-logininfo', JSON.stringify(user_data))

                                                getToken.get_Data()

                                            })
                                            .catch(error => {
                                                console.log('error in action', error)
                                            })
                                    }



                                })

                                .catch(error => {
                                    console.log('error in action', error)
                                })
                        }
                    }
                    if (failed) { failed() }
                    return []
                })

        case 'post':

            return axios.post(url, params)
                .then(response => {

                    if (success) {
                        success()
                    }
                    return response
                })
                .catch(error => {
                    console.log("Server Error", error)
                    console.log("server Response", error.response.status)
                    if (error.response.status == 401) {

                    }
                    if (failed) { failed() }
                    return error.response
                })
        case 'put1':

            return axios.put(url, params)
                .then(response => {

                    if (success) {
                        success()
                    }
                    return response
                })
                .catch(error => {
                    console.log("Server Error", error)
                    console.log("server Response", error.response)
                    if (failed) { failed() }
                    return error.response
                })

        case 'post-form':

            return axios.post(url, params, { headers: { "Content-Type": "multipart/form-data" } })
                .then(response => {
                    if (success) {
                        success()
                    }
                    return response.data
                })
                .catch(error => {

                    console.log("Server Error", error)
                    console.log("server Response", error.response)
                    if (failed) { failed(error.response) }
                    return error.response.data
                })

                case 'post-form1':

            return axios.post(url, params, { headers: { "Content-Type": "multipart/form-data" } })
                .then(response => {
                    if (success) {
                        success()
                    }
                    return response
                })
                .catch(error => {

                    console.log("Server Error", error)
                    console.log("server Response", error.response)
                    if (failed) { failed(error.response) }
                    return error.response
                })

        case 'patch':
            return axios.patch(url + '/' + params)
                .then(response => {
                    if (success) { success() }
                    return response.data
                })
                .catch(error => {
                    console.log("Server Error", error)
                    console.log("server Response", error.response)
                    if (failed) { failed() }
                    return error.response.data
                })

        case 'patch-form':

            return (
                fetch(url, {
                    method: 'patch',
                    headers: {

                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + token
                    },
                    body: params,

                })
                    .then(response => response.json())
                    .then(response => {
                        console.log("responsehg" + JSON.stringify(response))

                        if (success) {
                            success()
                        }
                        return response
                    })
                    .catch(error => {

                        if (failed) { failed() }
                        return error.response.data
                    })
            );
            // case 'patch-forms':

            // return (
            //     fetch(url, {
            //         method: 'patch',
            //         headers: {

            //             'Content-Type': 'multipart/form-data',
            //             'Authorization': 'Bearer ' + token
            //         },
            //         body: params,

            //     })
            //         .then(response => response.json())
            //         .then(response => {
            //             console.log("responsejjjjjjjj" + JSON.stringify(response))

            //             if (success) {
            //                 success(response)
            //             }
            //             return response
            //         })
            //         .catch(error => {
            //             console.log("responseghhhhhhhh" + JSON.stringify(error))

            //             if (failed) { failed(error.response) }
            //             return error.response
            //         })
            // );
            case 'patch-forms':
                return axios.patch(url, params, {headers: {"Content-Type": "multipart/form-data"}})
                    .then(response => {
                        console.log('Patch Response', response)
                        if(success) {success(response.data)}
                        return response.data
                    })
                    .catch(error => {
                        console.log("Server Error", error)
                        console.log("server Response", error.response)
                        if(failed) {failed(error.response)}
                        return error.response.data
                    })
    
        case 'put':
            return axios.put(url, params, { headers: { "Content-Type": "multipart/form-data" } })
                .then(response => {
                    console.log("response" + JSON.stringify(response))

                    if (success) {
                        console.log("response" + JSON.stringify(response))
                        success()
                    }
                    return response.data
                })
                .catch(error => {

                    if (failed) { failed() }
                    return error.response.data
                })
        case 'delete':
            return axios.delete(url)
                .then(response => {
                    if (success) { success() }
                    return response.data
                })
                .catch(error => {
                    console.log("Server Error", error)
                    console.log("server Response", error.response)
                    if (failed) { failed() }
                    return error.response.data
                })
        case 'delete_form':
            return (
                fetch(url, {
                    method: 'delete',
                    headers: {

                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + token
                    },
                    body: params,

                })
                    .then(response => response.json())
                    .then(response => {
                        if (success) { success() }
                        return response
                    })
                    .catch(error => {

                        if (failed) { failed() }
                        return error.response.data
                    })
            );
            case 'put_data':
            return axios.put(url, params, {headers: {"Content-Type": "multipart/form-data"}})
                .then(response => {
                    console.log('Put Response', response)
                    if(success) {success(response)}
                    return response
                })
                

        case 'post_Json':
            return (
                fetch(url, {
                    method: 'post',
                    headers: {

                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + token
                    },
                    body: params,

                })
                    .then(response => response.json())
                    .then(response => {
                        if (success) { success() }
                        return response
                    })
                    .catch(error => {

                        if (failed) { failed() }
                        return error.response.data
                    })
            );
        default:
            break;
    }
}