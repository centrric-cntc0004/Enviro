import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, RefreshControl, SafeAreaView, ActivityIndicator, FlatList, ScrollView } from 'react-native'
import { mainWhite, darkGrey, textRed, mainGrey, lightGrey, mainBlue, mediumGrey, lightGreen } from '../../../../../common/Colors'
import Icon from 'react-native-vector-icons/dist/FontAwesome5'
import { PreInspectionList, MaintenanceList, FuelExpense, VehicleList } from './Innerscreen'
import ModalDropdown from 'react-native-modal-dropdown-v2';
let indexposition = 0
import Icon1 from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { fetch_preinspection_list, fetch_maintanace_list, fetch_all_truck_list, fetch_fuel_list, fetch_truck_list } from './common/action'


const TruckScreen = ({ navigation, isLoading, all_truck_list,dispatch }) => {
    const [loadData, setLoadData] = useState(false)

    const RenderContacts = ({ values }) => {
        const ref_scrollview = useRef()
        const dropdown = [{ "id": 1., "value": "Vehicle List" },
        { "id": 2., "value": "Pre Inspection check" },
        { "id": 3., "value": "Maintenance Report" },
        { "id": 4., "value": "Fuel Expense" },
        ]
        const dropdown1 = ["Vehicle List"
            , "Pre Inspection check",
            "Maintenance Report",
            "Fuel Expense",
        ]
        const [indexData, setIndexData] = useState(0)
        const [loginPageStatus, setloginPageStatus] = useState(false)

        const [isCheck, setCheck] = useState(false)
        const [isCheck1, setCheck1] = useState(false)
        const [selected, setSelected] = useState(dropdown[0])
        const [selectedData, setSelectedData] = useState(dropdown[0].value)


        const call_fuel_api = () => {
            const onSuccess = (response) => {
                setloginPageStatus(false)

                set_fuel_data(response.data)
            }

            const onFailue = (response) => {
                setloginPageStatus(false)

            }

            let functions = {
                success: onSuccess,
                failed: onFailue
            }
            fuel_data(1, functions)
        }



        const call_vehicle_api = () => {
            const onSuccess = (response) => {
                set_vehicle_data(response.data)
            }

            const onFailue = (response) => {

            }

            let functions = {
                success: onSuccess,
                failed: onFailue
            }
            get_vehicle_data("truck", functions)
        }

        const call_api = (item) => {

            setSelected(item)

        }

        
        const RenderItems = ({ item }) => {

            if (item.id === selected.id) {
                return (



                    <TouchableOpacity onPress={() => call_api(item)}
                    >
                        <View style={{
                            flex: 1,

                            flexDirection: 'row', height: 40, marginRight: 10,
                            marginTop: 10, borderWidth: 0.3, borderColor: darkGrey,
                        }}>
                            <View style={{ flex: 1, marginBottom: 5 }}>
                                <Text style={{ marginTop: 10, paddingLeft: 10 }}>{item.value}</Text>
                            </View>
                            <TouchableOpacity onPress={() => call_api(item)} >
                                <View style={{
                                    height: 18,
                                    width: 18,
                                    marginTop: 10,
                                    borderWidth: 1,
                                    marginRight: 10,
                                    borderRadius: 9,
                                    borderColor: mainGrey,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>

                                    <View style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: mainBlue }}>

                                    </View>


                                </View>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>

                )

            } else {
                return (



                    <TouchableOpacity onPress={() => call_api(item)}
                    >
                        <View style={{
                            flex: 1,

                            flexDirection: 'row', height: 40, marginRight: 10,
                            marginTop: 10, borderWidth: 0.3, borderColor: darkGrey,
                        }}>
                            <View style={{ flex: 1, marginBottom: 5 }}>


                                <Text style={{ marginTop: 10, paddingLeft: 10 }}>{item.value}</Text>
                            </View>
                            <TouchableOpacity onPress={() => call_api(item)} >
                                <View style={{
                                    opacity: 0.6,
                                    height: 18,
                                    width: 18,
                                    marginTop: 10,
                                    marginRight: 10,
                                    borderWidth: 1,
                                    borderRadius: 9,
                                    borderColor: mainGrey,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>

                                    <View style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: mainGrey }}>

                                    </View>


                                </View>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>

                )
            }
        }



        const onSelect = (index) => {
            indexposition = index

            setIndexData(index)
            setSelectedData(dropdown[index].value)


        }

        const checkClicked = () => {
            setCheck(!isCheck)
        }
        const checkClicked1 = () => {
            setCheck1(!isCheck1)
        }
        if (isLoading) return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <ActivityIndicator size="large" color={mainBlue} />
            </View>
        )
        return (
            <View style={{ flex: 1, paddingHorizontal: 20, backgroundColor: lightGrey }}>

                <View style={{ flexDirection: 'row', marginTop: '6%', }}>
                    <View style={{
                        marginTop: 5,
                        flex: 1, height: 570, alignItems: 'center', flexDirection: 'row', paddingLeft: 10, paddingRight: 5, borderRadius: 5, height: 40, borderWidth: 0.3, backgroundColor: mainWhite, borderColor: darkGrey
                    }}>

                        <View style={{ flex: 4, justifyContent: 'center', }}>

                            <ModalDropdown
                                options={dropdown1}
                                defaultIndex={0}
                                textStyle={{ color: mainGrey, fontSize: 18 }}
                                dropdownStyle={{ width: 170, height: 150 }}
                                dropdownTextStyle={{ color: mainGrey, fontSize: 14, paddingLeft: 10, paddingTop: 10 }}
                                dropdownTextHighlightStyle={{ color: mainGrey, fontSize: 14, paddingLeft: 10 }}
                                onSelect={(index) => onSelect(index)}
                            >
                                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                    <View style={{ flex: 5 }}>
                                        <Text style={{ color: mainGrey, fontSize: 13, }} >{selectedData}</Text>
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        <Icon name="chevron-down" size={16} color={mainGrey} />
                                    </View>
                                </View>
                            </ModalDropdown>
                        </View>
                    </View>

                    <View style={{ flex: 0.1 }} />
                    {
                        indexposition == 0 ? (
                            <View
                                style={{
                                    flex: 0.6,
                                    backgroundColor: 'orange',
                                    marginLeft: 30,
                                    marginTop: 10,
                                    marginBottom: 10,
                                    alignItems: 'center', justifyContent: 'center', alignItems: 'center',
                                    flexDirection: 'row', height: 40, backgroundColor: lightGrey,
                                }}>

                            </View>
                        ) : indexposition == 1 ? (
                            <TouchableOpacity onPress={() => navigation.navigate('addpreinspection', { vehicledata: all_truck_list })}
                                style={{
                                    flex: 0.6,
                                    backgroundColor: 'orange',
                                    marginLeft: 30,
                                    marginTop: 10,
                                    marginBottom: 10,
                                    alignItems: 'center', justifyContent: 'center', alignItems: 'center',
                                    flexDirection: 'row', borderRadius: 20, height: 40, borderWidth: 0.5, backgroundColor: mainWhite, borderColor: mainBlue
                                }}>

                                <Text style={{ color: mainBlue, textAlign: 'center' }} >Add New +</Text>
                            </TouchableOpacity>
                        ) : indexposition == 2 ? (
                            <TouchableOpacity onPress={() => navigation.navigate('addtruck', { vehicledata: all_truck_list })}
                                style={{
                                    flex: 0.6,
                                    backgroundColor: 'orange',
                                    marginLeft: 30,
                                    marginTop: 10,
                                    marginBottom: 10,
                                    alignItems: 'center', justifyContent: 'center', alignItems: 'center',
                                    flexDirection: 'row', borderRadius: 20, height: 40, borderWidth: 0.5, backgroundColor: mainWhite, borderColor: mainBlue
                                }}>

                                <Text style={{ color: mainBlue, textAlign: 'center' }} >Add New +</Text>
                            </TouchableOpacity>
                        ) : (
                                        <TouchableOpacity onPress={() => navigation.navigate('addfuelExpense', { vehicledata: all_truck_list })}
                                            style={{
                                                flex: 0.6,
                                                backgroundColor: 'orange',
                                                marginLeft: 30,
                                                marginTop: 10,
                                                marginBottom: 10,
                                                alignItems: 'center', justifyContent: 'center', alignItems: 'center',
                                                flexDirection: 'row', borderRadius: 20, height: 40, borderWidth: 0.5, backgroundColor: mainWhite, borderColor: mainBlue
                                            }}>

                                            <Text style={{ color: mainBlue, textAlign: 'center' }} >Add New +</Text>
                                        </TouchableOpacity>
                                    )
                    }

                </View>
                {
                    indexposition == 0 ? (
                        <VehicleList navigation={navigation} />


                    ) : indexposition == 1 ? (
                        <PreInspectionList navigation={navigation} />



                    ) : indexposition == 2 ? (
                        <MaintenanceList navigation={navigation}
                        />

                    )
                                : (

                                    <FuelExpense navigation={navigation} />
                                )
                }
            </View>




        )

    }
    const call_apicompleted = () => {

        dispatch(fetch_preinspection_list()),
            dispatch(fetch_maintanace_list(1)),
            dispatch(fetch_all_truck_list()),
            dispatch(fetch_fuel_list(1)),
            dispatch(fetch_truck_list(1))

    }
    return (
        // <ScrollView showsVerticalScrollIndicator={false}
        // style={{ flex: 1, }}>
        <SafeAreaView  style={{ flex: 1, }}>
            <ScrollView showsVerticalScrollIndicator={false}
            
                style={{ flex: 1, }}
                refreshControl={
                    <RefreshControl refreshing={loadData} onRefresh={call_apicompleted} />
                }>

                <View style={{ flex: 1, }}>

                    <RenderContacts />
                </View>
            </ScrollView>
            </SafeAreaView>


    )

}

const mapStateProps = (state) => {
    const { isLoading, all_truck_list } = state.vehicle__truck
    return { isLoading, all_truck_list }
}

export default connect(mapStateProps)(TruckScreen)


