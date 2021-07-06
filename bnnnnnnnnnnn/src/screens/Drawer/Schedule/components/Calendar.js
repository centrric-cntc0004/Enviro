import React, { useState } from 'react'
import { View, Text, ActivityIndicator, } from 'react-native'
import { mainWhite, mainBlue, textGrey, } from '../../../../common/Colors'
import ChooseRoaster from './InnerScreens/ChooseRoaster'

const Calendar = ({ navigation }) => {
    const RenderForm = () => {

        const [loginPageStatus, setloginPageStatus] = useState(false)





        if (loginPageStatus) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={mainBlue} />
                </View>
            )

        } else {
            return (


                <View style={{ flex: 1, backgroundColor: mainWhite }}>
                    <View style={{ height: 10, backgroundColor: textGrey }}>

                    </View>
                    <ChooseRoaster navigation={navigation} />
                </View>



            )
        }
    }
    return (

       
        <RenderForm />

    )
}

export default Calendar
