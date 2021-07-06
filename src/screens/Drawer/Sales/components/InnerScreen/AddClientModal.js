import React, { useState } from 'react'
import { View, TouchableOpacity, Text, TextInput, ActivityIndicator } from 'react-native'
import { textBlack, mainGrey, mainWhite, mainBlue, textGrey, } from '../../../../../common/Colors'
import Icon from 'react-native-vector-icons/Entypo'
import Modal from 'react-native-modal'
import { fetch_selected_client,create_temp_clients,} from '../common/action'
import { connect } from 'react-redux'
import Toast from 'react-native-simple-toast';

function AddClientModal({dispatch,
    modalStatus,
                    modalAction,
                    clientid,
                    setClientId,
                    clientname,
                    setClientName,
                    clientemail,
                    setClientEmail,
                    loader,
                    setLoader,
                    

   }) {


    const add_item_to_cc = () => {
        if (MainCCText) {
            if (MailCC !== undefined) {
                let chek_already_added = MailCC.find(item => item === MainCCText)
                console.log('added check', MainCCText)
                if (chek_already_added) {

                } else {
                    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                    if (pattern.test(MainCCText)) {
                        setMailCC(item => [...item, MainCCText])
                        setMainCCText('')
                    } else {
                        setMainCCText('')
                    }
                }
            }
        }
    }
    const add_item_to_bcc = () => {
        if (MailBCCText) {
            if (MailBCC !== undefined) {

                let chek_already_added = MailBCC.find(item => item === MailBCCText)
                console.log('added check', MailBCCText)
                if (chek_already_added) {

                } else {
                    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                    if (pattern.test(MailBCCText)) {
                        setMailBCC(item => [...item, MailBCCText])
                        setMailBCCText('')
                    } else {
                        setMailBCCText('')
                    }
                }
            }
        }
    }
    const onCancelButton = () => {
        modalAction(false)
    }
    const onOkeyButtons = () => {
        setLoader(true)
        const success = () => {
            setLoader(false)
            modalAction(false)
            Toast.showWithGravity('Added Successfully', Toast.SHORT, Toast.BOTTOM);

        }

        const failed = () => {
            setLoader(false)
            Toast.showWithGravity('Enter Valid Email id', Toast.SHORT, Toast.BOTTOM);


        }

        let formBody = new FormData()
        formBody.append('client_id', clientid)
        formBody.append('client_email', clientemail)
        formBody.append('client_name', clientname)
        dispatch(create_temp_clients(formBody, success, failed))

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
                    <View style={{ borderRadius: 10, height: 40, borderColor: mainGrey, borderWidth: 0.3, backgroundColor: mainWhite, justifyContent: 'center' }}>
                        <TextInput
                            style={{ padding: 0, fontSize: 14, color: mainGrey, paddingLeft: 20 }}
                            placeholder="Client Id"
                            value={clientid}
                            keyboardType={"number-pad"}
                            onChangeText={txt => setClientId(txt)}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
                    <View style={{ borderRadius: 10, height: 40, borderWidth: 0.3, borderColor: mainGrey, backgroundColor: mainWhite, justifyContent: 'center' }}>
                        <TextInput
                            style={{ padding: 0, fontSize: 14, color: mainGrey, paddingLeft: 20 }}
                            placeholder="Client Name"
                            value={clientname}
                            onChangeText={txt => setClientName(txt)}


                        />
                    </View>
                </View>
                <View style={{ marginTop: 20, paddingHorizontal: 10, marginBottom: 30 }}>
                    <View style={{ borderRadius: 10, height: 40, borderWidth: 0.3, borderColor: mainGrey, backgroundColor: mainWhite, justifyContent: 'center' }}>
                        <TextInput
                            style={{ padding: 0, fontSize: 14, color: mainGrey, paddingLeft: 20 }}
                            placeholder="Email"
                            value={clientemail}
                            onChangeText={txt => setClientEmail(txt)}


                        />
                    </View>
                </View>


            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 15 }}>
                <TouchableOpacity onPress={() => onCancelButton()}>
                    <Text style={{ fontSize: 17, paddingRight: 15 }}>Cancel</Text>
                </TouchableOpacity>
                {clientid && clientname && clientemail ? (
                    <TouchableOpacity onPress={() => onOkeyButtons()}>
                        {loader ? (
                            <ActivityIndicator size="small"></ActivityIndicator>
                        ) : (
                                <Text style={{ fontSize: 17, paddingRight: 15 }}>Ok</Text>
                            )}
                    </TouchableOpacity>
                ) : (
                        <View style={{ opacity: 0.4 }}>

                            <Text style={{ fontSize: 17, paddingRight: 15 }}>Ok</Text>

                        </View>
                    )}

            </View>
        </View>
    </Modal> 
    )
}
const mapStateProps = (state) => {
    const {single_clients, } = state.sales_enviroWaste
    
    return {single_clients, }
}





export default connect(mapStateProps)(AddClientModal)


