import React, { useState } from 'react'
import { View, TouchableOpacity, Text, TextInput, ActivityIndicator } from 'react-native'
import { textBlack, mainGrey, mainWhite, mainBlue, textGrey, } from '../../../../../common/Colors'
import Icon from 'react-native-vector-icons/Entypo'
import Modal from 'react-native-modal'
import { fetch_selected_client,create_temp_clients,} from '../common/action'
import { connect } from 'react-redux'
import Toast from 'react-native-simple-toast';

function ErrorModal({dispatch,
    modalStatus,
                    modalAction,
                    client_id
                                       

   }) {


   
    
    const onCancelButton = () => {
        modalAction(false)
    }
    const onOkeyButtons = () => {
        
       
            modalAction(false)
           

       

    }
    return (
        <Modal isVisible={modalStatus}>
        <View style={{ backgroundColor: mainWhite, padding: 10, borderRadius: 10 }}>
            <View style={{ backgroundColor: mainWhite, borderRadius: 10, padding: 5 }}>
                <View style={{ paddingLeft: 10, paddingTop: 5 }}>

                </View>

                <View style={{ height: 10, paddingRight: 10 }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 2 }}>

                        </View>

                    </View>
                </View>

                <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
                    
                <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
                    <View style={{ borderRadius: 10, height: 40,  backgroundColor: mainWhite, justifyContent: 'center' }}>
                    <Text>{client_id}</Text>
                    </View>
                </View>
                </View>
               


            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 15 }}>
                <TouchableOpacity onPress={() => onCancelButton()}>
                    <Text style={{ fontSize: 17, paddingRight: 15 }}>Ok</Text>
                </TouchableOpacity>
              

            </View>
        </View>
    </Modal> 
    )
}
const mapStateProps = (state) => {
    const {single_clients, } = state.sales_enviroWaste
    
    return {single_clients, }
}





export default connect(mapStateProps)(ErrorModal)


