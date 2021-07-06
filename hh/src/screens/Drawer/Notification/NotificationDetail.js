import React, { useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import { mainWhite, textGrey, mediumGrey, mainGrey } from '../../../common/Colors'
import { ClientImage } from '../../../common/Images'
import { BASE_IMAGE_URL } from '../../../store/endpoint'
import { read_notify } from './common/action'


const NotificationDetail = ({ navigation, route, dispatch }) => {

    if (route.params.items.dp) {
        var propic = { uri:  route.params.items.dp }
    } else {
        var propic = ClientImage
    }

    useEffect(() => {
        //  dispatch(read_notify(1,route.params.items.id))
    })


    return (
        <View style={{ flex: 1, backgroundColor: mainWhite }}>
            <View style={{ height: 10, backgroundColor: textGrey }}>

            </View>
            <View style={{
                backgroundColor: "#e9f8fc", marginLeft: 10, marginRight: 10,
                marginTop: 10, flex: 0.5, flexDirection: "column", height: 100,
            }}>
                <View style={{
                    backgroundColor: "#e9f8fc",
                    flexDirection: 'row', height: 80
                }}>
                    <View style={{ flex: 1, backgroundColor: "#e9f8fc", marginTop: 10, marginBottom: 10, marginLeft: 5 }}>
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Image style={{ marginLeft: 2, height: 50, width: 50, borderRadius: 25, marginTop: 10 }} source={propic} />
                        </View>
                    </View>
                    <View style={{ borderRadius: 30, marginTop: 3, marginBottom: 2, flex: 4, flexDirection: 'column', backgroundColor: mediumGrey }}>
                        <View style={{ flex: 1.3, flexDirection: 'row' }}>
                            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: "#e9f8fc" }}>
                                <View style={{ flexDirection: 'column', marginTop: 15 }}>
                                    <Text style={{ paddingLeft: 10, paddingTop: 5, color: mainGrey,  fontSize: 14 }}>{route.params.items.title}</Text>
                                    <Text numberOfLines={1}
                                        style={{ paddingLeft: 10, color: mainGrey, textAlign: 'justify', fontSize: 14 }}>{route.params.items.created_by}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: "#e9f8fc", borderRadius: 30, }}>
                                <View style={{ marginLeft: 50, marginRight: 10, flexDirection: 'column', marginTop: 20, justifyContent: 'center', alignItems: 'center', }}>
                                    {/* <Text style={{ color: textBlue, textAlign: 'justify', fontSize: 14 }}>View</Text> */}
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <Text style={{ paddingLeft: 10, paddingRight: 10, color: mainGrey }}>{route.params.items.description}</Text>

            </View>

            {/* <View style={{ justifyContent: 'center', alignItems: "center", flex: 0.3, flexDirection: 'row', marginLeft: 10, marginRight: 10, marginBottom: 20 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: 100, height: 50, borderWidth: 0.3, borderColor: mainGrey, borderRadius: 10 }}>
                    <Text>Open File</Text>
                </View>
               
            </View> */}
            <View style={{ flex: 0.3 }}>

            </View>
        </View>
    )

}

export default NotificationDetail



