import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image ,TextInput} from 'react-native'
import { lightGrey, mainBlue, darkGrey, mediumGrey, mainGrey,mainWhite, textBlack, lightGreen } from '../../../../../common/Colors'
import { ClientImage } from '../../../../../common/Images'
import { connect } from 'react-redux'
import Modal from 'react-native-modal'
import DatePicker from 'react-native-datepicker'
import { ScrollView } from 'react-native'
import { ActivityIndicator } from 'react-native'
import Toast from 'react-native-simple-toast';

import {post_asset,put_asset} from '../../action'







const Assets = ({ navigation, asset_list ,clientdata,dispatch}) => {
    const [loader, setLoader] = useState(false)
        const [loaderA, setLoaderA] = useState(false)
        const [modalA, setModalA] = useState(false)
        const[owner,setOwner]=useState("")
        const[pumpno,setpumpno]=useState("")
        const[loc,setLoc]=useState("")
        const[fre,setFre]=useState("")
        const[last,setLast]=useState("")
        const[first,setFirst]=useState("")
        const[serv,setServ]=useState("")
        const[id,setId]=useState("")


        const[editable,seteditable]=useState(false)

         const call_modals=()=>{
             setLoaderA(false)
         }

        const createAttachment = () =>{
            setLoader(true)
            let dateStr1 = new Date(last)
            let dateStr2 = new Date(first)
            let postData = new FormData()
            postData.append('owner',owner)
            postData.append('pump_assetNo',pumpno)
            postData.append('location',loc)
            postData.append('frequency',fre)
            postData.append('last_service',dateStr1.toISOString())
            postData.append('next_service',dateStr2.toISOString())
            postData.append('service_description',serv)
            postData.append('site_details',clientdata.id)
    
            const success = () =>{
                setLoader(false)

                setLoaderA(false)
                Toast.showWithGravity('Added Successfully', Toast.SHORT, Toast.BOTTOM);

                
            }
    
        
            const failed = () =>{
                setLoader(false)
                Toast.showWithGravity('Failed !try Again', Toast.SHORT, Toast.BOTTOM);

            }
    
          
            dispatch(post_asset(postData,  success, failed,clientdata.id))
            
    
        }

        const editAttachment = () =>{
            setLoader(true)
            let dateStr1 = new Date(last)
            let dateStr2 = new Date(first)
            let postData = new FormData()
            postData.append('owner',owner)
            postData.append('pump_assetNo',pumpno)
            postData.append('location',loc)
            postData.append('frequency',fre)
            postData.append('last_service',dateStr1.toISOString())
            postData.append('next_service',dateStr2.toISOString())
            postData.append('service_description',serv)
            postData.append('site_details',id)
            console.log("postdata"+JSON.stringify(postData))
    
            const success = () =>{
                setLoader(false)

                setLoaderA(false)
                seteditable(false)
                Toast.showWithGravity('Added Successfully', Toast.SHORT, Toast.BOTTOM);

                
            }
    
        
            const failed = () =>{
                setLoader(false)
                Toast.showWithGravity('Failed !try Again', Toast.SHORT, Toast.BOTTOM);

            }
    
          
            dispatch(put_asset(postData,  success, failed,clientdata.id,id))
            
    
        }

        const edit_Data=(item)=>{
            setOwner(item.owner)
            setpumpno(item.pump_assetNo)
            setLoc(item.location)
            setFre(item.frequency)
            setLast(item.last_service)
            setFirst(item.next_service)
            setServ(item.service_description)
            setId(item.site_details)
            seteditable(true)
            setLoaderA(true)
            



        }


    const RenderContacts = () => {
        
        const RenderList = ({ item }) => {
            const { id, title } = item
            return (
                <TouchableOpacity onPress={() => edit_Data(item) }
                >
                    <View style={{
                      flexDirection: 'row', height: 150, backgroundColor: mediumGrey,
                      marginTop: 10, borderWidth: 0.25, borderColor: mainGrey, borderRadius: 10
                    }}>

                      <View style={{ flex: 1, backgroundColor: mediumGrey, marginTop: 15, marginBottom: 10, marginLeft: 5, marginRight: 10, }}>
                        <View style={{ flex: 1, flexDirection: 'column', marginBottom:10, }}>

                          <View style={{ flex: 2.5, flexDirection: 'row' }}>

                            <Text numberOfLines={1}
                              style={{ fontSize: 12, width: '60%', paddingLeft: 10, color: textBlack, paddingRight: 10 }}>Owner : {item.owner}</Text>

                            <Text numberOfLines={1}
                              style={{ fontSize: 12, paddingLeft: 10, color: textBlack, paddingRight: 10 }}>Pump_assetNo : {item.pump_assetNo}</Text>
                          </View>
                          <View style={{ flex: 2.5, flexDirection: 'row' }}>
                            <Text numberOfLines={1}
                              style={{ fontSize: 12, width: '60%', paddingLeft: 10, color: textBlack, paddingRight: 10 }}>Location : {item.location}</Text>
                            <Text numberOfLines={1}
                              style={{ fontSize: 12, paddingLeft: 10, color: textBlack, paddingRight: 10 }}>Frequency : {item.frequency}</Text>
                          </View>
                          <View style={{ flex: 5, flexDirection: 'column' }}>

                            <Text numberOfLines={1}
                              style={{ fontSize: 12, paddingLeft: 10, color: textBlack, paddingRight: 10 }}>Last_service : {item.last_service}</Text>

                            <Text numberOfLines={1}
                              style={{ fontSize: 12, marginTop: 10, paddingLeft: 10, color: textBlack, paddingRight: 10 }}>Next_service : {item.next_service}</Text>

<Text numberOfLines={1}
                              style={{ fontSize: 12, marginTop: 10, paddingLeft: 10, color: textBlack, paddingRight: 10 }}>Description : {item.service_description}</Text>


                          </View>

                        </View>

                      </View>
                    </View>
                </TouchableOpacity>
            )
        }

        if (asset_list.length == 0)
            return (

                <View style={{ flex: 1, backgroundColor: lightGrey, paddingHorizontal: 20 }}>
                    <Text style={{ color: mainGrey, paddingTop: 20 }}>Assets</Text>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>setLoaderA(true)}
                     style={{height:35,width:100,borderRadius:50, marginTop: 50,backgroundColor:lightGreen, marginBottom: 50, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 14, color: mainWhite }}>Add Asset +</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            )
        return (
            <View style={{ flex: 1, backgroundColor: lightGrey, paddingHorizontal: 20 }}>
                <Text style={{ color: mainGrey, paddingTop: 20 }}>Assets</Text>
                <TouchableOpacity onPress={()=>setLoaderA(true)}
                     style={{height:35,width:100,borderRadius:50, marginLeft: '70%',backgroundColor:lightGreen, marginBottom: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 14, color: mainWhite }}>Add Asset +</Text>
                    </TouchableOpacity>
                <FlatList
                  
                    data={asset_list}
                    renderItem={RenderList}
                    keyExtractor={(item, key) => key.toString()}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={1}
                    refreshing={false}
                />
            </View>
        )
    }

    return (

        <View>
        <RenderContacts />
        <Modal
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        isVisible={loaderA}
      >
        {editable === false ? (
          <ScrollView>
          <View style={{marginLeft:8, width: '95%', backgroundColor: mainWhite, paddingHorizontal: 20, borderRadius: 10 }}>
            <View style={{ backgroundColor: mainWhite, borderRadius: 10, flexDirection: "column" }}>
              <View style={{ paddingLeft: 10, paddingTop: 10, }}>

              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={{ color: textBlack, fontSize: 12 }}>Owner</Text>
                <View style={{
                  width: '100%',

                  height: 40,
                  marginTop: 10, borderWidth: 0.2, borderColor: mainGrey, borderRadius: 5
                }}>

                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    {/* <Text style={{ marginTop: 5, marginRight: 20, }}>{key2 + 1}</Text> */}

                    <TextInput
                      style={{ width: '100%', paddingLeft: 15, fontSize: 12, color: mainGrey, }}
                      placeholder=""
                      value={owner}

                      onChangeText={txt => setOwner(txt)}

                    />
                  </View>

                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={{ color: textBlack, fontSize: 14, fontSize: 12, }}>Pump Asset No</Text>
                  <View style={{
                    width: '100%',

                    height: 40,
                    marginTop: 10, borderWidth: 0.2, borderColor: mainGrey, borderRadius: 5
                  }}>

<View style={{ flex: 1, flexDirection: 'row' }}>
                    {/* <Text style={{ marginTop: 5, marginRight: 20, }}>{key2 + 1}</Text> */}

                    <TextInput
                      style={{ width: '100%', paddingLeft: 15, fontSize: 12, color: mainGrey, }}
                      placeholder=""
                      value={pumpno}

                      onChangeText={txt => setpumpno(txt)}

                    />
                  </View>
                  </View>
                </View>


                <Text style={{ marginTop: 10, color: textBlack, fontSize: 12, }}>Location</Text>
                <View style={{

                  height: 40,
                  marginTop: 10, borderWidth: 0.2, borderColor: mainGrey, borderRadius: 5
                }}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TextInput
                      style={{ padding: 0, fontSize: 12, color: mainGrey, paddingLeft: 15, width: '90%' }}
                      placeholder=""
                      value={loc}

                      onChangeText={txt => setLoc(txt)}

                    />

                  </View>
                </View>

                <Text style={{ marginTop: 10, color: textBlack, fontSize: 12, }}>Frequency</Text>
                <View style={{

                  height: 40,
                  marginTop: 10, borderWidth: 0.2, borderColor: mainGrey, borderRadius: 5
                }}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TextInput
                      style={{ padding: 0, paddingLeft: 15, fontSize: 12, color: mainGrey, width: '100%' }}
                      placeholder="0"
                      value={fre}
                      keyboardType={"number-pad"}

                      onChangeText={txt => setFre(txt)}

                    />
                  </View>

                </View>
                <Text style={{ marginTop: 10, color: textBlack, fontSize: 12, }}>Last Service</Text>

                <View style={{

                  height: 40,
                  marginTop: 10, borderWidth: 0.2, borderColor: mainGrey, borderRadius: 5
                }}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                  <DatePicker
                                style={{
                                    width: 85,

                                }}
                                date={last}
                                mode="date"
                                placeholder="yyyy:mm:dd"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon={false}

                                customStyles={{

                                    dateInput: {
                                        borderWidth: 0,
                                        fontSize: 12,
                                        textColor: "red"

                                    },
                                    dateText: {
                                        color: mainGrey,
                                        fontSize: 14,

                                    }
                                }}

                                onDateChange={(date) => { setLast(date) }}

                            />
                  </View>

                </View>
                <Text style={{ marginTop: 10, color: textBlack, fontSize: 12, }}>Next Service</Text>

                <View style={{

                  height: 40,
                  marginTop: 10, borderWidth: 0.2, borderColor: mainGrey, borderRadius: 5
                }}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                  <DatePicker
                                style={{
                                    width: 85,

                                }}
                                date={first}
                                mode="date"
                                placeholder="yyyy:mm:dd"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon={false}

                                customStyles={{

                                    dateInput: {
                                        borderWidth: 0,
                                        fontSize: 12,
                                        textColor: "red"

                                    },
                                    dateText: {
                                        color: mainGrey,
                                        fontSize: 14,

                                    }
                                }}

                                onDateChange={(date) => { setFirst(date) }}

                            />
                  </View>

                </View>
                <Text style={{ marginTop: 10, color: textBlack, fontSize: 12, }}>Description</Text>
                <View style={{

                  height: 40,
                  marginTop: 10, borderWidth: 0.2, borderColor: mainGrey, borderRadius: 5
                }}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TextInput
                      style={{ padding: 0, paddingLeft: 15, fontSize: 12, color: mainGrey, width: '100%' }}
                      placeholder=""
                      value={serv}

                      onChangeText={txt => setServ(txt)}

                    />
                  </View>

                </View>
                
              </View>

            </View>

            <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>

            {loc && serv && owner && pumpno && fre && last && first ? (
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => createAttachment()}
                    style={{ borderRadius: 30, borderWidth: 0.3, borderColor: mainBlue, backgroundColor: mainBlue, width: 120, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                    {loader?(
                        <ActivityIndicator color={mainWhite} size="small"></ActivityIndicator>
                    ):(
                    <Text style={{ color: mainWhite, fontSize: 12 }}>Add </Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => call_modals()}
                    style={{ marginLeft: 10, borderRadius: 30, borderWidth: 0.3, borderColor: mainBlue, backgroundColor: mainBlue, width: 120, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: mainWhite, fontSize: 12 }}>Cancel </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                  <View style={{ flexDirection: 'row' }}>
                    <View
                      style={{ opacity: 0.7, borderRadius: 30, borderWidth: 0.3, borderColor: mainBlue, backgroundColor: mainBlue, width: 120, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ color: mainWhite, fontSize: 12 }}>Add </Text>
                    </View>
                    <TouchableOpacity onPress={() => call_modals()}
                      style={{ marginLeft: 10, borderRadius: 30, borderWidth: 0.3, borderColor: mainBlue, backgroundColor: mainBlue, width: 120, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ color: mainWhite, fontSize: 12 }}>Cancel </Text>
                    </TouchableOpacity>
                  </View>
                )}
            </View>
          </View>
          </ScrollView>

        ) : (
            <View style={{ width: '90%', backgroundColor: mainWhite, paddingHorizontal: 20, borderRadius: 10 }}>
              <View style={{ backgroundColor: mainWhite, borderRadius: 10, flexDirection: "column" }}>
                <View style={{ paddingLeft: 10, paddingTop: 10, }}>

                </View>
                <View style={{ marginTop: 10 }}>
                <Text style={{ color: textBlack, fontSize: 12 }}>Owner</Text>
                <View style={{
                  width: '100%',

                  height: 40,
                  marginTop: 10, borderWidth: 0.2, borderColor: mainGrey, borderRadius: 5
                }}>

                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    {/* <Text style={{ marginTop: 5, marginRight: 20, }}>{key2 + 1}</Text> */}

                    <TextInput
                      style={{ width: '100%', paddingLeft: 15, fontSize: 12, color: mainGrey, }}
                      placeholder=""
                      value={owner}

                      onChangeText={txt => setOwner(txt)}

                    />
                  </View>

                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={{ color: textBlack, fontSize: 14, fontSize: 12, }}>Pump Asset No</Text>
                  <View style={{
                    width: '100%',

                    height: 40,
                    marginTop: 10, borderWidth: 0.2, borderColor: mainGrey, borderRadius: 5
                  }}>

<View style={{ flex: 1, flexDirection: 'row' }}>
                    {/* <Text style={{ marginTop: 5, marginRight: 20, }}>{key2 + 1}</Text> */}

                    <TextInput
                      style={{ width: '100%', paddingLeft: 15, fontSize: 12, color: mainGrey, }}
                      placeholder=""
                      value={pumpno}

                      onChangeText={txt => setpumpno(txt)}

                    />
                  </View>
                  </View>
                </View>


                <Text style={{ marginTop: 10, color: textBlack, fontSize: 12, }}>Location</Text>
                <View style={{

                  height: 40,
                  marginTop: 10, borderWidth: 0.2, borderColor: mainGrey, borderRadius: 5
                }}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TextInput
                      style={{ padding: 0, fontSize: 12, color: mainGrey, paddingLeft: 15, width: '90%' }}
                      placeholder=""
                      value={loc}

                      onChangeText={txt => setLoc(txt)}

                    />

                  </View>
                </View>

                <Text style={{ marginTop: 10, color: textBlack, fontSize: 12, }}>Frequency</Text>
                <View style={{

                  height: 40,
                  marginTop: 10, borderWidth: 0.2, borderColor: mainGrey, borderRadius: 5
                }}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TextInput
                      style={{ padding: 0, paddingLeft: 15, fontSize: 12, color: mainGrey, width: '100%' }}
                      placeholder="0"
                      value={fre}
                      keyboardType={"number-pad"}

                      onChangeText={txt => setFre(txt)}

                    />
                  </View>

                </View>
                <Text style={{ marginTop: 10, color: textBlack, fontSize: 12, }}>Last Service</Text>

                <View style={{

                  height: 40,
                  marginTop: 10, borderWidth: 0.2, borderColor: mainGrey, borderRadius: 5
                }}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                  <DatePicker
                                style={{
                                    width: 85,

                                }}
                                date={last}
                                mode="date"
                                placeholder="yyyy:mm:dd"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon={false}

                                customStyles={{

                                    dateInput: {
                                        borderWidth: 0,
                                        fontSize: 12,
                                        textColor: "red"

                                    },
                                    dateText: {
                                        color: mainGrey,
                                        fontSize: 14,

                                    }
                                }}

                                onDateChange={(date) => { setLast(date) }}

                            />
                  </View>

                </View>
                <Text style={{ marginTop: 10, color: textBlack, fontSize: 12, }}>Next Service</Text>

                <View style={{

                  height: 40,
                  marginTop: 10, borderWidth: 0.2, borderColor: mainGrey, borderRadius: 5
                }}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                  <DatePicker
                                style={{
                                    width: 85,

                                }}
                                date={first}
                                mode="date"
                                placeholder="yyyy:mm:dd"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon={false}

                                customStyles={{

                                    dateInput: {
                                        borderWidth: 0,
                                        fontSize: 12,
                                        textColor: "red"

                                    },
                                    dateText: {
                                        color: mainGrey,
                                        fontSize: 14,

                                    }
                                }}

                                onDateChange={(date) => { setFirst(date) }}

                            />
                  </View>

                </View>
                <Text style={{ marginTop: 10, color: textBlack, fontSize: 12, }}>Description</Text>
                <View style={{

                  height: 40,
                  marginTop: 10, borderWidth: 0.2, borderColor: mainGrey, borderRadius: 5
                }}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TextInput
                      style={{ padding: 0, paddingLeft: 15, fontSize: 12, color: mainGrey, width: '100%' }}
                      placeholder=""
                      value={serv}

                      onChangeText={txt => setServ(txt)}

                    />
                  </View>

                </View>
                
              </View>

            </View>


              <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>

                {loc && serv && owner && pumpno && fre && last && first ? (
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity onPress={() => editAttachment()}
                      style={{ borderRadius: 30, borderWidth: 0.3, borderColor: mainBlue, backgroundColor: mainBlue, width: 120, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                      {loader?(
                          <ActivityIndicator color={mainWhite} size="small"></ActivityIndicator>
                      ):(
                      <Text style={{ color: mainWhite, fontSize: 12 }}>Edit </Text>
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => call_modals()}
                      style={{ marginLeft: 10, borderRadius: 30, borderWidth: 0.3, borderColor: mainBlue, backgroundColor: mainBlue, width: 120, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ color: mainWhite, fontSize: 12 }}>Cancel </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                    <View style={{ flexDirection: 'row' }}>
                      <View
                        style={{ opacity: 0.7, borderRadius: 30, borderWidth: 0.3, borderColor: mainBlue, backgroundColor: mainBlue, width: 120, height: 40, justifyContent: 'center', alignItems: 'center' }}>

                        <Text style={{ color: mainWhite, fontSize: 12 }}>Edit </Text>
                      </View>
                      <TouchableOpacity onPress={() => call_modalCancel()}
                        style={{ marginLeft: 10, borderRadius: 30, borderWidth: 0.3, borderColor: mainBlue, backgroundColor: mainBlue, width: 120, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: mainWhite, fontSize: 12 }}>Cancel </Text>
                      </TouchableOpacity>
                    </View>
                  )}
              </View>
            </View>
          )}
          
      </Modal>
      </View>



    )


}

const mapStateToProps = (state) => {
    const { asset_list } = state.client
    console.log("asset_list"+JSON.stringify(asset_list))
    return { asset_list }
}



export default connect(mapStateToProps)(Assets)



