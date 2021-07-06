import React, { useState } from 'react'
import { View, Text, FlatList, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native'
import { mainWhite, mainGrey, darkGrey, lightGrey, lightGreen, mediumGrey, mainBlue, textGrey } from '../../../../common/Colors'
import { ClientImage } from '../../../../common/Images'
import { BASE_IMAGE_URL } from '../../../../store/endpoint'
let total_products = []
import { connect } from 'react-redux'
import { get_asset,select_type_data,fetch_temp_clients,select_client, search_client_list, fetch_client_previous_list, fetch_client_list } from '../action'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'


const ClientList = ({ temp_client_list, navigation, client_list, dispatch, search_employee
    , isLoading, select_client_data, fetch_previous, fetch_client ,fetch_temp_clients,set_type,fetch_asset,typedata}) => {

    total_products = client_list
    let dummyDataC = ['Waste', 'Pumps', 'Hills','Destruction','All']
    const [selectedC, setSelectedC] = useState(dummyDataC[0])


    let dummyData = ["Permanent Sites", "Temporary Sites"]
    const [selected, setSelected] = useState(dummyData[0])

    const call_apicompleted = () => {
        fetch_client()
    }


    const select_client = (item) => {
        select_client_data(item)
        fetch_previous(item.id)
        fetch_asset(item.id)
        navigation.navigate('clientProfile')
    }

    const call_nextapi = (data) => {
        setSelectedC(data)


        if (data === "Pumps") {
           set_type("pumps")

            fetch_client("pumps")
            fetch_temp_clients("pumps")
        }
        else if (data === "Destruction") {

           set_type("destruction")

            fetch_client("destruction")
            fetch_temp_clients("destruction")
        } else if (data === "Hills") {

            set_type("hills")
fetch_client("hills")
            fetch_temp_clients("hills")
        } else if (data === "Waste") {

            set_type("waste")

            fetch_client("waste")
           fetch_temp_clients("waste")
        } else if(data === "All") {
set_type("all")

            fetch_client("all")
            fetch_temp_clients("all")
        } 


    }


    const RenderList = ({ item }) => {
        const { client_id, client_name, dp, dp_thumbnail,site_address,invoice_purchase_no } = item
        if (dp_thumbnail) {
            var profPic = { uri: dp_thumbnail };
        } else {
            var profPic = ClientImage;
        }
        return (
            <TouchableOpacity
                onPress={() => select_client(item)}
            >
                <View style={{
                    flexDirection: 'row',
                    flex: 1, height: 110, backgroundColor: mediumGrey, marginTop: 10
                }}>

                    <View style={{
                        flex: 1.5,
                        marginLeft: 10,
                        marginRight: 10,
                        marginTop: 10,
                        marginBottom: 10,
                        alignItems: 'center',
                    }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ height: 80, width: 80, borderRadius: 5 }} source={profPic} />
                        </View>
                    </View>
                    <View style={{
                        flex: 3,
                        marginLeft: 10,
                        marginRight: 10,
                        marginTop: 15,
                        marginBottom: 10,
                        flexDirection: 'row',
                    }}>
                        <View style={{ flexDirection: 'column', flex: 4 }}>
                            <Text style={{ color: mainBlue, textAlign: 'justify' }}>Site Name</Text>
                            <Text style={{ paddingTop: 10, color: mainBlue, textAlign: 'justify' }}>Site Address</Text>
                            <Text style={{ paddingTop: 10, color: mainBlue, textAlign: 'justify' }}>Order Number</Text>

                        </View>
                        <View style={{ flex: 5, flexDirection: 'column', }}>
                            <Text numberOfLines={1}
                            style={{ color: darkGrey,  }}>: {client_name}</Text>
                            <Text numberOfLines={1}
                                style={{ paddingTop: 10, color: darkGrey, textAlign: 'justify' }}>: {site_address}</Text>
                                <Text numberOfLines={1}
                                style={{ paddingTop: 10, color: darkGrey, textAlign: 'justify' }}>: {invoice_purchase_no}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }



    if (isLoading === true) return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={mainBlue} />
        </View>
    )



    return (
        <ScrollView showsVerticalScrollIndicator={false}
        style={{ flex: 1,backgroundColor: mainWhite, }}>
        <SafeAreaView style={{ flex: 1, }}>
        <View style={{ flex: 1, backgroundColor: mainWhite, paddingBottom: 30 }}>
            <View style={{ backgroundColor: textGrey, height: 11 }}>
            </View>
            <View style={{ paddingHorizontal: 10, marginTop: '5%' }}>
            <View style={{ flexDirection: 'row', backgroundColor: mainWhite, borderRadius: 20, height: 40, borderWidth: 0.3, borderColor: darkGrey }}>
                        {
                            dummyDataC.map((item, key) => {

                                if (item === selectedC) {

                                    return (


                                        <View style={{ marginTop: 1, marginBottom: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: mainBlue, flex: 4.5, }}>
                                            <Text style={{ fontSize: 13, color: mainWhite, }}>{item}</Text>
                                        </View>

                                    )
                                } else {
                                    return (
                                        <TouchableOpacity onPress={() => call_nextapi(item)} style={{ marginTop: 2, marginBottom: 4, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: mainWhite, flex: 4.5, }}>
                                            <Text style={{ fontSize: 13, color: mainGrey, }}>{item}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                            })
                        }
                    </View>
                    </View>
                    <View style={{ paddingHorizontal: 10, marginTop: '5%' }}>
                <View style={{ flexDirection: 'row', backgroundColor: mainWhite, borderRadius: 20, height: 40, borderWidth: 0.3, borderColor: darkGrey }}>
                    {
                        dummyData.map((item1, key) => {

                            if (item1 === selected) {
                                // getTeamCurr()

                                return (


                                    <View style={{ backgroundColor: mainBlue, marginTop: 1, marginBottom: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center', flex: 3.5, }}>
                                        <Text numberOfLines={1}
                                            style={{ fontSize: 13, color: mainWhite, }}>{item1}</Text>
                                    </View>

                                )
                            } else {
                                return (
                                    <TouchableOpacity
                                        onPress={() => setSelected(item1)}
                                        style={{ backgroundColor: mainWhite, marginTop: 2, marginBottom: 4, borderRadius: 20, justifyContent: 'center', alignItems: 'center', flex: 3.5, }}>
                                        <Text numberOfLines={1}
                                            style={{ fontSize: 13, color: mainGrey, }}>{item1}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        })
                    }
                </View>
            </View>
            <View style={{ marginLeft: 10, marginRight: 10, flexDirection: 'row', marginTop: '5%', paddingLeft: 25, borderRadius: 20, height: 42, borderWidth: 0.2, backgroundColor: mainWhite, borderColor: darkGrey }}>
                <TextInput
                    style={{ fontSize: 14, color: '#000', width: '70%', height: 40 }}
                    placeholder='Search Site by Name'
                    autoCorrect={false}
                    onChangeText={(txt) => {
                        // setKeyword(txt)
                        search_employee(txt,typedata)
                    }}
                />
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: '30%', height: 40, backgroundColor: lightGreen, borderRadius: 30 }}>
                    <Text style={{ color: mainWhite }}>Search</Text>
                </TouchableOpacity>
            </View>
            {selected === "Permanent Sites" ? (
                <View>
                {total_products.length === 0 ? (
                    <View style={{marginTop:200, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{color:mainGrey}}>No Site Found</Text>
                    </View>
                ) : (
                <FlatList
                    style={{ marginTop: '5%' }}
                    data={total_products}
                    renderItem={RenderList}
                    keyExtractor={(item, key) => key.toString()}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={1}
                    onRefresh={() => call_apicompleted()}
                    refreshing={false}
                    refreshing={false}
                />
                )}
                </View>
            ) : (
                    <View>
                        {temp_client_list.length === 0 ? (
                            <View style={{marginTop:200, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{color:mainGrey}}>No Site Found</Text>
                            </View>
                        ) : (


                                <FlatList
                                    style={{ marginTop: '5%' }}
                                    data={temp_client_list}
                                    renderItem={RenderList}
                                    keyExtractor={(item, key) => key.toString()}
                                    showsVerticalScrollIndicator={false}
                                    onEndReachedThreshold={1}
                                    onRefresh={() => call_apicompleted()}
                                    refreshing={false}
                                    refreshing={false}
                                />
                            )}
                    </View>
                )}
        </View>
        </SafeAreaView>
        </ScrollView>
    )
}



const mapStateProps = (state) => {
    const { client_list, isLoading ,typedata} = state.client
    const { temp_client_list } = state.sales_enviroWaste
    return { client_list, isLoading, temp_client_list,typedata }
}



const mapDispatchToProps = (dispatch) => {
    return {
        select_client_data: (employee) => dispatch(select_client(employee)),
        search_employee: (search_keyword,type) => dispatch(search_client_list(search_keyword,type)),
        fetch_previous: (id) => dispatch(fetch_client_previous_list(id)),
        fetch_client: (type) => dispatch(fetch_client_list(type)),
        fetch_temp_clients:(type)=>dispatch(fetch_temp_clients(type)),
        set_type:(type)=>dispatch(select_type_data(type)),
        fetch_asset:(id)=>dispatch(get_asset(id))




    }
}
export default connect(mapStateProps, mapDispatchToProps)(ClientList)




