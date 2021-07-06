import React, { useState, useRef, } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, RefreshControl ,FlatList} from 'react-native'
import { mainWhite, darkGrey, mainGrey, lightGrey, mainBlue, } from '../../../../../common/Colors'
import { ForkFuelExpense, ForkMaintenance, ForkVehicleList } from './InnerScreen'
import { connect } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import ModalDropdown from 'react-native-modal-dropdown-v2';
import PreInspectionList from './InnerScreen/PreInspectionList'
let indexposition = 0
import Icon from 'react-native-vector-icons/dist/FontAwesome5'
import { fetch_maintanace_list, fetch_all_forklift_list, fetch_forklift_list } from './common/action'
import AllTabs from '../common/AllTabs'


const ForkLiftScreen = ({ navigation, isLoading, all_forklift_list, dispatch }) => {
    const [loadData, setLoadData] = useState(false)

    const RenderContacts = () => {
        const ref_scrollview = useRef()

        
        const dropdown1 = ["Vehicle List"
            , "Pre Inspection check",
            "Maintenance Report",
            "Fuel Expense",
        ]
        const [indexData, setIndexData] = useState(0)
        const [selectedData, setSelectedData] = useState(dropdown1[0])
        const [selected, setSelected] = useState(dropdown1[0])

        const onSelect = (index) => {
            indexposition = index

            setIndexData(index)
            setSelectedData(dropdown1[index])

        }


        const RenderItems = ({ item }) => {

            if (item.id === selected.id) {
                return (
                    <TouchableOpacity>
                        <View style={{
                            flex: 1, flexDirection: 'row', height: 40, marginRight: 10,
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
                    <View>
                        <View style={{
                            flex: 1, opacity: 0.3, flexDirection: 'row', height: 40, marginRight: 10,
                            marginTop: 10, borderWidth: 0.3, borderColor: darkGrey,
                        }}>
                            <View style={{ flex: 1, marginBottom: 5 }}>
                                <Text style={{ marginTop: 10, paddingLeft: 10 }}>{item.value}</Text>
                            </View>
                            <TouchableOpacity  >
                                <View style={{
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
                    </View>

                )
            }
        }



        // if (isLoading) return (
        //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 200, }}>
        //         <ActivityIndicator size="large" color={mainBlue} />
        //     </View>
        // )
        return (
            <>

                <View style={{ flex: 1, paddingHorizontal: 10, backgroundColor: mainWhite,marginTop:'3%' }}>
                    <AllTabs navigation={navigation}/>
                    <View style={{ flexDirection: 'row', marginTop: '1%', }}>
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
                                        flexDirection: 'row', height: 40, backgroundColor: mainWhite,
                                    }}>

                                </View>
                            ) : indexposition == 1 ? (
                                <TouchableOpacity onPress={() => navigation.navigate('addinspection', { vehicledata: all_forklift_list })}
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
                                <TouchableOpacity onPress={() => navigation.navigate('addreport', { vehicledata: all_forklift_list })}
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
                                            <TouchableOpacity onPress={() => navigation.navigate('addExpense', { vehicledata: all_forklift_list })}
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
                            <ForkVehicleList navigation={navigation}
                            />


                        ) : indexposition == 1 ? (
                            <PreInspectionList navigation={navigation} />



                        ) : indexposition == 2 ? (
                            <ForkMaintenance navigation={navigation} />


                        )
                                    : (

                                        <ForkFuelExpense navigation={navigation} />
                                    )
                    }
                </View>
            </>

        )

    }
    const call_apicompleted = () => {
        dispatch(fetch_maintanace_list(1)),
            dispatch(fetch_all_forklift_list()),
            dispatch(fetch_forklift_list(1))
    }

    return (
        // <ScrollView showsVerticalScrollIndicator={false}
        // style={{ flex: 1, backgroundColor: mainWhite }}
        // refreshControl={
        //     <RefreshControl refreshing={loadData} onRefresh={call_apicompleted} />
        // }>
        // <SafeAreaView style={{ flex: 1 }}>
                
        //         <View style={{ flex: 1, }}>
        //             <RenderContacts />
        //         </View>
        // </SafeAreaView>
        //             </ScrollView>
        <FlatList  style={{backgroundColor:mainWhite}}
        data={[]}
       
        ListHeaderComponent={RenderContacts}
    />



    )

}

const mapStateProps = (state) => {
    const { isLoading, all_forklift_list } = state.vehicle__forklift
    return { isLoading, all_forklift_list }
}

export default connect(mapStateProps)(ForkLiftScreen)


