import React, { useState } from 'react'
import { View, Text, RefreshControl } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { lightGrey, } from '../../../../common/Colors'
import ContentLayout1 from './InnerScreens/ContentLayout1'
import { connect } from 'react-redux'
let date2=""
import {schedule_list,complete_schedule_list,daywise_schedule_list} from './common/action'
const Schedule = ({ navigation,schedule_enviro,dispatch }) => {
            const {  isLoading, type } = schedule_enviro


        var day = new Date().getDate()
        var month = new Date().getMonth() + 1
        var year = new Date().getFullYear()
        let date = day + '-' + month + '-' + year
        let newdate = date.split("-").reverse().join("-");
        const[loadData,setLoadData]=useState(false)


        const call_apicompleted = () => {
            var day = new Date().getDate()
            var month = new Date().getMonth() + 1
            var year = new Date().getFullYear()
            let date = day + '-' + month + '-' + year
            let newdate = date.split("-").reverse().join("-");
            if (day.toString().length <= 1) {
                day = '0' + day;
                date2 = year + '-' + month + '-' + day;
    
    
            }
            if (month.toString().length <= 1) {
                month = '0' + month;
                date2 = year + '-' + month + '-' + day;
    
            } else {
                date2 = year + '-' + month + '-' + day;
    
    
    
            }
            setLoadData(true)
            dispatch(schedule_list(date2, type))
            dispatch(complete_schedule_list(type))
            dispatch(daywise_schedule_list(date2, date2, type))
            setLoadData(false)
    
        }
    
        
    
        return (
            <ScrollView style={{ flex: 1, backgroundColor: lightGrey }}
            refreshControl={
                <RefreshControl refreshing={loadData} onRefresh={call_apicompleted} />
            }
            >

            <ContentLayout1 navigation={navigation}>
                <View>
                    <Text>Home</Text>
                </View>
            </ContentLayout1>
            </ScrollView>



        )

    }
    

const mapStateProps = (state) => {
    const { schedule_enviro } = state

    return { schedule_enviro }
}



export default connect(mapStateProps)(Schedule)

