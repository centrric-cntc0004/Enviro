import React ,{useState}from 'react'
import { View, Text, FlatList, TouchableOpacity, Alert, } from 'react-native'
import { mainWhite, darkGrey, mainGrey, lightGrey, lightGreen, mainBlue } from '../../../../../../common/Colors'
import { connect } from 'react-redux'
import{__delete_maintanace}from '../common/action'


const ForkMaintenance = ({ navigation, data ,vehicledata, forklift_maintanace_list,dispatch,
    forklift_maintanance_page,all_forklift_list}) => {
       
    const RenderContacts = () => {
        
        const [pageNo, setPageNo] = useState(1)
        const [apiRecall, setapiRecall] = useState(true)


        const loadPageCompleted = () => {
            const onSuccess = (response) => {
                set_forkmaintenance_data(data.concat(response.data))
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
                get_forkmaintenance_data("forklift", functions, pageNo)
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
                // recall_forknotifications()
            }

            const onFailue = (response) => {
            }
            let functions = {
                success: onSuccess,
                failed: onFailue
            }
           dispatch( __delete_maintanace(id, onSuccess,onFailue,1))

        }




        const RenderList = ({ item }) => {
            const { registration, description,service_completed,hour_mr,next_service,frequency,rego_expiry_date,active_perfomed_report,invoice_number,total_cost } = item
            return (

                <TouchableOpacity onLongPress={()=>delete_api(item.id)}
                onPress={()=>navigation.navigate('editreport',{ items: item, vehicleList: all_forklift_list })}
                 style={{
                    flexDirection: 'column', borderRadius: 1,
                    flex: 1, backgroundColor: mainWhite, marginTop: 15, borderWidth: 0.2, borderColor: darkGrey
                }}>
                    <View style={{
                        flexDirection: 'row',
                        flex: 1, backgroundColor: mainWhite, marginTop: 10
                        , marginLeft: 5,
                        marginRight: 5,
                    }}>

                        <View style={{
                            flex: 4,
                            marginLeft: 10,
                            marginRight: 10,

                            flexDirection: 'column',
                        }}>
                          <Text style={{ color: mainGrey, marginTop: 20 }}>Registration</Text>

                            <Text style={{ color: mainGrey, marginTop: 20 }}>Service Completed</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Description</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Hour MR</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Next Service</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Frequency</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Rego Expiry Date</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Active Performed Report</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Invoice No</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Total Cost</Text>

                        </View>
                        <View style={{
                            flex: 3,

                            marginLeft: 10,
                            marginRight: 10,
                        }}>
                             <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {registration}</Text>
                            <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {service_completed}</Text>
                            <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {description}</Text>
                            <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {hour_mr}</Text>
                            <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {next_service}</Text>
                            <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {frequency}</Text>
                            <Text style={{ color: mainBlue, marginTop: 20 }}>: {rego_expiry_date}</Text>
                    <Text style={{ color: mainBlue, marginTop: 20 }}>: {active_perfomed_report}</Text>
                    <Text style={{ color: mainBlue, marginTop: 20 }}>: {invoice_number}</Text>
                    <Text style={{ color: mainBlue, marginTop: 20 }}>: {total_cost}</Text>



                        </View>

                    </View>

                    <View style={{ flex: 0.3, marginTop: '10%', }}>

                    </View>
                </TouchableOpacity>




            )
        }

        return (
            <View style={{ flex: 1, backgroundColor: lightGrey, marginTop: '3%' }}>



                <FlatList style={{paddingBottom:120}}
                    data={forklift_maintanace_list}
                    renderItem={RenderList}
                    keyExtractor={(item, key) => key.toString()}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={1}
                    refreshing={false}
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
const mapStateToProps = (state) => {
    const { forklift_maintanace_list, forklift_maintanance_page,all_forklift_list } = state.vehicle__forklift
    return { forklift_maintanace_list, forklift_maintanance_page,all_forklift_list }

}





export default connect(mapStateToProps) (ForkMaintenance)





