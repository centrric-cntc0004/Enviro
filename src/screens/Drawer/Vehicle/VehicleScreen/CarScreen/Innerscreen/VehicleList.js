import React, { useState,useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, Alert,ActivityIndicator } from 'react-native'
import { mainWhite, darkGrey, mainGrey, lightGrey, mainBlue } from '../../../../../../common/Colors'
import { connect } from 'react-redux'
import { vehicle_list_pagination, complete_vehicle_list, get_vehicle_info} from '../common/action'
import {VEHICLE_GET} from '../../../../../../store/endpoint'
import Api from '../../../../../../store/api'
import NoDataContent from '../../../../../../common/NoDataContent'
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons'



const VehicleList = ({isLoading,companytypes, navigation, data, vehicledata, truck_preinspection_list, truck_list, complete_vehicle_lists, dispatch }) => {
    const RenderContacts = () => {
        const [pageNo, setPageNo] = useState(1)
        const [apiRecall, setapiRecall] = useState(true)
        const [dataSource, setDataSource] = useState(truck_list);
        const [dataresponse, setResponse] = useState(false);
        const [loading, setLoading] = useState(true);

        const [offset, setOffset] = useState(1);

        let data = []
        // useEffect(() => {
         
        //     const fetch_api_call = () => {
        //         setLoading(true)
        //         let get_url =  VEHICLE_GET +companytypes.name+'/'+  'car/' + offset + '/'

        //         Api('get', get_url).then(response => {
        //             setOffset(offset + 1);
        //             //Increasing the offset for the next API call
        //             setDataSource([...dataSource, ...response]);
        //             setLoading(false);
        //         })
        //     }
        //     fetch_api_call()
        // }, [VEHICLE_GET])
        const getData = () => {
            if(!dataresponse){

           
            setLoading(true);
            let get_url = VEHICLE_GET +companytypes.name + '/' + 'car' +'/all/' + offset + '/'

           console.log("gettturl"+get_url)
            //Service to get the data from the server to render
            Api('get', get_url)
              //Sending the currect offset with get request
            
              .then((responseJson) => {
                  console.log("resssss"+JSON.stringify(responseJson))
                 
                //Successful response
                setOffset(offset + 1);
                //Increasing the offset for the next API call
                setDataSource([...dataSource, ...responseJson]);
                setLoading(false);
                if(responseJson.length===0){
                    setResponse(true)
                }
              })
              .catch((error) => {
                console.error(error);
              });
            } else{}
          };
        
        const call_nextapi = () => {
            console.log("Inside Method")

            setPageNo(pageNo + 1)
            if(pageNo<=2){
            let get_url = VEHICLE_GET + 'car/' + pageNo + '/'
            let length=truck_list.length
            console.log("urlll"+get_url)
            console.log("leeeeeeeeeeeeeeeeee"+length)
            Api('get', get_url)
                .then(response => {

                    if (response.length >0) {
                        let arry=[]
                        arry=truck_list.concat(response)
                        const newArrayList = [];
                        arry.forEach(obj => {
                          if (!newArrayList.some(o => o.id === obj.id)) {
                            newArrayList.push({...obj});
                          }
                        });
                     
                        console.log("klahskuayui"+JSON.stringify(response))
                        
                      
            dispatch({ type: 'CAR_LIST', cars: newArrayList, page: pageNo })
                    }
                })
            }else{

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
        const call_api = (id) => {
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
        const call_icon=(item)=>{
            dispatch(get_vehicle_info(item))
            navigation.navigate("FleetListC", { items: item })
        }
        const renderFooter = () => {
            return (
              //Footer View with Load More button
               <View style={{backgroundColor:mainWhite}}>
                  {loading ? (
                    <ActivityIndicator
                      color={mainBlue} size="large"
                      style={{marginLeft: 8}} />
                  ) : null}
                  </View>
               
            );
          };
        const RenderList = ({ item }) => {
            const { id, types, registration, previous_rego, due_rego } = item
            return (


                <TouchableOpacity 
                // onLongPress={() => delete_api(id)}
                    onPress={() => navigation.navigate('vehicledetails', { items: item })}
                    style={{
                        flexDirection: 'column', borderRadius: 1,
                        height: 170, backgroundColor: mainWhite, marginTop: 15, borderWidth: 0.25, borderColor: darkGrey
                    }}>
                    <View style={{ flexDirection: 'row', flex: 1, backgroundColor: mainWhite, marginTop: 2, marginLeft: 5, marginRight: 5, }}>

                        <View style={{ flex: 3, marginLeft: 10, marginRight: 10, flexDirection: 'column', }}>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Registration No</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Rego Due</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Type</Text>
                            <Text style={{ color: mainGrey, marginTop: 20 }}>Year</Text>

                        </View>
                        <View style={{ flex: 3, marginLeft: 10, marginRight: 10, }}>

                            <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {item.registration}</Text>
                            <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {item.due_rego}</Text>
                            <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {item.types}</Text>
                            <Text numberOfLines={1}
                                style={{ color: mainBlue, marginTop: 20 }}>: {item.year}</Text>

                        </View>
                        <TouchableOpacity style={{marginTop:5}}
                        onPress={()=>call_icon(item)}>
                        <Icon name="video-input-antenna" size={17}></Icon>
                        </TouchableOpacity>

                    </View>
                    <View style={{
                        flex: 1,
                        marginTop: '10%',


                    }}>
                    </View>
                </TouchableOpacity>




            )
        }
        // if(isLoading)
        // return(
        //     <View style={{flex:1,justifyContent:'center',alignContent:'center',marginTop:'50%'}}>
        //      <ActivityIndicator color={mainBlue} size="large"></ActivityIndicator>
        //     </View>
        // )
          if(truck_list.length===0)
          return(
              <View style={{flex:1,justifyContent:'center',alignContent:'center',marginTop:'50%'}}>
               <NoDataContent/>
              </View>
          )
         
        return (
            <View style={{ flex: 1, backgroundColor: mainWhite, marginTop: '1%', }}>
               
                                <FlatList
                                    style={{ paddingBottom:150 }}
                                    data={dataSource}
                                    renderItem={RenderList}
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={(item, key) => key.toString()}
                                     onEndReached={() => getData()}
                                    onEndReachedThreshold={1}
                                    ListFooterComponent={renderFooter}
                                />
                      
            </View>
        )

    }


    return (

        <RenderContacts />
    )
}
const mapStateProps = (state) => {
    const { truck_preinspection_list, truck_list, complete_vehicle_lists,isLoading } = state.vehicle_cars
    const { companytypes } = state.vehicle__truck

    return { isLoading,truck_preinspection_list, truck_list, complete_vehicle_lists ,companytypes}
}

export default connect(mapStateProps)(VehicleList)




