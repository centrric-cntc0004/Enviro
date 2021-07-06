import React, {  useState } from 'react'
import { View, Text, FlatList, TouchableOpacity,Alert } from 'react-native'
import { mainWhite, darkGrey, mainGrey, lightGrey,  mainBlue } from '../../../../../../common/Colors'
import { connect } from 'react-redux'
import NoDataContent from '../../../../../../common/NoDataContent'



const PreInspectionList = ({ navigation, data, vehicledata ,truckdata_preinspection_list}) => {
    const RenderContacts = () => {
        
        const [pageNo, setPageNo] = useState(1)
        const [apiRecall, setapiRecall] = useState(true)

       let data=[]
        const loadPageCompleted = () => {
            const onSuccess = (response) => {
                set_maintenance_data(data.concat(response.data))
                setPageNo(pageNo + 1)
            }

            const onFailue = (response) => {
                setapiRecall(false)
            }
            let functions = {
                success: onSuccess,
                failed: onFailue
            }
            if (apiRecall) {
                get_maintenance_data("truck", functions, pageNo)
            }
        }


        const delete_api = (id) => {
            Alert.alert(
                "Confirmation",
                "Are you sure to delete?",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("kkk"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => call_api(id) }
                ],
                { cancelable: false }
              );
            }
           const call_api = (id)=>{
            let data = {
                id: id
            }
            const onSuccess = (response) => {
                recall_notifications()
            }

            const onFailue = (response) => {
            }
            let functions = {
                success: onSuccess,
                failed: onFailue
            }
            truck_delete_data(data, functions)

        }

        const RenderList = ({ item }) => {
            const { id, registration, description, invoice_date, service_date, ometer, invoice_number, service_provided, hours, l_cost, s_part, gst, total_cost } = item
            return (


                <TouchableOpacity 
                // onLongPress={() => delete_api(id)}
                onPress={() => navigation.navigate('editpreinspection', { items: item, vehicleList: vehicledata })}
                    style={{
                        flexDirection: 'column', borderRadius: 1,
                        height:170, backgroundColor: mainWhite, marginTop: 15, borderWidth: 0.25, borderColor: darkGrey
                    }}>
                    <View style={{ flexDirection: 'row', flex: 1, backgroundColor: mainWhite, marginTop: 2, marginLeft: 5, marginRight: 5, }}>
                       
                        <View style={{ flex: 3, marginLeft: 10, marginRight: 10, flexDirection: 'column', }}>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Registration No</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Driver Name</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Date</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Odometer</Text>
                        </View>
                        <View style={{ flex: 3, marginLeft: 10, marginRight: 10, }}>
                           
                            <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {item.registration}</Text>
                                 <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {item.driver_name}</Text>
                                 <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {item.date_time}</Text>
                                 <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {item.odometer}</Text>
                           
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
       
        if(truckdata_preinspection_list.length===0)
        return(
            <View style={{justifyContent:'center',alignContent:'center',marginTop:'50%'}}>
            <NoDataContent/>
            </View>
        )
 
        return (
            <View style={{ flex: 1, backgroundColor: lightGrey, marginTop: '3%' ,}}>
                <FlatList style={{paddingBottom:40}}
                    data={truckdata_preinspection_list}
                    renderItem={RenderList}
                    keyExtractor={(item, key) => key.toString()}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={1}
                    refreshing={false}
                    scrollEnabled={false}

                    onEndReached={() => {
                        // loadPageCompleted()
                    }}
                />
            </View>
        )
    }


    return (
       
                    <RenderContacts  />
    )
}
const mapStateProps = (state) => {
    const { truckdata_preinspection_list  } = state.vehicle__truck
    return {truckdata_preinspection_list}
}
const mapDispatchToProps = (dispatch) => {
    return {
       
      }
}
export default connect(mapStateProps,mapDispatchToProps) (PreInspectionList)




