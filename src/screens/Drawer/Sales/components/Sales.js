import React, { useState } from 'react'
import { View, Text, TouchableOpacity, RefreshControl } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { lightGrey, mainWhite, darkGrey, mainGrey, mainBlue, textGrey, mainBlack } from '../../../../common/Colors'
import Joblist from './InnerScreen/Joblist'
import Quotelist from './InnerScreen/Quotelist'
import Saleslist from './InnerScreen/Saleslist'
import {fetch_job_card_list, attach_file_list,fetch_quote_drafts,get_tab_type, fetch_waste_sale_performance, fetch_job_list_pump, fetch_pump_quote_registers_list, job_list, quote_register_list, fetch_type_sale_performance } from './common/action'
import { connect } from 'react-redux'
import ModalDropdown from 'react-native-modal-dropdown-v2';
import Icon from 'react-native-vector-icons/dist/FontAwesome5'

const Sales = ({ navigation, dispatch }) => {
    let dummyData = ['Job list', 'Quote Register', 'Sales List']
    const [selected, setSelected] = useState(dummyData[0])
    let topdata = ['Waste', 'Pumps', 'Hills', 'Destruction', 'All',]
    const [selecteddata, setSelectedData] = useState(topdata[0])
    const [loadData, setLoadData] = useState(false)
    const onSelect = (index) => {

        setSelected(dummyData[index])


    }
    const call_api = (item) => {
        let current_date = new Date()
        setSelectedData(item)
        if (item === "Pumps") {
            dispatch(get_tab_type("pumps"))
            dispatch(fetch_job_list_pump("pumps", 1))
            dispatch(fetch_pump_quote_registers_list("pumps", 1))
            dispatch(fetch_type_sale_performance("pumps", current_date.getFullYear(), current_date.getMonth() + 1))
            dispatch(fetch_quote_drafts("pumps"))
            dispatch(attach_file_list("pumps"))
            dispatch(fetch_job_card_list())

        } else if (item === "Waste") {
            dispatch(get_tab_type("waste"))

            dispatch(job_list(1))
            dispatch(quote_register_list(1))
            dispatch(fetch_waste_sale_performance(current_date.getFullYear(), current_date.getMonth() + 1))
            dispatch(fetch_quote_drafts("waste"))
            dispatch(attach_file_list("waste"))
            dispatch(fetch_job_card_list())



        } else if (item === "Destruction") {
            dispatch(get_tab_type("destruction"))

            dispatch(fetch_job_list_pump("destruction", 1))
            dispatch(fetch_pump_quote_registers_list("destruction", 1))
            dispatch(fetch_type_sale_performance("destruction", current_date.getFullYear(), current_date.getMonth() + 1))
            dispatch(fetch_quote_drafts("destruction"))
            dispatch(attach_file_list("destruction"))
            dispatch(fetch_job_card_list())



        } else if (item === "Hills") {
            dispatch(get_tab_type("hills"))

            dispatch(fetch_job_list_pump("hills", 1))
            dispatch(fetch_pump_quote_registers_list("hills", 1))
            dispatch(fetch_type_sale_performance("hills", current_date.getFullYear(), current_date.getMonth() + 1))
            dispatch(fetch_quote_drafts("hills"))
            dispatch(attach_file_list("hills"))
            dispatch(fetch_job_card_list())



        } else if (item === "All") {
            dispatch(get_tab_type("all"))

            dispatch(fetch_job_list_pump("all", 1))
            dispatch(fetch_pump_quote_registers_list("all", 1))
            dispatch(fetch_type_sale_performance("all", current_date.getFullYear(), current_date.getMonth() + 1))
            dispatch(fetch_quote_drafts("all"))
            dispatch(attach_file_list("all"))
            dispatch(fetch_job_card_list())



        }

    }

    const call_apicompleted = () => {
        let current_date = new Date()

        if (selecteddata === "Pumps") {
            dispatch(fetch_job_list_pump("pumps", 1))
            dispatch(fetch_pump_quote_registers_list("pumps", 1))
            dispatch(fetch_type_sale_performance("pumps", current_date.getFullYear(), current_date.getMonth() + 1))
            dispatch(fetch_quote_drafts("pumps"))
            dispatch(attach_file_list("pumps"))
            dispatch(fetch_job_card_list())


        } else if (selecteddata === "Waste") {
            dispatch(job_list(1))
            dispatch(quote_register_list(1))
            dispatch(fetch_waste_sale_performance(current_date.getFullYear(), current_date.getMonth() + 1))
            dispatch(fetch_quote_drafts("waste"))
            dispatch(attach_file_list("waste"))
            dispatch(fetch_job_card_list())



        } else if (selecteddata === "Destruction") {
            dispatch(fetch_job_list_pump("destruction", 1))
            dispatch(fetch_pump_quote_registers_list("destruction", 1))
            dispatch(fetch_type_sale_performance("destruction", current_date.getFullYear(), current_date.getMonth() + 1))
            dispatch(fetch_quote_drafts("destruction"))
            dispatch(attach_file_list("destruction"))
            dispatch(fetch_job_card_list())



        } else if (selecteddata === "Hills") {
            dispatch(fetch_job_list_pump("hills", 1))
            dispatch(fetch_pump_quote_registers_list("hills", 1))
            dispatch(fetch_type_sale_performance("hills", current_date.getFullYear(), current_date.getMonth() + 1))
            dispatch(fetch_quote_drafts("hills"))

            dispatch(attach_file_list("hills"))
            dispatch(fetch_job_card_list())


        } else if (selecteddata === "All") {
            dispatch(fetch_job_list_pump("all", 1))
            dispatch(fetch_pump_quote_registers_list("all", 1))
            dispatch(fetch_type_sale_performance("all", current_date.getFullYear(), current_date.getMonth() + 1))
            dispatch(fetch_quote_drafts("all"))
            dispatch(attach_file_list("all"))
            dispatch(fetch_job_card_list())



        }

    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={loadData} onRefresh={call_apicompleted} />
                }
                style={{ flex: 1, backgroundColor: lightGrey }}>
                <View style={{ flex: 1, backgroundColor: lightGrey }}>
                    <View style={{ backgroundColor: textGrey, height: 13 }}>
                    </View>
                    <View style={{ flex: 0.1, paddingHorizontal: 12, marginBottom: 10, marginTop: '5%' }}>

                        <View style={{ flexDirection: 'row', marginTop: 10, backgroundColor: mainWhite, borderRadius: 20, height: 38, borderWidth: 0.3, borderColor: darkGrey }}>
                            {
                                topdata.map((item1, key) => {

                                    if (item1 === selecteddata) {

                                        return (


                                            <View style={{ marginTop: 1, marginBottom: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: mainBlue, flex: 4.5 }}>
                                                <Text numberOfLines={1}
                                                    style={{ fontSize: 13, color: mainWhite, }}>{item1}</Text>
                                            </View>

                                        )
                                    } else {
                                        return (

                                            <TouchableOpacity onPress={() => call_api(item1)} style={{ marginTop: 2, marginBottom: 4, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: mainWhite, flex: 4.5, }}>
                                                <Text numberOfLines={1}
                                                    style={{ fontWeight: '900', fontSize: 13, color: mainGrey, }}>{item1}</Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                })
                            }
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', flex: 0.1, paddingHorizontal: 20, marginBottom: 10, marginTop: '2%' }}>

                        <View style={{ flex: 0.7, backgroundColor: mainWhite, borderRadius: 20, height: 35, borderWidth: 0.3, borderColor: darkGrey }}>

                            <ModalDropdown
                                options={dummyData}
                                defaultIndex={0}
                                textStyle={{ color: mainGrey, fontSize: 18 }}
                                dropdownStyle={{ width: 170, height: 150 }}
                                dropdownTextStyle={{ color: mainGrey, fontSize: 14, paddingLeft: 10, paddingTop: 10 }}
                                dropdownTextHighlightStyle={{ color: mainGrey, fontSize: 14, paddingLeft: 10 }}
                                onSelect={(index) => onSelect(index)}>
                                <View style={{ marginRight: 10, marginTop: 8, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                    <View style={{ flex: 5, marginLeft: 20, }}>
                                        <Text numberOfLines={1}
                                        style={{ color: mainGrey, fontSize: 14, }} >{selected}</Text>
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        <Icon name="chevron-down" size={16} color={mainGrey} />
                                    </View>
                                </View>
                            </ModalDropdown>
                        </View>
                        <View style={{ flex: 0.1 }} />

                        <View  style={{ flex: 0.7,}}>

                        </View>
                        {/* <View style={{ flex: 0.6 }}>
                            {selecteddata !== "All" ? (
                                <TouchableOpacity onPress={() => navigation.navigate("QuoteGenerate")}
                                    style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: mainWhite, borderRadius: 50, height: 35, borderWidth: 0.3, borderColor: mainGrey }}>
                                    <Text style={{ color: mainGrey }}>Generate Quote</Text>
                                </TouchableOpacity>
                            ) : (
                                    <View

                                        style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: mainWhite, height: 35, }}>
                                    </View>
                                )}
                        </View> */}

                    </View>
                    {
                        selected === "Job list" ? (
                            <View style={{ backgroundColor: lightGrey }}>
                                <Saleslist navigation={navigation} />
                            </View>

                        ) : selected === "Quote Register" ? (
                            <Quotelist navigation={navigation}
                            />
                        )
                                : (

                                    <Joblist navigation={navigation} />

                                )
                    }


                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

const mapStateProps = (state) => {
    const { generate_quote_list, isLoading, } = state.sales_enviroWaste
    return { generate_quote_list, isLoading, }
}



export default connect(mapStateProps)(Sales)
