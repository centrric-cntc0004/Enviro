import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, Image, ActivityIndicator } from 'react-native'
import { lightGrey, mainGrey, mainBlue, mainWhite } from '../../../../../common/Colors'
import { connect } from 'react-redux'
import { TeamImage } from '../../../../../common/Images'
import { BASE_IMAGE_URL } from '../../../../../store/endpoint'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { sales_performance_details } from '../common/action'
import ModalDropdown from 'react-native-modal-dropdown-v2'
import Icon from 'react-native-vector-icons/dist/FontAwesome5'
import { fetch_waste_sale_performance } from '../common/action';
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import NoDataContent from '../../../../../common/NoDataContent'


const Joblist = ({ navigation, dispatch, sale_performance, sale_prfrm_month, sale_prfrm_year, }) => {
    const monthData = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ]

    const yearData = [

        2010,
        2011,
        2012,
        2013,
        2014,
        2015,
        2016,
        2017,
        2018,
        2019,
        2020,
        2021,
        2022,
        2023,
        2024,
        2025
    ]
    let current_date = new Date()
    const [selectedData, setDropdownData] = useState(current_date.getFullYear())
    const [selectedMon, setDropdownMon] = useState(monthData[0])
    const [indexData, selectedData1] = useState(1)
    const [loader, setLoader] = useState(false)

    
    const api_getlist = (item) => {
        dispatch(sales_performance_details(item.id, 1))
        navigation.navigate("detaildata")
    }
    const RenderItems = ({ item }) => {

        if (item.profile) {
            var profPic = { uri:  item.profile };
        } else {
            var profPic = TeamImage;
        }
        return (


            <TouchableOpacity
                onPress={() => api_getlist(item)}>
                <View style={{
                    height: 150, backgroundColor: "#fff",
                    marginTop: 10, borderWidth: 0.25, borderColor: mainGrey,
                }}>

                    <View style={{ flex: 1, backgroundColor: "#fff", marginBottom: 10, marginLeft: 5, marginRight: 10, }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 0.5, flexDirection: 'column', marginTop: 20, marginLeft: 10 }}>
                                <Image style={{ marginLeft: 2, height: 100, width: 100, marginTop: 5 }} source={profPic} />
                                <Text numberOfLines={1}
                                >{item.name}</Text>
                            </View>
                            <View style={{ flex: 0.7, flexDirection: "column", alignSelf: "center" }}>
                                <View style={{ flexDirection: "row", marginTop: 10 }}>
                                    <Text style={{ width: 150, fontSize: 14, color: mainGrey }}>Total Quote Made</Text>
                                    <Text style={{ fontSize: 14, color: mainBlue }}>{item.total}</Text>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: 15 }}>
                                    <Text style={{ width: 150, color: mainGrey, fontSize: 13 }}>Total Quote Won</Text>
                                    <Text style={{ color: mainBlue, fontSize: 13 }}>{item.won}</Text>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: 10, }}>
                                    <Text style={{ width: 150, color: mainGrey, fontSize: 13 }}>Total Quote Pending</Text>
                                    <Text style={{ color: mainBlue, fontSize: 13 }}>{item.pending}</Text>

                                </View>
                                <View style={{ flexDirection: "row", marginTop: 10 }}>
                                    <Text style={{ width: 150, color: mainGrey, fontSize: 13 }}>Total Quote Lost</Text>
                                    <Text style={{ color: mainBlue, fontSize: 13 }}>{item.lost}</Text>

                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

        )
    }
    const onSelect = (index) => {
        let current_date = new Date()

        setDropdownData(yearData[index])
        dispatch(fetch_waste_sale_performance(yearData[index], current_date.getMonth() + 1))

        // selectData(index)
    }
    const onSelectMon = (index) => {
        setDropdownMon(monthData[index])
        selectedData1(index)

        var index1 = parseInt(index, 10); // you want to use radix 10




        dispatch(fetch_waste_sale_performance(selectedData, index))


    }




    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: lightGrey, paddingHorizontal: 20 }}>
                    <View style={{ flexDirection: "row", height: 40, }}>
                        <View style={{
                            marginTop: 10, justifyContent: 'center', flex: 0.7, height: 35, borderRadius: 50, backgroundColor: mainWhite, alignSelf: 'center'
                            , borderWidth: 0.3, borderColor: mainGrey
                        }}>
                            <View>
                                <ModalDropdown
                                    options={yearData}
                                    defaultIndex={0}
                                    textStyle={{ color: mainGrey, fontSize: 14 }}
                                    dropdownStyle={{ width: 180, height: 160, }}
                                    dropdownTextStyle={{ color: mainGrey, fontSize: 14, paddingLeft: 10 }}
                                    dropdownTextHighlightStyle={{ color: mainGrey, fontSize: 14, paddingLeft: 10 }}
                                    onSelect={(index) => onSelect(index)}>

                                    <View style={{ alignItems: 'center', flexDirection: 'row',paddingHorizontal:15 }}>
                                        <View style={{ flex: 5 }}>
                                            <Text style={{ color: mainGrey, fontSize: 14, paddingLeft: 5 }} >{selectedData}</Text>
                                        </View>

                                        <View style={{ flex: 1 }}>
                                            <Icon name="chevron-down" size={16} color={mainGrey} />
                                        </View>
                                    </View>
                                </ModalDropdown>
                            </View>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={{
                            marginTop: 10, justifyContent: 'center', flex: 0.7, height: 35, borderRadius: 50, backgroundColor: mainWhite, alignSelf: 'center'
                            , borderWidth: 0.3, borderColor: mainGrey
                        }}>
                            <ModalDropdown
                                options={monthData}
                                defaultIndex={0}
                                textStyle={{ color: mainGrey, fontSize: 14, marginTop: 10 }}
                                dropdownStyle={{ width: 120, height: 160, backgroundColor: "red" }}
                                dropdownTextStyle={{ color: mainGrey, fontSize: 14, paddingLeft: 10 }}
                                dropdownTextHighlightStyle={{ color: mainGrey, fontSize: 14, paddingLeft: 10 }}
                                onSelect={(index) => onSelectMon(index)}>

                                <View style={{ alignItems: 'center', flexDirection: 'row' ,paddingHorizontal:15}}>
                                    <View style={{ flex: 5 }}>
                                        <Text style={{ color: mainGrey, fontSize: 14,  }} >{selectedMon}</Text>
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        <Icon name="chevron-down" size={16} color={mainGrey} />
                                    </View>
                                </View>
                            </ModalDropdown>
                        </View>
                    </View>
                    {sale_performance.length===0?(
                        <NoDataContent/>
                        ):(
 <>
                    {sale_performance.map((item, key2) => {
                        if (item.profile) {
                            var profPic = { uri: item.profile };
                        } else {
                        var profPic = TeamImage;
                         }
                        return (

                            <TouchableOpacity
                                onPress={() => api_getlist(item)}
                            >
                                <View style={{
                                    height: 150, backgroundColor: "#fff",
                                    marginTop: 10, borderWidth: 0.25, borderColor: mainGrey,
                                }}>

                                    <View style={{ flex: 1, backgroundColor: "#fff", marginBottom: 10, marginLeft: 5, marginRight: 10, }}>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <View style={{ flex: 0.5, flexDirection: 'column', marginTop: 20, marginLeft: 10 }}>
                                                <Image
                                                    onLoadStart={() => setLoader(true)}
                                                    onLoad={() => setLoader(false)}
                                                    style={{ marginLeft: 2, height: 100, width: 100, marginTop: 5 }} source={profPic} />

                                                <Text numberOfLines={1}
                                                >{item.name}</Text>
                                            </View>
                                            <View style={{ flex: 0.7, flexDirection: "column", alignSelf: "center" }}>
                                                <View style={{ flexDirection: "row", marginTop: 10 }}>
                                                    <Text style={{ width: 150, fontSize: 14, color: mainGrey }}>Total Quote Made</Text>
                                                    <Text style={{ fontSize: 14, color: mainBlue }}>{item.total}</Text>
                                                </View>
                                                <View style={{ flexDirection: "row", marginTop: 10 }}>
                                                    <Text style={{ width: 150, color: mainGrey, fontSize: 13 }}>Total Quote Won</Text>
                                                    <Text style={{ color: mainBlue, fontSize: 13 }}>{item.won}</Text>
                                                </View>
                                                <View style={{ flexDirection: "row", marginTop: 10, }}>
                                                    <Text style={{ width: 150, color: mainGrey, fontSize: 13 }}>Total Quote Pending</Text>
                                                    <Text style={{ color: mainBlue, fontSize: 13 }}>{item.pending}</Text>

                                                </View>
                                                <View style={{ flexDirection: "row", marginTop: 10 }}>
                                                    <Text style={{ width: 150, color: mainGrey, fontSize: 13 }}>Total Quote Lost</Text>
                                                    <Text style={{ color: mainBlue, fontSize: 13 }}>{item.lost}</Text>

                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>

                        )
                    })}
                    </>
                    )}
                    
                </View>
                
            </ScrollView>
        </SafeAreaView>
    )
}







const mapStateToProps = (state) => {
    const { sale_performance, sale_prfrm_month, sale_prfrm_year } = state.sales_enviroWaste
    return { sale_performance, sale_prfrm_month, sale_prfrm_year }
}



export default connect(mapStateToProps)(Joblist)









