import React, { useState } from 'react'
import { View, Text,ListView, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native'
import { mainWhite, mainGrey, mainBlack, darkGrey, lightGrey, lightGreen, mediumGrey, mainBlue, textGrey } from '../../../../common/Colors'
import { ClientImage } from '../../../../common/Images'
import { BASE_IMAGE_URL } from '../../../../store/endpoint'
let total_products = []
import { connect } from 'react-redux'
import { select_location_data, get_asset, search_tempclient_list, select_type_data, fetch_temp_clients, select_client, search_client_list, fetch_client_previous_list, fetch_client_list } from '../action'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { certificate_lists } from '../../../Drawer/Team/action'
import NoDataContent from '../../../../common/NoDataContent'
let user_location=""
const ClientList = ({get_clear, get_location, get_saerch, get_certificate, temp_client_list, navigation, client_list, dispatch, search_employee
    , isLoading, select_client_data, fetch_previous, fetch_client, fetch_temp_clients, set_type, fetch_asset, typedata }) => {

    total_products = client_list

    console.log("client_list"+client_list.length)
    let dummyDataC = ['Waste', 'Pumps', 'Hills', 'Destruction', 'All']
    const [selectedC, setSelectedC] = useState(dummyDataC[0])


    let dummyData = ["Permanent Sites", "Temporary Sites"]
    const [selected, setSelected] = useState(dummyData[0])

    const call_apicompleted = () => {
        fetch_client(typedata)
        fetch_temp_clients(typedata)
    }


    const select_client = (item) => {
        select_client_data(item)
        fetch_previous(item.id)
        fetch_asset(item.id)
        get_certificate(item.id)
        if (item.location_logitude !== null &&

            item.location_latitude !== null && item.location_logitude !== undefined &&

            item.location_latitude !== undefined && item.location_logitude !== "" &&

            item.location_latitude !== "" && item.location_logitude !== NaN &&

            item.location_latitude !== NaN && item.location_logitude !== "NaN" &&

            item.location_latitude !== "NaN") {

            user_location = { "latitude": parseFloat(item.location_latitude), "longitude": parseFloat(item.location_logitude) }
            // user_location = { "latitude": -33.843064,"longitude": 151.2144233 }
            console.log("selected_enter11" + JSON.stringify(item.location_logitude))

            get_location(user_location)

        } else {

            user_location = { "latitude": -33.843064, "longitude": 151.2144233 }
            get_location(user_location)


        }
        navigation.navigate('clientProfile')
    }

    const call_nextapi = (data) => {
        setSelectedC(data)


        if (data === "Pumps") {
            total_products=[]
            set_type("pumps")
            fetch_client("pumps")
            fetch_temp_clients("pumps")
        }
        else if (data === "Destruction") {
            total_products=[]
            set_type("destruction")

            fetch_client("destruction")
            fetch_temp_clients("destruction")
        } else if (data === "Hills") {
            total_products=[]
            set_type("hills")
            fetch_client("hills")
            fetch_temp_clients("hills")
        } else if (data === "Waste") {
            total_products=[]
            set_type("waste")
           

            fetch_client("waste")
            fetch_temp_clients("waste")
        } else if (data === "All") {
            set_type("all")

            fetch_client("all")
            fetch_temp_clients("all")
        }


    }



    const RenderList = ({ item }) => {
        const { client_id, client_name, dp, dp_thumbnail, site_address, invoice_purchase_no } = item
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
                    height: 110, backgroundColor: mediumGrey, marginTop: 10
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
                    {typedata==="pumps"?(
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
                                style={{ color: darkGrey, }}>: {client_name}</Text>
                            <Text numberOfLines={1}
                                style={{ paddingTop: 10, color: darkGrey, textAlign: 'justify' }}>: {site_address}</Text>
                            <Text numberOfLines={1}
                                style={{ paddingTop: 10, color: darkGrey, textAlign: 'justify' }}>: {invoice_purchase_no}</Text>
                        </View>
                    </View>
                    ):(
                       
                        <View style={{
                            flex: 3,
                            marginLeft: 10,
                            marginRight: 10,
                            marginTop: 30,
                            marginBottom: 10,
                            flexDirection: 'row',
                        }}>
                            <View style={{ flexDirection: 'column', flex: 4 }}>
                                <Text style={{ color: mainBlue, textAlign: 'justify' }}>Site Name</Text>
                                <Text style={{ paddingTop: 10, color: mainBlue, textAlign: 'justify' }}>Site Address</Text>
                            </View>
                            <View style={{ flex: 5, flexDirection: 'column', }}>
                            <Text numberOfLines={1}
                                style={{ color: darkGrey, }}>: {client_name}</Text>
                            <Text numberOfLines={1}
                                style={{ paddingTop: 10, color: darkGrey, textAlign: 'justify' }}>: {site_address}</Text>
                            </View>
                        </View>
                        
                    )}
                </View>
            </TouchableOpacity>
        )
    }



    if (isLoading) return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={mainBlue} />
        </View>
    )



    return (
        <ScrollView showsVerticalScrollIndicator={false}
            style={{ flex: 1, backgroundColor: mainWhite, }}>
            <SafeAreaView style={{ flex: 1, }}>
                <View style={{ flex: 1, backgroundColor: mainWhite, paddingBottom: 30 }}>
                    <View style={{ backgroundColor: textGrey, height: 11 }}>
                    </View>
                    <View style={{ paddingHorizontal: 10, marginTop: '5%' }}>
                        <View style={{ flex: 1.5, }}>
                            {/* <View style={{ marginTop: 1 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <View style={{ flex: 6.5 }} />
                                    <TouchableOpacity onPress={() => navigation.navigate("clientProfilec")}
                                        style={styles.topBox}>
                                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', }}>
                                            <Text style={{ color: mainBlack, fontSize: 14 }} >Add Site</Text>
                                        </View>

                                    </TouchableOpacity>

                                </View>
                            </View> */}
                        </View>

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
                    <View style={{ marginLeft: 10, marginRight: 10, flexDirection: 'row', marginTop: '5%', paddingLeft: 25, borderRadius: 20, height: 42, borderWidth: 0.3, backgroundColor: mainWhite, borderColor: darkGrey }}>
                        <TextInput
                            style={{ fontSize: 14, color: '#000', width: '70%', height: 40 }}
                            placeholder='Search Site by Name'
                            autoCorrect={false}
                            placeholderTextColor={mainGrey}
                            onChangeText={(text) => {
                                // setKeyword(txt)
                                if (text !== "") {
                                    if (selected === "Permanent Sites") {

                                        search_employee(text, typedata)
                                    } else {
                                        get_saerch(text, typedata)
                                    }
                                }
                                if (text === "") {
                                    console.log("emptyyyyyyyyyyy")
                                    if (selected === "Permanent Sites") {
                                        fetch_client(typedata)
                                    } else {
                                        fetch_temp_clients(typedata)
                                    }
                                }
                            }}



                        />
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: '30%', height: 40, backgroundColor: lightGreen, borderRadius: 30 }}>
                            <Text style={{ color: mainWhite }}>Search</Text>
                        </TouchableOpacity>
                    </View>
                    {selected === "Permanent Sites" ? (
                        <View>
                            {total_products.length === 0 ? (
                                <View style={{ marginTop: '50%', justifyContent: 'center', alignItems: 'center' }}>
                                    <NoDataContent/>
                                </View>
                            ) : (
                                    <>

                                     <FlatList
                                            style={{ marginTop: '5%' }}
                                            data={total_products}
                                            renderItem={RenderList}
                                            removeClippedSubviews={false}
                                            
                                            keyExtractor={(item, key) => key.toString()}
                                            showsVerticalScrollIndicator={false}
                                            onEndReachedThreshold={1}
                                            onRefresh={() => call_apicompleted()}
                                            refreshing={false}
                                            refreshing={false}
                                        /> 



{/* 
                                        {
                                            total_products.map((item1, key) => {
                                                return (
                                                    RenderList(item1)
                                                )
                                            })} */}
                                    </>
                                    // <FlatList
                                    //     style={{ marginTop: '5%' }}
                                    //     data={total_products}
                                    //     renderItem={RenderList}
                                    //     maxToRenderPerBatch={total_products.length}
                                    //     keyExtractor={(item, key) => key.toString()}
                                    //     showsVerticalScrollIndicator={false}
                                    //     onEndReachedThreshold={1}
                                    //     onRefresh={() => call_apicompleted()}
                                    //     refreshing={false}
                                    //     refreshing={false}
                                    // />
                                )}
                        </View>
                    ) : (
                            <View>
                                {temp_client_list.length === 0 ? (
                                    <View style={{ marginTop: '50%', justifyContent: 'center', alignItems: 'center' }}>
                                      <NoDataContent/>
                                    </View>
                                ) : (

                                    temp_client_list.map((item1, key) => {
                                        return (
                                            RenderList(item1)
                                         )})
                                        // <FlatList
                                        //     style={{ marginTop: '5%' }}
                                        //     data={temp_client_list}
                                        //     renderItem={RenderList}
                                        //     keyExtractor={(item, key) => key.toString()}
                                        //     showsVerticalScrollIndicator={false}
                                        //     onEndReachedThreshold={1}
                                        //     onRefresh={() => call_apicompleted()}
                                        //     refreshing={false}
                                        //     refreshing={false}
                                        // />
                                    )}
                            </View>
                        )}
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}



const mapStateProps = (state) => {
    const { client_list, isLoading, typedata } = state.client
    const { temp_client_list } = state.sales_enviroWaste
    return { client_list, isLoading, temp_client_list, typedata }
}



const mapDispatchToProps = (dispatch) => {
    return {
        select_client_data: (employee) => dispatch(select_client(employee)),
        search_employee: (search_keyword, type) => dispatch(search_client_list(search_keyword, type)),
        fetch_previous: (id) => dispatch(fetch_client_previous_list(id)),
        fetch_client: (type) => dispatch(fetch_client_list(type)),
        fetch_temp_clients: (type) => dispatch(fetch_temp_clients(type)),
        set_type: (type) => dispatch(select_type_data(type)),
        fetch_asset: (id) => dispatch(get_asset(id)),
        get_certificate: (id) => dispatch(certificate_lists(id)),
        get_saerch: (key, type) => dispatch(search_tempclient_list(key, type)),
        get_location: (data) => dispatch(select_location_data(data)),
        get_clear:()=>                dispatch({ type: 'CLIENT_LIST', clients: [] })






    }
}
export default connect(mapStateProps, mapDispatchToProps)(ClientList)




const styles = StyleSheet.create({
    moreBoxes: {
        flex: 1,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: lightGrey,
        borderRadius: 20,
        shadowColor: mainBlack,
        borderWidth: 1,
        borderColor: mainBlue,
        flexDirection: 'row',
    },
    topBox: {
        flex: 3.5,
        height: 35,
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 0.25,
        borderColor: mainGrey,
        borderRadius: 20,
        flexDirection: 'row',
        marginBottom: 10,
        backgroundColor: mainWhite
    },
    textStyle: {
        paddingTop: 10,
        paddingLeft: 10,
        color: darkGrey
    },
    staticBoxStyle: {
        flex: 1.3,
        backgroundColor: mainWhite,
        height: 40,
        marginRight: 10,
        marginTop: 10,
        marginLeft: 10
    },
    editableBoxStyle: {
        flex: 1,
        backgroundColor: mainWhite,
        marginRight: 10,
        marginTop: 10,
        height: 40,
        flexDirection: 'row'
    }






});
