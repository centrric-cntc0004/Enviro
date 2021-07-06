import React, { useState } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native'
import { mainWhite, darkGrey, lightGrey, textBlack, mainGrey } from '../../../../../common/Colors'
import { ClientImage, LocationImage } from '../../../../../common/Images'
import { BASE_IMAGE_URL } from '../../../../../store/endpoint'
let width = Dimensions.get('window').width / 4.4


const TeamMembers = ({ navigation, details2 }) => {
    const RenderContacts = ({ values }) => {

console.log("team"+JSON.stringify(details2))
        const RenderList = ({ item }) => {
            const { name, dp } = item

            if (dp) {
                var pro = { uri:  dp }
            } else {
                var pro = ClientImage
            }

            return (
                <TouchableOpacity onLongPress={() => delete_api(item.employee_id)}
                    onPress={() => navigation.navigate('TeamProfile', { item })}
                    style={{ backgroundColor: mainWhite, height: 130, width: width, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}  >
                    <View style={{ flex: 1.2, backgroundColor: mainWhite }}>
                        <Image style={{ height: 60, width: 60, borderRadius: 30, }} source={pro} />
                    </View>
                    <View style={{ marginBottom: 20, flex: 1, backgroundColor: mainWhite, justifyContent: 'center', alignItems: 'center' }}>
                        <Text numberOfLines={1}
                            style={{ paddingLeft: 10, fontSize: 13, color: darkGrey, }}>{name}</Text>

                    </View>

                </TouchableOpacity>


            )

        }





        return (
            <View style={{ flex: 0.55, backgroundColor: mainWhite, marginTop: '3%' }}>
              {details2.team_employees.length!==0?(
               <View>
                <Text style={{ color: textBlack, fontWeight: '900', fontSize: 14, paddingLeft: 10 }}>Team Members</Text>
                <FlatList style={{ marginTop: '1%' }}
                    horizontal
                    data={details2.team_employees}
                    renderItem={RenderList}
                    keyExtractor={(item, key) => key.toString()}
                    showsHorizontalScrollIndicator={false}
                    onEndReachedThreshold={1}
                   
                    refreshing={false}
                />
                </View>
            ):(
                    null
                )} 
            </View>
        )
    }

    return (

        <RenderContacts />

    )

}

export default TeamMembers



