
import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import { mainWhite, darkGrey, mainGrey, lightGrey, mainBlue } from '../../../../../../common/Colors'
import { connect } from 'react-redux'
import { complete_fuel_list, __delete_fuel } from '../common/action'
import NoDataContent from '../../../../../../common/NoDataContent'


const ForkFuelExpense = ({ forklift_list, navigation, data, vehicledata, all_forklift_list, truck_fuel_list, all_truck_list, dispatch, complete_fuel_lists }) => {


    const [pageNo, setPageNo] = useState(1)
    const [apiRecall, setapiRecall] = useState(true)
    let data1=[]


    const call_nextapi = () => {
        console.log("Inside Method")

        const success = (response) => {

            if (complete_fuel_lists) {
                dispatch(complete_fuel_list(complete_fuel_lists.concat(response)))
                setPageNo(pageNo + 1)
            }

            else {

                dispatch(complete_fuel_list(forklift_list.concat(response)))
                setPageNo(pageNo + 1)
            }

        }
        const failed = (response) => {
        }

        // dispatch(fuel_list_pagination(pageNo, success, failed))



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
            // recall_forknotifications()
        }

        const onFailue = (response) => {
        }
        let functions = {
            success: onSuccess,
            failed: onFailue
        }
        dispatch(__delete_fuel(id, onSuccess, onFailue, 1))

    }
    console.log("vehicleList" + JSON.stringify(all_truck_list))
    const RenderList = ({ item }) => {
        const { registration, id, date, time, truck_rego, current_reading_before, reading_after_filling, filled_by, volume_usedIn_liter } = item

        return (
            <TouchableOpacity onLongPress={() => delete_api(item.id)}
                onPress={() => navigation.navigate('editfuel', { items: item, vehicleList: all_forklift_list })}
            >
                <View style={{
                    flexDirection: 'column', borderRadius: 1, flex: 1, backgroundColor: mainWhite, marginTop: 15, borderWidth: 0.2, borderColor: darkGrey
                }}>
                    <View style={{ flexDirection: 'row', height: 350, flex: 1, backgroundColor: mainWhite, marginTop: 10, marginLeft: 5, marginRight: 5, }}>

                        <View style={{ flex: 4, marginLeft: 10, marginRight: 10, flexDirection: 'column', }}>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Registration</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Date</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Time</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Forklift Rego</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Filled By</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Current Reading</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Reading After</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Volume used in Litres</Text>

                        </View>
                        <View style={{ flex: 3, marginLeft: 10, marginRight: 10, }}>
                            <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {registration}</Text>
                            <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {date}</Text>
                            <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {time}</Text>
                            <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {truck_rego}</Text>
                            <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {filled_by}</Text>
                            <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {current_reading_before}</Text>
                            <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {reading_after_filling}</Text>
                            <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {volume_usedIn_liter}</Text>


                        </View>

                    </View>
                </View>
            </TouchableOpacity>


        )
    }

    if (forklift_list.length === 0)
        return (
            <View style={{ justifyContent: 'center', alignItems: "center", backgroundColor: lightGrey, marginTop: '50%' }}>
                <NoDataContent />
            </View>
        )
    return (
        <View style={{ flex: 1, backgroundColor: lightGrey, marginTop: '3%' }}>


            <FlatList
                style={{ marginTop: '3%', }}
                data={forklift_list}
                renderItem={RenderList}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, key) => key.toString()}
                onEndReached={() => call_nextapi()}
                onEndReachedThreshold={1}
            />


        </View>
    )
}




const mapStateToProps = (state) => {
    const { forklift_list, truck_fuel_list, truck_fuel_page, all_truck_list, complete_fuel_lists, all_forklift_list } = state.vehicle__forklift
    return { forklift_list, truck_fuel_list, truck_fuel_page, all_truck_list, complete_fuel_lists, all_forklift_list }
}


export default connect(mapStateToProps)(ForkFuelExpense)





// import React from 'react'
// import { View, Text, FlatList, TouchableOpacity, Alert, } from 'react-native'
// import { mainWhite, darkGrey, mainGrey, lightGrey, mainBlue } from '../../../../../../common/Colors'


// const ForkFuelExpense = ({ navigation }) => {

//     const RenderContacts = () => {







//         const RenderList = ({ item }) => {
//             const { id, title } = item
//             return (


//                 <TouchableOpacity 
//                 >
//                     <View style={{
//                         flexDirection: 'column', borderRadius: 1, flex: 1, backgroundColor: mainWhite, marginTop: 15, borderWidth: 0.2, borderColor: darkGrey
//                     }}>
//                         <View style={{
//                             flexDirection: 'row', height: 300, flex: 1, backgroundColor: mainWhite, marginTop: 10, marginLeft: 5, marginRight: 5,
//                         }}>

//                             <View style={{ flex: 4, marginLeft: 10, marginRight: 10, flexDirection: 'column', }}>
//                                 <Text style={{ color: mainGrey, marginTop: 20 }}>Date                 </Text>
//                                 <Text style={{ color: mainGrey, marginTop: 20 }}>Time                  </Text>
//                                 <Text style={{ color: mainGrey, marginTop: 20 }}>Truck Rego            </Text>
//                                 <Text style={{ color: mainGrey, marginTop: 20 }}>Filled By               </Text>
//                                 <Text style={{ color: mainGrey, marginTop: 20 }}>Current Reading         </Text>
//                                 <Text style={{ color: mainGrey, marginTop: 20 }}>Reading After          </Text>
//                                 <Text style={{ color: mainGrey, marginTop: 20 }}>Volume used in Litres</Text>

//                             </View>
//                             <View style={{ flex: 3, marginLeft: 10, marginRight: 10, }}>
//                                 <Text style={{ color: mainBlue, marginTop: 20 }}>:   1234   </Text>
//                                 <Text style={{ color: mainBlue, marginTop: 20 }}>: Repairs   </Text>
//                                 <Text style={{ color: mainBlue, marginTop: 20 }}>: Repair    </Text>
//                                 <Text style={{ color: mainBlue, marginTop: 20 }}>: 27-5-2020  </Text>
//                                 <Text style={{ color: mainBlue, marginTop: 20 }}>: 30-7-2020  </Text>
//                                 <Text style={{ color: mainBlue, marginTop: 20 }}>: 12345      </Text>
//                                 <Text style={{ color: mainBlue, marginTop: 20 }}>: 1234      </Text>


//                             </View>

//                         </View>
//                     </View>
//                 </TouchableOpacity>


//             )
//         }


//         return (
//             <View style={{ flex: 1, backgroundColor: lightGrey, marginTop: '1%' ,justifyContent:'center',alignItems:'center'}}>
//                 <Text>No Data Found</Text>
//             </View>
//         )
//     }

//     return (

//                     <RenderContacts  />

//     )

// }

// export default ForkFuelExpense



