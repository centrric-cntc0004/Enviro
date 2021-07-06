

import React, { useState } from 'react'
import { View, FlatList, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import { darkGrey, mainGrey, mainWhite, mainBlue } from '../../../../../common/Colors'
import { connect } from 'react-redux'
import { TeamImage } from '../../../../../common/Images'
import { BASE_IMAGE_URL } from '../../../../../store/endpoint'
import moment from "moment"
import NoDataContent from '../../../../../common/NoDataContent'
import { job_performance_details } from '../common/action'

const Saleslist = ({ navigation, sales_enviroWaste, dispatch, }) => {

    const { quote_register_list, isLoading, job_list, complete_job_lists } = sales_enviroWaste
    const [pageNo, setPageNo] = useState(2)


    const call_apis = (item) => {
        //    dispatch(job_list_details(item.job)) 
        dispatch(job_performance_details(item.quote))
        navigation.navigate("JobDetails", { items: item })
    }

    const RenderItems = ({ item }) => {
        let formatted_date=""
        if (item.profile) {
            var profPic = { uri: BASE_IMAGE_URL + item.profile };
        } else {
            var profPic = TeamImage;
        }
        if(item.created_date_time){
            let date=new Date(item.created_date_time)
             formatted_date = moment(date).format('YYYY-MM-DD')
        }
        return (


            <TouchableOpacity onPress={() => call_apis(item)}
                style={{
                    flexDirection: 'column', borderRadius: 1,
                    flex: 1, backgroundColor: mainWhite, marginTop: 15, borderWidth: 0.2, borderColor: darkGrey
                }}>
                <View style={{ flexDirection: 'row', flex: 1, backgroundColor: mainWhite, marginTop: 10, marginLeft: 5, marginRight: 5, }}>

                    <View style={{ flex: 2.8, marginLeft: 10, marginRight: 10, flexDirection: 'column', }}>
                        <Text style={{ color: mainGrey, marginTop: 20 }}>Date</Text>
                        <Text style={{ color: mainGrey, marginTop: 20 }}>Job Type</Text>
                        <Text style={{ color: mainGrey, marginTop: 20 }}>Client Id</Text>
                        <Text style={{ color: mainGrey, marginTop: 20 }}>Company Name</Text>
                        <Text style={{ color: mainGrey, marginTop: 20 }}>Client Name</Text>
                        <Text style={{ color: mainGrey, marginTop: 20 }}>Quoted By</Text>
                        <Text style={{ color: mainGrey, marginTop: 20 }}> Amount</Text>
                        <Text style={{ color: mainGrey, marginTop: 20 }}>Status</Text>
                    </View>
                    <View style={{ flex: 3, marginLeft: 10, marginRight: 10, }}>
                        <Text numberOfLines={1}
                            style={{ color: mainBlue, marginTop: 20 }}>: {formatted_date}</Text>
                        <Text numberOfLines={1}
                            style={{ color: mainBlue, marginTop: 20 }}>: {item.job_type}</Text>
                        <Text numberOfLines={1}
                            style={{ color: mainBlue, marginTop: 20 }}>: {item.client_id}</Text>
                        <Text numberOfLines={1}
                            style={{ color: mainBlue, marginTop: 20 }}>: {item.company_name}</Text>
                        <Text numberOfLines={1}
                            style={{ color: mainBlue, marginTop: 20 }}>: {item.client_name}</Text>
                        <Text numberOfLines={1}
                            style={{ color: mainBlue, marginTop: 20 }}>: {item.quoted_by}</Text>
                        <Text numberOfLines={1}
                            style={{ color: mainBlue, marginTop: 20 }}>: {item.amount}</Text>
                        <Text numberOfLines={1}
                            style={{ color: mainBlue, marginTop: 20 }}>: {item.status}</Text>

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


    if (isLoading)
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 200 }}>

                <ActivityIndicator
                    size='large' color={mainBlue}></ActivityIndicator>
            </View>
        )

    if (job_list.length === 0)
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 3, marginTop: '50%',paddingBottom:30 }}>
                <NoDataContent/>
            </View>
        )


    return (

        <View style={{ flex: 1, }}>

            <FlatList
                style={{ marginTop: '3%', paddingHorizontal: 20 }}
                data={job_list}
                renderItem={RenderItems}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, key) => key.toString()}
                onEndReachedThreshold={1}
            />
            {/* )
            }  */}


        </View>
    )

}
const mapStateProps = (state) => {
    const { sales_enviroWaste } = state
    return { sales_enviroWaste }

}

export default connect(mapStateProps)(Saleslist)








