import messaging from '@react-native-firebase/messaging'
import {Platform} from 'react-native'

class FCMService {
    register = (onRegister, onNotification, onOpenNotification) => {
        this.checkPermission(onRegister)
        this.createNotificationListener(onRegister, onNotification, onOpenNotification)
    }

    registerAppWithFCM = async() => {
        if(Platform.OS === 'ios') {
            await messaging().registerDeviceForRemoteMessages();
            await messaging().setAutoInitEnabled(true);
        }
    }

    checkPermission = (onRegister) => {
        messaging().hasPermission()
        .then(enabled => {
            if(enabled) {
                this.getToken(onRegister);
            } else {
                this.requestPermission(onRegister);
            }
        }).catch(error => {
            console.log('[FCM SERVICE] Permission rejected', error)
        })
    }

    getToken = (onRegister) => {
        messaging().getToken()
        .then(fcmToken => {
            if(fcmToken) {
                onRegister(fcmToken)
            } else {
                console.log('[FCM SERVICE] User doesnot have device token')
            }
        }).catch(error => {
            console.log('[FCM SERVICE] get token rejected', error)
        })
    }

    requestPermission = (onRegister) => {
        messaging().requestPermission()
        .then(() => {
            this.getToken(onRegister)
        }).catch(error => {
            console.log('[FCM SERVICE] Request permission rejected', error)
        })
    }

    deleteToken = () => {
        console.log('[FCM SERVICE] Delete Token')
        messaging().deleteToken()
        .catch(error => {
            console.log('[FCM SERVICE] Delete Token Error', error)
        })
    }

    createNotificationListener = (onRegister, onNotification, onOpenNotification) => {

        messaging().onNotificationOpenedApp((remoteMessage) => {
            console.log('[FCM SERVICE] Notification when the app is running but in background')
            if(remoteMessage) {
                const notification = remoteMessage.notification
                onOpenNotification(notification)
            }
        });
        messaging().getInitialNotification(remoteMessage => {
            console.log('[FCM SERVICE] Notification when app is opened from  a quite state')
            if(remoteMessage) {
                const notification = remoteMessage.notification
                onOpenNotification(notification)
            }
        });

        //foreground state messages
        this.messageListener = messaging().onMessage(async remoteMessage => {
            console.log('[FCM SERVICE] New FCM Message Arrived', remoteMessage)
            if(remoteMessage) {
                let notification = null
                if(Platform.OS === 'ios') {
                    notification = remoteMessage.data.notification
                } else {
                    notification = remoteMessage.notification
                }
                onNotification(notification)
            }
        })

        //triggering when have new token
        messaging().onTokenRefresh(fcmToken => {
            console.log('[FCM SERVICE] New Token Refresh', fcmToken)
            onRegister(fcmToken)
        }) 
 
    }

    unRegister = () => {
        this.messageListener()
    }

}

export const fcmService = new FCMService()