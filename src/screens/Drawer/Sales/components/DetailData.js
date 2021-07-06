


import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Linking } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { lightGrey, mediumGrey, mainWhite, mainGrey, textGrey, darkGrey, mainBlue } from '../../../../common/Colors'
import { connect } from 'react-redux'
import NoDataContent from '../../../../common/NoDataContent'
const DetailData = ({ navigation, route, sales_performance_detail }) => {
    const [name, setName] = useState("")
    const [counter, setCounter] = useState(0)
    const [item, setItem] = useState('')
    let DATA = [2, 7, 9, 4]
    const RenderContacts = ({ values }) => {




        if (sales_performance_detail.length == 0)
            return (
                <View style={{ flex: 1, backgroundColor: mediumGrey }}>
                    <View style={{ flex: 1, height: 10, backgroundColor: mediumGrey, justifyContent: 'center', alignItems: 'center' }}>
                    <NoDataContent/>
                    </View>
                </View>

            )

        return (
            <ScrollView showsVerticalScrollIndicator={false}
                style={{ flex: 1, backgroundColor: lightGrey, }}>
                <View style={{ flex: 1, backgroundColor: lightGrey }}>
                    <View style={{ height: 10, backgroundColor: textGrey }}>

                    </View>
                    <View style={{ flex: 1, paddingHorizontal: 20, backgroundColor: lightGrey, marginBottom: 40 }}>

                        {sales_performance_detail.map((item, key) => {
                            return (
                                <View key={key}>

                                    <TouchableOpacity
                                        // onPress={() => navigation.navigate('edittruck', { items: item, vehicleList: all_truck_list })}
                                        style={{
                                            flexDirection: 'column', borderRadius: 1, height: 350,
                                            backgroundColor: mainWhite, marginTop: 15, borderWidth: 0.2, borderColor: darkGrey
                                        }}>
                                        <View style={{ flexDirection: 'row', flex: 1, backgroundColor: mainWhite, marginTop: 10, marginLeft: 5, marginRight: 5, }}>

                                            <View style={{ flex: 4, marginLeft: 10, marginRight: 10, flexDirection: 'column', }}>
                                                <Text style={{ color: mainGrey, marginTop: 20 }}>Sale Person</Text>
                                                <Text style={{ color: mainGrey, marginTop: 20 }}>Job Type</Text>
                                                <Text style={{ color: mainGrey, marginTop: 20 }}>Customer</Text>
                                                <Text style={{ color: mainGrey, marginTop: 20 }}>Company Name</Text>
                                                <Text style={{ color: mainGrey, marginTop: 20 }}>Date</Text>
                                                <Text style={{ color: mainGrey, marginTop: 20 }}>Amount</Text>
                                                <Text style={{ color: mainGrey, marginTop: 20 }}>Status</Text>
                                                <Text style={{ color: mainGrey, marginTop: 20, marginBottom: 20 }}>Paid Status</Text>




                                            </View>
                                            <View style={{ flex: 3, marginLeft: 10, marginRight: 10, }}>
                                                <Text numberOfLines={1}
                                                style={{ color: mainBlue, marginTop: 20 }}>: {item.sale_person}</Text>
                                                <Text numberOfLines={1}
                                                    style={{ color: mainBlue, marginTop: 20 }}>: {item.job_type} </Text>
                                                <Text numberOfLines={1}
                                                    style={{ color: mainBlue, marginTop: 20 }}>: {item.customer}</Text>
                                                <Text numberOfLines={1}
                                                    style={{ color: mainBlue, marginTop: 20 }}>: {item.company_name}</Text>
                                                <Text numberOfLines={1}
                                                    style={{ color: mainBlue, marginTop: 20 }}>: {item.date}</Text>
                                                <Text numberOfLines={1}
                                                    style={{ color: mainBlue, marginTop: 20 }}>: {item.amount}</Text>
                                                <Text numberOfLines={1}
                                                    style={{ color: mainBlue, marginTop: 20 }}>: {item.status}</Text>
                                                <Text numberOfLines={1}
                                                    style={{ color: mainBlue, marginTop: 20 }}>: {item.paid_status}</Text>

                                            </View>

                                        </View>
                                        <View style={{
                                            flex: 1,
                                            marginTop: '10%',


                                        }}>
                                        </View>
                                    </TouchableOpacity>



                                </View>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>
        )
    }


    return (

        <RenderContacts />

    )

}
const mapStateProps = (state) => {
    const { sales_performance_detail, isLoading, } = state.sales_enviroWaste
    return { sales_performance_detail, isLoading, }
}

export default connect(mapStateProps)(DetailData)



