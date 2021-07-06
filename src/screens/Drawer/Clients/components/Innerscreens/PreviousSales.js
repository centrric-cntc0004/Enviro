import React from 'react'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { lightGrey, mainBlue, darkGrey, textGrey, mainGrey, textBlack } from '../../../../../common/Colors'
import { ClientImage } from '../../../../../common/Images'
import { connect } from 'react-redux'




const PreviousSales = ({ navigation, client_previous_list }) => {
    const RenderContacts = () => {

        const RenderList = ({ item }) => {
            const { id, title } = item
            return (
                <TouchableOpacity onPress={() => navigation.navigate("SalesDetails", { items: item })}
                >
                    <View style={{
                        flexDirection: 'row', flex: 1, height: 140, backgroundColor: textGrey,
                        marginTop: 10, borderWidth: 0.2, borderColor: darkGrey, borderRadius: 5,
                    }}>

                        <View style={{ flex: 1, backgroundColor: textGrey, marginTop: 10, marginLeft: 5 }}>
                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                <Image style={{ height: 100, width: 100, borderRadius: 5 }} source={ClientImage} />
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <Text style={{ fontSize: 10 }}>Job code :</Text>
                                    <Text style={{ color: "red", fontSize: 10 }}>{item.code}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 2, flexDirection: 'column', }}>
                            <View style={{ flex: 1.3, flexDirection: 'row' }}>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <Text style={{ color: mainGrey, textAlign: 'justify', fontSize: 14 }}>Name</Text>
                                        <Text style={{ color: mainGrey, textAlign: 'justify', fontSize: 14 }}>:</Text>
                                        <Text numberOfLines={1}
                                            style={{ paddingRight: 25, paddingLeft: 5, color: mainGrey, textAlign: 'justify', fontSize: 14 }}>{item.client_name}</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', flex: 2.8, paddingTop: 5 }}>
                                        <Text style={{ color: mainGrey, textAlign: 'justify', fontSize: 14 }}>Job Type</Text>
                                        <Text style={{ color: mainGrey, textAlign: 'justify', fontSize: 14 }}>:</Text>
                                        <Text numberOfLines={1}
                                            style={{ paddingRight: 25, paddingLeft: 5, color: darkGrey, textAlign: 'justify', fontSize: 14 }}>{item.job_type}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 0.9, flexDirection: 'row', }}>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ color: mainGrey, textAlign: 'justify', fontSize: 12 }}>Invoice Amount</Text>
                                    <Text style={{ color: mainBlue, textAlign: 'justify', fontSize: 12 }}>{item.amount}</Text>
                                </View>
                                <View style={{ flexDirection: 'column', marginLeft: 50,marginRight:10 }}>
                                    <Text style={{ color: mainGrey, textAlign: 'justify', fontSize: 12 }}>Created by</Text>
                                    <Text numberOfLines={1}
                                    style={{ color: textBlack, textAlign: 'justify', fontSize: 12, fontWeight: 'bold',width:80 }}>{item.created_by}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }

        if (client_previous_list.length == 0)
            return (
                <View style={{ flex: 1, backgroundColor: lightGrey, paddingHorizontal: 20 }}>
                    <Text style={{ color: mainGrey, paddingTop: 20 }}>Previous Sales</Text>
                    <View style={{ marginTop: 50, marginBottom: 50, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 14, color: mainGrey }}>No data Found</Text>
                    </View>
                </View>
            )
        return (
            <View style={{ flex: 1, backgroundColor: lightGrey, paddingHorizontal: 20 }}>
                <Text style={{ color: mainGrey, paddingTop: 20 }}>Previous Sales</Text>
                <FlatList
                    style={{ marginTop: '5%' }}
                    data={client_previous_list}
                    renderItem={RenderList}
                    keyExtractor={(item, key) => key.toString()}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={1}
                    refreshing={false}
                />
            </View>
        )
    }

    return (

        <RenderContacts />

    )


}

const mapStateToProps = (state) => {
    const { client_previous_list } = state.client
    return { client_previous_list }
}



export default connect(mapStateToProps)(PreviousSales)



