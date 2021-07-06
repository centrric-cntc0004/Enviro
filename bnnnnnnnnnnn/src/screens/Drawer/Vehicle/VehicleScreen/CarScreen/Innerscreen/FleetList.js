// import React, { useEffect, useState } from 'react'
// import { View, Text, FlatList, TouchableOpacity, } from 'react-native'
// import { mainWhite, darkGrey, mainGrey, lightGrey, lightGreen, mainBlue } from '../../Colors'
// import { StoreConsumer } from '../../../Store/Store'
// import Icon from 'react-native-vector-icons/MaterialIcons'



// const FleetList = ({ navigation,  }) => {

//     const RenderContacts = ({ values }) => {
        
// let data=[1,6,7]

//         const RenderList = ({ item }) => {
//             return (


//                 <View style={{
//                     flexDirection: 'column', borderRadius: 1,
//                     flex: 1, backgroundColor: mainWhite,  borderWidth: 0.2, borderColor: darkGrey
//                 }}>
//                     <View style={{ flexDirection: 'row', flex: 1, backgroundColor: mainWhite, marginTop: 10, marginLeft: 5, marginRight: 5, }}>

//                         <View style={{ flex: 4, marginLeft: 10, marginRight: 10, flexDirection: 'column', }}>
//                             <Text style={{ color: mainGrey, marginTop: 20 }}>Registration</Text>
//                             <Text style={{ color: mainGrey, marginTop: 20 }}>Description</Text>
//                             <Text style={{ color: mainGrey, marginTop: 20 }}>Service Provided</Text>
//                             <Text style={{ color: mainGrey, marginTop: 20 }}>Invoice Date</Text>
//                             <Text style={{ color: mainGrey, marginTop: 20 }}>Service Date</Text>
//                             <Text style={{ color: mainGrey, marginTop: 20 }}>Ometer</Text>
//                             <Text style={{ color: mainGrey, marginTop: 20 }}>Invoice No</Text>
//                             <Text style={{ color: mainGrey, marginTop: 20 }}>Hours</Text>
//                             <Text style={{ color: mainGrey, marginTop: 20 }}>Labour Cost</Text>
//                             <Text style={{ color: mainGrey, marginTop: 20 }}>Spare Parts</Text>
//                             <Text style={{ color: mainGrey, marginTop: 20 }}>GST</Text>
//                             <Text style={{ color: mainGrey, marginTop: 20 }}>Total Cost</Text>
//                         </View>
//                         <View style={{ flex: 3, marginLeft: 10, marginRight: 10, }}>
//                             {/* <Text style={{ color: mainBlue, marginTop: 20 }}>: {registration}</Text>
//                             <Text numberOfLines={1}
//                                 style={{ color: mainBlue, marginTop: 20 }}>: {description}</Text>
//                             <Text numberOfLines={1}
//                                 style={{ color: mainBlue, marginTop: 20 }}>: {service_provided}</Text>
//                             <Text numberOfLines={1}
//                                 style={{ color: mainBlue, marginTop: 20 }}>: {invoice_date}</Text>
//                             <Text numberOfLines={1}
//                                 style={{ color: mainBlue, marginTop: 20 }}>: {service_data}</Text>
//                             <Text numberOfLines={1}
//                                 style={{ color: mainBlue, marginTop: 20 }}>: {ometer}</Text>
//                             <Text numberOfLines={1}
//                                 style={{ color: mainBlue, marginTop: 20 }}>: {invoice_number}</Text>
//                             <Text numberOfLines={1}
//                                 style={{ color: mainBlue, marginTop: 20 }}>: {hours}</Text>
//                             <Text numberOfLines={1}
//                                 style={{ color: mainBlue, marginTop: 20 }}>:{l_cost}</Text>
//                             <Text numberOfLines={1}
//                                 style={{ color: mainBlue, marginTop: 20 }}>: {s_part}</Text>
//                             <Text numberOfLines={1}
//                                 style={{ color: mainBlue, marginTop: 20 }}>: {gst}</Text>
//                             <Text numberOfLines={1}
//                                 style={{ color: mainBlue, marginTop: 20 }}>: {total_cost}</Text> */}
//                         </View>

//                     </View>
//                     <View style={{
//                         flex: 1,
//                         marginTop: '10%',


//                     }}>
//                     </View>
//                 </View>




//             )
//         }
//         // if (data.length < 1)
//         //     return (
//         //         <View style={{ flex: 1, alignItems: 'center' }}>
//         //             <View style={{ height: 200, margin: 20, width: '100%', marginTop: 130, borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: mainWhite }}>
//         //                 <Text style={{ fontSize: 20, color: mainGrey, fontWeight: 'bold' }}>No Reports Found</Text>

//         //             </View>
//         //         </View>

//         //     )


//         return (
//             <View style={{ flex: 1, backgroundColor: lightGrey, marginTop: '1%' }}>
//                 <FlatList style={{}}
//                     data={data}
//                     renderItem={RenderList}
//                     keyExtractor={(item, key) => key.toString()}
//                     showsVerticalScrollIndicator={false}
//                     onEndReachedThreshold={1}
//                     refreshing={false}
//                     onEndReached={() => {
//                         //   loadPageCompleted()
//                     }}
//                 />
//             </View>
//         )
//     }


//     return (
//         <StoreConsumer>
//             {values => {

//                 return (
//                     <RenderContacts values={values} />
//                 )
//             }}
//         </StoreConsumer>
//     )

// }

// export default FleetList



