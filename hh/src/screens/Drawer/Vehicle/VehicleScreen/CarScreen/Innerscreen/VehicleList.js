import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import { mainWhite, darkGrey, mainGrey, lightGrey, mainBlue } from '../../../../../../common/Colors'
import { connect } from 'react-redux'
import { vehicle_list_pagination, complete_vehicle_list, } from '../common/action'



const VehicleList = ({ navigation, data, vehicledata, truck_preinspection_list, truck_list, complete_vehicle_lists, dispatch }) => {
    const RenderContacts = () => {

        const [pageNo, setPageNo] = useState(1)
        const [apiRecall, setapiRecall] = useState(true)

        let data = [1, 3, 6]
        const call_nextapi = () => {
            console.log("Inside Method")

            const success = (response) => {

                if (complete_vehicle_lists) {
                    dispatch(complete_vehicle_list(complete_vehicle_lists.concat(response)))
                    setPageNo(pageNo + 1)
                }

                else {

                    dispatch(complete_vehicle_list(truck_list.concat(response)))
                    setPageNo(pageNo + 1)
                }

            }
            const failed = (response) => {
            }

            dispatch(vehicle_list_pagination(pageNo, success, failed))



        }


        const delete_api = (id) => {
            Alert.alert(
                "Confirmation",
                "Are you sure to delete?",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("kkk"),
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => call_api(id) }
                ],
                { cancelable: false }
            );
        }
        const call_api = (id) => {
            let data = {
                id: id
            }
            const onSuccess = (response) => {
                recall_notifications()
            }

            const onFailue = (response) => {
            }
            let functions = {
                success: onSuccess,
                failed: onFailue
            }
            truck_delete_data(data, functions)

        }

        const RenderList = ({ item }) => {
            const { id, types, registration, previous_rego, due_rego } = item
            return (


                <TouchableOpacity onLongPress={() => delete_api(id)}
                    onPress={() => navigation.navigate('vehicledetails', { items: item })}
                    style={{
                        flexDirection: 'column', borderRadius: 1,
                        height: 170, backgroundColor: mainWhite, marginTop: 15, borderWidth: 0.25, borderColor: darkGrey
                    }}>
                    <View style={{ flexDirection: 'row', flex: 1, backgroundColor: mainWhite, marginTop: 2, marginLeft: 5, marginRight: 5, }}>

                        <View style={{ flex: 3, marginLeft: 10, marginRight: 10, flexDirection: 'column', }}>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Registration No</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Rego Due</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Type</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Year</Text>

                        </View>
                        <View style={{ flex: 3, marginLeft: 10, marginRight: 10, }}>

                            <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {item.registration}</Text>
                            <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {item.due_rego}</Text>
                            <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {item.types}</Text>
                            <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {item.year}</Text>

                        </View>

                    </View>
                    <View style={{
                        flex: 1,
                        marginTop: '10%',


                    }}>
                    </View>
                </TouchableOpacity>




            )
        }


        return (
            <View style={{ flex: 1, backgroundColor: lightGrey, marginTop: '3%', }}>
                {complete_vehicle_lists !== undefined ? (
                    <>
                        { complete_vehicle_lists.length > 0 ? (
                            <FlatList
                                style={{ marginTop: '3%', }}
                                data={complete_vehicle_lists}
                                renderItem={RenderList}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item, key) => key.toString()}
                                onEndReached={() => call_nextapi()}
                                onEndReachedThreshold={1}
                            />
                        ) : (
                                <FlatList
                                    style={{ marginTop: '3%', }}
                                    data={truck_list}
                                    renderItem={RenderList}
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={(item, key) => key.toString()}
                                    onEndReached={() => call_nextapi()}
                                    onEndReachedThreshold={1}
                                />
                            )
                        }
                    </>) : (
                        null
                    )}
            </View>
        )

    }


    return (

        <RenderContacts />
    )
}
const mapStateProps = (state) => {
    const { truck_preinspection_list, truck_list, complete_vehicle_lists } = state.vehicle_cars
    return { truck_preinspection_list, truck_list, complete_vehicle_lists }
}

export default connect(mapStateProps)(VehicleList)




