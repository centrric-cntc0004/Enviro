import React, { useState } from 'react'
import { View, Text, } from 'react-native'
import { mainGrey, } from '../../../../../../common/Colors'
import Icon from 'react-native-vector-icons/dist/FontAwesome5'
import ModalDropdown from 'react-native-modal-dropdown-v2'


const VehicleSelect = ({ dropdown_data, selectData }) => {



    let initial_value = ''
    if (dropdown_data) {
        initial_value = dropdown_data[0]
    }

    const [selectedData, setDropdownData] = useState(initial_value)

    const onSelect = (index) => {
        setDropdownData(dropdown_data[index])
        selectData(index)
    }

    return (


        <View style={{ flex: 2.5, justifyContent: 'center', }}>
            <ModalDropdown
                options={dropdown_data}
                defaultIndex={0}
                textStyle={{ color: mainGrey, fontSize: 14 }}
                dropdownStyle={{ width: 120, height: 160 }}
                dropdownTextStyle={{ color: mainGrey, fontSize: 14, paddingLeft: 10 }}
                dropdownTextHighlightStyle={{ color: mainGrey, fontSize: 14, paddingLeft: 10 }}
                onSelect={(index) => onSelect(index)}>

                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                    <View style={{ flex: 5 }}>
                        <Text style={{ color: mainGrey, fontSize: 14, paddingLeft: 5 }} >{selectedData}</Text>
                    </View>

                    <View style={{ flex: 1 }}>
                        <Icon name="chevron-down" size={16} color={mainGrey} />
                    </View>
                </View>
            </ModalDropdown>
        </View>

    )
}

export default VehicleSelect
