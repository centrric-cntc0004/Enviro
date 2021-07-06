import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, Dimensions, Image, Alert } from 'react-native'
import { lightGrey, mainWhite, mainBlue, darkGrey, mediumGrey, mainGrey, textBlue, lightGreen } from '../../../../../common/Colors'
import { TeamImage } from '../../../../../common/Images'
import { BASE_IMAGE_URL } from '../../../../../store/endpoint'
import { connect } from 'react-redux'
import { tab_employee, team_list_current1, team_list_term1, select_employee, certificate_list, team_list, all_vehicle_folders, designation_list } from '../../action'
let data = ""
const TeamLists = ({ get_Data, tab, getTeamCurr, getTeamTerm, designation_list, team_list_api, all_folders_api, navigation, team, select_employee_data, dispatch, get_employee, get_certificate }) => {

    let width = Dimensions.get('window').width / 3.35
    width = width;
    let dummyData = ["Current Employee", "Terminated Employees"]
    const [selected, setSelected] = useState(tab)
    const [tabVal, setTabVal] = useState(true)

    const call_apicompleted = () => {
        // team_list_api()
        // all_folders_api()
        designation_list()
        getTeamCurr()
        getTeamTerm()

    }
    const { team_list } = team
    const call_api1 = (item) => {
        get_employee(item)
         get_certificate(item.id)
        // all_folders_api(item.id)
        navigation.navigate('TeamProfile', { item })
    }


    const RenderItems = ({ item }) => {
        const { name, designation, cover_image, user_type, dp, dp_thumbnail } = item
        if (dp_thumbnail) {
            var profPic = { uri:  dp_thumbnail };
        } else {
            var profPic = TeamImage;
        }


        return (
            <TouchableOpacity onPress={() => call_api1(item)}>
                <View style={{
                    flexDirection: 'row', height: 90, backgroundColor: mediumGrey, marginLeft: 10, marginRight: 10,
                    marginTop: 10, borderWidth: 0.3, borderColor: darkGrey, borderRadius: 10,
                }}>
                    <View style={{ flex: 1, backgroundColor: mediumGrey, marginTop: 10, marginBottom: 10, marginLeft: 5 }}>
                        <View style={{ flex: 1, }}>
                            <Image style={{ marginLeft: 2, height: 60, width: 60, borderRadius: 32.5, marginTop: 5 }} source={profPic} />
                        </View>
                    </View>
                    <View style={{ borderRadius: 30, marginTop: 3, marginBottom: 2, flex: 4, flexDirection: 'column', backgroundColor: mediumGrey }}>
                        <View style={{ flex: 1.3, flexDirection: 'row' }}>
                            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: mediumGrey }}>
                                <View style={{ flexDirection: 'column', marginTop: 15 }}>
                                    <Text numberOfLines={1}
                                        style={{ paddingLeft: 10, paddingTop: 5, color: lightGreen, textAlign: 'justify', fontSize: 14 }}>{user_type}</Text>
                                    <Text numberOfLines={1}
                                        style={{ paddingLeft: 10, color: mainGrey, textAlign: 'justify', fontSize: 16 }}>{name}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: mediumGrey, borderRadius: 30, }}>
                                <View style={{ marginLeft: 20, marginRight: 10, flexDirection: 'column', marginTop: 20, justifyContent: 'center', alignItems: 'center', }}>
                                    <View style={{ marginTop: 5, justifyContent: 'center', alignItems: 'center', width: 75, height: 30, borderWidth: 1, borderColor: textBlue, borderRadius: 20 }}>
                                        <Text style={{ color: textBlue, textAlign: 'justify', fontSize: 14 }}>View</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

        )
    }



    const call_next = (item) => {
        get_Data(item)
        if (item === "Current Employee") {
            getTeamCurr()
        } else {
            getTeamTerm()
        }
    }
    // if (team_list.length == 0) return (
    //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //         <Text style={{ fontSize: 16, fontWeight: 'bold' }}>No Team Members Found</Text>
    //     </View>
    // )

    return (
        <View style={{ flex: 1, backgroundColor: lightGrey, marginTop: '1%', }}>
            <View style={{ paddingHorizontal: 20, marginTop: '1%' ,}}>
                <View style={{ flexDirection: 'row', backgroundColor: mainWhite, borderRadius: 20, height: 40, borderWidth: 0.3, borderColor: darkGrey }}>
                    {
                        dummyData.map((item1, key) => {

                            if (item1 === tab) {
                                // getTeamCurr()

                                return (


                                    <View style={{ backgroundColor: mainBlue, marginTop: 1, marginBottom: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center', flex: 3.5, }}>
                                        <Text numberOfLines={1}
                                            style={{ fontSize: 13, color: mainWhite, }}>{item1}</Text>
                                    </View>

                                )
                            } else {
                                return (
                                    <TouchableOpacity onPress={() => call_next(item1)} style={{ backgroundColor: mainWhite, marginTop: 2, marginBottom: 4, borderRadius: 20, justifyContent: 'center', alignItems: 'center', flex: 3.5, }}>
                                        <Text numberOfLines={1}
                                            style={{ fontSize: 13, color: mainGrey, }}>{item1}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        })
                    }
                </View>
            </View>
            {team_list.length == 0 ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, }}>No Team Members Found</Text>
                </View>
            ) : (
                    <FlatList
                        style={{ backgroundColor: lightGrey, marginTop: '3%' ,}}
                        data={team_list}
                        renderItem={RenderItems}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, key) => key.toString()}
                        onEndReachedThreshold={1}
                        onRefresh={() => call_apicompleted()}
                        refreshing={false}

                    />
                )}
        </View>
    )
}
const mapStateProps = (state) => {
    const { isLoading, all_folders, tab } = state.team
    const { team } = state
    return { team, isLoading, all_folders, tab }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // team_list_api: () => dispatch(team_list()),
        getTeamCurr: () => dispatch(team_list_current1()),
        getTeamTerm: () => dispatch(team_list_term1()),
        all_folders_api: () => dispatch(all_vehicle_folders()),

        designation_list: () => dispatch(designation_list()),
        get_employee: (data) => dispatch(select_employee(data)),
         get_certificate: (id) => dispatch(certificate_list(id)),
        get_Data: (tab) => dispatch(tab_employee(tab))


    }
}

export default connect(mapStateProps, mapDispatchToProps)(TeamLists)

