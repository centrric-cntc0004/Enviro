import PushNotificaiton from 'react-native-push-notification'
import PushNotificationIos from '@react-native-community/push-notification-ios'
import { Platform } from 'react-native'
import {fetch_firebase_token} from '../../screens/login/action'
import Api from '../../store/api'
import AsyncStorage from '@react-native-community/async-storage'
import { FIREBASE_TOKEN } from '../../store/endpoint'

 class LocalNotificationService {
    configure = (onOpenNotification) => {
        PushNotificaiton.configure({
             onRegister: function (token)  {
                let form_body = new FormData()
                form_body.append("keys",token.token)
                Api('post', FIREBASE_TOKEN, form_body)
                .then(async response => {
                    await AsyncStorage.setItem('notification_key', JSON.stringify(token.token))
        
                })
                
            },
            onNotification: function (notification) {
                console.log('[LocalNotification] onNotification', notification);
                if(!notification?.data){
                    return
                }
                notification.userInteraction = true;
                onOpenNotification(Platform.OS === 'ios' ? notification.data.item : notification.data);

                if(Platform.OS === 'ios') {
                    // (required) Called when a remote is received or opened, or local notification is opened
                    notification.finish(PushNotificationIos.FetchResult.NoData)
                }

            },
            //IOS ONLY (Optional) : default all permission to register
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,
          
            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             * - if you are not using remote notification or do not have Firebase installed, use this:
             *     requestPermissions: Platform.OS === 'ios'
             */
            requestPermissions: true,
        })
    }

    unregister = () => {
        PushNotificaiton.unregister()
    }

   

    showNotification = (id, title, message, data = {}, options = {}) => {
        PushNotificaiton.localNotification({
            // Android Only Properties
            ...this.buildAndroidNotification(id, title, message, data, options),
            // IOS and Android Properties
            ...this.buildIOSNotification(id, title, message, data, option),
            // IOS and Android Properties
            title: title || '',
            message: message || '',
            playSound: options.playSound || false,
            soundName: options.soundName || 'default',
            userInteraction: false // BOOLEAN If the notification was opened by user from the notification
        });
    }

    buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
        return {
            id: id,
            autoCancel: true,
            largeIcon: options.largeIcon || "ic_launcher",
            small_icon: options.small_icon || "ic_notification",
            bigText: message || '',
            subText: title || '',
            vibrate: options.vibrate || true,
            vibration: options.vibration || 300,
            priority: options.priority || 'high',
            importance: options.importance || "high",
            data: data,
        }
    }

    buildIOSNotification = (id, title, message, data = {}, options = {}) => {
        return {
            alertAction: options.alertAction || 'view',
            category: options.category || '',
            userInfo: {
                id: id,
                item: data
            }
        }
    }

    cancelAllLocalNotifications = () => {
        if(Platform.OS === 'ios') {
            PushNotificationIos.removeAllDeliveredNotifications();
        } else {
            PushNotificaiton.cancelAllLocalNotifications();
        }
    }



    removeDeliveryNotificationById = (notificationId) => {
        console.log('[LocalNotification] removeDeliveryNotificationById', notificationId);
        PushNotificaiton.cancelLocalNotifications({id: `${notificationId}`})
    }
}

export const localNotificationService = new LocalNotificationService()