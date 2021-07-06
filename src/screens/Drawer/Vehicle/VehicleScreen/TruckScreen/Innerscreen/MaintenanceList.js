import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import { mainWhite, darkGrey, mainGrey, lightGrey, mainBlue } from '../../../../../../common/Colors'
import { connect } from 'react-redux'
import { fetch_maintanace_list1 ,truck_delete_data} from '../common/action'
import NoDataContent from '../../../../../../common/NoDataContent'
const MaintenanceList = ({ navigation, data, dispatch, vehicledata, vehicle__truck,fetch_maintanace,
}) => {
    const { truck_maintanace_list, truck_maintanance_page ,all_truck_list} = vehicle__truck
    const RenderContacts = () => {
        let data=[]

        const [pageNo, setPageNo] = useState(1)
        const [apiRecall, setapiRecall] = useState(true)



        const loadPageCompleted = () => {

            const onSuccess = (response) => {
                console.log("salijdsijfsdijfs")
                set_maintenance_data(data.concat(response.data))
                setPageNo(pageNo + 1)
            }

            const onFailue = (response) => {
                setapiRecall(false)
            }
            let functions = {
                success: onSuccess,
                failed: onFailue
            }
            if (apiRecall) {
                dispatch(fetch_maintanace_list1(truck_maintanance_page + 1, onSuccess, onFailue))

            }
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
            console.log("kjhkjhkjjkhj")
            let data = {
                id: id
            }
            const onSuccess = (response) => {
            }

            const onFailue = (response) => {
            }
            let functions = {
                success: onSuccess,
                failed: onFailue
            }
           dispatch( truck_delete_data(id, onSuccess, onFailue, 1))

        }

        const RenderList = ({ item }) => {
            const { id, registration, description, invoice_date, service_date, ometer, invoice_number, service_provided, hours, l_cost, s_part, gst, total_cost } = item
            return (


                <TouchableOpacity 
                onLongPress={()=>delete_api(item.id)}
                    onPress={() => navigation.navigate('edittruck', { items: item, vehicleList: all_truck_list })}
                    style={{
                        flexDirection: 'column', borderRadius: 1,
                        flex: 0.7, backgroundColor: mainWhite, marginTop: 15, borderWidth: 0.2, borderColor: darkGrey
                    }}>
                    <View style={{ flexDirection: 'row', flex: 1, backgroundColor: mainWhite, marginTop: 10, marginLeft: 5, marginRight: 5, }}>

                        <View style={{ flex: 3, marginLeft: 10, marginRight: 10, flexDirection: 'column', }}>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Registration</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Description</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Service Provided</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Invoice Date</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Service Date</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Ometer</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Invoice No</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Hours</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Labour Cost</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Spare Parts</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>GST</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Total Cost</Text>
                        </View>
                        <View style={{ flex: 3, marginLeft: 10, marginRight: 10, }}>
                            <Text style={{ color: mainBlue, marginTop: 20 }}>: {registration}</Text>
                            <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {description}</Text>
                            <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {service_provided}</Text>
                            <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {invoice_date}</Text>
                            <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {service_date}</Text>
                            <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {ometer}</Text>
                            <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {invoice_number}</Text>
                            <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {hours}</Text>
                            <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>:{l_cost}</Text>
                            <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {s_part}</Text>
                            <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {gst}</Text>
                            <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {total_cost}</Text>
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
        if (truck_maintanace_list.length < 1)
            return (
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={{ height: 200, margin: 20, width: '100%', marginTop: 130, borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: mainWhite }}>
                       <NoDataContent/>
                    </View>
                </View>

            )


        return (
            <View style={{ flex: 1, backgroundColor: lightGrey, marginTop: "3%" }}>
                 {/* {complete_vehicle_lists!==undefined?(
                  <>
                { complete_vehicle_lists.length > 0 ? (
            <FlatList
                style={{ marginTop: '3%', }}
                scrollEnabled={false}
                data={complete_vehicle_lists}
                renderItem={RenderList}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, key) => key.toString()}
                onEndReached={() => loadPageCompleted()}
                onEndReachedThreshold={1}
            />
        ) : ( */}
                <FlatList style={{ paddingBottom: 70 }}
                    data={truck_maintanace_list}
                    renderItem={RenderList}
                    scrollEnabled={false}

                    keyExtractor={(item, key) => key.toString()}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={1}
                    refreshing={false}
                    // onEndReached={() => 

                    // }
                />
{/*                 
        )}
        </>):( null)} */}
            </View>
        )
    }


    return (

        <RenderContacts />

    )

}
const mapStateProps = (state) => {
    const { vehicle__truck } = state
    return { vehicle__truck }
}

export default connect(mapStateProps)(MaintenanceList)





