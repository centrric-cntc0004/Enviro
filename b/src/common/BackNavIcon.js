import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { mainBlack } from './Colors'

const BackNavIcon = (props) => {
    const { onPress } = props


    const back_button_click = () => {
        if (props.page) {
            if (props.page === 'clientProfile' || props.page === 'teamProfile' || props.page === 'addRoaster') {
                onPress()
                let navInterval = setInterval(() => {

                    clearInterval(navInterval)
                }, 500)


            }
        } else {
            onPress()
        }

    }
    return (
        <TouchableOpacity style={{ paddingLeft: 15 }} onPress={() => back_button_click()}>
            <Icon name="chevron-left" size={25} color={mainBlack} />
        </TouchableOpacity>

    )
}

export default BackNavIcon
