import React, { useState } from 'react'
import { View, TouchableOpacity, } from 'react-native'
import { mainBlue, textRed } from '../../../../../../common/Colors'
import Icon from 'react-native-vector-icons/MaterialIcons'


const CheckBoxEdit = ({ checked, state }) => {

    const RenderContacts = () => {


        const checkClicked = () => {
            state(!checked)
        }


        return (
            <View >
                {checked ? (
                    <TouchableOpacity
                        // onPress={checkClicked}
                    >
                        <View style={{
                            height: 18,
                            width: 18,
                            borderWidth: 1,
                            borderColor: mainBlue,
                            alignItems: 'center',
                            backgroundColor:mainBlue,
                            justifyContent: 'center',
                        }}>
                            <Icon name="check" color={checked ? '#fff' : '#fff'} size={20}></Icon>

                        </View>
                    </TouchableOpacity>
                ) : (
                        <TouchableOpacity
                            // onPress={checkClicked}
                        >
                            <View style={{
                                height: 18,
                                width: 18,
                                borderWidth: 1,
                                borderColor: textRed,
                                alignItems: 'center',
                                backgroundColor:textRed,
                                justifyContent: 'center',
                            }}>
                                <Icon name="check" color={checked ? 'green' : '#fff'} size={20}></Icon>

                            </View>
                        </TouchableOpacity>
                    )}

            </View>
        )
    }



    return (

        <RenderContacts />

    )

}

export default CheckBoxEdit
