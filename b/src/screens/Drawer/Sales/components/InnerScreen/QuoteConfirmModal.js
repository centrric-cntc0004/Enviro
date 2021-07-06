import React, { useState } from 'react'
import { View, TouchableOpacity, Text, TextInput, ActivityIndicator } from 'react-native'
import { textBlack, mainGrey, mainWhite, mainBlue, textGrey, } from '../../../../../common/Colors'
import Icon from 'react-native-vector-icons/Entypo'
import Modal from 'react-native-modal'
function QuoteConfirmModal({

    modalStatus,
    modalAction,
    MailBCC,
    setMailBCC,
    MailCC,
    setMailCC,
    MailSubject,
    setMailSubject,
    MailBody,
    setMailBody,
    MainCCText,
    setMainCCText,
    MailBCCText,
    setMailBCCText,
    quoteRegisterationApi,
    loaderA,
    loaderB }) {


    const add_item_to_cc = () => {
        if (MainCCText) {
            if (MailCC !== undefined) {
                let chek_already_added = MailCC.find(item => item === MainCCText)
                if (chek_already_added) {

                } else {
                    const res1 = MainCCText.replace(/ /g, '')

                    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                    if (pattern.test(res1)) {
                        setMailCC(item => [...item, res1])
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
                if (chek_already_added) {

                } else {
                    const res = MailBCCText.replace(/ /g, '')
                    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                    if (pattern.test(res)) {
                        setMailBCC(item => [...item, res])
                        setMailBCCText('')
                    } else {
                        setMailBCCText('')
                    }
                }
            }
        }
    }
    const delete_item_to_cc = (txt) => {
        let updatedArr = MailCC.filter(item => item !== txt)
        setMailCC(updatedArr)
    }
    const delete_item_to_bcc = (txt) => {
        let updatedArr = MailBCC.filter(item => item !== txt)
        setMailBCC(updatedArr)
    }
    return (
        <Modal
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            isVisible={modalStatus}
            onSwipeComplete={() => modalAction(false)}
            onBackdropPress={() => modalAction(false)}
            swipeDirection="left"
        >
            <View style={{ backgroundColor: mainWhite, paddingHorizontal: 20, borderRadius: 10 }}>
                <View style={{ backgroundColor: mainWhite, borderRadius: 10, flexDirection: "column" }}>
                    <View style={{ paddingLeft: 10, paddingTop: 10, }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Share Quotation</Text>

                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: textBlack, fontWeight: 'bold', fontSize: 14 }}>To (CC)</Text>
                        <View style={{

                            height: 40,
                            marginTop: 10, borderWidth: 0.2, borderColor: mainGrey, borderRadius: 10
                        }}>

                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <TextInput
                                    style={{ width: '80%', fontSize: 14, color: mainGrey, paddingLeft: 10 }}
                                    placeholder="Email"
                                    autoCapitalize={"none"}
                                    value={MainCCText}
                                    onChangeText={txt => setMainCCText(txt)}



                                />
                                {
                                    MainCCText ? (
                                        <TouchableOpacity onPress={() => add_item_to_cc()}
                                            style={{ borderTopEndRadius: 10, borderBottomEndRadius: 10, alignItems: 'center', justifyContent: 'center', width: '20%', backgroundColor: textGrey }}>
                                            <Text style={{ fontSize: 14 }}>Add</Text>
                                        </TouchableOpacity>
                                    ) : (
                                            <View
                                                style={{ borderTopEndRadius: 10, borderBottomEndRadius: 10, opacity: 0.4, alignItems: 'center', justifyContent: 'center', width: '20%', backgroundColor: textGrey }}>
                                                <Text style={{ fontSize: 14 }}>Add</Text>
                                            </View>
                                        )}

                            </View>

                        </View>
                        <View style={{ flexDirection: 'column', }}>
                            {MailCC.map((item, key) => {
                                return (

                                    <View style={{ flexDirection: 'row' }}>
                                        <Text numberOfLines={1}
                                            style={{ color: mainGrey, marginLeft: 10, marginTop: 5 }}>{item}</Text>

                                        <TouchableOpacity onPress={() => delete_item_to_cc(item)}>
                                            <Icon name="circle-with-cross" color={textBlack}></Icon>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })}
                        </View>


                        <Text style={{ marginTop: 10, color: textBlack, fontWeight: 'bold' }}>To (BCC)</Text>
                        <View style={{

                            height: 40,
                            marginTop: 10, borderWidth: 0.2, borderColor: mainGrey, borderRadius: 10
                        }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>

                                <TextInput
                                    style={{ width: '80%', padding: 0, fontSize: 14, color: mainGrey, paddingLeft: 10 }}
                                    placeholder="Email"
                                    autoCapitalize={"none"}
                                    value={MailBCCText}
                                    onChangeText={txt => setMailBCCText(txt)}



                                />
                                {
                                    MailBCCText ? (
                                        <TouchableOpacity onPress={() => add_item_to_bcc()}
                                            style={{ borderTopEndRadius: 10, borderBottomEndRadius: 10, alignItems: 'center', justifyContent: 'center', width: '20%', backgroundColor: textGrey }}>
                                            <Text style={{ fontSize: 14 }}>Add</Text>
                                        </TouchableOpacity>
                                    ) : (
                                            <View
                                                style={{ borderTopEndRadius: 10, borderBottomEndRadius: 10, opacity: 0.4, alignItems: 'center', justifyContent: 'center', width: '20%', backgroundColor: textGrey }}>
                                                <Text style={{ fontSize: 14 }}>Add</Text>
                                            </View>
                                        )}
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', }}>
                            {MailBCC.map((item, key) => {
                                return (
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text numberOfLines={1}
                                            style={{ color: mainGrey, marginLeft: 10, marginTop: 5 }}>{item}</Text>

                                        <TouchableOpacity onPress={() => delete_item_to_bcc(item)}>
                                            <Icon name="circle-with-cross" color={textBlack}></Icon>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })}
                        </View>

                        <Text style={{ marginTop: 10, color: textBlack, fontWeight: 'bold' }}>Subject</Text>
                        <View style={{

                            height: 40,
                            marginTop: 10, borderWidth: 0.2, borderColor: mainGrey, borderRadius: 10
                        }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <TextInput
                                    style={{ width: '90%', padding: 0, fontSize: 14, color: mainGrey, paddingLeft: 20 }}
                                    placeholder="Subject"
                                    value={MailSubject}
                                    onChangeText={txt => setMailSubject(txt)}

                                />
                            </View>

                        </View>
                        <Text style={{ marginTop: 10, color: textBlack, fontWeight: 'bold' }}>Body</Text>

                        <View style={{

                            height: 70,
                            marginTop: 10, borderWidth: 0.2, borderColor: mainGrey, borderRadius: 10
                        }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <TextInput
                                    multiline
                                    style={{ width: '90%', padding: 0, fontSize: 16, color: mainGrey, paddingLeft: 20 }}
                                    placeholder="Body"
                                    value={MailBody}
                                    onChangeText={txt => setMailBody(txt)}


                                />
                            </View>

                        </View>
                    </View>





                </View>

                <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                    <TouchableOpacity onPress={() => quoteRegisterationApi('pending')}
                        style={{ borderRadius: 30, borderWidth: 0.3, borderColor: mainBlue, backgroundColor: mainBlue, width: 120, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                        {loaderA ? (
                            <ActivityIndicator size="small" color={mainWhite}></ActivityIndicator>
                        ) : (
                                <Text style={{ color: mainWhite, fontSize: 12 }}>Generate & Send</Text>

                            )}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => quoteRegisterationApi('accepted')}
                        style={{ borderRadius: 30, borderWidth: 0.3, borderColor: mainBlue, backgroundColor: mainBlue, marginLeft: 20, width: 120, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                        {loaderB ? (
                            <ActivityIndicator size="small" color={mainWhite}></ActivityIndicator>

                        ) : (
                                <Text style={{ color: mainWhite, fontSize: 12 }}>Approve Quote</Text>

                            )}
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    )
}
export default QuoteConfirmModal