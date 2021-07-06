import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, RefreshControl, PermissionsAndroid, SafeAreaView, ActivityIndicator, FlatList, ScrollView, Alert } from 'react-native'
import { mainWhite, darkGrey, textRed, mainGrey, lightGrey, mainBlue, mediumGrey, lightGreen, } from '../../../../../common/Colors'
import Icon from 'react-native-vector-icons/dist/FontAwesome5'
import { connect } from 'react-redux'
import TruckScreen from '../TruckScreen/TruckScreen'
import { Item } from 'native-base'
import { get_company_type, get_tab_type, } from '../TruckScreen/common/action'
import CarScreen from '../CarScreen/CarScreen'
import ForkLiftScreen from '../ForkLiftScreen/ForkLiftScreen'
import{vehicle_list_pagination1,get_sub_header} from '../TruckScreen/common/action'
import {fetch_truck_list} from '../CarScreen/common/action'
import {vehicle_list_pagination} from '../ForkLiftScreen/common/action'


function AllTabs({ navigation, isLoading, dispatch, companytypes, tabtypes,subheader }) {
    const [loadData, setLoadData] = useState(false)

        const ref_scrollview = useRef()
        console.log("ngsfxdhasg"+companytypes)
         let mainHeader = ['Waste', 'Pumps', 'Hills', 'Destruction', 'All']
        // let subHeader = ['Truck', 'Car', 'Forklift']
        let a=[]
         if(subheader){
           a=subheader
         }
        const [subHeader, setSubHeader] = useState(a)
        const [selectedData, setSelectedData] = useState(mainHeader[0])
        const [selectedSub, setSelectedSub] = useState(tabtypes)
        console.log("datadadad"+subheader)


        const call_tabs = (item) => {
            if (item === "Waste" ) {
                dispatch(get_tab_type("Truck"))
                dispatch(get_company_type({"name":"waste","option":"Waste"}))
                setSubHeader(['Truck', 'Car', 'Forklift'])
                dispatch(get_sub_header(['Truck', 'Car', 'Forklift']))
                setSelectedSub('Truck')

                if(selectedSub==="Truck"){
                    dispatch(fetch_truck_list(1,"waste"))
                    navigation.navigate("Truck")

                }else if(selectedSub==="Car"){
                    dispatch(fetch_truck_list(1,"waste"))
                    navigation.navigate("Car")

                }else if(selectedSub==="Forklift"){
                    dispatch(vehicle_list_pagination(1,"waste"))
                    navigation.navigate("ForkLifts")


                }


            }else if (item === "All" ) {
                dispatch(get_tab_type("Truck"))
                dispatch(get_company_type({"name":"all","option":"All"}))
                setSubHeader(['Truck', 'Car', 'Forklift'])
                dispatch(get_sub_header(['Truck', 'Car', 'Forklift']))
                setSelectedSub('Truck')

                if(selectedSub==="Truck"){
                    dispatch(fetch_truck_list(1,"waste"))
                    navigation.navigate("Truck")

                }else if(selectedSub==="Car"){
                    dispatch(fetch_truck_list(1,"waste"))
                    navigation.navigate("Car")

                }else if(selectedSub==="Forklift"){
                    dispatch(vehicle_list_pagination(1,"waste"))
                    navigation.navigate("ForkLifts")


                }
               
            } else if (item === "Pumps") {
                dispatch(get_tab_type("Truck"))
                setSubHeader(['Truck', 'Utes', 'Forklift'])
                dispatch(get_sub_header(['Truck', 'Utes', 'Forklift']))
                dispatch(get_company_type({"name":"pumps","option":"Pumps"}))
                setSelectedSub('Truck')
                if(selectedSub==="Truck"){
                    dispatch(fetch_truck_list(1,"pumps"))
                    navigation.navigate("Truck")

                }else if(selectedSub==="Forklift"){
                    dispatch(vehicle_list_pagination(1,"fork-lift"))
                    navigation.navigate("ForkLifts")


                }else if(selectedSub==="Utes"){
                    dispatch(vehicle_list_pagination(1,"fork-lift"))
                    navigation.navigate("Car")


                }
            } else if (item === "Hills") {
                dispatch(get_company_type({"name":"hills","option":"Hills"}))
                dispatch(get_tab_type("Machinery"))
                setSubHeader(['Machinery'])
                dispatch(get_sub_header(['Machinery']))
                setSelectedSub('Machinery')

                navigation.navigate("ForkLifts")


            } else if (item === "Destruction") {
                dispatch(get_company_type({"name":"destruction","option":"Destruction"}))

                setSubHeader(['Forklift']) 
                dispatch(get_tab_type("Forklift"))
                dispatch(get_sub_header(['Forklift']))
                setSelectedSub('Forklift')

                navigation.navigate("ForkLifts")


            }
        }

        const call_subtabs=(items)=>{
            if(items==="Truck"){
                dispatch(get_tab_type("Truck"))
                setSelectedSub("Truck")

                if(companytypes.name==="waste"&& items==="Truck"){
                    
                    navigation.navigate("Truck")
                }else if(companytypes.name==="pumps"&& items==="Truck"){
                    navigation.navigate("Truck")
                }else if(companytypes.name==="destruction"&& items==="Truck"){
                    navigation.navigate("Truck")
                }

            }else  if(items==="Car"){
                dispatch(get_tab_type("Car"))
                setSelectedSub("Car")

                if(companytypes.name==="waste"&& items==="Car"){
                    navigation.navigate("Car")
                }else if(companytypes.name==="pumps"&& items==="Car"){
                    navigation.navigate("Car")
                }else if(companytypes.name==="destruction"&& items==="Car"){
                    navigation.navigate("Car")
                }
            }else  if(items==="Forklift"){
                dispatch(get_tab_type("Forklift"))
                setSelectedSub("Forklift")

                if(companytypes.name==="waste"&& items==="Forklift"){
                    navigation.navigate("ForkLifts")
                }else if(companytypes.name==="pumps"&& items==="Forklift"){
                    navigation.navigate("ForkLifts")
                }else if(companytypes.name==="destruction"&& items==="Forklift"){
                    navigation.navigate("ForkLifts")
                }
            }else  if(items==="Utes"){
                dispatch(get_tab_type("Utes"))
                setSelectedSub("Utes")

                if(companytypes.name==="pumps"&& items==="Utes"){
                    navigation.navigate("Car")
                }
            }else  if(items==="Machinery"){
                dispatch(get_tab_type("Machinery"))
                setSelectedSub("Machinery")
                navigation.navigate("ForkLifts")

                if(companytypes.name==="hills"&& items==="Machinery"){
                    navigation.navigate("ForkLifts")
                }
            }

        }



        return (
            <View style={{  backgroundColor: mainWhite, marginTop: '5%',paddingBottom:10}}>


                <View style={{ flexDirection: 'row', marginTop: 10, backgroundColor: mainWhite, borderRadius: 20, height: 38, borderWidth: 0.3, borderColor: darkGrey }}>
                    {
                        mainHeader.map((item1, key) => {

                            if (item1 === companytypes.option) {

                                return (


                                    <View style={{ marginTop: 1, marginBottom: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: mainBlue, flex: 4.5 }}>
                                        <Text numberOfLines={1}
                                            style={{ fontSize: 13, color: mainWhite, }}>{item1}</Text>
                                    </View>

                                )
                            } else {
                                return (

                                    <TouchableOpacity onPress={() => call_tabs(item1)} style={{ marginTop: 2, marginBottom: 4, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: mainWhite, flex: 4.5, }}>
                                        <Text numberOfLines={1}
                                            style={{ fontWeight: '900', fontSize: 13, color: mainGrey, }}>{item1}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        })
                    }
                </View>
                <View style={{marginTop:'3%'}}/>
                <View style={{ flexDirection: 'row',  backgroundColor: mainWhite, borderRadius: 20, height: 38, borderWidth: 0.3, borderColor: darkGrey }}>
                    {
                        subheader.map((item1, key) => {

                            if (item1 === tabtypes) {

                                return (


                                    <View style={{ marginTop: 1, marginBottom: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: mainBlue, flex: 4.5 }}>
                                        <Text numberOfLines={1}
                                            style={{ fontSize: 13, color: mainWhite, }}>{item1}</Text>
                                    </View>

                                )
                            } else {
                                return (

                                    <TouchableOpacity onPress={() => call_subtabs(item1)} style={{ marginTop: 2, marginBottom: 4, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: mainWhite, flex: 4.5, }}>
                                        <Text numberOfLines={1}
                                            style={{ fontWeight: '900', fontSize: 13, color: mainGrey, }}>{item1}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        })
                    }


                </View>

                {/* {
                    selectedSub == "Truck" ? (
                        <TruckScreen navigation={navigation} />) :selectedSub == "Car" ? (
                            <CarScreen navigation={navigation}/>
                        ):selectedSub == "Forklift" ?(
                            <ForkLiftScreen navigation={navigation}/>
                        ):(
                            null
                        )} */}
            </View>



        )
   

}

const mapStateProps = (state) => {
    const { isLoading, companytypes, tabtypes ,subheader} = state.vehicle__truck
    return { isLoading, companytypes, tabtypes,subheader }
}

export default connect(mapStateProps)(AllTabs)


