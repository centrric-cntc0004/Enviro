import React, { useState } from 'react'
import { View, TouchableOpacity, } from 'react-native'
import { textRed } from '../../../../../../common/Colors'
import Icon from 'react-native-vector-icons/MaterialIcons'


const CheckBoxReview = ({ checked, state }) => {

    const RenderContacts = () => {



        const checkClicked = () => {
            state(!checked)
        }


        return (
            <View >
                <TouchableOpacity 
                onPress={checkClicked} 
                >
                    <View style={{
                        height: 18,
                        width: 18,
                        borderWidth: 1,
                        borderColor: textRed,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Icon name="check" color={checked ? '#000' : '#c3edf6'} size={20}></Icon>

                    </View>
                </TouchableOpacity>

            </View>
        )
    }



    return (
       
                    <RenderContacts />
             
    )

}

export default CheckBoxReview
