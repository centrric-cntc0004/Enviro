import React, { useState } from 'react'
import { View, FlatList, Text, } from 'react-native'
import { lightGrey, darkGrey, mainGrey, mainWhite, mainBlue } from '../../../../../common/Colors'
import { connect } from 'react-redux'
import { TeamImage } from '../../../../../common/Images'
import { BASE_IMAGE_URL } from '../../../../../store/endpoint'

import { quote_list_pagination, complete_quote_list,job_performance_details } from '../common/action'
import { TouchableOpacity } from 'react-native'

const Quotelist = ({ navigation, sales_enviroWaste, dispatch }) => {



    const { quote_register_list, isLoading, complete_quote_lists } = sales_enviroWaste
    const [pageNo, setPageNo] = useState(2)


    const call_nextapi = () => {
        const success = (response) => {
            if (complete_quote_lists) {
                dispatch(complete_quote_list(complete_quote_lists.concat(response)))
                setPageNo(pageNo + 1)
            }
            else {
                dispatch(complete_quote_list(quote_register_list.concat(response)))
                setPageNo(pageNo + 1)
            }

        }
        const failed = (response) => {

        }
        dispatch(quote_list_pagination(pageNo, success, failed))
    }


    
    const call_apis = (item) => {

        //    dispatch(job_list_details(item.job)) 
        dispatch(job_performance_details(item.id))
        navigation.navigate("QuoteDetail", { items: item })
    }

    const RenderItems = ({ item }) => {

        if (item.profile) {
            var profPic = { uri: BASE_IMAGE_URL + item.profile };
        } else {
            var profPic = TeamImage;
        }
        return (


            <TouchableOpacity onPress={()=>call_apis(item)}


                style={{
                    flexDirection: 'column', borderRadius: 1,
                    flex: 1, backgroundColor: mainWhite, marginTop: 15, borderWidth: 0.2, borderColor: darkGrey
                }}>
                <View style={{ flexDirection: 'row', flex: 1, backgroundColor: mainWhite, marginTop: 10, marginLeft: 5, marginRight: 5, }}>

                    <View style={{ flex: 4, marginLeft: 10, marginRight: 10, flexDirection: 'column', }}>
                        <Text style={{ color: mainGrey, marginTop: 20 }}>Date</Text>
                        <Text style={{ color: mainGrey, marginTop: 20 }}>Customer</Text>
                        <Text style={{ color: mainGrey, marginTop: 20 }}>Company Name</Text>
                        <Text style={{ color: mainGrey, marginTop: 20 }}>Contact Number</Text>
                        <Text style={{ color: mainGrey, marginTop: 20 }}>Job Type</Text>
                        <Text style={{ color: mainGrey, marginTop: 20 }}>Status</Text>
                        <Text style={{ color: mainGrey, marginTop: 20 }}>Amount</Text>
                        <Text style={{ color: mainGrey, marginTop: 20 }}>Sales Person</Text>
                        <Text style={{ color: mainGrey, marginTop: 20 }}>Won/Loss Date</Text>
                    </View>
                    <View style={{ flex: 3, marginLeft: 10, marginRight: 10, }}>
                        <Text numberOfLines={1}
                            style={{ color: mainBlue, marginTop: 20 }}>: {item.date}</Text>
                        <Text numberOfLines={1}
                            style={{ color: mainBlue, marginTop: 20 }}>: {item.customer}</Text>
                        <Text numberOfLines={1}
                            style={{ color: mainBlue, marginTop: 20 }}>: {item.company_name}</Text>
                        <Text numberOfLines={1}
                            style={{ color: mainBlue, marginTop: 20 }}>: {item.contact_number}</Text>
                        <Text numberOfLines={1}
                            style={{ color: mainBlue, marginTop: 20 }}>: {item.job_type}</Text>
                        <Text numberOfLines={1}
                            style={{ color: mainBlue, marginTop: 20 }}>: {item.status}</Text>
                        <Text numberOfLines={1}
                            style={{ color: mainBlue, marginTop: 20 }}>: {item.amount}</Text>
                        <Text numberOfLines={1}
                            style={{ color: mainBlue, marginTop: 20 }}>: {item.sale_person}</Text>
                        <Text numberOfLines={1}
                            style={{ color: mainBlue, marginTop: 20 }}>: {item.won_reject_date}</Text>

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


    if (quote_register_list.length === 0)
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: 200 }}>
                <Text style={{ fontSize: 16, color: mainGrey }}>No Data Found</Text>
            </View>
        )


    return (
        <View style={{ flex: 1, backgroundColor: lightGrey }}>

            <FlatList
                style={{ marginTop: '3%', paddingHorizontal: 20 }}
                data={quote_register_list}
                renderItem={RenderItems}
                onEndReached={() => call_nextapi()}

                showsVerticalScrollIndicator={false}
                keyExtractor={(item, key) => key.toString()}
            />
            {/* )} */}
        </View>



    )

}
const mapStateProps = (state) => {
    const { sales_enviroWaste } = state
    return { sales_enviroWaste }

}



export default connect(mapStateProps)(Quotelist)








