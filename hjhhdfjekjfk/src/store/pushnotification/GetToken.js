import React, { useEffect } from 'react'
import { fcmService } from './FCMService'
import { localNotificationService } from './LocalNotification'

class GetToken {
        
    get_Data(){
        fcmService.registerAppWithFCM()
        fcmService.register(onRegister, onNotification, onOpenNotification)
        localNotificationService.configure(onOpenNotification)

        function onRegister(token) {
            console.log('[APP => HOME] onRegister: ', token)
        }

      

        function onNotification(notify) {
            console.log('[APP => HOME] onNotification: ', notify)
            const options = {
                soundName: 'default',
                playSound: true
            }
            localNotificationService.showNotification(
                0,
                notify.title,
                notify.body,
                notify,
                options
            )
        }

        function onOpenNotification(notify) {
            console.log('[APP => HOME] onOpenNotification: ', notify)
            // alert('Open Notification: ' + notify.body)
            // notification_action()
        }

        return () => {
            console.log('[APP => HOME] unRegister ')
            fcmService.unRegister()
            localNotificationService.unregister()
        }
        
    }

    
}
export const getToken = new GetToken()
