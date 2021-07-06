

// }
// export default JobCardList
import React, { useState } from 'react'
import { View, FlatList, Text, } from 'react-native'
import { lightGrey, darkGrey, mainGrey, mainWhite, mainBlue, mediumGrey, textGrey, textBlack, textRed, lightGreen, green } from '../../../../../common/Colors'
import { connect } from 'react-redux'
import { TeamImage } from '../../../../../common/Images'
import { BASE_IMAGE_URL } from '../../../../../store/endpoint'
import { TouchableOpacity } from 'react-native'
import { fetch_job_card, fetch_job_card_full_data } from '../common/action'
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/FontAwesome5'
import moment from 'moment'
let array_list = []
import Toast from 'react-native-simple-toast';



const JobCardList = ({ client_info, card_list, navigation, sales_enviroWaste, dispatch, job_card_lists }) => {
    let allFolders = ['9', '8']

    const getData = (item) => {

        let name = ""
        if (item.company_name !== "") {
            name = item.company_name
        } else {
            name = "job"
        }
        let item1 = { "id": item.id, "name": name }
        dispatch(fetch_job_card_full_data(item))
        navigation.navigate("AddJobIndividual");

        // Toast.showWithGravity('Job card Added Successfully', Toast.SHORT, Toast.BOTTOM);


    }
    const call_delete = (item) => {

        array_list = card_list; // make a separate copy of the array
        var index = array_list.indexOf(item)
        if (index !== -1) {
            array_list.splice(index, 1);
            dispatch(fetch_job_card(array_list))
            call_list()


        }
    }
    const call_list = () => {
        array_list = []
        let a = card_list
        a.forEach(obj => {
            if (!array_list.some(o => o.name === obj.name)) {
                array_list.push({ ...obj })
            }

        });
        dispatch(fetch_job_card(array_list))
    }
    return (
        <View style={{ flex: 1, backgroundColor: mainWhite, }}>
            <View style={{ flex: 1, backgroundColor: mediumGrey, height: 50, marginTop: 20, flexDirection: 'row' }}>
                <Text style={{ marginTop: 15, marginLeft: 20, width: '82%' }}>Job Card List</Text>

                <TouchableOpacity onPress={() => navigation.navigate("AddJobCard")}
                    style={{ justifyContent: 'center', alignItems: 'center', marginRight: 20 }}>
                    <Icon name="plus-circle" size={20} color={mainGrey} />
                </TouchableOpacity>
            </View>

            { job_card_lists.map((item, key2) => {
                let name = ""
                if (item.company_name !== "") {
                    name = item.company_name
                } else {
                    name = "job"
                }
                let item2 = { "id": item.id, "name": name }
                console.log("item2" + JSON.stringify(item2))
                console.log("card" + JSON.stringify(card_list))



                return (


                    <View >
                        {item.connected === false ? (
                            <TouchableOpacity onPress={() => getData(item)}
                                style={{
                                    marginLeft: 10, marginRight: 10,
                                    flexDirection: 'row', height: 100, backgroundColor: textGrey,
                                    marginTop: 10, borderWidth: 0.25, borderColor: mainGrey, borderRadius: 10
                                }}>

                                <View style={{ flex: 1, backgroundColor: textGrey, marginTop: 15, marginBottom: 10, marginLeft: 5, marginRight: 10, }}>
                                    <View style={{ flex: 1, flexDirection: 'column' }}>
                                        <View style={{ flex: 1, flexDirection: 'row', }}>
                                            <Text style={{ paddingLeft: 10, marginTop: 3 }}>{key2 + 1}.</Text>
                                            {item.company_name ? (
                                                <Text numberOfLines={1}
                                                    style={{ width: '82%', marginTop: 3, paddingLeft: 20, color: textBlack, paddingRight: 20, fontWeight: 'bold' }}>{item.company_name}</Text>) : (
                                                    <Text numberOfLines={1}
                                                        style={{ width: '82%', marginTop: 3, paddingLeft: 20, color: textBlack, paddingRight: 20, fontWeight: 'bold' }}>Job</Text>
                                                )}

                                            {JSON.stringify(item2) == JSON.stringify(card_list) ? (

                                                <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 20 }}>
                                                    <Icon name="check-circle" size={20} color={mainBlue} />
                                                </View>
                                            ) : (
                                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 20 }}>
                                                        <Icon name="check-circle" size={20} color={green} />
                                                    </View>
                                                )}


                                        </View>

                                        <Text style={{ marginBottom: 3, paddingLeft: 40, color: textBlack, paddingRight: 20 }}> Created   : {moment(item.created_date_time).format('YYYY-MM-DD' + "    " + 'HH:mm:ss')}</Text>
                                        <Text style={{ marginTop: 3, paddingLeft: 40, color: textBlack, paddingRight: 20 }}> Modified : {moment(item.edited_date_time).format('YYYY-MM-DD ' + "   " + 'HH:mm:ss')}</Text>

                                    </View>
                                </View>
                            </TouchableOpacity>
                        ) : (
                                <TouchableOpacity onPress={() => getData(item)}
                                    style={{
                                        marginLeft: 10, marginRight: 10,
                                        flexDirection: 'row', height: 100, backgroundColor: textGrey,
                                        marginTop: 10, borderWidth: 0.25, borderColor: mainGrey, borderRadius: 10
                                    }}>

                                    <View style={{ flex: 1, backgroundColor: textGrey, marginTop: 15, marginBottom: 10, marginLeft: 5, marginRight: 10, }}>
                                        <View style={{ flex: 1, flexDirection: 'column' }}>
                                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                                <Text style={{ paddingLeft: 10, marginTop: 3 }}>{key2 + 1}.</Text>
                                                {item.company_name ? (
                                                    <Text numberOfLines={1}
                                                        style={{ width: '82%', marginTop: 3, paddingLeft: 20, color: textBlack, paddingRight: 20, fontWeight: 'bold' }}>{item.company_name}</Text>) : (
                                                        <Text numberOfLines={1}
                                                            style={{ width: '82%', marginTop: 3, paddingLeft: 20, color: textBlack, paddingRight: 20, fontWeight: 'bold' }}>Job</Text>
                                                    )}


                                                <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 20 }}>
                                                    <Icon name="check-circle" size={20} color={textRed} />
                                                </View>


                                            </View>

                                            <Text style={{ marginBottom: 3, paddingLeft: 40, color: textBlack, paddingRight: 20 }}> Created   : {moment(item.created_date_time).format('YYYY-MM-DD' + "    " + 'HH:mm:ss')}</Text>
                                            <Text style={{ marginTop: 3, paddingLeft: 40, color: textBlack, paddingRight: 20 }}> Modified : {moment(item.edited_date_time).format('YYYY-MM-DD ' + "   " + 'HH:mm:ss')}</Text>

                                        </View>
                                    </View>
                                </TouchableOpacity>

                            )}

                    </View>

                )
            })}


        </View>
    )

}
const mapStateProps = (state) => {
    const { card_list, } = state.sales_enviroWaste
    return { card_list }
}


export default connect(mapStateProps)(JobCardList)
