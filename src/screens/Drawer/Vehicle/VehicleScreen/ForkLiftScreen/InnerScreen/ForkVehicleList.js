import React, {  useState ,useEffect} from 'react'
import { View, Text, FlatList, TouchableOpacity,Alert,ActivityIndicator } from 'react-native'
import { mainWhite, darkGrey, mainGrey, lightGrey,  mainBlue } from '../../../../../../common/Colors'
import { connect } from 'react-redux'
import {VEHICLE_GET} from '../../../../../../store/endpoint'
import Api from '../../../../../../store/api'
import NoDataContent from '../../../../../../common/NoDataContent'
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons'
import {get_vehicle_info} from '../common/action'



const ForkVehicleList = ({companytypes,tabtypes,dispatch,navigation, data, forklift_list,vehicle_list_paginationfork}) => {
    const RenderContacts = () => {
        
        const [pageNo, setPageNo] = useState(2)
        const [apiRecall, setapiRecall] = useState(true)
        const [loading, setLoading] = useState(true);
        const [dataSource, setDataSource] = useState([]);
        const [dataresponse, setResponse] = useState(false);

        const [offset, setOffset] = useState(1);

        useEffect(() => {
            const unsubscribe = navigation.addListener('focus', () => {
                console.log("hhhhhhhhh")
                fetch_api_call()
    
            });
            const fetch_api_call = () => {
                
                setLoading(true)
                let tab=""
                if(tabtypes==="Forklift"){
                    tab="fork-lift"
                }else{
                    tab="machinery"
                }
                let get_url = VEHICLE_GET +companytypes.name + '/' + tab +'/all/' + pageNo + '/'
                console.log("hhhhhhhhh"+get_url)

                Api('get', get_url).then(response => {
                    setPageNo(pageNo + 1);
                    //Increasing the offset for the next API call
                    setDataSource([...dataSource, ...response]);
                    setLoading(false);
                })
            }
            fetch_api_call()
            return unsubscribe;
        }, [VEHICLE_GET])

       let data=[]
        const loadPageCompleted = () => {
            if(pageNo<3){
            setPageNo(pageNo + 1)
            let get_url = VEHICLE_GET + companytypes.name+'/'+'fork-lift/' + pageNo + '/'
            let length=vehicle_list_paginationfork.length
            console.log("urlll"+get_url)
            console.log("leeeeeeeeeeeeeeeeee"+length)
            Api('get', get_url)
                .then(response => {

                    if (response.length >0) {
                        let arry=[]
                        arry=vehicle_list_paginationfork.concat(response)
                        const newArrayList = [];
                        arry.forEach(obj => {
                          if (!newArrayList.some(o => o.id === obj.id)) {
                            newArrayList.push({...obj});
                          }
                        });
                     
                        console.log("klahskuayui"+JSON.stringify(response))
                        
                         dispatch({ type: 'FORKLIFT_LIST_PAGINATION', vehicle_page:newArrayList  })
                    }
                })
        }else{

        }
    }
    const call_icon=(item)=>{
        dispatch(get_vehicle_info(item))
        navigation.navigate("FleetList", { items: item })
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
    const getData = () => {
        if(!dataresponse){

       
        setLoading(true);
        let get_url = VEHICLE_GET +companytypes.name + '/' + 'fork-lift' +'/all/' + offset + '/'

        //Service to get the data from the server to render
        Api('get', get_url)
          //Sending the currect offset with get request
        
          .then((responseJson) => {
             
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
            const { id, types,registration,previous_rego,due_rego } = item
            return (


                <TouchableOpacity 
                // onLongPress={() => delete_api(id)}
                onPress={() => navigation.navigate('forklift-vehicle', { items: item })}
                    style={{
                        flexDirection: 'column', borderRadius: 1,
                        height:170, backgroundColor: mainWhite, marginTop: 15, borderWidth: 0.25, borderColor: darkGrey
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
        if(loading)
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:'50%'}}>
            <ActivityIndicator size="large" color={mainBlue}></ActivityIndicator>
            </View>
        )
        if(dataSource.length===0)
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:'50%'}}>
             <NoDataContent/>
            </View>
        )

        return (
            <View style={{ flex: 1, backgroundColor: mainWhite, marginTop: '1%' ,}}>
                <FlatList style={{paddingBottom:150}}
                    data={dataSource}
                    renderItem={RenderList}
                    keyExtractor={(item, key) => key.toString()}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={1}
                    refreshing={false}
                    onEndReached={() => {
                       getData()
                    }}
                    ListFooterComponent={renderFooter}
                />
            </View>
        )
    }


    return (
       
                    <RenderContacts  />
    )
}
const mapStateProps = (state) => {
    const { forklift_list,all_forklift_list,vehicle_list_paginationfork} = state.vehicle__forklift
    const { companytypes,tabtypes} = state.vehicle__truck

    return {forklift_list,vehicle_list_paginationfork,companytypes,tabtypes}
}

export default connect(mapStateProps) (ForkVehicleList)




