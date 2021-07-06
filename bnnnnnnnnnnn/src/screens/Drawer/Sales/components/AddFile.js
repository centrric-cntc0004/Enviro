

import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, ScrollView, TextInput, ActivityIndicator, Dimensions } from 'react-native'
import { mediumGrey, textBlack, mainGrey, lightGrey, mainWhite, mainBlue, textGrey, darkGrey, textRed } from '../../../../common/Colors'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal'
import { fetch_job_card_by_client, search_employee_list, fetch_temp_clients, fetch_quote_template, fetch_quote_client_draft_tem, get_client_info, fetch_selected_client, create_temp_clients, fetch_client_quote_template, attach_file_list_quote, fetch_folder_list, fetch_template, sales_quoter_registration, fetch_quote_client_draft } from './common/action'
import { fetch_client_list } from '../../Clients/action'
let array_list = []
import QuoteConfirmModal from './InnerScreen/QuoteConfirmModal'
import AddClientModal from './InnerScreen/AddClientModal'
import Editor from './InnerScreen/Editor'
import EditorFiles from './InnerScreen/EditorFiles'

import Toast from 'react-native-simple-toast';
import JobCardEditable from './InnerScreen/JobCardEditable'
import ErrorModal from './InnerScreen/ErrorModal'

let width = Dimensions.get('window').width
width = width - (width / 100) * 65;
const AddFile = ({ card_list, sales_client_job_card, job_card_lists, quote_file_list, quote_amount, client_info, single_clients, quote_content, types, folder_list, sale_client_drafts_list, navigation, sale_draft_template_list, route, template_list, client_list, generate_quote_list, isLoading, file_list, temp_client_list, dispatch }) => {
    const [visibleModal, setVisible] = useState(false)
    const [visibleNModal, setNModal] = useState(false)
    const [loader, setLoader] = useState(false)
    const [loaderD, setLoaderD] = useState(false)
    console.log("temp" + JSON.stringify(sales_client_job_card))


    let dummyData = ['Client List', 'Editor', 'Attach File']
    const [selected, setSelected] = useState('Client List')
    const [data, SetData] = useState([])
    const [clientid, setClientId] = useState('')
    const [clientname, setClientName] = useState('')
    const [clientemail, setClientEmail] = useState('')
    const [clientInfo, setClientInfo] = useState('')
    const [reoccuringStatus, setReoccuringStatus] = useState(false)
    const [reoccuringDays, setReoccuringDays] = useState('')
    const [status, setStatus] = useState("pending")
    const [quoteAmount, setQuoteamount] = useState()
    const [loaderA, setLoaderA] = useState(false)
    const [loaderB, setLoaderB] = useState(false)

    const [confirmModal, setConfirmModal] = useState(false)
    const [MainCCText, setMainCCText] = useState('')
    const [MailBCCText, setMailBCCText] = useState('')
    const [MailBCC, setMailBCC] = useState([])
    const [MailCC, setMailCC] = useState([])
    const [MailSubject, setMailSubject] = useState('')
    const [MailBody, setMailBody] = useState('')
    const [content, setContent] = useState()
    const [loaderc, setLoaderc] = useState(true)
    const[errorModal,setErrorModal]=useState(false)
    const[errMsg,setErrMsg]=useState('')


    const call_list = () => {
        array_list = []
        let a = folder_list
        a.forEach(obj => {
            if (!array_list.some(o => o.name === obj.name)) {
                array_list.push({ ...obj })
            }

        });
        dispatch(fetch_folder_list(array_list))
    }
    const call_delete = (item) => {

        array_list = folder_list; // make a separate copy of the array
        var index = array_list.indexOf(item)
        if (index !== -1) {
            array_list.splice(index, 1);
            dispatch(fetch_folder_list(array_list))
            call_list()


        }
    }
    const search_employee = (txt) => {
        if (txt === "") {
            dispatch(fetch_temp_clients())
            dispatch(fetch_client_list())
        } else {
            dispatch(search_employee_list(txt))

        }
    }
    console.log("folder_list"+JSON.stringify(folder_list))
    useEffect(() => {


        let loadingInterval = setInterval(() => {
            setLoaderc(false)
            clearInterval(loadingInterval)
        }, 1500)
        return () => {
            clearInterval(loadingInterval)
        }
    }, [])


    const saveAsDraft = () => {
        setLoaderD(true)
        let postData = new FormData()
        postData.append('client', client_info.id)
        postData.append('template', quote_content)
        // setDraftLoader(true)
        const success = (res) => {
            // setDraftLoader(false)
            setLoaderD(false)

            navigation.pop()

        }

        const failed = (res) => {
            setLoaderD(false)

        }
        dispatch(fetch_quote_client_draft_tem(postData, types, client_info.id, success, failed))
    }

    const quoteGenerate = (statuss) => {
        if (statuss === 'pending') {
            setLoaderA(true)
        } else {
            setLoaderB(true)
        }
        let formData = new FormData()

        let recurStatus = 'False'
        let recurDays = 0
        reoccuringStatus ? recurStatus = 'True' : recurStatus = 'False'
        reoccuringDays ? recurDays = reoccuringDays : recurDays = 0

        formData.append('client', client_info.id);
        formData.append('status', status);
        formData.append('reoccurring', recurStatus);
        formData.append('auto_create', recurDays);
        formData.append('tab_type', 'waste');

        formData.append('url', 'null');
        formData.append('job_type', 'null');
        formData.append('invoice_amt', quote_amount);
        formData.append('company_name', 'null');
        formData.append('amount', quote_amount);
        formData.append('job_card_id', card_list.id)


        if (MailSubject) {
            formData.append('mail_subject', MailSubject);
            console.log('mail_subject', MailSubject);
        }

        if (MailBody) {
            formData.append('mail_body', MailBody);
            console.log('mail_body', MailBody);
        }


        MailCC.map((item) => {
            formData.append('mail_cc', item);
            return null;
        })

        MailBCC.map((item) => {
            formData.append('mail_bcc', item);
            return null;
        })
        folder_list.map((item) => {
            formData.append('quote_attachment', item.id);
            return null;
        })

        if (quote_content) {
            formData.append('template', quote_content);
        }
        // formData.append('safety_data', "<h1>this is safety</h1>")
        console.log("post" + JSON.stringify(formData))

        const success = (res) => {
            setLoaderA(false)
            setLoaderB(false)
            setConfirmModal(false)

            if (statuss === "accepted") {
                setMailBCC([])
                setMailCC([])
                setMailSubject('')
                setMailBody('')
                setQuoteamount('')
                setClientInfo('')
                dispatch(fetch_folder_list([]))


            }
            if (statuss === "pending") {
                setMailBCC([])
                setMailCC([])
                setMailSubject('')
                setMailBody('')
                setQuoteamount('')
                setClientInfo('')
                dispatch(fetch_folder_list([]))
                dispatch(get_client_info())

                // navigation.pop()
                navigation.navigate('enviro-sales')
                Toast.showWithGravity('Quote Generate Successfully', Toast.SHORT, Toast.BOTTOM);
            } else {
                Toast.showWithGravity('Added Successfully', Toast.SHORT, Toast.BOTTOM);

            }


        }

        const failed = (res) => {
            setLoaderA(false)
            setLoaderB(false)
            Toast.showWithGravity('Failed ! Try again', Toast.SHORT, Toast.BOTTOM);



        }

        sales_quoter_registration(formData, success, failed, types)
    }

    
    const call_editor_quote = (item,) => {
        // let temp_name = "Template" + (key + 1)
        dispatch(attach_file_list_quote(item.id))
        let a = item.name
        let b = item.id
        if (item.name === "safe_work_method_statements") {
            navigation.navigate('EditorFile', { a, b })

        } else {
            let item1 = { "id": b, "name": item.name }
            let a = folder_list.concat(item1)
            const newArray = [];
            a.forEach(obj => {
                if (!newArray.some(o => o.name === obj.name)) {
                    newArray.push({ ...obj })
                }

            });

            dispatch(fetch_folder_list(newArray))
            const success = (response) => {
                // console.log("responseiteeeeee"+JSON.stringify(response))

                let item1 = { "id": b, "name": item.name }
                let a = folder_list.concat(item1)
                const newArray = [];
                a.forEach(obj => {
                    if (!newArray.some(o => o.name === obj.name)) {
                        newArray.push({ ...obj })
                    }

                });

                dispatch(fetch_folder_list(newArray))


            }

            const failed = () => {

            }

            let formBody = new FormData()
            console.log("enter2" + item.id)

            formBody.append('quote_attach_template', quote_file_list)
            formBody.append('template_id', b)


            dispatch(fetch_quote_template(types, formBody, success, failed))


        }
    }
    const call_client = (item) => {

        dispatch(get_client_info(item))
        setClientInfo(item)

        const success = () => {


        }

        const failed = () => {


        }


        dispatch(fetch_quote_client_draft("", types, item.id, success, failed))

        const successA = () => {


        }

        const failedA = () => {


        }


        dispatch(fetch_job_card_by_client(item.id, successA, failedA))


    }

    const call_editor = (item) => {
        //  dispatch(fetch_template(item.template))
        dispatch(fetch_client_quote_template(item.id))
        setSelected('Editor')
    }

    const callsend=()=>{
        if(!client_info){
            console.log("Please Choose Client")
            setErrMsg('Please Choose Client ! ')
            setErrorModal(true)

        }else if(!card_list){
            setErrMsg('Please Choose JobCard ! ')
            setErrorModal(true)
        }else{
            setConfirmModal(true)
        }

    }
    if (loaderc)
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={mainBlue}></ActivityIndicator>
            </View>
        )
    return (
        <ScrollView showsVerticalScrollIndicator={false}
            style={{ flex: 1, backgroundColor: mainWhite }}>
            <View style={{ backgroundColor: textGrey, height: 13 }}>
            </View>
            <View style={{ flex: 1, backgroundColor: mainWhite, }}>

                <View style={{ flex: 0.1, marginBottom: 10, marginTop: '5%', paddingHorizontal: 10 }}>
                    <View style={{ flexDirection: 'row', backgroundColor: mainWhite, borderRadius: 20, height: 42, borderWidth: 0.3, borderColor: darkGrey }}>
                        {
                            dummyData.map((item, key) => {

                                if (item === selected) {

                                    return (
                                        <View style={{ marginTop: 1, marginBottom: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: mainBlue, flex: 3, }}>
                                            <Text style={{ fontSize: 14, color: mainWhite, }}>{item}</Text>
                                        </View>
                                    )
                                } else {
                                    return (
                                        <TouchableOpacity onPress={() => setSelected(item)} style={{ marginTop: 2, marginBottom: 4, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: mainWhite, flex: 3.2, }}>
                                            <Text style={{ fontSize: 14, color: mainGrey, }}>{item}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                            })
                        }
                    </View>
                </View>
                {selected === "Attach File" ? (
                    <View>

                        <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10 }}>
                            <View
                                style={{
                                    flex: 0.65, flexDirection: 'row',
                                    justifyContent: 'center', alignItems: 'center', height: 30
                                }}>
                                <TouchableOpacity
                                    onPress={() => setReoccuringStatus(!reoccuringStatus)
                                    }
                                >
                                    <View style={{
                                        height: 18,
                                        width: 18,
                                        borderWidth: 1,
                                        borderColor: mainGrey,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>

                                        <Icon name="check" color={reoccuringStatus ? mainBlue : '#fff'} size={10}></Icon>

                                    </View>
                                </TouchableOpacity>
                                <Text style={{ fontSize: 14, paddingLeft: 10, color: mainGrey }}>Recurring</Text>

                            </View>
                            <View style={{ flex: 0.1 }} />
                            {reoccuringStatus ? (
                                <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', }}>
                                    <TextInput
                                        style={{ alignSelf: 'center', padding: 1, fontSize: 14, color: mainGrey, paddingLeft: 20 }}
                                        placeholder="Days"
                                        keyboardType="number-pad"
                                        value={reoccuringDays}
                                        onChangeText={txt => setReoccuringDays(txt)}
                                    />
                                </View>
                            ) : (
                                    <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center' }}>
                                    </View>
                                )}
                            {card_list ? (
                                <View
                                    style={{
                                        marginLeft: 10,
                                        flex: 0.4,
                                        marginRight: 5,
                                        alignItems: 'center', justifyContent: 'center',

                                        // borderRadius: 20, height: 38, borderWidth: 0.3, backgroundColor: mainWhite, borderColor: mainGrey
                                    }}>

                                    <Text numberOfLines={1}
                                        style={{ color: mainBlue, textAlign: 'center', fontSize: 14 }} >{card_list.name}</Text>
                                </View>
                            ) : (
                                    <View style={{ flex: 0.4 }}>
                                    </View>
                                )}
                            {client_info ? (
                                <View
                                    style={{
                                        marginLeft: 10,
                                        flex: 0.6,
                                        marginRight: 5,
                                        alignItems: 'center', justifyContent: 'center',

                                        // borderRadius: 20, height: 38, borderWidth: 0.3, backgroundColor: mainWhite, borderColor: mainGrey
                                    }}>

                                    <Text numberOfLines={1}
                                        style={{ color: mainBlue, textAlign: 'center', fontSize: 14 }} >{client_info.client_name}</Text>
                                </View>
                            ) : (
                                    <View style={{ flex: 0.4 }}>
                                    </View>
                                )}
                        </View>
                        {client_info ? (
                            <JobCardEditable navigation={navigation} job_card_lists={sales_client_job_card} client_info={client_info} />
                        ) : (
                                null
                            )}
                        <View style={{ paddingHorizontal: 10 }}>
                            <View style={{ flex: 1, backgroundColor: mediumGrey, height: 50, marginTop: 20, flexDirection: 'row' }}>
                                <Text style={{ marginTop: 15, marginLeft: 20, width: '85%' }}>Attach File</Text>


                            </View>
                            {file_list.map((item, key) => {
                                return (
                                    <View key={key}>

                                        <TouchableOpacity
                                            onPress={() => call_editor_quote(item)}
                                        //  onPress={() => call_Modal(item)}
                                        >
                                            <View style={{
                                                flexDirection: 'row', height: 55, backgroundColor: textGrey,
                                                marginTop: 15, borderWidth: 0.25, borderColor: mainGrey, borderRadius: 10
                                            }}>

                                                <View style={{ flex: 1, backgroundColor: textGrey, marginTop: 15, marginBottom: 10, marginLeft: 5, marginRight: 10, }}>
                                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                                        <Icon1 style={{ paddingLeft: 10 }}
                                                            name="file-document-outline" size={25} color={mainGrey} />
                                                        <Text numberOfLines={1}
                                                            style={{ paddingLeft: 20, color: textBlack, paddingRight: 20 }}>{item.name}</Text>
                                                    </View>

                                                </View>
                                            </View>
                                        </TouchableOpacity>

                                    </View>
                                );
                            })}
                        </View>
                        {folder_list!==undefined?(
                            <View>
                        {folder_list.length !== 0? (
                            <View>
                                {folder_list.map((item, key) => {
                                    return (
                                        <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 10 }}>
                                            <TouchableOpacity onPress={() => call_delete(item)}>
                                                <Icon name="times-circle" color="red" size={20}></Icon>
                                            </TouchableOpacity>
                                            <Text style={{ fontSize: 14, color: textBlack, paddingLeft: 10 }}>{item.name}</Text>
                                        </View>
                                    )
                                })}
                            </View>
                        ) : (
                                null
                            )}
                            </View>):(
null
                            )}
                        <View style={{ marginBottom: 30, flexDirection: "column", flex: 0.5, }}>

                            <View style={{ flexDirection: "row", flex: 0.5, marginTop: 20 }}>

                                {client_info ? (
                                    <TouchableOpacity onPress={() => saveAsDraft()}
                                        style={{ marginLeft: 10, flex: 0.6, borderRadius: 30, borderWidth: 0.3, backgroundColor: mainBlue, borderColor: mainBlue, height: 38, justifyContent: 'center', alignItems: 'center' }}>
                                        {loaderD ? (
                                            <ActivityIndicator color={mainWhite} size="small"></ActivityIndicator>
                                        ) : (
                                                <Text style={{ color: mainWhite }}>Save as Draft</Text>

                                            )}
                                    </TouchableOpacity>
                                ) : (
                                        <View
                                            style={{ marginLeft: 10, opacity: 0.6, flex: 0.6, borderRadius: 30, borderWidth: 0.3, backgroundColor: mainBlue, borderColor: mainBlue, height: 38, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: mainWhite }}>Save as Draft</Text>
                                        </View>
                                    )}

                                <View style={{ flex: 0.2, }} />
                                {/* {client_info && card_list ? ( */}
                                    <TouchableOpacity 
                                    // onPress={() => callsend()}
                                        style={{ marginRight: 10, flex: 0.6, borderRadius: 30, borderWidth: 0.3, backgroundColor: mainBlue, borderColor: mainBlue, height: 38, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: mainWhite }}>Continue</Text>
                                    </TouchableOpacity>
                                {/* // ) : (
                                //         <View
                                //             style={{ marginRight: 10, opacity: 0.6, flex: 0.6, borderRadius: 30, borderWidth: 0.3, backgroundColor: mainBlue, borderColor: mainBlue, height: 38, justifyContent: 'center', alignItems: 'center' }}>
                                //             <Text style={{ color: mainWhite }}>Continue</Text>
                                //         </View>
                                //     )} */}

                            </View>

                        </View>
                    </View>

                ) : selected === "Client List" ? (

                    <View >
                        <View style={{ marginLeft: 10, marginRight: 10, flexDirection: 'row', marginTop: 5, paddingLeft: 25, borderRadius: 20, height: 36, borderWidth: 0.2, backgroundColor: mainWhite, borderColor: darkGrey }}>
                            <TextInput
                                style={{ fontSize: 14, color: '#000', width: '100%', }}
                                placeholder='Search Client by ID , Name'
                                autoCorrect={false}
                                onChangeText={(txt) => {
                                    // setKeyword(txt)
                                    search_employee(txt)
                                }}
                            />
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: '30%', height: 40, backgroundColor: lightGrey, borderRadius: 30 }}>
                                <Text style={{ color: mainWhite }}>Search</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10, }}>

                            <View
                                style={{
                                    flex: 0.7,

                                    marginTop: 10,
                                    marginBottom: 10,

                                    flexDirection: 'row',
                                }}>
                                {client_info ? (
                                    <Text numberOfLines={1}
                                        style={{ paddingLeft: 20, color: mainBlue, textAlign: 'center' }} >{client_info.client_name}</Text>

                                ) : (
                                        null
                                    )}

                            </View>

                            <View style={{ flex: 0.6 }} />
                            <TouchableOpacity onPress={() => setNModal(true)}
                                style={{
                                    flex: 0.45, marginRight: 5, marginTop: 5,
                                    backgroundColor: 'orange',


                                    alignItems: 'center', justifyContent: 'center', alignItems: 'center',
                                    flexDirection: 'row', borderRadius: 20, height: 35, borderWidth: 0.3, backgroundColor: mainWhite, borderColor: mainBlue
                                }}>

                                <Text style={{ color: mainBlue, textAlign: 'center' }} >Add New +</Text>
                            </TouchableOpacity>

                        </View>
                        {single_clients.length !== 0 ? (
                            <View style={{ marginTop: 5, }}>
                                <Text style={{ marginLeft: 20, color: mainGrey }}>Client Draft</Text>
                                <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5, paddingHorizontal: 10 }}>

                                    <ScrollView showsHorizontalScrollIndicator={false}
                                        horizontal>
                                        {single_clients.map((item, key) => {

                                            return (
                                                <TouchableOpacity onPress={() => call_editor(item)}
                                                    style={{ width: width }} >
                                                    <View style={{
                                                        marginRight: 10,
                                                        flexDirection: 'row', height: 50, backgroundColor: mediumGrey,
                                                        marginTop: 10, borderWidth: 0.25, borderColor: mainGrey, borderRadius: 10
                                                    }}>

                                                        <View style={{ flex: 1, backgroundColor: mediumGrey, marginTop: 15, marginBottom: 10, marginLeft: 5, marginRight: 10, }}>
                                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                                <Text numberOfLines={1}
                                                                    style={{ paddingLeft: 10 }}
                                                                >{key + 1}. </Text>
                                                                <Text numberOfLines={1}
                                                                    style={{ paddingLeft: 5, color: textBlack, paddingRight: 20 }}>{item.employee_name}</Text>
                                                            </View>

                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </ScrollView>
                                </View>

                            </View>
                        ) : (
                                null

                            )}
                        <View style={{ marginTop: 5, marginLeft: 10, marginRight: 10 }}>

                            {temp_client_list.map((item, key) => {


                                return (

                                    <TouchableOpacity
                                        onPress={() => call_client(item)}>
                                        <View style={{
                                            borderRadius: 10,


                                            flexDirection: 'row', height: 70, backgroundColor: mediumGrey,
                                            marginTop: 10, borderWidth: 0.25, borderColor: mainGrey,
                                        }}>
                                            <View style={{ flex: 1, backgroundColor: mediumGrey, marginTop: 8, marginBottom: 10, marginLeft: 5, marginRight: 10, }}>
                                                <View style={{ flex: 1, flexDirection: 'column' }}>

                                                    <Text numberOfLines={1}
                                                        style={{ fontWeight: 'bold', paddingLeft: 20, color: textBlack, paddingRight: 20, fontSize: 14 }}>{item.client_name}</Text>
                                                    <Text style={{ paddingLeft: 20, marginTop: 10 }}>{item.client_id}</Text>

                                                </View>
                                            </View>
                                            {item === clientInfo ? (
                                                <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 20 }}>
                                                    <Icon name="check" size={16} color={mainGrey} />
                                                </View>
                                            ) : (
                                                    null
                                                )}
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                        {/* <Text style={{fontSize:16, color:textBlack}}>Permanent Client</Text> */}
                        <View style={{ marginLeft: 10, marginRight: 10 }}>
                            {client_list.map((item, key) => {


                                return (

                                    <TouchableOpacity onPress={() => call_client(item)}>
                                        <View style={{
                                            borderRadius: 10,


                                            flexDirection: 'row', height: 70, backgroundColor: mediumGrey,
                                            marginTop: 10, borderWidth: 0.25, borderColor: mainGrey,
                                        }}>
                                            <View style={{ flex: 1, backgroundColor: mediumGrey, marginTop: 8, marginBottom: 10, marginLeft: 5, marginRight: 10, }}>
                                                <View style={{ flex: 1, flexDirection: 'column' }}>

                                                    <Text numberOfLines={1}
                                                        style={{ fontWeight: 'bold', paddingLeft: 20, color: textBlack, paddingRight: 20, fontSize: 14 }}>{item.client_name}</Text>
                                                    <Text style={{ paddingLeft: 20, marginTop: 10 }}>{item.client_id}</Text>

                                                </View>
                                            </View>
                                            {item === clientInfo ? (
                                                <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 20 }}>
                                                    <Icon name="check" size={16} color={mainGrey} />
                                                </View>
                                            ) : (
                                                    null
                                                )}
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                ) : (
                            <Editor />
                        )}

                <Modal
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                    isVisible={visibleModal}
                    onSwipeComplete={() => setVisible(false)}
                    onBackdropPress={() => setVisible(false)}
                    swipeDirection="down"
                >
                    <View style={{ backgroundColor: mainWhite, paddingHorizontal: 20, borderRadius: 10 }}>
                        <View style={{ backgroundColor: mainWhite, borderRadius: 10, flexDirection: "column" }}>

                            <View style={{ marginTop: 10, marginBottom: 20 }}>
                                {data.length !== 0 ? (
                                    <View>
                                        {data.map((item, key2) => {
                                            return (
                                                <ScrollView>
                                                    <EditorFiles />
                                                </ScrollView>

                                            )
                                        })}
                                    </View>
                                ) : (
                                        <View  >
                                            <View style={{

                                                justifyContent: 'center', alignItems: 'center',
                                                height: 50,
                                                marginTop: 20,
                                                marginBottom: 20,
                                                marginLeft: 40, marginRight: 40
                                            }}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                                                    <Text numberOfLines={1}
                                                        style={{ paddingLeft: 10, color: textBlack, fontSize: 14 }}>No File Found</Text>

                                                </View>
                                            </View>
                                        </View>
                                    )}
                            </View>
                        </View>
                    </View>
                </Modal>



                <AddClientModal
                    modalStatus={visibleNModal}
                    modalAction={setNModal}
                    clientid={clientid}
                    setClientId={setClientId}
                    clientname={clientname}
                    setClientName={setClientName}
                    clientemail={clientemail}
                    setClientEmail={setClientEmail}
                    loader={loader}
                    setLoader={setLoader}
                // onOkeyButton={onOkeyButton}

                // quoteRegisterationApi={quoteGenerate}

                />
                  <ErrorModal
                    modalStatus={errorModal}
                    modalAction={setErrorModal}
                    clientid={errMsg}
                    
               

                />

                <QuoteConfirmModal
                    modalStatus={confirmModal}
                    modalAction={setConfirmModal}
                    MailBCC={MailBCC}
                    setMailBCC={setMailBCC}
                    MailCC={MailCC}
                    setMailCC={setMailCC}
                    MailSubject={MailSubject}
                    setMailSubject={setMailSubject}
                    MailBody={MailBody}
                    setMailBody={setMailBody}
                    MainCCText={MainCCText}
                    setMainCCText={setMainCCText}
                    MailBCCText={MailBCCText}
                    setMailBCCText={setMailBCCText}
                    quoteRegisterationApi={quoteGenerate}
                    loaderA={loaderA}
                    loaderB={loaderB}
                    amount={quote_amount}
                />

            </View>
        </ScrollView>
    )

}



const mapStateProps = (state) => {
    const { card_list, sales_client_job_card, job_card_lists, quote_amount, quote_file_list, client_info, single_clients, generate_quote_list, sale_draft_template_list, sale_client_drafts_list, isLoading, file_list, temp_client_list, folder_list, template_list, types, quote_content } = state.sales_enviroWaste
    const { client_list } = state.client
    return { card_list, sales_client_job_card, job_card_lists, quote_amount, quote_file_list, client_info, single_clients, generate_quote_list, isLoading, sale_client_drafts_list, file_list, sale_draft_template_list, temp_client_list, client_list, folder_list, template_list, types, quote_content }
}





export default connect(mapStateProps)(AddFile)



