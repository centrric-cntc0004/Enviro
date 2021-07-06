import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { lightGrey, mainWhite, darkGrey, mainGrey, mainBlue, textGrey } from '../../../../../common/Colors'
import HomeList from './HomeList'

const ContentLayout = ({ navigation }) => {
    const RenderForm = () => {
        let dummyData = ['Waste', 'Pumps', 'Hills','Destruction','All']
        const [selected, setSelected] = useState(dummyData[0])


        return (

            <View style={{ flex: 1, backgroundColor: lightGrey }}>
                <View style={{ backgroundColor: textGrey, height: 13 }}>
                </View>
                <View style={{ flex: 0.1, paddingHorizontal: 10, marginBottom: 10, marginTop: '10%' }}>
                    <View style={{ flexDirection: 'row', backgroundColor: mainWhite, borderRadius: 20, height: 40, borderWidth: 0.3, borderColor: darkGrey }}>
                        {
                            dummyData.map((item, key) => {

                                if (item === selected) {

                                    return (


                                        <View style={{ marginTop: 1, marginBottom: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: mainBlue, flex: 4.5, }}>
                                            <Text style={{ fontSize: 13, color: mainWhite, }}>{item}</Text>
                                        </View>

                                    )
                                } else {
                                    return (
                                        <TouchableOpacity onPress={() => setSelected(item)} style={{ marginTop: 2, marginBottom: 4, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: mainWhite, flex: 4.5, }}>
                                            <Text style={{ fontSize: 13, color: mainGrey, }}>{item}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                            })
                        }
                    </View>
                </View>
                <HomeList navigation={navigation} />
                {/* <RoasterList/> */}
            </View>

        )
    }
    return (


        <RenderForm />

    )
}

export default ContentLayout
